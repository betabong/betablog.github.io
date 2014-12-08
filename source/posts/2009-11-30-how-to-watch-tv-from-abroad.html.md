---
title: How to watch TV from abroad
link: http://blog.betabong.com/2009/11/30/how-to-watch-tv-from-abroad/
date: 2009-11-30
---


From time to time I spend a few weeks abroad. From time to time I'd like to watch swiss tv while I'm there. There are services like Zattoo or Wilmaa out there, that allow you to watch tv via internet, but they only allow IPs from within your home country, in my case Switzerland. So we want them to believe that we're home, not 4000 miles away on some sunny island (dream on). The solution is kind of simple actually, once you know how to do it, but it took me far too long to find it out anyway – so I thought it might be worth sharing (which also prevents me forgetting it). We just need to route all relevant internet traffice through a home computer. You need to have SSH access to this computer, and you need to have a decent internet upload speed for video stuff. Lucky me I have a loyal and faithful Mac Mini at home, acting as Media Center, SVN server and .. well, as a decent TV proxy :-) Here's how you do: 

  1. Open Terminal, enter: **ssh -2 -C -D 2001 **_**username**_**@**_**yourserver.com**_ (_username_ is your account on the remote machine – and _yourserver.com_ could be an ip or whatever address your server has. I use [Dynamic DNS](http://www.dyndns.com/) for mine.)
  2. Enter the password for _username_
  3. Open «**System Preferences**» and go to «**Network**» (You can close the Terminal). Click the Button «**Advanced...**» ![Screen shot 2009-11-30 at 15.41.17](---

/uploads/2009/11/Screen-shot-2009-11-30-at-15.41.17-300x234.png)
  4. Go to «**Proxies**» and activate SOCKS Proxy and enter Socks Proxy Server: **127.0.0.1** : **2001** (see picture)
  5. Go to [What Is My IP Address?](http://whatismyipaddress.com/) or this [IP Tracer](http://www.ip-adress.com/ip_tracer/) to check if everything works. If the map shows you're at home, you're good to go!
Now for TV I recommand [Wilmaa](http://www.wilmaa.com/): worked perfectly for me. Surprisingly good quality, and it's for free! Great for football matches or Heidi in swiss german ;-) ![Screen shot 2009-11-30 at Mo. 30.11  16.24.56](---

/uploads/2009/11/Screen-shot-2009-11-30-at-Mo.-30.11-16.24.56-520x325.png)

## Comments

**[Leo Iqbal](#135 "2010-09-02 16:30:07"):** http://watch-tv-abroad.com Click this link to get a website that gives full video instructions and the necessary software to set up a private VPN proxy. This simply means BBC iPlayer, ITV Player, Channel 4OD, SkyPlayer will think you are in the UK and grant you access. The streaming speeds are the same as if you were on your broadband at home. The website is Watch-TV-Abroad.com and you can watch a youtube demo video by clicking this link and skipping the first 2 1/2 minutes http://www.youtube.com/watch?v=r4Yy5uH4XyI

