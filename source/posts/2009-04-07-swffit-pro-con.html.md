---
title: swffit - pro & contra
link: http://blog.betabong.com/2009/04/07/swffit-pro-con/
description: 
post_id: 232
date: 2009-04-07
created: 2009/04/07 13:04:52
created_gmt: 2009/04/07 12:04:52
post_name: swffit-pro-con
post_type: post
---


![](http://swffit.millermedeiros.com/img/swffit_logo.gif)[swffit](http://swffit.millermedeiros.com/) is a great little library that smartly resizes your flash movie depending on its content. It gives you **native scrollbars for free** whenever your content is longer than the browser window. Another strategy is to always have the flash movie fill 100% the browser window and let Flash do the scrolling. There are a lot of **PRO** for the [swffit](http://swffit.millermedeiros.com/) way: 

  * It gives users the **system scrollbar**. Users are used to that, they know what it means, they know how to deal with it.
  * **Mouse wheels just work! **It's scrolling a standard browser window, no magic at all: great! (You have to use [this](http://blog.pixelbreaker.com/flash/as30-mousewheel-on-mac-os-x/) otherwise)
  * It's **easy** to implement.
Still there is a **CONTRA** side: 

  * You'll **need javascript** (well, that's no biggy at all – as a matter of fact, you're just pretty in the desert without javascript in todays websites)
  * You have no control over **scrollbar design** (neither a biggy – as another matter of fact I consider that a good thing anyway, but don't tell the brand agency ;-)
  * It has **performance disadvantages**. Well that I consider a biggy! Because the movie will always be in its full height, it will do rerender for the entire area!! Imagine long page with animations here and there: Given Flash's «not so fast» rendering engine, this can become a huge performance killer. Let me give you a quick'n'dirty example: [Full Height](post_type: post
---

/uploads/flash/SWF_Size_Performance/performance-killer-percent.html) compared to [«Cropped» to Window Height](post_type: post
---

/uploads/flash/SWF_Size_Performance/performance-killer-wsize.html) (just resize browser window to real small size to see the big difference).
**Conclusion:** I'm just glad I found one good reason to not declare my internal scrollbar like in [www.betabong.com](http://www.betabong.com) as complete bullshit ;-)

## Comments

**[simurai](#29 "2009-04-08 22:03:16"):** Nice post betaboy. I never really thought about your last contra point. Haaa.. ps. I think the "100% Height" link points also to the "Full Height" page..? But I kinda can picture how it would look. ;-)

**[betabong](#30 "2009-04-08 23:43:49"):** hey simi, thx for pointing that out - corrected. I was thinking of another «contra» today while layouting for a little website which needed some "fixed position" stuff. But as I said, apart from that, I really like it.

**[drus](#49 "2009-07-11 23:05:00"):** I think if the developer *knows* the max possible heigth of the content always is better to use the native browser scroll. Its silly to change the way the user scroll a page, its just another page, and the worst is that the flash scrollbar loose the focus and doesnt response when you leave the stage, and that is very easy while you are scrolling. Interesting blog!! PD:yeah, poor english :(

**[Mesknot](#53 "2009-08-18 11:17:20"):** i've found one "contra" and it pissed me off, i did a fullbrowser flash website with a custom vertical scroller and i used swffit to put the horizontal scroller at a fixed width... and voila! my custom vertical scroller stops at the fixed width too and it doesnt shows if the browser window is lower than the fixed width for the horizontal scroller.... DAMN! so i will not use swffit... ill try to learn how to do that in flash, how to show a bottom scrollbar at a determinated width...

