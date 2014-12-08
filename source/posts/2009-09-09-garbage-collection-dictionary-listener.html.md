---
title: Garbage Collection, Dictionaries and Listeners
link: http://blog.betabong.com/2009/09/09/garbage-collection-dictionary-listener/
date: 2009-09-09
---


![031609_garbage_can](/uploads/2009/09/031609_garbage_can-211x300.jpg)As we all know Flash's garbage collector is a hell of a beast. It tries to free memory from "unused" objects (aka objects not somehow cross-referenced by the root). **So from time to time our garbage collector checks for those objects and kicks them out of memory.. at least some of them.** There are lots of articles written about the garbage collector and I'm not going into it any deeper. Let's just summarize that no developer likes that kind of behaviour -- it's totally **unpredictable**. System.gc() would help a little, but it's only available to debug players. You may say: what do you care about memory handling! And I'd answer: not that much actually! :-) But what I really care about is false behaviour that can result. Within Flash we have two ways to keep weak references to objects: Dictionary and weak listeners (weak method closures). We use weak references so that objects will be collected by the garbage collector. Now when it comes to Dictionaries, they behave as I'd expect. A "dead" object won't be listed in a for each loop. But events events events.... **they'll be dispatched to each and every "dead" object residing in memory!! Which is such a pain in the ass really!** After a lot of testing I can give only the advice you've probably heard many times before: **Always remove listeners! Even the weak ones!** Otherwise you have to potentially deal with unexpected behaviour. I may gonna create some utility class for that that deals with this problem.  Here my testing code: 
    
    
    package
    {
    	import flash.display.Sprite;
    	import flash.events.Event;
    	import flash.events.MouseEvent;
    	import flash.events.TimerEvent;
    	import flash.system.System;
    	import flash.text.TextField;
    	import flash.text.TextFieldAutoSize;
    	import flash.text.TextFormat;
    	import flash.utils.Dictionary;
    	import flash.utils.Timer;
    	
    	import net.hires.debug.Stats;
    
    	public class MemoryLeakTest extends Sprite
    	{
    		public static var counter : uint;
    		public static var dict:Dictionary = new Dictionary( true );
    		
    		private var t:TextField;
    		private var makeGC:Boolean;
    		private var switcher:uint;
    		
    		public function MemoryLeakTest()
    		{
    			super();
    			
    			t = new TextField();
    			t.defaultTextFormat = new TextFormat( null, 18 , 0x999999 , true );
    			t.autoSize = TextFieldAutoSize.LEFT;
    			addChild(t);
    			
    			var timer : Timer = new Timer( 100 );
    			timer.addEventListener(TimerEvent.TIMER,handleTimer);
    			timer.start();
    			
    			stage.addEventListener(MouseEvent.CLICK,handleClick);
    
    
    			stage.addChild( new Stats() );
    		}
    		
    		public function handleTimer( event : TimerEvent ) : void {
    			counter = 0;
    			if ( makeGC ) System.gc();
    			dispatchEvent( new Event( Event.CHANGE ) );
    
    			var i:uint;
    			for each ( var obj:* in dict ) {
    				i++;
    			}
    
    			t.text = ( "Still " + counter + " dead objects living... (GC " + (makeGC?'on':'off') + ')' );
    			t.appendText( '\nIn dictionary: ' + i );
    			t.appendText( '\nClick to switch manual Garbage Collection aka System.gc()' );
    			
    			if ( switcher++ % 2 ) {
    				new TestSprite( this );
    				t.appendText( '\nAdded new test object (should live for 10 msec)' );
    			}
    		}
    		public function handleClick( event : Event ) : void {
    			makeGC = !makeGC;
    		}
    	}	
    }
    import flash.display.Sprite;
    import flash.display.InteractiveObject;
    import flash.utils.Timer;
    import flash.events.TimerEvent;
    import flash.events.Event;
    import flash.system.System;
    
    
    
    class TestSprite extends Sprite {
    	
    	// the TestSprite instance should not live longer than 10 msec
    	
    	
    	public function TestSprite( parent : Sprite ) : void {
    		// add to weak dictionary
    		//MemoryLeakTest.dict[ this ] = true;
    		
    		// temporarily add to parent
    		parent.addChild( this );
    		var timer : Timer = new Timer( 10 );
    		timer.addEventListener(TimerEvent.TIMER,handleTimer);
    		timer.start();
    		
    		// listen (weak!!) to parent event - this is just for control purposes
    		parent.addEventListener( Event.CHANGE , handleChange , false , 0 , true );
    		
    		// let's have those sprites eat some memory while alive
    		this.cacheAsBitmap = true;
    		graphics.beginFill(0xff0000,0.1);
    		graphics.drawRect(0,0,500,500);
    		graphics.endFill();
    	}
    	public function handleTimer( event : TimerEvent ) : void {
    		( event.target as Timer ).removeEventListener(TimerEvent.TIMER,handleTimer);
    		parent.removeChild(this);
    	}
    	public function handleChange( event : Event ) : void {
    		MemoryLeakTest.counter++;
    	}
    }
