---
title: Switch Flash Browser Plugin on Mac OS X
link: http://blog.betabong.com/2009/04/27/switch-flash-browser-plugin-mac/
date: 2009-04-27
---


Sometimes you need to test your Flash stuff with different plugin versions. Even if you just want to run some [performance tests](/2009/04/05/flash-debug-speed/), it is very useful to switch to the release player (see below for another example). For [windows there is a neat Firefox Plugin](http://www.sephiroth.it/weblog/archives/2006/10/flash_switcher_for_firefox.php) that makes switching quite a snap. [On Mac there is one too](http://sephiroth.it/firefox/flash_switcher/) – I haven't tested it, but it's supposed to work (though I'm not too sure about that when I read [these comments here](http://www.sephiroth.it/weblog/archives/2006/11/flash_switcher_for_osx.php#comments)). Still I prefer to work with Safari and I kind of dislike the thought of starting Firefox to just switch Plugins. ![wspluginswitcher-icon](---

/uploads/2009/04/wspluginswitcher-icon.jpg)Fortunately I've found another solution: [WSPluginSwitcher](http://code.google.com/p/wspluginswitcher/). This one comes as a Cocoa app and once configured (you really should [read this wiki page](http://code.google.com/p/wspluginswitcher/wiki/Setup)), it works real well for me. Also they have [prepared plugin versions for you to download](http://code.google.com/p/wspluginswitcher/downloads/list) (though the [most recents](http://www.adobe.com/support/flashplayer/downloads.html) are missing, but no big deal really). As for the speed tests, let me just give you another example (impressing enough for me to wanna switch players for real world testing). In Debug Player: 
    
    
    method...................................................ttl ms...avg ms
    tare [2]                                                      0     0.00
    CSSFastParser                                               603   120.60
    CSSRegExpParserFast                                         987   197.40
    CSSRegExpParserFastAdvanced                                1457   291.40
    ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    

In Release Player: 
    
    
    method...................................................ttl ms...avg ms
    tare [2]                                                      0     0.00
    CSSFastParser                                               354    70.80
    CSSRegExpParserFast                                         972   194.40
    CSSRegExpParserFastAdvanced                                1469   293.80
    ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    

Both 10.0.22.87, and exported as release swf. Oh, and by the way tested with another useful tool from Grant Skinner: [AS3 Performance Testing Harness](http://www.gskinner.com/blog/archives/2009/04/as3_performance.html).
