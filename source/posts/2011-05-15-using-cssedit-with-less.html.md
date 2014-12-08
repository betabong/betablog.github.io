---
title: Using CSSEdit with LESS
link: http://blog.betabong.com/2011/05/15/using-cssedit-with-less/
date: 2011-05-15
---


![](/uploads/2011/05/cssedit-less.jpg) [CSSEdit](http://macrabbit.com/cssedit/) is a great app I can't live (or at least work) without. I've recently discovered the [LESS](http://lesscss.org/) language, which basically extends CSS with some very very useful functionality - mainly variables and something like functions (called mixins). (By the way, things Google is gonna support natively in their Chrome browser soon – using a slightly different syntax though. See [here](http://goo.gl/gTWLt)) Although CSSEdit hasn't been updated for much too long, it's IMHO still the best CSS editor out there (I've tried quite a few), and as much as I appreciate the bonus of LESS, I wouldn't wanna miss the comfort of CSSEdit. My first approach to using LESS files with CSSEdit goes like this: 
    
```
<link rel="stylesheet/less" href="css/styles.css">
<script src="js/dev/less.min.js"></script>
```
    

styles.css is actually a LESS file and just named with the extension .css so CSSEdit will force an update of its Live Preview every time you modify it. This works well with smaller html/css combos, but gets more difficult with every complexity level. Reason why is that the whole page will be refreshed with every change. (I've tried to actually get around this by messing with the source less.js. Although I've nailed the refresh triggering down to the xhr.send() the actual reason stayed mysterious to my brain cells. May be if I'd knew the exact mechanism of how the CSSEdit Live Preview update works... but then, just read on:) **There is though a fantastic solution.** One that's also of big help if you work with other editors by the way. LESS has a very nice watch option. Whenever a linked LESS file gets updated, the resulting CSS will be generated and replaced. The great thing if you work with CSSEdit is that you won't have to save your file to see any changes. From a CSS designer (or developer) point of view the outcome is a near-instant live preview. (LESS actually checks for changes in a Timer interval of 1000ms). That's how this looks in code: 
    
```
<link rel="stylesheet/less" href="css/styles.less">
<script src="js/dev/less.min.js"></script>
<script>less.watch();</script>    
```

If you like to sometimes see a live preview and sometimes just css the hell out of you without any disturbances until the next save, you can also use the glorious Hash Override: just leave away the "less.watch()" part in your script and open your html in the live preview with an additional "#!watch" hash. Something like this: ![](/uploads/2011/05/Screen-shot-2011-05-15-at-15.29.33.png) Wow, this will easen my life (ehm.. work) so much! Seriously, I really started to hate those page reloads. Oh, and by the way, just in case I haven't noted so far: I'd really love to see a CSSEdit update anytime soon. I'm so much willing to drink my self made [Espresso](http://www.kochbuchfotos.de/14/espresso) for that. ;-) In case the [Rabbit](http://macrabbit.com/) listens.

## Comments

**[Stu](#358 "2011-08-24 09:08:12"):** I am assuming this is all based on a local dev site and not a remote Dev site yes ? Trying to implement it using CSSEdits "override" option breaks all LESS tags, not surprisingly?

**[Philipp](#361 "2011-08-31 21:06:32"):** I found this post more or less by coincidence, then I got really really excited, when I got, that you are saying, that it is possible to use LESS with CSSEdit with its Live Preview. Now I tried it in Espresso, and it actually works easier than you are promising here. It just needs the LESS File as .css and the less.js - maybe the watch part is now activated by default. From now on i will learn and use LESS, thank you very much. Cheers, Phil

**[Rob](#530 "2011-12-12 03:29:22"):** Nice one, I've been trying to @import media queries, which LESS.js can't seem to handle at the moment. I tried out both the links, auto_update_stylesheet was being too slow for practical use, css_auto_reload's bookmark is brilliant, but can't seem to get the js file version to work. A shame as I'd like to use Espresso's browser with one of these. So for now at least, using Espresso, Chrome and Codekit (LESS.app's big brother) with the auto-reload bookmark might just be the way forward! Seems more software than should be needed, but hopefully that will change.

**[betabong](#369 "2011-09-14 10:10:42"):** The setup I've described here seems to only work with Safari. Chrome won't permit loading of scripts other than from http, so also not from file://. You can get around that limitation by running the page inside your local webserver (http://localhost) My current approach is not too use the LESS javascript inside the page, but instead use LESS.app to watch the less files and convert them on save to CSS. Then I may use something like http://nv.github.com/css_auto-reload/ or https://github.com/adamlogic/auto_update_stylesheets This uses less computing power on the client side and seems to be the cleaner approach to me.

**[Rob](#279 "2011-05-31 19:40:32"):** I'm a newcomer to LESS so only just discovering it's benefits — early indications are looking good. For some reason I hadn't thought of using it like this, I was more worried about getting the [syntax working](http://forrst.com/posts/Making_Espresso_syntax_highlight_SASS_SCSS-gxI) on Espresso, as far as I can tell, there's no way of doing that on CSS Edit. So until MacRabbit pull their finger out, I'll have to put up with Espresso's limited grouping and CSS functionality. Thankfully this works on Espresso too, really helped me out — the #!Watch feature is brilliant!

**[Lukree](#368 "2011-09-14 09:56:07"):** Unfortunately I simply cannot get your approach to work... Only way I get some results is to use less.app to watch changes and generate actual css file and include that file in html header. This way I can use CSSEdit inspector to select elements.

**[betabong](#531 "2011-12-12 14:22:37"):** There's currently so much development going on that the words I write right now might be outdated tomorrow. Anyway, my setup quite changed since then: I got used to not have an instant preview, but still want to see changes I make whenever I save the file. Today I use LiveReload http://livereload.com/ to do that. It comes with a nice Chrome/Safari/FF plugin that reloads any kind of source on change. (and of course compiles all kind of coffee and less). CodeKit seems promising, but right now I don't like it too much for its lack of collaboration. I might look into it, because I might just have missed its abilities to handle with subversion, git and co. In the end I still have the feeling that there will be much better tools to come, and I'm looking forward to improving my production and emotional computer time :-)

**[Jay](#705 "2012-02-17 00:44:32"):** Has anyone been able to get this working with Espresso and WordPress? I'm dying to use LESS but not willing to give up the instant preview. I can get this to work on a static installation, but not WordPress - http://f.cl.ly/items/0y2G351r3O3T3j1b401u/Live-LESS-previewing-in-Espresso.html

