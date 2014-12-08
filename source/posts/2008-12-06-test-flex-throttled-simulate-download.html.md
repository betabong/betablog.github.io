---
title: Test Flex/Flash throttled (aka Simulate Download)
link: http://blog.betabong.com/2008/12/06/test-flex-throttled-simulate-download/
description: 
post_id: 161
date: 2008-12-06
created: 2008/12/06 16:52:55
created_gmt: 2008/12/06 15:52:55
post_name: test-flex-throttled-simulate-download
post_type: post
---


Most of the Flash application deal with server side data like images, xml files etc. We tend to forget about that because the default Run or Debug commands in Flex will open a local html file (and also because we developers often have quite a nice internet connection when testing remotely). Thus all data is loaded nearly instantely. In Flash we have a menu command called **«Simulate Download»** to see how things run at different bandwidth situations. **But how to achieve this in Flex?** I've been using Sloppy for a long time. It's little java app that can be started via a simple web click. It's really easy to use and does very well what it does. For debugging your app (your flash website) throttled in Flex Builder simply follow these steps:   

  1. [Open the **Sloppy website**](http://www.dallaway.com/sloppy/)
  2. Click the little **Sloppy icon**: ![](/uploads/2008/12/picture-10.png)[ ](http://blog.betabong.compost_type: post
---

/uploads/2008/12/picture-10.png)
  3. A «sloppy.jnlp» file is downloaded. **Open it** if doesn't open automatically.
  4. The actual application will be downloaded and started. If it asks you to trust: **trust!** :-)
  5. **Enter the address** of your html file in the bin-debug or bin-release folder. It should be a webserver address. I usually create a [symbolic link](http://www.macupdate.com/info.php/id/10433/symboliclinker) of my project directory and put it into my local webserver directory. ![](/uploads/2008/12/picture-11.png)
  6. **Click «Go»** – this will start the Sloppy proxy and open the page in your default browser. 
  7. **Copy the address** from the browser window (usually http://127.0.0.1:7569/your/path) ![](/uploads/2008/12/picture-12.png)
  8. You may close the window. Go to Flex Builder and **open the project properties** (right click on project folder, last item). In an Actionscript Project, switch to ActionScript Build Path. ![](/uploads/2008/12/picture-14-300x289.png) 
  9. Enter the copied address into **«Output folder URL»**, clear the html name (e.g. App.html). ![](/uploads/2008/12/picture-15.png)
  10. Click «OK» and **you're done**. You can now Run and Debug as if your website was hosted on some server and you had a 256K ADSL connection (instead of your T1).
Note: I tried to automate the whole thing (with Ant of course) and succeeded to a certain limit. What I did was download [Sloopy's source code](http://code.google.com/p/sloppy/) (java), modify it so it can handle more terminal attributes and build the  .jar file. This can be run on command line, which will start the sloopy server. So I created an ant file that does all that for me, but this ant file would only be cool, if it could also trigger the run or debug commands and modify the output folder url. I haven't found a way (at least not a satisfying one) to do this, so I might just follow the manual street for once ;) Another note: If you are windows user, you might wanna try this Firefox plugin: [Firefox Throttle](https://addons.mozilla.org/en-US/firefox/addon/5917)

## Comments

**[brandy](#13 "2008-12-15 23:13:11"):** Firefox Throttle doesn't work with localhost, sadly.

**[Oliver](#20 "2009-01-16 00:12:28"):** There's nothing quite as useful as Charles IMHO... quite wonderful http://www.charlesproxy.com/

**[Geoff](#24 "2009-03-06 11:17:24"):** @ Oliver, I have to agree on that one. Charles is one of my favourite pieces of software that I just during Flex / Flash development! It's just great and working perfectly. cheers geoff

**[Ranoka](#80 "2010-03-06 19:30:32"):** This worked really well for me. I used MAMP to set up my local server, which was easy. Sloppy is a great little app, and symboliclinker works great too.

