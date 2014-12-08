---
title: Use GZip compression for your website
link: http://blog.betabong.com/2010/03/25/use-gzip-compression-for-html-css-javascript-xml/
description: 
post_id: 316
date: 2010-03-25
created: 2010/03/25 10:53:50
created_gmt: 2010/03/25 09:53:50
post_name: use-gzip-compression-for-html-css-javascript-xml
post_type: post
---


Most of my Flash apps or websites use XML files, either for communication or initial data. They can get quite large, reaching about 100 kb or more is not seldom. You might say: so what?! 100 kb is like nothing for a bandwidth nowadays! Well, if you've every used iPhone tethering in an area where there is no 3g network, you start appreciating every single byte you won't have to suck from the net. (On a side note: That's when Opera really comes in handy.) 

### XML files compress really well

Because XML usually contains a lot of repetitive elements (noticably tags and attributes), they are like a compressor's darling. Just zip a few of your XML files and you'll see. Now I kind of always thought that on nowadays webservers gzip compression is activated by default anyway. Which was wrong, at least for quite a bunch of servers I use. 

### Activate GZip compression

If your server installation contains the deflate module (which is the case for all of the ones I use), then you can simply add the following line to your .htaccess file: 
    
    
    # compress all html, plain text, xml, css and javascript:
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/x-javascript

AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/x-javascript 

I've also tried more complex constructs found on the web, but they resulted in «Internal server errors» which is why I'll go along with this simple one for now.

**The effects are dramatic! I usually get about 70% – 80% of reduction for non-minimized files, **

### Examples

Uncompressed Compressed Reduction

**Javascript minimized** [MooTools YUI compressed](http://ajax.googleapis.com/ajax/libs/mootools/1.2.4/mootools-yui-compressed.js)
66,867
20,964
68.6%

**Javascript minimized** [MooTools uncompressed](http://ajax.googleapis.com/ajax/libs/mootools/1.2.4/mootools.jss)
102,991
27,599
73.2%

**XML/CSS combined** [A larger initial XML file for a Flash website of mine](http://www.ceylor.ch/pages/home.xml)
84,316
18,229
78.4%

**XML/CSS combined** [A larger initial XML file for a Flash website of mine](http://www.ceylor.ch/pages/home.xml)
84,316
18,229
78.4%

**HTML** [A swiss news website, 20 Minuten](http://20min.ch)
148,587
29,385
80.2%

**HTML** [My blogs home page]()
51,638
12,991
74.8%

### Tools

If you want to test your website, these pages are very informative (first one is faster, second one more informative): <http://www.whatsmyip.org/http_compression/>

<http://www.gidnetwork.com/tools/gzip-test.php> I also like this one, although it only gives you little info on content-encoding. But very much on top of that :-) <http://www.wmtips.com/tools/info/> This little Firefox addon will tell you wether any site you visit has GZip activated: <https://addons.mozilla.org/en-US/firefox/addon/54647> (Content Encoding Detector) 

### Conclusion

HTML websites will profit a lot from this compression, as well as Flash sites (if just for your swfobject.js) that use textual communication. And best of all: it won't need any kungfu effort on your side! And: practically all browsers support it. (I've only heard of problems with IE6, but then, you know, f*** IE6) 

### Update:

A more complete solution for your .htaccess file: 
    
    
    
    	AddOutputFilterByType DEFLATE text/html
    	AddOutputFilterByType DEFLATE text/xml
    
    	AddOutputFilterByType DEFLATE image/x-icon
    
    	AddOutputFilterByType DEFLATE text/css
    
    	AddOutputFilterByType DEFLATE text/javascript
    	AddOutputFilterByType DEFLATE application/javascript
    	AddOutputFilterByType DEFLATE application/x-javascript
    	AddOutputFilterByType DEFLATE text/x-js
    	AddOutputFilterByType DEFLATE text/ecmascript
    	AddOutputFilterByType DEFLATE application/ecmascript
    	AddOutputFilterByType DEFLATE text/vbscript
    	AddOutputFilterByType DEFLATE text/fluffscript
    
    	AddOutputFilterByType DEFLATE image/svg+xml
    	AddOutputFilterByType DEFLATE application/x-font-ttf
    	AddOutputFilterByType DEFLATE application/x-font
    	AddOutputFilterByType DEFLATE font/opentype
    	AddOutputFilterByType DEFLATE font/otf
    	AddOutputFilterByType DEFLATE font/ttf
    	AddOutputFilterByType DEFLATE application/x-font-truetype
    	AddOutputFilterByType DEFLATE application/x-font-opentype
    	AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
    	AddOutputFilterByType DEFLATE application/vnd.oasis.opendocument.formula-template
    
    

([Source](http://www.speedingupwebsite.com/2010/01/08/use-the-gzip-power/))
