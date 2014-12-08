---
title: "Bug Hunting: Shadowed 3D and ScrollRect"
link: http://blog.betabong.com/2009/04/01/bug-hunting-shadowed-3d-and-scrollrect/
date: 2009-04-01
---


I don't discover as many bugs nowadays as I've used to in the old days when I was beta testing for Macromedia. But it happened today, and I've just installed the newest Flash Player 10.0.22.87 to be sure. It happens to DisplayObjects A inside DisplayObjectContainers B inside DisplayObjectContainer C, when 

  * A was not initially visible (not inside initial scroll rect of C)
  * A is in 3D mode (I just change rotationY for that)
  * B is in «cached as Bitmap» (cacheAsBitmap would do, I go with DropShadowFilter in the example)
  * C's scrollrect property is set, so A is shows up (well, it doesn't – that's the bug after all ;)
Here the example: 

[bug-3d-shadow.swf](---

/uploads/2009/04/bug-3d-shadow.swf) And here the code: 
    
    
    /* Flash Bug - Flash Player 10.0.22.87
    	disappearance when 3d's parent has shadow
    	more info: betabong@gmail.com
    */
    
    this.stage.scaleMode = StageScaleMode.NO_SCALE;
    this.stage.align = StageAlign.TOP_LEFT;
    
    
    var scroller:Sprite = new Sprite();
    addChild( scroller );
    scroller = this;
    
    var filter:DropShadowFilter = new DropShadowFilter( 2 , 90 , 0 , 0.5 , 8 , 8 , 1 , 2 );
    var r:Sprite,rect:Sprite;
    
    for ( var mode:int = 0 ; mode<=1 ; mode++ ) {
    	for ( var i:int=0 ; i<3000 ; i+=100 ) {
    		r = new Sprite();
    		r.addChild( rect = new Sprite() );
    		rect.graphics.beginFill( 0xff0000 );
    		rect.graphics.drawRect( -40 , -40 , 80 , 80 );
    		rect.graphics.endFill();
    		rect.addEventListener( MouseEvent.MOUSE_MOVE , rotate );
    		if ( !mode ) r.cacheAsBitmap = true; //r.filters = [ filter ];
    		r.y = i + 100;
    		r.x = mode * 150 + 100;
    		addChild( r );
    	}
    }
    
    stage.addEventListener( Event.ENTER_FRAME , move );
    
    var scroll:Number = 0;
    function move( event:Event ) : void {
    	scroll += ( stage.mouseY - 100 ) / 50;
    	scroller.scrollRect = new Rectangle( 0 , scroll , 500 , 200 );
    }
    
    
    function rotate(e:*) {
    	e.target.rotationY++;
    }

**Update:** Now that: it took me about 20 min to file a bug in the Adobe Bug System (which is slow as hell anyway). And when I want to submit it, I get a message saying they'd be in maintenance. Well, buggy bug systems piss me off quite a bit.
