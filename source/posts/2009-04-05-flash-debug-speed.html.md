---
title: Flash Debug Speed
link: http://blog.betabong.com/2009/04/05/flash-debug-speed/
date: 2009-04-05
---


I did some speed tests today, comparing two string parsing methods. And I've made some very interesting discoveries: The execution speed between SWF compiled for debugging and those compiled without differs. Ha! Okay, that's not that much of news (even for me). But what astonishes me is how much this speed gap can be, especially when it comes to massive data calculations. I somehow always had a somewhat 20 percent speed decrease in mind (I was just presuming, me dumb). But for a 3d particle test we're talking factor 8!! Now this made me curious... so I've tested with Debug and Release Player both debug and release SWFs: **Debug Player running Debug SWF** **![Flash Debug in Debug](/uploads/2009/04/picture-11.png)** **Debug Player running Release SWF** **![Release in Debug](http://blog.betabong.com/uploads/2009/04/picture-9.png)** **Release Player running Debug SWF** **![Debug in Release](http://blog.betabong.com/uploads/2009/04/picture-12.png)** **Release Player running Release SWF** **![Release in Release](http://blog.betabong.com/uploads/2009/04/picture-13.png)** **A few conclusions:**

  * **Never release a SWF file with debug code** (or otherwise said: put only stuff online from bin-release, never bin-debug). Though common users won't notice the speed decrease, your friendly flash developers may, at least if you're app is somewhat cpu intensive. And of course: debug SWF are much bigger in size (just in case you give a fuck about flash devs ;-)
  * **Speed tests should be played in the release player.** Why? After all, I wouldn't care if the relation would stay the same. Usually you just need to know how much faster one thing is compared to the other one, so that would do it. But unfortunately the ratio won't always be the same. In the above example the ration is 3.66 for debug and 2.92 for release. And it can differ muuuuch more.
The last one bugs me quite a bit. It's just a pain in the ass to export a release build each time you wanna compare performance. And it also means you can't do quick'n'dirty trace outputs for the time result (not a biggy if you're testing within a Flex project though). So here we go with **two wishes for Adobe**: 

  * Let us quickly test release builds within Flex Builder (a simple command would do it – I thought it might be «Run Testapp» (instead of «Debug Testapp»), but that just doesn't bring up the Debugger (and same speed)
  * An option to turn off debugging mode in Debug Player!!! That would solve almost all problems, and we could also use our Plugin for normal browsing without performance penalties (is this why Youtube eats so much cpu here?

## Comments

**[Sebb](#614 "2012-01-22 18:41:27"):** Thanks for saving me some time, i was curious about this as my computer seemed to go nuts whenever i ran a project in my debugger but keep it's cool when i played in a non debug player, the difference really is quite staggering.

