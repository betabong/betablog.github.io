---
title: Nested inner functions can be evil
link: http://blog.betabong.com/2008/07/21/nested-inner-functions-can-be-evil/
date: 2008-07-21
---


Sometimes it would be quite comfortable (from a programmer's perspective) to use nested inner functions. But they are a potential source for nasty problems. Let's take the following simple scenario:
    
    <?xml version="1.0" encoding="utf-8"?>
    <mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" creationComplete="create()" click="destroy()">
        <mx:Script>
            <![CDATA[
                private var dispatcher : Sprite;
                
                private function create() : void {
                    dispatcher = new Sprite();
                    // listen to inner function
                    dispatcher.addEventListener( Event.ENTER_FRAME , function( e : Event ) : void { trace( e.type ); } );
                }
                
                private function destroy() : void {
                    // this should free created dispatcher from memory
                    dispatcher = null;
                    // what we would need is:
                    // dispatcher.destroy() or dispatcher.removeEventListener( Event.ENTER_FRAME )
                    // or dispatcher.removeAllEventListeners()
                }
            ]]]]><![CDATA[>
        </mx:Script>
    </mx:Application>

The dispatcher will just live on. The mean thing is that in method «destroy» we don't even have a chance to get rid of the sprite anymore – it just lives on and on (and dispatches its event every time it enters a frame to the listener function.) So 3 objects will just not be freed in memory because of our inner function listener: 1. the dispatcher object, 2. the listener function (the inner function) and 3. the creating object, because the listener function (or its method closure) is bound to the creating method create() scope.

We also can't use the addEventListener's flag to use weak references, because the listener method wouldn't have any other references and would «dye» instantely. So what you should do right now is something like that:

        <?xml version="1.0" encoding="utf-8"?>
        <mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" creationComplete="create()" click="destroy()">
            <mx:Script>
                <![CDATA[
                    private var dispatcher : Sprite;
                    
                    private function create() : void {
                        dispatcher = new Sprite();
                        dispatcher.addEventListener( Event.ENTER_FRAME , handler );
                    }
                    
                    private function destroy() : void {
                        dispatcher.removeEventListener( Event.ENTER_FRAME , handler );
                        dispatcher = null;
                    }
                    
                    private function handler( event : Event ) : void {
                        trace( e.type );
                    }
                ]]]]><![CDATA[>
            </mx:Script>
        </mx:Application>

That's clean code. Good bye dispatcher, good bye sprite! But sometimes it can be quite difficult to maintain this. I personally would wish that actionscript objects, especially the EventDispatcher class, would provide a destroy() method. Calling it gets rid of all event listeners and also would unlisten to everything it has listened to. And for DisplayObjects it would also perform other operations like removing itself from its parent and destroying all children.

I'd also like to see the following method like this in EventDispatcher:

        EventDispatcher.removeListener( type : String = null , listener : Function = null , useCapture : Boolean = false );

        // so this would remove all listeners
        EventDispatcher.removeListener();

        // and this all listeners to enter frame
        EventDispatcher.removeListener( Event.ENTER_FRAME );

I get around many issues by implementing something like a IEventListener interface:

        interface IEventListener {
        function listenTo( dispatcher : IEventDispatcher , type : String , listener : Function , useCapture : Boolean = false ) : void;
        functon unlistenTo( dispatcher : IEventDispatcher , type : String , listener : Function , useCapture : Boolean = false ) : void;
        function destroy() : void; // will remove myself as event listener from all registered dispatchers
        }

Way to go :-)
    
## Comments

**[Jeff](#7 "2008-10-07 05:03:55"):** Good post with good coding advice for the topic. Thank you.

