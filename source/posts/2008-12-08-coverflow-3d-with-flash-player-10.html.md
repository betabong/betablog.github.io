---
title: "CoverFlow: 3D with Flash Player 10"
link: http://blog.betabong.com/2008/12/08/coverflow-3d-with-flash-player-10/
description: 
post_id: 172
date: 2008-12-08
created: 2008/12/08 22:55:26
created_gmt: 2008/12/08 21:55:26
post_name: coverflow-3d-with-flash-player-10
post_type: post
---


I'm close to finishing a new project. Well, it's actually not that new of a project, but it hasn't gone online so far, and when I did the first version back in March I've used **Papervision** to achieve the goals. It's basically a simple CoverFlow effect to scroll through Logos. The thing with the old Papervision version was.. it got pretty slow when loading many pictures (resulting in many 3d objects). I got briefed with a screen design more or less and expected much less elements to be loaded. Now they got back to me saying they had some problems. Oh yes, they had. Boy was it slow!! So I did a new version, skipping Papervision for the **new Flash Player 10 **capabilities. Wow! What an improvement not only in **speed**, but also in **quality** (because I wouldn't have to switch to crispy bitmap handling for acceptable speed - and Flash doesn't provide that feature anyway) and **file size** (less than 25%!). Now I just hope that the end client will have the nuts to go with Flash Player 10 :-) (Adobe still doesn't provide any [statistics](http://www.adobe.com/products/player_census/flashplayer/version_penetration.html), but it's not that wide spread yet as for now). See here the result (still in development – click the picture). You'll need Flash Player 10 (I don't check for the version in this example): ![](/uploads/2008/12/coverflow.jpg) I made use of [SimpleZSorter](http://theflashblog.com/?p=470) **Update:** Well, the client wouldn't go with 10. So I had to recode the Papervision version to speed it up as much as possible, and I think it got pretty speedy after all. [See here for comparison.](http://www.betabong.com/work/nose/globusflow-pv3d/)

## Comments

**[Rich](#21 "2009-01-23 18:55:35"):** Hey, I LOVED the FP10 version. Is there anyway you would post a tutorial on how to make one? I have been looking everywhere, and I can't seem to find one.

**[Brett](#48 "2009-06-08 12:03:43"):** Hey, this is by far the best cover flow I've seen. Is there any chance you'd be willing to put up your FLA?

**[Sergio](#50 "2009-07-15 13:13:50"):** Hi, I'm a member of a Brazilian software company and that component would be so good for us. Will you publish the source? If not, would you sell this component for us? Thanks!

**[Joshua White](#52 "2009-08-14 21:14:02"):** I am really curious to see the source. I need to do a similar implementation and I got my client to agree to flash 10 for it. I'm starting to write one of my own, but I'm pretty new to the flex 4 libraries. Thanks for any help! -Josh

**[Ivan](#128 "2010-08-05 10:33:32"):** Hi, This coverflow looks great! Did you finish it? Will you distribute it? Regards, Ivan

**[Antuan Ochomma](#169 "2010-11-16 14:25:49"):** Hi there, you have a very nice coverflow implementation, is there any way i could use this module on my home page? How much would it cost? I'm very interested, thank you so much for your time brother! Best regards, Antuan.

