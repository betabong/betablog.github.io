---
title: SVN Hook – auto-upload to FTP
link: http://blog.betabong.com/2008/08/14/svn-hook-%e2%80%93-auto-upload-to-ftp/
description: 
post_id: 51
date: 2008-08-14
created: 2008/08/14 09:52:39
created_gmt: 2008/08/14 08:52:39
post_name: svn-hook-%e2%80%93-auto-upload-to-ftp
post_type: post
---


SVN is definitely cool. So I use it for quite all of my projects. Being able to jump back, having a versioned backup, share-coding with others – awesome. But most of my projects are to run on some kind of webserver. Usually I use my local webserver to test, so I can symlink directly into the projects (and then upload to productive manually). That's okay for me. But for a recent project I have to test on some remote ftp. So shall I each time commit/update then upload to FTP? And all other team members too? Come on, we are humans, that is stupid repetitive computer work! So I discovered SVN hooks. These are kind of scripts that can be called each time a SVN repository is changed. Find the directory in path/to/repos/hooks. I found this for my FTP hook: [svn2web](http://svn2web.svn.sourceforge.net/viewvc/svn2web/trunk/) – it'll give you all you need to setup the hook. The real cool thing is that you can define the ftp/sftp-behaviour in SVN properties: 
    
    
    svn propset svn2web "sftp:username:password@machine:/path" .

My pre-commit hook looks like this: 
    
    
    #!/bin/bash
    export PATH=/usr/local/bin:/usr/bin:/bin
    svn2web $1 $2 >> /tmp/svn2web.log || exit 1
    exit 0

Be aware of two things: 

  1. Install svn2web commands in /usr/local/bin – now you have to export the path variables in the hook script, because it will be called without any path variables (for security reasons)
  2. If the ftp upload fails for whatever reason, the commmit will fail too. That's what we want, usually, because otherwise we wouldn't get any feedback on comitting. If you don't want, just setup the hook as post-commit.
For some reasons my ftp-upload hook wouldn't work on this stupid test server. I spent quite some time figuring out why and what. It seemed that whenever ftp tried to PUT, the ftp server tried to change to some extended passive mode and would hang there. I found out that when calling the command 
    
    
    epsv

before ftp operations, this wouldn't happen. So, cool :-)

## Comments

**[dharma](#4 "2008-09-20 14:40:53"):** Man, thanks for the time u invested finding this super-useful solution.. Bye!

**[manolo](#14 "2008-12-17 00:48:29"):** i really dont get how to isntall svn2web, i should copy it to /bin ??

**[Tobz](#15 "2009-01-08 04:56:00"):** Hi, how hard is it to change this for a windows server(visualSVN)?

**[Programmatore PHP](#25 "2009-03-13 01:10:00"):** Wow, that's great! Thank you. I look for this feature for a lot of time, I will try it as soon as possible.

**[Joe](#47 "2009-06-02 23:02:30"):** Can you provide screenshots of this process? I am not really following it and really need the help? Thanks!

**[svnlabs](#129 "2010-08-06 16:18:31"):** Amazing!! Really very helpful.. Thanks

**[Sanwali](#207 "2011-01-27 21:10:05"):** Can i use the above hook for tortoisehg of mercurial? Cant seem to find one on google :( Any help will be highly appreciated

