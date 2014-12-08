---
title: Weak Method Closure
link: http://blog.betabong.com/2008/09/26/weak-method-closure/
date: 2008-09-26
---


Sometimes you want to pass an objects function as an argument and store that function (along its arguments) for later calling. Still you don't want that storage to prevent its object (instance) from being destroyed (from being removed by the garbage collector). But storing a function does so, because it holds a reference to the function which belongs to an object. It's one of the biggest traps you can fall into when developing a larger project where many objects are created and destroyed and created and so on... geeks call that kind of thing memory leaks I think :) So if you can avoid it: avoid it! If you can't.. may be this little thing can help: 
    
    
    package com.betabong.util
    {
    	import flash.utils.Dictionary;
    
    	public class WeakMethodClosure {
    
    		private var holder : Dictionary;
    
    		function WeakMethodClosure( target : Object , method : Function , arguments : Array = null ) : void {
    			holder = new Dictionary( true );
    			holder[ target ] = 	new MethodStorage( method , arguments );
    		}
    
    		public function call() : Boolean {
    			var args : Array;
    			var f : Function;
    			var cache : MethodStorage;
    			for ( var obj : * in holder ) {
    				cache = holder[obj] as MethodStorage;
    				cache.method.apply( obj , cache.arguments );
    				return true;
    			}
    			return false;
    		}
    	}
    }
    
    class MethodStorage {
    	public var method : Function;
    	public var arguments : Array;
    	function MethodStorage( method : Function , arguments : Array = null ) : void {
    		this.method = method;
    		this.arguments = arguments;
    	}
    }

This actually uses one of the two mechanisms Flash provides to store objects by weak reference: the magic Dictionary. So instead of storing the function, you actually store the method storage or call method: 
    
    
    public function callAfterTime( f : Function , a : Array , t : uint ) : void {
    this.storedfunction = ( new WeakMethodClosure( this , f , a ) ).call;
    // and later:
    storedfunction();

It might not be obvious where you'd wanna use this, but I guess if you've found your way to this blog entry, you might be able to find out if that's of any value for you anyway ;) [Download WeakMethodClosure.as (zip)](/showcase/WeakMethodClosure.as.zip) Just be aware that this solution might not be superduper save in all cases: the Garbage Collector is a wayward beast – there's no guarantee it'll clean your dictionary on time. Still, in my experience, it's save enough. It's comparable to adding a weak event listener.. And hey, if you've got any better idea, I'd love to hear! **Update:** Below a test application... 
    
    
    package
    {
    	import com.betabong.util.WeakMethodClosure;
    	import flash.display.Sprite;
    	import flash.events.TimerEvent;
    	import flash.utils.Timer;
    	import flash.utils.getTimer;
    
    	public class WeakClosureTest extends Sprite
    	{
    		private var closure : WeakMethodClosure;
    		private var timer : Timer;
    		
    		public function WeakClosureTest()
    		{			
    			testWeakClosure();
    		}
    
    		public function testWeakClosure() : void {
    			var tempObject : Object = {
    				test: testTrace
    			}
    			closure = new WeakMethodClosure( tempObject , tempObject.test );
    			callWeakClosure();
    			
    			timer = new Timer( 50 );
    			timer.addEventListener(TimerEvent.TIMER , callWeakClosure );
    			timer.start();
    		}
    		
    		public function callWeakClosure( event : TimerEvent = null ) : void {
    			if ( !closure.call() ) {
    				trace( "Closure failed" );
    			}
    		}
    		
    		public function testTrace() : void {
    			trace("Called test");
    		}
    		
    		
    	}
    }
    

Outputs: 
    
    
    Called test
    Called test
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed
    Closure failed

## Comments

**[Aidan](#8 "2008-10-09 04:23:03"):** Fantastic. Like you say, it's not completely obvious to me _exactly_ where I'll use this in my large, complex as3 application, but I'm very sure it will be very handy. Unfortunately, it's not just functions that are obstructing garbage collection for me. Reassuring to know that other people are having similar memory hurdles. Cheers!

**[Kirill](#16 "2009-01-09 14:12:43"):** I'm not sure how gc safe this is. A weak dictionary doesn't increase the reference count of an object used as a key in it, but does it also not increase the reference count of any objects stored IN the objects that are in it? You operate under the assumption that it does. But I don't think that may be the case. What I mean is that when you do holder[ target ] = ... target doesn't have its reference count increased allowing it to be gced later. BUT you store a MethodStorage object, which has references to the method and the arguments array. This will cause the reference counts of the method and the array to increase. The method by virtue of its method closure will hold a reference back to the target. Since this doesn't seem to be a circular reference scenario, which I think fp gc catches, this method's reference back to the target will prevent it from being gced since the method's reference count has increased. As well as this, because the arguments array has references back to the objects stored in it those objects will not be gced either. I'm not saying code code doesn't work period, I may in fact be wrong. But from looking at it I'm seeing a flaw in it. I'd be interested in seeing the test code you have for this and trying it out.

**[betabong](#19 "2009-01-11 13:12:57"):** Kirill, I've added a test application to the post. As you can see the garbage collection gets rid of the temporary object, though has to be run once (that's why the method can be called by the TimerEvent although it's ready to be garbaged already). So to be absolutely sure that this works as intended, we'd need to force garbage collection before each call (wasn't there a command for that? hmm..) Its main purpose is though to avoid accidental memory leaks, and for this it has it's uses. There is btw a class flash.events.WeakMethodClosure that's used internally – I'm not sure what it does exactly though (no code available..). You certainly have more knowledge of the garbage collection process, so if you can shed more light on this, it would be cool. I'd also love to hear from the Flash Player team what exactly is going on with those weak references, so we're not so much moving in the dark.

**[Kirill](#41 "2009-05-29 12:43:12"):** Great to see follow-ups on this. This is indeed very frustrating. But... It is possible to do as I've learned. When storing references to methods what has to happen for garbage collection to act right is the objects involved must form a closed circuit. If there's ANY reference to one of the objects in the circuit from outside then none of them will be garbage collected. Note that this is actually desired behavior for only one of the objects in the circuit, which is the user object. So imagine we have the user object and the WeakMethodClosure which stores a reference to its method. What has to happen is the user object must store a reference to the WeakClosureMethod object. When the user object has references to it from outside the circuit then neither it or the WeakMethodClosure get GCed (which is correct), when no outside reference exists then they both get garbage collected (desired behavior). If there isn't a circuit and the user object doesn't have a reference to the WeakMethodClosure then WeakMethodClosure object will get GCed even when the user has references to it and doesn't get GCed. If there's any reference to WeakMethodClosure other than from user object or any other object in the circuit then nothing will get GCed. The problem with creating a utility like WeakMethodClosure is forming that reference from the user to it. WeakMethodClosure can't do this automatically without placing some really heavy restrictions on the user. Like requiring it to be dynamic, or subclass of EventDispatcher (so that it can add a dummy event listener to itself), or an interface which requires the hassle of implementing a way to store WeakMethodClosure in the user. One more or less sensible way to implement this utility is adding a 3rd object to store WeakMethodClosure. So that the user has to explicitly define a variable and assign an instance of this manager to it and then instead of doing new WeakMethodClosure( myMethod ), it would do weakMethods.createClosure( myMethod ). Note that the user, manager, and WeakMethodClosure form a circuit so it's fine. It's an ugly interface but it works and there's considerably less magic in it than in other ways of attempting to do this.

**[Thijs](#33 "2009-04-15 11:27:37"):** The weakreference only works for anonymous objects. When you use typed objects, the object is still kept in memory. I think this is caused by method inside the MethodStorage object. Try this example: 
    
    
    package  
    {
    	import com.betabong.util.WeakMethodClosure;
    	
    	import flash.display.Sprite;
    	import flash.events.TimerEvent;
    	import flash.utils.Timer;	
    
    	public class NotificationCenterExample extends Sprite 
    	{
    		private var closure : WeakMethodClosure;
    		private var timer : Timer;
     
    		public function NotificationCenterExample()
    		{			
    			testWeakClosure();
    		}
     
    		public function testWeakClosure() : void {
    			var tempObject:TestObject = new TestObject();
    			closure = new WeakMethodClosure( tempObject , tempObject.test );
    			callWeakClosure();
     
    			timer = new Timer( 50 );
    			timer.addEventListener(TimerEvent.TIMER , callWeakClosure );
    			timer.start();
    		}
     
    		public function callWeakClosure( event : TimerEvent = null ) : void {
    			if ( !closure.call() ) {
    				trace( "Closure failed" );
    			}
    		}
    	}
    }
    
    class TestObject
    {
    	public function test():void
    	{
    		trace("Called test");
    	}
    }
    

Outputs: 
    
    
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    Called test
    

So I guess your class is useless

**[Thijs](#34 "2009-04-15 11:58:50"):** I also found out a solution: \- Store the object inside the MethodStorage \- use the MethodStorage as key \- use a dummy value (like true, or a timestamp) as value

**[betabong](#35 "2009-04-15 12:17:54"):** To Thijs: Useless is a bit harsh for my poor class ;) It's just useless as soon as you use an instance function. Though you're right: it *usually* is totally useless :) For what you want (and what I probably want too) we just have to make the closure a little bit weaker: 
    
    
    package com.betabong.util
    {
    	import flash.utils.Dictionary;
    	
    	public class WeakerMethodClosure
    	{
    		private var holder : Dictionary;
    		
    		function WeakerMethodClosure( target : Object , method : Function , arguments : Array = null ) : void {
    			var fholder : Dictionary = new Dictionary( true );
    			fholder[ method ] = arguments;
    			holder = new Dictionary( true );
    			holder[ target ] = 	fholder;
    		}
    		
    		public function call() : Boolean {
    			var args : Array;
    			var f : Function;
    			var cache : Dictionary;
    			for ( var obj : * in holder ) {
    				cache = holder[obj] as Dictionary;
    				for ( var fnc : * in cache ) {
    					f = fnc as Function;
    					args = cache[ fnc ] as Array;
    					f.apply( obj , args );
    					return true;
    				}
    			}
    			return false;
    		}
    	}
    }
    

testing with: 
    
    
    package {
    	import com.betabong.util.WeakerMethodClosure;
    	
    	import flash.display.Sprite;
    	import flash.events.TimerEvent;
    	import flash.utils.Timer;
    	
    	import test.TestTrace;
    
    	public class ActionscriptTests extends Sprite
    	{
    		private var holder : WeakerMethodClosure;
    		
    		public function ActionscriptTests()
    		{
    			init();
    		}
    
    		public function init() : void {
    			var o:TestTrace = new TestTrace();
    			holder = new WeakerMethodClosure( o , o.test );
    
    			// let's call it once to make sure it works
    			holder.call();
    
    			var timer : Timer = new Timer( 1000 , 10 );
    			timer.addEventListener(TimerEvent.TIMER , call );
    			timer.start();
    		}
    		
    		public function call( e:* ) : void {
    			trace( "Calling holder" );
    			holder.call();
    		}
    	}
    }
    

and: 
    
    
    package test
    {
    	public class TestTrace
    	{
    		static public var globalindex : uint = 0;
    		private var localindex : uint = 0;
    		private var callcounter : uint = 0;
    		
    		public function TestTrace()
    		{
    			localindex = ++globalindex;
    			trace( toString() + " created" );
    		}
    		
    		public function test() : void {
    			trace( toString() + " called " + (++callcounter) + " times" );
    		}
    		
    		public function toString() : String {
    			return "TestTrace " + localindex;
    		}
    		
    
    	}
    }
    

outputs: 
    
    
    TestTrace 1 created
    TestTrace 1 called 1 times
    Calling holder
    Calling holder
    Calling holder
    Calling holder
    

Is this more useful? Probably. A very little bit. Under normal situations we hopefully don't have to use such weird constructs.

**[Thijs](#36 "2009-04-15 13:02:03"):** My solution is not working either :'-( I am trying to create a better solution for creating weak references to a method. But I guess it's not possible. For some reasons it's not possible to use a method as a key in a Dictionary with weak-keys (they are deleted immediatly, even when the method still exists), so maybe it's a bug.

**[Thijs](#37 "2009-04-19 13:50:21"):** "Note that there is a known bug with Dictionary that prevents it from operating correctly with references to methods. It seems that Dictionary does not resolve the method reference properly, and uses the closure object (ie. the "behind the scenes" object that facilitates method closure by maintaining a reference back to the method and its scope) instead of the function as the key. This causes two problems: the reference is immediately available for collection in a weak Dictionary (because while the method is still referenced, the closure object is not), and it can create duplicate entries if you add the same method twice. This can cause some big problems for things like doLater queues. " http://www.gskinner.com/blog/archives/2006/07/as3_dictionary.html

**[betabong](#38 "2009-04-20 16:32:04"):** @Thijs: Good point. Didn't think about that, but it makes absolutely sense. One more reason why Adobe should allow us to somehow access the MethodClosure. Apart from that I conclude that it's still best practice to just have clean coding instead of using semi-functional hacks like those (mine) above.

**[Kirill](#42 "2009-05-29 13:09:14"):** The first test is actually misleading, because it creates a dynamic object and has the WeakMethodClosure store a method actually defined in the Test as though it was part of this object. This doesn't work in AS3 because the method will always be owned by the test object due to its closure. The reason you saw it "working" is that you didn't store the dynamic object anywhere and the weak dictionary allowed it to be GCed, but the real owner of the method didn't get GCed since it has references to it. The 2nd test is more correct, but it stores a reference to WeakMethodClosure in the main object rather than in TestObject. This creates an outside reference and stops TestObject and WeakMethodClosure from getting Gced. For this to work the 'closure' instance variable has to be moved to TestObject. But there's another reference via the Timer event listener, which isn't weak in the test so that will also prevent garbage collection. That listener has to be weak for it to not count as a reference into the circuit. One other thing is this has to be tested inside the profiler and not in the debugger if you guys are using FlexBuilder. Because the debugger has somekind of a bug that prevents garbage collector from running as opposed to the profiler.

**[Kirill](#43 "2009-05-29 13:11:15"):** BTW I'm testing using FP10 which had a lot of the GC bugs fixed. All I said is moot in FP9, which as far as I'm concerned has no garbage collection.

