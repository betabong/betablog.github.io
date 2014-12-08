---
title: Test Movie from Flex to Flash (easy way)
link: http://blog.betabong.com/2008/12/03/test-movie-from-flex-to-flash-easy-way/
description: 
post_id: 154
date: 2008-12-03
created: 2008/12/03 12:23:33
created_gmt: 2008/12/03 11:23:33
post_name: test-movie-from-flex-to-flash-easy-way
post_type: post
---


I figured a much much easier ([compared to this](/2008/11/29/flex-builder-t-flash-ide)) way to trigger Test Movie in Flash IDE from within Flex. What you'll still need is Ant ([here's how to install](http://blog.jodybrewster.net/2008/04/09/installing-ant-in-flex-builder-3/)), but that's all you gonna need apart from Flex Builder and Flash. That's the simplest ant build file to achieve this: 
    
    
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project name="Publish" default="Publish" basedir="./">
    <!-- project specifics -->
    <target name="Publish">
        <concat destfile="build.jsfl">
            fl.getDocumentDOM().testMovie();
        </concat>
        <exec executable="open" failonerror="true" logerror="true">
            <arg line="build.jsfl" />
        </exec>
        <delete file="build.jsfl" />
    </target>
</project>
```
This tests the frontmost document in Flash IDE. (basically what does [this plugin](http://theflashblog.com/?p=482)). Tested on Mac OS X 10.5.5 with Flex Builder Pro 3.0.2 and Flash CS4. No need for [FlashCommand](http://www.mikechambers.com/blog/2008/05/02/flashcommand-for-os-x-updated-to-work-with-flash-cs3/). No need to alter the file for other projects. Just a super easy file for people with not too many requirements. You can still go more advanced with something like that: 
    
    
    
    
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project name="Build Project" default="Publish and Test" basedir="../">
    <!-- common -->
    <property name="browser" value="Safari"/>
    <property name="log.path" value="${user.home}/Library/Preferences/Macromedia/Flash Player/Logs/flashlog.txt"/>

    <!-- project specifics -->
    <property name="fla.path" value="${basedir}/main.fla"/>
    <property name="swf.path" value="${basedir}/result.swf"/>
    <property name="test.path" value="http://localhost/projects/test/index.html" />

    <target name="Publish and Test">
        <antcall target="Publish"/>
        <antcall target="Clear Log"/>
        <antcall target="Open in Browser"/>
    </target>

    <!-- publish swf -->
    <target name="Publish">
        <concat destfile="build.jsfl">
            var sourceFile = "#FLA#";
            var outputFile = "#SWF#";
            var doc = fl.getDocumentDOM();
            if ( !doc || sourceFile.indexOf( doc.path ) &lt; 0 ) {
                doc = fl.openDocument(sourceFile);
            }
            doc.exportSWF(outputFile, true);
            <filterchain>
                <replacetokens begintoken="#" endtoken="#">
                    <token key="FLA" value="file:///${fla.path}"/>
                    <token key="SWF" value="file:///${swf.path}"/>
                </replacetokens>
            </filterchain>
        </concat>
        <exec executable="open" failonerror="true" logerror="true">
            <arg line="build.jsfl" />
        </exec>
        <delete file="build.jsfl" />
    </target>
    
    
    <!-- Open in local browser -->
    <target name="Open in Browser">
        <exec executable="open">
            <arg line="-a ${browser} ${test.path}" />
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

This has pretty much the same results as [posted here](/2008/11/29/flex-builder-t-flash-ide/). I have created a Flex Project that contains all necessary files (fla, main class, build file). Just download and import into Flex: [ Download Flex Project](http://blog.betabong.compost_type: post
---

/uploads/2008/12/flaproject.zip) **Update: **Mirko Sablijic sent me a Hello World project for Windows (he runs Vista): [Download Flex Project (Windows)](http://blog.betabong.compost_type: post
---

/uploads/2008/12/helloworld.zip)

## Comments

**[psych](#9 "2008-12-04 21:27:19"):** Hi, I tried running the example build file with ant but got the following error: CreateProcess: open build.jsfl error=2 Any idea what might be wrong? thanks

**[betabong](#10 "2008-12-05 05:32:22"):** That means the file build.jsfl can't be found. My only spontaneous idea would be that it's already been removed, or never been written (though in the last case you should have gotten an error at the concat command). Is this reproducable, does it happen every time?

**[psych](#11 "2008-12-06 13:57:28"):** I think i found what's causing the problem, it seams to be 'path' related. If i just display the value of the ${fla.path} ant variable i get the correct path: ${fla.path} displays in my example: C:\Users\Mirko\workspace\Flex\HelloWorld\HelloWorld.fla which is correct,but in the jsfl part: var sourceFile = "#FLA#"; if i trace the sourceFile value: fl.trace(sourceFile); i get the following malformed (without '\') path: C:UsersMirkoworkspaceFlexHelloWorldHelloWorld.fla So i am not sure why this happens :/ I am using FB 3 and Flash CS4 IDE on Vista OS. Any ideas?

**[betabong](#12 "2008-12-06 14:11:11"):** Yeah, it's about the back slashes – in javascript they'll be interpreted as special characters (like \t for tab or \r for carriage return). Try adding two backslashes (\\\ will become \\): C:\\\Users\\\Mirko\\\workspace\\\Flex\\\HelloWorld\\\HelloWorld.fla That should do the trick. I'm not sure though about the command line stuff in windows - wether it behaves the same as in OS X (which after all is a unix system). Let us know if you're lucky – I'm sure there are other win users trying to achieve this.

**[Riccardo Bartoli](#26 "2009-03-15 21:35:20"):** Why are you using the tag?

**[Jeff](#77 "2010-02-01 19:47:10"):** I downloaded your flex project and tried to run it on a mac but when I launch the Publish command it switches to Flash (cs4) but doesnt launch it. Also the Document Class for main.fla doesnt match up with Main.as... Thanks!

