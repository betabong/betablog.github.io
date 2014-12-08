---
title: "Metatunnel 1k Demo: AS vs. JS"
link: http://blog.betabong.com/2009/04/13/metatunnel-1k-demo-as-vs-js/
date: 2009-04-13
---


I did a quick port of a «graphic demo» called [«metatunnel» (created by FRequency).](http://www.pouet.net/prod.php?which=52777) [Paulo Falcão ported this to Javascript](http://demoscene.appjet.net/) using canvas. To make the set complete I ported Paulos JS version to Actionscript, just quick'n'dirty. Click on it to start the animation: [swfobj src="---

/uploads/flash/MetaTunnel.swf" width="128" height="128"]  Here's the code: 
    
    
    package test
    {
    	import flash.display.Bitmap;
    	import flash.display.BitmapData;
    	import flash.display.Sprite;
    	import flash.events.Event;
    	import flash.events.MouseEvent;
    
    	public class JSCanvasPort extends Sprite
    	{
    		public function JSCanvasPort()
    		{
    			super();
    			addChild( canvas = new Bitmap() );
    			canvas.smoothing = false;
    			canvas.scaleX = canvas.scaleY = 2;
    			draw();
    
    			addEventListener( MouseEvent.CLICK , handleClick );
    		}
    
    		private var playing:Boolean = false;
    
    		public function handleClick( e:Event = null ) : void {
    			if ( playing )
    				removeEventListener( Event.ENTER_FRAME , enterframe );
    			else
    				addEventListener( Event.ENTER_FRAME , enterframe );
    			playing = !playing;
    		}
    		public function enterframe( e:Event=null ) : void {
    			draw();
    		}
    
    		public var time:Number=0;
    		public var maxr:Number=64.0;
    		public var canvas:Bitmap;
    
    		public function distance(ax:Number,ay:Number,az:Number,bx:Number,by:Number,bz:Number):Number{
    			var dx:Number=bx-ax , dy:Number=by-ay , dz:Number=bz-az;
    		    return Math.sqrt( dx*dx + dy*dy + dz*dz );
    		}
    		public function obj(x:Number,y:Number,z:Number,t:Number):Number{
    		        var f:Number=1.0;
    		        f*=distance(x,y,z,Math.cos(t)+Math.sin(t*0.2),0.3,2.0+Math.cos(t*0.5)*0.5);
    		        f*=distance(x,y,z,-Math.cos(t*0.7),0.3,2.0+Math.sin(t*0.5));
    		        f*=distance(x,y,z,-Math.sin(t*0.2)*0.5,Math.sin(t),2.0);
    		        f*=Math.cos(y)*Math.cos(x)-0.1-Math.cos(z*7.0+t*7.0)*Math.cos(x*3.0)*Math.cos(y*4.0)*0.1;
    		        return f;
    		}
    
    		public function eval(x:Number,y:Number,t:Number):uint{
    		   var vx:Number=x*2.0-1.0; var vy:Number=-y*2.0+1.0;
    		   var s:Number=0.4;
    		   var ox:Number=vx;var oy:Number=vy*1.25;var oz:Number=0.0;
    		   var dx:Number=(vx+Math.cos(t)*0.3)/64.0;var dy:Number=vy/64.0;var dz:Number=1.0/64.0;
    		   var tt:Number=0.0;
    		   var g:Number=1.0;
    		   while((g>s)&&(tt<375)){
    		         g=obj(ox+dx*tt,oy+dy*tt,oz+dz*tt,t);
    		         tt+=g*4;
    		   };
    		   var color:Number=0.0;
    		   var dxtt:Number=ox+dx*tt;var dytt:Number=oy+dy*tt;var dztt:Number=oz+dz*tt;
    		   var objd:Number=obj(dxtt,dytt,dztt,t);
    		   var nx:Number=objd-obj(dxtt+0.01,dytt,dztt,t);
    		   var ny:Number=objd-obj(dxtt,dytt+0.01,dztt,t);
    		   var nz:Number=objd-obj(dxtt,dytt,dztt+0.01,t);
    		   var d:Number=Math.sqrt(nx*nx+ny*ny+nz*nz);ny=ny/d;nz=nz/d;
    		   color+=Math.max(-0.5*nz,0.0)+Math.max(-0.5*ny+0.5*nz,0.0)*0.5;
    		   var r:Number=(color+0.1*tt*0.025);
    		   var g:Number=(color+0.2*tt*0.025);
    		   var b:Number=(color+0.5*tt*0.025);
    		   return getRGB(r,g,b);
    		}
    
    		public function getRGB(r:Number,g:Number,b:Number):uint{
    		        if (r<0) r=0; else if (r>1) r=1;
    		        if (g<0) g=0; else if (g>1) g=1;
    		        if (b<0) b=0; else if (b>1) b=1;
    			return ((r*255)&255) << 16 | ((g*255)&255) << 8 | ((b*255)&255);
    		}
    
    		public function draw():void{
    			if ( canvas.bitmapData == null ) {
    				canvas.bitmapData = new BitmapData( maxr , maxr , false , 0xffffff );
    			}
    			var t:BitmapData = canvas.bitmapData;
    			time+=0.1;
    			t.lock();
    		        for(var x:Number=0;x<maxr;x++){
    		                var px:Number=x/maxr;
    		                for(var y:Number=0;y<maxr;y++){
    		                        var py:Number=y/maxr;
    		                        t.setPixel( x , y , eval(px,py,time) );
    		                }
    		        }
    		   t.unlock();
    		};
    
    	}
    }

**Update:** A quickly optimized version (nothing advanced really). [swfobj src="---

/uploads/flash/MetaTunnel-optim-1.swf" width="128" height="128"] (You can switch quality in this version with key up or down).
