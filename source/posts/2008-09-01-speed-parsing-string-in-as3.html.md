---
title: Simplicity follows Performance – parsing Strings in Actionscript 3
link: http://blog.betabong.com/2008/09/01/speed-parsing-string-in-as3/
description: 
post_id: 101
date: 2008-09-01
created: 2008/09/01 17:18:25
created_gmt: 2008/09/01 16:18:25
post_name: speed-parsing-string-in-as3
post_type: post
---


In my current project I do a lot of String parsing. Much a lot! And when it comes to do the same things many many times, performance will gain much from little details. Let's take the simplest parsing as an example. Converting a CSS like string **"width: 100%; maxwidth: 500; fontface: Bold; gap: 10;"** to an object **{ width: "100%" , maxwidth: "500" , fontface: "Bold" , gap: "10" }** Compare these two methods to achieve this: 
    
    
    public static function simpleStringToObject_fast( input : String , o : Object = null ) : Object {
    	if ( input == null || !Boolean(input) ) return o;
    	if ( o == null ) o = {};
    
    	var cursor : int = 0;
    	var found_key : String;
    	var index : int;
    	while ( true ) {
    
    		if ( found_key == null ) {
    			index = input.indexOf( ':' , cursor );
    			if ( index >= 0 ) {
    				while( input.charAt(index-1) == ' ' ) index--;
    				found_key = input.substring( cursor , index );
    				cursor = index + 1;
    				while( input.charAt(cursor) == ' ' ) cursor++;
    			} else {
    				break;
    			}
    		} else {
    			index = input.indexOf( ';' , cursor );
    			if ( index >= 0 ) {
    				while( input.charAt(index-1) == ' ' ) index--;
    				o[ found_key ] = input.substring( cursor , index );
    				found_key = null;
    				cursor = index + 1;
    				while( input.charAt(cursor) == ' ' ) cursor++;
    			} else {
    				o[ found_key ] = input.substr( cursor );
    				break;
    			}
    		}
    	}
    
    	return o;
    }
    
    public static function simpleStringToObject_slow( input : String , o : Object = null ) : Object {
    	if ( input == null || !Boolean(input) ) return o;
    	if ( o == null ) o = {};
    
    	input = input.split(' ').join(''); // remove spaces
    	var a : Array = input.split(';');
    	var pair : Array;
    	for ( var i:int=0 ; i 1 ) {
    			o[ pair[0] ] = pair[1];
    		}
    	}
    	return o;
    }

The first one might look like some crap lacking any elegance and style, but it's** twice as fast** as the second one! And hey, if you do this a million times, it can be 5 seconds instead of 10. Might not seem to be that much, but I think it's certainly **worth the extra coding** :-) (Update: I haven't mentioned RegExp here, though it definitely deserves a mention. Thing is that Regular Expressions are just damned slow in Flash compared to String manipulations, especially with longer strings. This is kind of surprising because it's implemented natively. But the implementation obviously isn't too good performance wise. I hope to see improvements with F10, though haven't read anything about it yet - and also haven't tested yet with beta. This little article confirms my experience with RegExp: [With a file of 10,000 lines, the string version is still instantaneous, but the regular expression version takes about five seconds. Even with 180,000 lines, the string version is immediate. We gave up on the regular expression version after over five minutes..](http://www.mischel.com/diary/2006/07/12.htm))

## Comments

**[Jeff](#5 "2008-10-07 04:59:58"):** Reading your code makes me want to puke. I really do.

**[Jeff](#6 "2008-10-07 05:01:42"):** Your code makes me want to vomit, both of them. The shorter one makes me want to vomit a little less so I will go with that, even if it is slower.

**[Kai](#66 "2009-09-21 21:38:30"):** I always appreciate breaking down algorithms to their smallest parts. It's a great exercise in self-improvement and speeds up the code every time. The hard part is balancing the time you spend vs the benefits of speed. What's up with JEFF?

