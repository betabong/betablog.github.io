---
title: Binary Fun - Bits in Bed with Actionscript
link: http://blog.betabong.com/2009/09/22/binary-fun-bits-in-bed-with-actionscript/
description: 
post_id: 297
date: 2009-09-22
created: 2009/09/22 00:19:40
created_gmt: 2009/09/21 23:19:40
post_name: binary-fun-bits-in-bed-with-actionscript
post_type: post
---


![betabits](post_type: post
---

/uploads/2009/09/betabits.png) I went down a few algorithmic roads recently, digging into path finding and – for some obscure reasons – bit manipulations. Or byte. Whatever. Along this way some utility methods (or functions) were born, and I thought: May be some day some of them may be in use to any of you ;) For my dear non-geeky readers: A bit is the smallest part in software. It's either this or that, either 0 or 1, either false or true. With a group of 2 bits you already have 4 states: 00, 01, 10 and 11. With 8 it's 256 and so on (2^n). As it would be too boring to just type 0 or 1, and because we have more than 2 fingers, man invented numbers to accumulate these bits: so 9 stands for 1001, and because 9 is shorter than 1001, we prefer 9. Some even write AB for 10101011, but that's where we come back to geeky world. So after this highly informative introduction, let's get to some code. First, let's count bits: 
    
    
    static public function countBits( value : uint ) : uint {
    	var count:uint = 0;
    	while (value) {
    		if ( value & 1 ) {
    			count++;
    		}
    		value >>>= 1;
    	}
    	return count;
    }
    

Example: countBits( 0xAB ) -> 5 Now sometimes you might wanna know: Does this data contain no more than 1 bit? We could just ask countBits( value ) == 1. But that's not as speedy as it should be, right? So here we go: 
    
    
    static public function is_1_bit( value : uint ) : Boolean {
    	var count:uint = 0;
    	while (value) {
    		if ( value & 1 ) {
    			if (count == 1) return false;
    			count++;
    		}
    		value >>>= 1;
    	}
    	return count == 1;
    }
    

Examples: is_1_bit( 0xAB ) -> false is_1_bit( 0x400 ) -> true uint are by the way 32bit data, so a maximum of 32 of these bits we're talking about can be turned on or off. That's a lot of data. 4'294'967'296 combinations (though not that high compared to the numbers we read every day in the newspapers recently). Anyway, sometimes we might wanna access and set only a group of bits (usually 4 or 8) within this quite large row of bits: 
    
    
    static public function getBitGroup( value : uint , group : uint , len : uint = 4 ) : uint {
    	return ( value >> (group*len) ) % (1 << len);
    }
    
    static public function setBitGroup( value : uint , groupValue :uint , group : uint , len : uint = 4 ) : uint {
    	var pos:uint = group * len;
    	var mask:uint = n_bits(pos);
    	var right_bits:uint = value & mask;
    	value >>>= pos + len;
    	value <<= len;
    	value |= groupValue;
    	value <<= pos;
    	value |= right_bits;
    	return value;
    }
    

Don't they look just groovy?! Yeah baby! Anyway, that's all for now. Stay tuned for some crazy path finding. If I find time (sometimes I wonder how all those bloggers find their time to write so much..) Not to mention Twitter. Boohaa.

## Comments

**[peko](#67 "2009-09-22 15:50:49"):** What about binary xor? AS3 don`t have an default operator :(

**[betabong](#68 "2009-09-22 17:52:23"):** XOR is deadly easy :-) 
    
    
    function xor( v1:uint , v2:uint ) : uint {
    	return v1 ^ v2;
    }

**[Jackson Dunstan](#70 "2009-10-01 02:19:53"):** Your function to check if an int has only a single one value is the same as a function that checks if an int is a power of two. You can do so without the loop for extra speed like this: 
    
    
    function is_1_bit(value:uint): Boolean
    {
    	return value == 0x80000000 || (value & -value) == value;
    }
    

The formula won't work for (1<<31), hence the need for the explicit check.

**[betabong](#73 "2009-10-01 08:41:29"):** Love that!! And it's about 40% faster too :) Allow me one tiny little correction though: 
    
    
    function is_1_bit(value:uint): Boolean
    {
    	return value != 0 && ( value == 0x80000000 || (value & -value) == value );
    }

**[Andy Stricker](#91 "2010-04-20 21:40:19"):** countBits is called population count or hamming weight in computer science. There is a good chapter about the optimization available for population count in the O'Reilly book "Beautiful Code" in chapter Chapter 10: "The Quest for an Accelerated Population Count" (http://oreilly.com/catalog/9780596510046). I'll like to see how those improvements apply for high level languages. Following an optimized function for 32 bit unsigned int population count in Javascript (derived from http://en.wikipedia.org/wiki/Hamming_weight): 
    
    
    function pop(x) {
       x &= 0xFFFFFFFF;
       x -= (x >> 1) & 0x55555555;
       x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
       x = (x + (x >> 4)) & 0x0f0f0f0f;
       return (x * 0x01010101) >> 24;
    }

