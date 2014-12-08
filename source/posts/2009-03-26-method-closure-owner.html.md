---
title: Method Closure Owner (arguments.caller)
link: http://blog.betabong.com/2009/03/26/method-closure-owner/
description: 
post_id: 214
date: 2009-03-26
created: 2009/03/26 13:48:40
created_gmt: 2009/03/26 12:48:40
post_name: method-closure-owner
post_type: post
---


In AS1 and AS2 we had access to arguments.caller within a function/method scope. This is not the case anymore in AS3. I wonder why. And I wonder why I can't find a workaround, because everything should be there under the hood: 

> _ActionScript_ 3.0 enables a _method closure_ to automatically remember its original object instance (from [Adobe ActionScript 3.0 * Core language features](http://help.adobe.com/en_US/ActionScript/3.0_ProgrammingAS3_Flex/WS5b3ccc516d4fbf351e63e3d118a9b90204-7ff3.html))

Method Closure are quite a wonderful thing: They come in handy in many situations, especially when it comes to event listening and handling. And they stay kind of wonderful in terms of «hidden magic». Hidden magic is all that stuff never officially explained by Adobe. These things often are very core to the language (e.g. exact processing order, frame splitting, event handling), but Adobe decided – certainly for reasons – to only let us see and manipulate what common developers are to see and manipulate. Still, I'd like to have to possibility to dig deeper if I want. If there is a MethodClosure Type, why is there no way to access its properties. After all it holds a reference to its owner. I may wanna know what the owner is! I admit that its not that there aren't many obvious reasons why I would do so, but there are! For example: 
    
    
    public function get width() : Number {
    	var caller : * = MethodClosure( arguments.callee ).owner;
    	if ( isChild( caller ) ) {
    		return widthValueForChild;
    	} else {
    		return actualWidthValue;
    	}
    }
    

May be may be there is a way.. I'm not a hardcore byte array hacker, but if I find a solution (or explanation why o why), I'll update this post.

## Comments

**[Lance](#60 "2009-08-24 01:14:10"):** Hey man, These posts on Method Closures have been amazing... nothing like it out there. I have a question/case, what do you think... I have a 'public static EventHandler' class, which creates an EventHandler object, which allows you to pass arguments to the event handler, like so: 
    
    
    var handler:Function = EventHandler.handler(theRealHandler, [arg1, arg2], true);
    target.addEventListener("something", handler);
    
    public function theRealHandler(event:Event, arg1:*, arg2:*):void ...
    

...where the last parameter, "true", says you also want the event. The first question is, if I declare that "var handler" inside of a method, where is it stored? Because the EventHandler static class created a new object, and passed the result to the handler inside that method, it seems like a loop and I don't know well enough how things are stored in Flash to see how that would be garbage collected (the handler, and the EventHandler object). The EventHandler object looks like this: 
    
    
    class EventHandler {
    
    	public var args:Array;
    	public var eventHandler:Function;
    	public var includeEvent:Boolean;
    	
    	public function EventHandler(eventHandler:Function, arguments:Array = null, includeEvent:Boolean = false) {
    		this.eventHandler = eventHandler;
    		this.args = arguments;
    		this.includeEvent = includeEvent;
    	}
    	
    	public function handleEvent(event:*):void {
    		var result:Array = args.concat();
    		if (includeEvent) result.splice(0, 0, event); // add event to beginning of array
    		eventHandler.apply(null, result);
    	}
    
    	public static function handler(eventHandler:Function, arguments:Array = null, includeEvent:Boolean = false):Function {
    		return new EventHandler(eventHandler, arguments, includeEvent).handleEvent;
    	}
    }
    

...Second question is in regards to making this easy to read and more customizable. In order to make code clean, I created another object, SmartEvent. This is all the EventHandler without the static methods. In addition, it's a dynamic class, so you can pass through any properties in the event, and reset them whenever. Looks like this: 
    
    
    var event:SmartEvent(realHandler);
    event.arg1 = value;
    event.arg2 = value2;
    target.addEventListener("something", event.handler);
    
    ...where "handler" is the internal handler from the EventHandler class, and it just passes the SmartEvent to the "realHandler".
    
    So SmartEvent looks like this:
    
    public dynamic class SmartEvent extends flash.events.Event
    {
    	public var originalEvent:flash.events.Event;
    	
    	public var eventHandler:Function;
    	
    	public function SmartEvent(eventHandler:Function) {
    		super();
    		this.eventHandler = eventHandler;
    	}
    	
    	public function handler(event:Event):void {
    		originalEvent = event;
    		eventHandler(this);
    	}
    }
    

...Then you can reset variables (aka 'arguments') on your SmartEvent every time it is handled. This is basically an adapter for a PropertyChangeEvent when you don't know the property, source, or target (from Flex binding), and can be used like a Scope object in Mate. So in the "realHandler", you could do this: 
    
    
    public function realHandler(event:SmartEvent):void {
    	var oldValue:* = event.oldValue; // defined in some method
    	var target:Object = event.targetObject;
    	var source:Object = event.target;
    	var property:String = event.property; // defined in some method
    	var newValue:* = source[property];
    	if (oldValue != newValue) {
    		target[property] = newValue;
    		event.oldValue = newValue; // reset oldValue, so the next time through its different
    	}
    }
    

...I made all this from reading your posts, but I'm not sure how the garbage collection because everything's referencing everything else. It makes a lot more possible in event handling though! Any ideas if this this is okay practice or how to make it better? Thanks man! Lance

**[betabong](#61 "2009-08-24 10:14:10"):** Hey Lance, interesting post! I'm still not totally sure about the reason for these extra handler classes - may be because you haven't posted all the code? For example SmartEvent: Why is it dynamic? Are targetObjet, target, property, oldValue defined somewhere, or are those dynamic properties? It's generally a good idea to avoid dynamic classes for several reasons (speed and control), so I don't really see the big benefit here. Then there's several potential problems with your "shadow" classes here, especially with EventHandler. As it seems to me neither its instance nor its target object will be garbage collected, resulting not only in memory leaks but also in potential misbehaviour (though I'm not totally sure about both, I'd have to take more time to think this trough thouroughly). It also seems that you won't have any more possibility to get to EventHandler once you've created it: So how would you remove a listener at a later time? As for me I try to keep as much control as I can by keeping things as basic as possible: \- never reference an object in another one if not absolutely necessary. And if I have to do so: make sure the reference will be nulled on destruction. \- if you have instances listen to dispatchers, make sure you'll unlisten on destruction - or/and use weak listeners if possible Still, I also use "helpers" sometimes, especially for bigger stuff. For once I subclassed EventDispatcher into BetterEventDispatcher which can keep track of listeners, providing things I'd wish for all event dispatcher, especially the method removeAllListeners. And then I'd subclass from that one instead of EventDispatcher. And for my framework classes I've added listenTo and unlistenTo methods for the core class. Here also I keep track of what instances I'm listening to (opposed to the BetterEventDispatcher who keeps track of who's listening to me). So on destruction I can call unlistenToAll() and I'm fine with the garbage collector if I've always gone through those two methods listenTo and unlistenTo. May be I'm gonna write a post about this one time. Still in my opinion it's too much work for us to do: These kind of things should be in the core language, with a better event framework and the addition of destructors.

**[Lance](#62 "2009-08-24 19:11:30"):** For sure Betabong, I totally agree. I'm coming from a Ruby background and there's just so much cool stuff left out in compiled languages, like blocks/yields for instance, and modules, so I find myself trying to recreate those core language features in actionscript for 1) keeping code lean so I don't repeat myself, and 2) making it intuitive to do hardcore things. They should go into the core language:) Anyway, thanks a lot for the great response. When I get some time I'll have to check out how garbage collection would work exactly in this case. I'm thinking about creating an EventUtil class that does what your BetterEventDispatcher does, so I can use it here and there. \- Lance

**[Lance](#63 "2009-08-24 19:12:30"):** If only dynamic classes weren't bad practice in Actionscript :) Those properties were dynamically defined.

**[betabong](#175 "2010-11-21 11:02:33"):** This is indeed very interesting. Thing is: all you get is a string information about which class and which method was calling. But not the calling method itself. And I don't see how you could derive this reference from it. Still, nice :-) (it's index 2 by the way:) 
    
    
    trace((new Error()).getStackTrace().split(’\n’)[2]);

**[Steven Vachon](#174 "2010-11-21 10:39:24"):** I realize that this post is over a year old, but I was looking for this very thing, and I found this on a website just now: // the 3rd line is the equivalent of "attributes.caller" trace((new Error()).getStackTrace().split('\n')[3]);

**[Steven Vachon](#190 "2010-12-17 23:47:36"):** True, but it's great for debugging And yeah, oops, heheh... only needed this once so far and knowing the calling class was enough :)

