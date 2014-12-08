---
title: Flex Project - SVN Strategy
link: http://blog.betabong.com/2008/07/16/flex-project-svn-strategy/
author: admin
description: 
post_id: 13
date: 2008-07-16
created: 2008/07/16 11:35:54
created_gmt: 2008/07/16 10:35:54
post_name: flex-project-svn-strategy
post_type: post
---


I like to keep all my projects on a svn server. So far this was just for myself and I didn't care much about the simplicity of checking out and in – a little chaos is acceptable if you're up to handle it ;) Finally I was forced to rethink this strategy because I wanted to let other people work on a project. As many actionscript projects, this one also heavily relies on external libraries, most of them hosted by Google Code, another one being my own (closed) lib. So should I tell people: «hey, just svn checkout from here and there and then relink the libs in the project properties but don't check in the updated settings for christ's sake!»No. Too shaky, really. Fortunately, SVN provides a fucking cool way to solve this issue: svn:externals. Ha! This is so awesome, you won't believe it ;-) Okay, here are the steps to follow (on a mac at least): Create a flex project: 

  * project 
    * html-template
    * src
Add a new directory: 
  * project 
    * html-template
    * src
    * externals
Now put this on your svn, either by svn add or by putting in the repos and checking out again (well.. just as you did). If you've already got bin-debug or bin-release directories, just remove them on the repos and svn update (they are created with each publish in flex). Now let's say our project resides in ~/Documents/projects/project (path to project). Do the following in Terminal: 
    
    
        cd ~/Documents/projects/project/externals
        svn svn propedit svn:externals .
        

This should open an editor (in my case I've defined textmate as my editor by doing:) 
    
    
    export EDITOR='mate -w'

Enter the following (example libraries): 
    
    
    caurinatweener http://tweener.googlecode.com/svn/trunk/as3/
    as3corelib http://as3corelib.googlecode.com/svn/

You can also add a specific release: 
    
    
    caurinatweener -r23 http://tweener.googlecode.com/svn/trunk/as3/

(in TextMate save and close, if you use vim you know what to do anyway) Now comes the magic part: 
    
    
    svn up

This will checkout all defined libraries into externals/xyz!! you do `svn commit` and now every time somebody checks out your project (or your externals directory) all the libs will be checked out automatically! I think this is just fucking awesome! :-) Now in Eclipse all paths to your external libraries will be relative to the project (of course you have to add the libs there or change the paths – you should know how to do that ;)) Now all we need to is ignoring bin-release and bin-debug. We don't want these directories to be in our svn repos: 
    
    
    cd ~/Documents/projects/project
    svn svn propedit svn:ignore .

enter a list of directories or files to be ignored. in our case: 
    
    
    bin-debug
    bin-release

That's it! Thanks, svn!
