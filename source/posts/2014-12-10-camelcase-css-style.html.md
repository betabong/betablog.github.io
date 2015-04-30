---
title: Camel Style Structured CSS (CSSCSS)
date: 2014-12-10
---


In my [Company](http://www.hinderlingvolkart.com) we've been using some custom SMACSS / OOCSS / BEM inspired css methodology for quite a while.

Those conventions look something like this:
    
    
```css
.my-module {
  …
}
.my-module--variant {
  …
}
.my-module__named-child {
  …
}

/* or */

.my_module {
  …
}
.my_module-variant {
  …
}
.my_module--named_child {
  …
}
```

The latter one is pretty close to what we currently used. While we all appreciate the safety and quality we gain out of going down that way (read more about it here or here), I personally never liked very much the reading experience. I mean, we read this code day in day out, so it should be easy to read and write.

Too many underscores and dashes just kind of look geeky and techie and not elegant. So why not use something our near-native language came up with in the first place (or so it seems)? In german language we use uppercase a lot, basically for every Substantive and there's a Lot out the in the Wild. While that might break things for english users who are used to have an uppercase letter separate sentences from each other (in most cases, God and Texas and John are well known exceptions), we are floated by uppercase and it can help structuring.

To come to the point: why not use uppercase letters to structure selectors? After all, CSS selectors are case sensitive when it comes to IDs and classes. How would that look like? 

```css
.MyModule {
  …
}
.MyModule_variant {
  …
}
.MyModule--namedChild {
  …
}
.MyModule.isActive {
  …
}
.js-MyModule {
  /* for associating with JS modules - not for styling */
}
```

I'm still using two dashes to mark a child, mainly because the sepearation should be that distinct. Is it more readable? I think it is, but not by much. But it is more logical to me: modules start with an uppercase letter, everything else not. The distinction between module name, states and descendants becomes clearer.

