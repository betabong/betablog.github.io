---
title: Flash Player 10 – I love speed
link: http://blog.betabong.com/2008/08/22/flash-player-10-i-love-speed/
date: 2008-08-22
---


![](/uploads/2008/08/astro.jpg)So Flash Player 10 is on its way. Soon, very soon, we'll be able to enjoy 3D effects on every other website, youhaa. While some are eagerly waiting for this or the enhanced drawing API, I'm very much looking forward to the speed enhancements. Visual Speed While Flash Player 9 or more precisely the underlying actionscript 3 interpreter have lead to great speed enhancements on the logic side (meaning much faster data manipulation), it's still rather slow when it comes to rendering. In a project I'm currently working on there's quite some stuff going on here, but when I check speed performance with the Flex Profiler, most time is spent for rendering. Significant time. And it's not some freaky Papervision 3D stuff ;) So with Flash Player 10 this will be better. Adobe finally improves rendering speed, and the good thing is that every exisiting project (at least >= f9, all?) will profit without republishing. I had done some little tests with a beta, and though I don't remember the results, they looked quite promising (even on a Mac). I'm not sure though when they're gonna use the graphic card to speed up – I don't think it made use of that in my tests. Most people mention the hardware acceleration (some rendering tasks can be offloaded to your graphics card), but in my understanding the overhauled the entire rendering system, so everything and everyone should profit. Vectors Vectors are simply typed Arrays. A limited array. Ha! why would we want that?! For two reasons: 

  * Developers have more feedback while coding: the IDE will be able to tell you when you put some wrong stuff in an array – as for now you could mix whatever data in an array, the compiler wouldn't complain. But above all, the IDE will be able to provide you help while typing: no more casting all the time to get to the methods of an array item!
  * Speed. A typed array can be much faster. And it will be.
It looks like this: 
    
    
    var vector:Vector.<int> = new Vector.<int>();

I'm not too much a fan of the definition syntax – something like this would look better, I think: 
    
    
    var vector:Vector::int = new Vector::int();
    // or
    var vector:int[] = new int[]();

But I haven't thought of it much. Adobe certainly thought about it. Or some ECMA comittee. (Copy-pasting in Wordpress HTML mode also won't work anymore.. pfff) Also I personally would have preferred not to have another class for that (just enhance the good old Array), but there are reasons for that too (backward compatibility, I guess, I can sing a song about that too). So anyway, I'm eagerly looking forward to use that stuff. I just love speed. More infos here: [Using Vectors in ActionScript 3 and Flash Player 10](http://www.mikechambers.com/blog/2008/08/19/using-vectors-in-actionscript-3-and-flash-player-10/) Update: Ok, I can't make to appear the new Vector syntax in Wordpress. Now I like the syntax even less ;-)
