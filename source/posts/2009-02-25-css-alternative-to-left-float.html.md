---
title: CSS Alternative to Left Float
link: http://blog.betabong.com/2009/02/25/css-alternative-to-left-float/
date: 2009-02-25
---


I used to use float:left a lot for my layouts. But it can be a pain in the ass for several reasons – which of them the main may be that the surrounding box doesn't surround it (so you'd have to come up with some stupid clearfloat-hacks). Anyway, I recently discovered somewhere a great alternative (you can call it hack too, but then everything a little fancy that's supposed to work with IE is a hack, isn't it?). So while until now I'd have something like this: 
    
    
    .inlinebox {
    	float:  left;
    	width: 49%;
    	min-height: 100px;
    }
    

the new method goes like this: 
    
    
    .inlinebox {
    	display: -moz-inline-stack;
    	display: inline-block;
    	vertical-align: top;
    	zoom: 1;
    	*display: inline;
    	width: 49%;
    	min-height: 100px;
    	_height: 100px;
    }
    

That's looks quite more complex. And it certainly is. But it works like a charm on all browsers I've tested (IE7, Safari, FF3). _height, zoom and *display are some crappy IE hacks obviously. The zoom attribute by the way is quite interesting, as it activates the hidden (IE only) CSS attribute hasLayout. It also has some very nice benefits, like the alignement to the bottom... 

### Example

[View Example](/uploads/2009/02/example-inlineblock.html)
    
    <style type="text/css" media="screen">
        .codeexample span {
            background-color: #68B6FF;
            -webkit-box-reflect: below 1px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.8, transparent), to(rgba(255, 255, 255, 0.8)));
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            margin-right: 10px;
            margin-bottom: 40px;
            width: 140px;
            padding: 10px;
        }
        .inlinebox1 {
            display: block;
            float:  left;
            min-height: 32px;
        }
        
        .inlinebox2 {
            display: -moz-inline-stack;
            display: inline-block;
            vertical-align: bottom;
            zoom: 1;
            *display: inline;
            min-height: 32px;
            _height: 32px;
        }
        
    </style>
    
    <div class="codeexample">
        <h3>Float: left</h3>
        <span class="inlinebox1">Inlinebox</span>
        <span class="inlinebox1">Inlinebox</span>
        <span class="inlinebox1">Inlinebox Inlinebox Inlinebox Inlinebox Inlinebox Inlinebox</span>
        <span class="inlinebox1">Inlinebox</span>
        <span class="inlinebox1">Inlinebox</span>
        <span class="inlinebox1">Inlinebox</span>
        <span class="inlinebox1">Inlinebox</span>
        
        <h3 style="clear: both;">Inline Block</h3>
        <span class="inlinebox2">Inlinebox</span>
        <span class="inlinebox2">Inlinebox</span>
        <span class="inlinebox2">Inlinebox Inlinebox Inlinebox Inlinebox Inlinebox Inlinebox</span>
        <span class="inlinebox2">Inlinebox</span>
        <span class="inlinebox2">Inlinebox</span>
        <span class="inlinebox2">Inlinebox</span>
        <span class="inlinebox2">Inlinebox</span>
    </div>

## Comments

**[jens](#22 "2009-02-26 11:06:57"):** great! works also in opera and chrome and inlinebox2 even works down to IE4 (inlinebox1 doesn't work in IE4...).

**[Umesh A](#27 "2009-04-03 08:48:18"):** Thanks This is help full for me.

**[Tom West](#32 "2009-04-10 22:32:35"):** Worked like a charm! Thanks!

**[Levi Page](#74 "2009-10-07 17:49:08"):** You're a genius! Man this saved me.

**[A](#76 "2010-01-12 03:57:20"):** Awesome little hack, really is awesome.

**[Anurag Bhandari](#124 "2010-07-19 10:28:21"):** Worked perfectly!

**[Mario Arroyo](#590 "2012-01-10 15:13:21"):** You just saved my work! Thanks for that!

**[Christian](#538 "2011-12-14 10:34:49"):** Thanks a lot for this very useful tip!

**[Boerma](#755 "2012-03-08 20:02:47"):** I love u man! Thanks a lot!

**[Sunil Yadav](#3191 "2014-05-13 06:19:15"):** Wow its working fine. I was having problem with "float:left". This solution work perfectly.

