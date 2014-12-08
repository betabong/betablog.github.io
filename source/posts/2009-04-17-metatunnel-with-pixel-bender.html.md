---
title: MetaTunnel with Pixel Bender
link: http://blog.betabong.com/2009/04/17/metatunnel-with-pixel-bender/
description: 
post_id: 252
date: 2009-04-17
created: 2009/04/17 22:37:31
created_gmt: 2009/04/17 21:37:31
post_name: metatunnel-with-pixel-bender
post_type: post
---


This is a follow-up of [this](/2009/04/13/metatunnel-1k-demo-as-vs-js/). ![metatunnel-pixelbender](post_type: post
---

/uploads/2009/04/metatunnel-pixelbender.jpg) Yeah well, I was more than optimistic to show [those JS guys](http://demoscene.appjet.net/) how fast Flash can be with the help of some brand new Adobe magic – but Pixel Bender was, unfortunately, quite disappointing: 

  1. I spent hours to successfully migrate the code to Pixel Bender Toolkit (wasn't that difficult actually, but a wrong character there and your math is all screwed up). So here the first letdown: Pixel Bender Toolkit is **not a very nice coding environment**. It's a rough baby. But I'd do everything for speed :-)..
  2. Once I had it running (the above picture is captured from Pixel Bender) I tried to export it for Flash Player. But hoohoo! **no support for loops** in Flash Player! Yeah, well, ..(and also **no custom functions** by the way)
  3. But I didn't give up. I just calculated how many max loops where needed (about 100) and replicated the while loop with many if-conditions (I love to do computer's dummy job ;). Then finally: Export to Flash Player! But in Flash Player having the shader as Filter for a BitmapData just **really fucked up the rendering**. I even went down to 1fps, but still no luck. What a bummer! (sometimes I saw a few pixels blue, but very unusable: I've written [to the Pixel Bender Forum ](http://forums.adobe.com/thread/419485)\- invited by [@Pixelbender](http://twitter.com/pixelbender) – but that led to nothing so far).
  4. Today, finally, I got it working by taking a more rough approach (not BitmapFilter, but ShaderJob). **But hell is it slow!!!** And it eats all my 8 cpu cores!! So I wondered how that could be: Fast as hell in Pixel Bender Toolkit (uses may be 2% of my cpu at full fps!), but slow as hell in Flash Player?! The answer is obvious: **Adobe decided not to talk to the GCU (Graphics Card)** for the calculations, probably to keep the Flash Player be as platform independent as possible - and as small as possible. But then I wonder.. WTF do you give us this toy if we can't use it?!! It's like Apple would say: «Great news: we have Core Graphics on the iPhone - without hardware acceleration..» Adobe, to me, this doesn't make too much sense. (But I'm so very much pleased about the new Text Engine – *that* was a good job)
Here the result: (Click to start, it'll eat your cpu!) [swfobj src="post_type: post
---

/uploads/flash/MetaTunnelBender.swf" height="128"] And for the geeks, here we go with the source codes: 
    
    
    
    
    kernel MetaTunnel
    <   namespace : "com.betabong";
        vendor : "Betabong";
        version : 1;
        description : "MetaTunnel Port";
    >
    
    {
        parameter int size
        <
            minValue: 16;
            maxValue: 512;
            defaultValue: 128;
        >;
    
    
        parameter float time
        <
            minValue: float( 0.0 );
            maxValue: float( 15.0 );
            defaultValue: float( 0.0 );
        >;
    
     
    
    
        input image4 src;
        output pixel3 dst;
    
        void
        evaluatePixel()
        {
            float cos1 = cos( time );
            float cos0_5 = cos(time * 0.5);
            float cos0_7 = cos(time * 0.7);
            float sin1 = sin( time );
            float sin0_2 = sin(time * 0.2);
            float sin_0_5 = sin(time * 0.5);
            
            float dim = float( size );
            float2 point = outCoord() / dim;
            if ( point.x > 1.0 || point.y > 1.0 ) {
                dst.rgb = float3( 1.0 , 1.0 , 1.0 );
            } else {
            
            float2 vp = float2( point.x * 2.0 - 1.0 , -point.y * 2.0 + 1.0 );
            float s = float( 0.4 );
            float3 op = float3( vp.x , vp.y * 1.25 , 0.0 );
            float3 dp = float3( (vp.x + cos1 * 0.3) / 64.0 , vp.y/64.0 , 1.0/64.0 );
            float f = float( 1.0 );
    
            float tt = float( 0.0 );
            float g = float( 1.0 );
            float3 p = float3(1.0,1.0,1.0);
            while ( (g > s) && (tt<375.0) ) {
                p = op + ( dp * tt );
                f = 1.0;
                f *= abs( distance( float3( cos1+sin0_2 , 0.3 , 2.0+cos0_5*0.5 ) , p ) );
                f *= abs( distance( float3( -cos0_7 , 0.3 , 2.0+sin_0_5 ) , p ) );
                f *= abs( distance( float3( -sin0_2*0.5 , sin1 , 2.0 ) , p ) );
                f *= cos(p.y)*cos(p.x) - 0.1 - cos( p.z*7.0 + time*7.0 ) *cos(p.x*3.0)*cos(p.y*4.0)*0.1;
                g = f;
                tt += g * 4.0;
            }
            float color = 0.0;
            float3 dtt = op + ( dp * tt);
            
            p = float3( dtt.x , dtt.y , dtt.z );
            f = 1.0;
            f *= distance( float3( cos1+sin0_2 , 0.3 , 2.0+cos0_5*0.5 ) , p );
            f *= distance( float3( -cos0_7 , 0.3 , 2.0+sin_0_5 ) , p );
                f *= distance( float3( -sin0_2*0.5 , sin1 , 2.0 ) , p );
            f *= cos(p.y)*cos(p.x)-0.1-cos(p.z*7.0+time*7.0)*cos(p.x*3.0)*cos(p.y*4.0)*0.1;
            float objd = f;
            
            float3 np = float3( 0.0,0.0,0.0 );
            
            p = float3( dtt.x + 0.01 , dtt.y , dtt.z );
            f = 1.0;
            f *= distance( float3( cos1+sin0_2 , 0.3 , 2.0+cos0_5*0.5 ) , p );
            f *= distance( float3( -cos0_7 , 0.3 , 2.0+sin_0_5 ) , p );
                f *= distance( float3( -sin0_2*0.5 , sin1 , 2.0 ) , p );
            f *= cos(p.y)*cos(p.x)-0.1-cos(p.z*7.0+time*7.0)*cos(p.x*3.0)*cos(p.y*4.0)*0.1;
            np.x = objd - f;
            
            p = float3( dtt.x , dtt.y + 0.01 , dtt.z );
            f = 1.0;
            f *= distance( float3( cos1+sin0_2 , 0.3 , 2.0+cos0_5*0.5 ) , p );
            f *= distance( float3( -cos0_7 , 0.3 , 2.0+sin_0_5 ) , p );
                f *= distance( float3( -sin0_2*0.5 , sin1 , 2.0 ) , p );
            f *= cos(p.y)*cos(p.x)-0.1-cos(p.z*7.0+time*7.0)*cos(p.x*3.0)*cos(p.y*4.0)*0.1;
            np.y = objd - f;
            
            p = float3( dtt.x , dtt.y , dtt.z + 0.01 );
            f = 1.0;
            f *= distance( float3( cos1+sin0_2 , 0.3 , 2.0+cos0_5*0.5 ) , p );
            f *= distance( float3( -cos0_7 , 0.3 , 2.0+sin_0_5 ) , p );
                f *= distance( float3( -sin0_2*0.5 , sin1 , 2.0 ) , p );
            f *= cos(p.y)*cos(p.x)-0.1-cos(p.z*7.0+time*7.0)*cos(p.x*3.0)*cos(p.y*4.0)*0.1;
            np.z = objd - f;
            
            float d = length( np );
            np.y /= d;
            np.z /= d;
            
            color = max( -0.5 * np.z , 0.0 ) + max( -0.5 *np.y + 0.5 * np.z , 0.0 ) * 0.5;
            float3 rgb = float3(color  + 0.1 * tt * 0.025 , color  + 0.2 * tt * 0.025  , color + 0.5 * tt * 0.025   );
            rgb.x = max( 0.0 , min( 1.0 , rgb.x ) );
            rgb.y = max( 0.0 , min( 1.0 , rgb.y ) );
            rgb.z = max( 0.0 , min( 1.0 , rgb.z ) );
            
            dst.rgb = rgb;
            
           
          }
    
        }
        
    }

And here the Actionscript part: 
    
    
    package
     {
        import flash.display.*;
        import flash.events.*;
        import flash.filters.*;
        import flash.net.*;
        import flash.utils.ByteArray;
        
        import net.hires.debug.Stats;
        // SWF Metadata 
        [SWF(width = "520", height = "128", backgroundColor = "#000000", framerate = "1")]
        public class MetaTunnelBender extends Sprite {
    
            [Embed("test/MetaTunnel-stupid.pbj", mimeType = "application/octet-stream")]
            private var TestFilter: Class;
            private var playing : Boolean;
    
            private var im: Bitmap;
            private var job:ShaderJob;
            private var shader: Shader;
            private var shaderfilter:ByteArray;
            private var time:Number = 0.0;
            private const SIZE:Number = 64;
            private const WHITE:BitmapData = new BitmapData( SIZE , SIZE , false , 0xffffff );
            
            public function MetaTunnelBender() : void {
            	stage.frameRate = 20;
                im = new Bitmap( WHITE.clone() );
                im.scaleX = im.scaleY = 2;
                addChild(im);
                
                // stat info
                var s:DisplayObject = new Stats();
                addChild( s );
                s.x = 128;

## Comments

**[Jackson Dunstan](#71 "2009-10-01 02:25:31"):** I get about 8 FPS on a 3.0 Ghz Intel Core 2 Duo on Windows XP. Your AS3 version is a ton faster, although there is no framerate counter so I can't quantify that.

**[Og2t](#139 "2010-09-21 09:57:10"):** Nice try though! The unrolled IFs might be a problem. Try http://www.simppa.fi/source/LoopMacros.pbk

**[betabong](#140 "2010-09-21 16:39:41"):** Like that macro. If I ever find time to play around with Pixel Bender, I'll give it a try. Cheers!

**[Christian](#744 "2012-03-04 21:33:10"):** I'm having no noticable CPU usage and I'm getting 13fps.

