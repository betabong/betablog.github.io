---
title: Develop in Flex Builder, publish in Flash IDE (Mac OS X)
link: http://blog.betabong.com/2008/11/29/flex-builder-t-flash-ide/
description: 
post_id: 144
date: 2008-11-29
created: 2008/11/29 13:12:43
created_gmt: 2008/11/29 12:12:43
post_name: flex-builder-t-flash-ide
post_type: post
---


**Update:** [I've found an easier way without FlashCommand](/2008/12/03/test-movie-from-flex-to-flash-easy-way/) Once you got used to developing for Flash in Flex Builder, you hate to do any programming in Flash IDE. Still you sometimes might have to: Flex Builder won't allow to publish into a FLA file. (There are of course many other reasons, like supporting older AS1/AS2 projects, we don't go into that here.) Thanks to Eclipse's ability to be customized, there are ways to make things at least a little easier. I give here a little overview of how I've set up my environment, based on several helpful resources I've found in the web. 

  1. Install FlashCommand
  2. Install Ant
And for each project: 
  1. Create/modify Ant file
  2. Create Actionscript project
  3. Set up project and FLA file

### What you need

  * [Flex Builder](http://www.adobe.com/products/flex/)
  * [Flash IDE (CS3 or CS4)](http://www.adobe.com/products/flash/)

### Install FlashCommand

[flashcommand](http://www.mikechambers.com/blog/2008/05/02/flashcommand-for-os-x-updated-to-work-with-flash-cs3/) is a python script by [Mike Chambers](http://www.mikechambers.com/blog/) that lets you compile FLA files from the command line using Flash IDE. [Download it](http://code.google.com/p/flashcommand/downloads/list) and put it wherever you want. 

### Install ANT

If you're used to FDT (or Eclipse in any way) you may well know Ant. [Ant](http://en.wikipedia.org/wiki/Apache_Ant) is the premier build tool for any developers working in [Eclipse](http://www.eclipse.org/), with many many cool possibilites to automate your workflow. Here's how you [install Ant in Flex Builder 3 Standalone](http://blog.jodybrewster.net/2008/04/09/installing-ant-in-flex-builder-3/): 

  1. Go to Help > Software Updates > Find and Install
  2. Search for new features to install, click next
  3. Select «The Eclipse Project Updates», click finish Note: If you do not have the option above click «New Remote Site» and enter «The Eclipse Project Updates» as the name and «http://update.eclipse.org/updates/3.3» as the url.
  4. In Eclipse project updates look for «Eclipse Java Development Tools ...» – it might be in «Eclipse SDK Eclipse 3.3.2» but this depends on what version you have installed and what version is currently available. Select it and click next.
  5. Accept licence agreement, click next. Then click «Finish» to start download.
  6. Once downloaded, click «Install all»
  7. Restart Eclipse (you'll be asked to)

### Create Project

  1. Create a new Actionscript Project in Flex Builder
  2. Add a new «build» directory in the project root
  3. Add your FLA file(s) and assets to the build folder and your source files to the src folder (I also strongly recommend adding external libraries to and «externals» directory and use svn:externals property on it, but that's another story) 
  4. Add build paths. You have to do this at least twice: 
    * In the Flash IDE for the FLA: Publish Settings > Actionscript 3 «Settings...». Don't forget to add the src folder at least. Test your FLA once done. It should compile just fine.
    * In Flex Builder: Project > Properties > ActionScript Build Path. Add your external libraries here. This is used so Flex knows where to lookup your classes, it won't actually be needed for compiling, because that's what Flash IDE's gonna do.
  5. Now you're almost done: you can edit your classes in Flex Builder and switch to Flash IDE to publish and/or test your movie. We're gonna make this a little more comfortable with Ant and flashcommand.

### Add Ant build file

  1. Create a new file build.xml in the root folder and open it with Ant Editor (in Flex Builder aka Eclipse)
  2. Edit the build.xml according your setup (see below for example)
  3. Add build.xml to Ant View (Window > Other Views...)
  4. Run an action by double clicking it in Ant View: there you go!! It will compile in Flash IDE and open in your browser for testing!

### Sample Ant build.xml

```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!-- ====================================================================== 
       Nov 28, 2008 1:37:54 AM                                                        

       MyProject    
       Compile in Flash IDE

       sev                                                                
       ====================================================================== -->
  <project name="MyProject" default="Compile and Run" basedir="./">
          <!-- project specifics -->
          <property name="browser" value="Safari"/>
          <property name="swf.filename" value="MyProject"/>
          <property name="html.filename" value="fla/index.html" />

          <!-- Flash IDE Commandline compiler -->
          <property name="python" value="/usr/bin/python" />
          <property name="flash.command" value="/path/to/flashcommand" />

          <!-- directories -->
      <property name="user.path" value="/Users/yourname"/>

          <property name="build.dir" value="${basedir}/build" />

          <property name="main.fla" value="${build.dir}/${swf.filename}.fla" />
          <!-- paths -->
          <property name="output.path" value="${build.dir}/${swf.filename}.swf" />
  
      <!-- you can also point to the file:///path/to/index.html -->
          <property name="local.path" value="http://localhost/projects/MyProject/${html.filename}"/>
          <property name="log.path" value="${user.path}/Library/Preferences/Macromedia/Flash Player/Logs/flashlog.txt"/>

          <!-- Compile python flashcommand -e  -s build/MyProject.fla -o build/MyProject.swf 

          usage: flashcommand -e | -c | -p [-v] [-x] (-s <sourcefile>) ([-o] <exportpath>) ([-t] <timeout>)([-d] <tempdir>) [-j]

          Options and arguments:

          -a : Prints version and about information.
          -c : Specifies save and compact action. 
          -d : Specifies temp directory that will be used for temporary files. Optional.
          -e : Specifies export action.
          -h : Prints usage information.
          -j : Specifies that the generated JSFL file should be printed. If this option is specified, Flash will not be executed.
          -o : Specifies the output file if -e flag is also set. Optional. If not specified, file will be output to same directory as source.
          -p : Specifies publish action.
          -s : Specifies source file. Required.
          -t : Specifies timeout value. Optional.
          -v : Specifies verbose mode. Optional.
          -f : Specifies that the Flash authoring version installed is a version other than Flash CS3
          -x : Specifies whether Flash should be closed after it is done processing. Optional.    

          -->

  <target name="Compile and Run">
    <antcall target="Compile in IDE"/>
    <antcall target="Clear Log"/>
    <antcall target="Open in Browser"/>
  </target>
        
        <target name="Compile in IDE">
            <echo>${flash.command} -e -c -s ${main.fla} -o ${output.path}</echo>
                <exec executable="${python}" failonerror="true" logError="true">
                        <arg line="${flash.command}" />
                        <arg line="-e " />
                        <arg line="-s ${main.fla} "/>
                        <arg line="-o ${output.path}"/>
                </exec>
        </target>
        
        
        <!-- Open in local browser -->
        <target name="Open in Browser">
                <exec executable="open">
                        <arg line="-a ${browser} ${local.path}" />
                </exec>
        </target>
        
        <!-- Clear Debug Log -->
        <target name="Clear Log">
      
          <concat destfile="${log.path}">                                                                                                            
.: Sev Log File :.

</concat>
            <exec executable="open">
                    <arg line="-a console '${log.path}'" />
            </exec>
        </target>
  </project>
```

## Comments

**[Andres Garcia](#17 "2009-01-11 05:18:05"):** Hi, maybe should be useful to add these lines: shellCommand = "open \"" + outputPath + "\"" os.system(shellCommand) To the Mike Chambers Phyton file. That way the generated swf file opens in case that you need a similar functionality as in "Publish Preview"

**[Andres Garcia](#18 "2009-01-11 05:58:07"):** Or, just adding this line in the temporary jsfl file in the phyton file: jsfl.append("doc.testMovie();\n")

**[Kirill](#44 "2009-05-30 12:36:04"):** We did something similar in our office. But we launch flash directly from Ant instead of requiring python, using the open command on the Mac which on Leopard has flags for using the already opened instance of Flash or starting a new one, as well as making flash open below everything so it doesn't steal focus as you're doing something else. We support Windows too since a lot of our contractors use it as well as our clients, but on windows we had a hard time getting the Windows open command to work on files with spaces in them through Ant's exec task. So we ended up specifying the temporary jsfl file as the command to launch Flash on windows.

