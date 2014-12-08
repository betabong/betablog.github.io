---
title: Get rid of build_hd_index
link: http://blog.betabong.com/2009/01/26/get-rid-of-build_hd_index/
date: 2009-01-26
---


If you ever have accessed your Mac with Remote Desktop, your Mac probably got a sickness out of it. A process named build_hd_index will be running on a regular basis. Very regular. Much too often! And if you have, like me, a lot of hard drive space, build_hd_index will have to do a lot, because it's aim is to index each and every file on each and every hard drive. So I read, at least. Whatsoever, this process made me sick. My once silent Mac was like on Kokain: hard drive noise accompanied by a respectable cpu usage (about 40%, and hey, I have eight horses drawing my carriage after all). [Addicted](http://www.youtube.com/watch?v=9932Q2u7ziI) to indexing! It made me crazy! Now I got rid of it (again actually, System updates can bring the [devil](http://devnevyn.livejournal.com/3558.html) back  that's why I need to write that down if it's just for myself). 

### How to stop it

Here's a simple terminal todo - open up your terminal and enter line after line: 
    
    
    sudo chmod a-x /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Support/build_hd_index
    sudo rm /Library/Preferences/com.apple.ARDAgent
    sudo rm /var/db/RemoteManagement/caches/filesystem.cache

For newbies: After the first sudo, enter your admin password (usually your password you use for installation etc.). If you're asked wether you want to overwrite/overrule something, type «yes» and press Enter. So what is this doing? Line by line: 

  1. **sudo chmod a-x /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Support/build_hd_index** Changes the right of devil script named build_hd_index so it can't be executed anymore
  2. **sudo rm /Library/Preferences/com.apple.ARDAgent** Gets rid of the Apple Remote Desktop preferences file which should have stored wether your system should run build_hd_index
  3. **sudo rm /var/db/RemoteManagement/caches/filesystem.cache** Removes the cache file produced by build_hd_index (mine was over 6 GB!) 
There are other things you could do, like [unchecking some option in the accessing Remote Desktop](http://chealion.ca/2008/09/build_hd_index/). This might work for you, it didn't for me. And I don't want to care anymore about it. After all, what's its use?! To be able to search for files via Remote Desktop the old Tiger way?! I don't know.. but I know that I never ever need this. It has nothing to do with Spotlight, and it has nothing to do with locate (Terminal command). And my Mac's so very much calmer now. It went to [rehab](http://www.youtube.com/watch?v=RKVbgkfFygY).

## Comments

**[liborio](#69 "2009-09-30 23:21:55"):** you are SOOO big!!

**[dr3do](#218 "2011-03-18 17:51:23"):** Thanks for this hint! :)

