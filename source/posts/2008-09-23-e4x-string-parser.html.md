---
title: E4X String Parser
link: http://blog.betabong.com/2008/09/23/e4x-string-parser/
date: 2008-09-23
---


I did a lot of string parsing in the recent time: CSS Selectors, XML Display Objects, Stylesheets, ... I also need XML selection from String expressions – I formerly (AS2) used the great [XPath4AS2 from XFactorStudio](http://www.xfactorstudio.com/) which did it's job well (though a bit slow, it's AS2 after all). There's also one for Actionscript 3 ([xpath-as3](http://code.google.com/p/xpath-as3/)). But.. well... I wanted to go for some real speed! I like XPath a lot, but we now have native E4X selection in Actionscript 3, quite a different concept of node selection, and the conversion of XPath to E4X obviously results in quite a compromise in performance. So all I need is a decent E4X parser. And hey, I found one! E[4XParser from Digital Primates](http://www.adobe.com/devnet/flex/articles/e4x_print.html). It does its job really well, especially considering the very compact code it consists of. Thanks to some preparsing and caching, it's also quite fast. **Still I thought I can do better :-)** So I planted myself for a day (and a night) in front of my displays and hacked the hell out of it. The result is a little library which does pretty much the same thing as E4XParser, though pretty much more and a little faster too (15% to 50%). It's about half as fast as the native E4X selection (once parsed). You can do nearly anything you can do with E4X. Use it like this:   
    
    
```actionscript
import com.betabong.xml.e4x.E4X;
var result : XMLList = E4X.evaluate( xmllist , "author.( name.@last == 'Jobs' )" );

// E4X.evaluate( source : XMLList , expression : String ) : XMLList
```

  If your source is XML, just do XMLList( xml ), if your result should be xml, do xml = result[0] [Test it here](/showcase/e4x/E4X_Parse_Test.html) ![](/uploads/2008/09/e4x.png) **Restrictions:** You can't use AND/OR in comparisions. So, this won't go: author.( name.@first == 'Steve' && name.@last == 'Jobs' ) – though this is only a real limitations for OR. do this for AND: author.( name.@first == 'Steve' ).( name.@last == 'Jobs' ). **What you can do:** Yes, you can do quite advanced stuff like author.( name.@first == name.@last ) or car.@rating.average() (one of the few proprietary functions I added). Or even 
    
    
```actionscript
*..car.( @brand.toLowerCase() == 'volvo' ).( parent().( localName() == 'group' ).@rating > @rating )
```

– a weird example, I admit, but fancy, ain't it? :-) This is the first time ever I'm releasing part of my library as Open Source (MIT licence). As soon as I'll find some time (and if I see any interest), I'm gonna put this into Google Code, so everybody can easily checkout and participate. Until then download it from here: [Download](/showcase/e4x/betabong-e4x.zip) (zip 13kb)

## Comments

**[David](#51 "2009-08-11 23:17:50"):** Thanks! This was just what I needed.

**[Leonardo Diaz](#54 "2009-08-21 06:23:39"):** A great tool, but I haven't been able to make it work with xml code that defines namespaces and xsd like this for example: test it works without the namespace and all that stuff on the mpeg7 element Any advice??

**[Leonardo Diaz](#55 "2009-08-21 06:34:27"):** opps for the las comment, it did not parse the xml code, I'm trying with some mpeg7 document like this one: [Mpeg7 xmlns:mpeg7="urn:mpeg:schema:2001" xmlns="urn:mpeg:schema:2001" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xml="http://www.w3.org/XML/1998/namespace" xsi:schemaLocation="urn:mpeg:schema:2001 XMLSchema/Mpeg7-2001.xsd "] [Description type="ContentEntityType"] [MultimediaContent type="AudioVisualType"] [AudioVisual] [MediaInformation] [/MediaInformation] [/AudioVisual] [/MultimediaContent] [/Description] [/Mpeg7] if you delete all the extra params on the mpeg7 it works, but like this, it does not.

**[betabong](#56 "2009-08-21 10:01:36"):** Namespaces are not easy to come by, that's for sure. Still... what exactly doesn't work? Can you provide me the example, so I can double check with my code?

**[Leonardo Diaz](#57 "2009-08-21 16:53:55"):** Hi, well I tried more examples and googled and found that the problem is the default namespace. with the code added on my last comment (just change the [ for the ;> symbol) it works just by deleting the default namespace (xmlns="urn:mpeg:schema:2001"), now I'm facing a different problem, and it's how to filter nodes by its params when they are defined using xsi:, for example some elements on the mpeg7 especification has a defined type (MultimediaContent xsi:type="AudioVisualType" or MultimediaContent xsi:type="AudioType") or MultimediaContent xsi:type="VisualType" ) if I use the e4x filter ..MultimediaContext.(@xsi:type=="AudioType") it does not work, but if the nodes defines the params just as type="" (not xsi:type="") then a normal expression ..MultimediaContext.(@type=="AudioType") works as expected. ...By the way your online parser has help me a lot, i'd be crying by just debugin the code and e4x expressions.

**[Leonardo Diaz](#58 "2009-08-21 17:21:06"):** Sorry to "spam" your comment section, but this article is one tof the best and on google one of the first results, so I think this one last comment will help others. All the "problems" I've got are nicely explained here http://www.senocular.com/flash/tutorials/as3withflashcs3/?page=4 A great resource to fully understand E4X, I think it'll help you to update your app to dynamically load the namespaces on the xml (that would be awesome), and add an option to filter by using them.

**[betabong](#59 "2009-08-21 17:35:02"):** Leonardo, I see your problem. My E4X parser doesn't (yet) support namespaces. It's mainly because I didn't really need it for my own purposes, but also because I think namespaces are a pain in the ass to handle. What I often do, is to just get rid of them: 
    
    
    public static function removeNamspaces( xml : XML ):XML {
    	return XML( removeNamspacesFromString( xml.toXMLString() ) );
    }
    
    public static function removeNamspacesFromString( value : String ):String  
    {  
        value = value.replace(removeNS1, "");  
        var attrs:Array = value.match(removeNS2);  
        value = value.replace(removeNS2, "%attribute value%");  
        value = value.replace(removeNS3, "$1");  
        while (value.indexOf("%attribute value%") > 0)  
        {  
            value = value.replace("%attribute value%", attrs.shift());  
        }  
        return value;  
    } 
    
    private static var removeNS1:RegExp = /xmlns[^"]+\"[^"]+\"/g;
    private static var removeNS2:RegExp = /\"[^"]*\"/g;
    private static var removeNS3:RegExp = /(<\/?|\s)\w+\:/g;
    

I admit: this is not a beautiful solution. But it works for most cases. Call me lazy ;)

**[Kevin](#125 "2010-07-21 14:55:22"):** Hi, did you put this great tool on Google Code? Anyway thank you very much, it was really what i was looking for!!

**[Justin](#330 "2011-07-22 21:16:53"):** Very useful, thanks. Would be interested in hearing if you end up hosting this project somewhere.

**[Danny Kopping](#782 "2012-03-21 00:38:14"):** Thank you!!! Wonderful library - helped us solve a very troubling issue

