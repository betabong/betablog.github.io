---
title: Fluid Ratio Height
link: http://blog.betabong.com/2012/02/02/fluid-ratio-height/
date: 2012-02-02
---


[Rouven](http://www.nirazul.ch/), a co-worker of mine, found a very neat CSS trick on how to create proportional container. Let's say you want to embed a video in your fluid layout (content adjusts to page width). What you'd want is something like: 
    
    
```css
.video {
   height: 0.5625x;
}
```

Which means that your height should be 56.25% of your width (which is 100% by default with block elements). Why 56.25%? Because our video has the ratio of 16/9 and 9 divided by 16 is 0.5625. Well, obviously, this won't work, because CSS doesn't provide a possibility to directly define height as a percentage of width. What Rouven found was a really nice work-around: 

```html
<style>
   .video {
      position: relative;
   }
   .video > .height {
      margin-top: 56.25%;
   }
   .video > iframe {
      position: absolute;
      top: 0px; left: 0px;
      width: 100%; height: 100%;
   }
</style>
<div class="video">
    <div class="height"></div>
    <iframe …></iframe>
</div>
```

Why does this work? Because all percentage values of margin [relate to width](http://http://www.w3.org/TR/CSS2/box.html#margin-properties), even top and bottom. Surprised? I was! What I don't like about that solution is this semantically worthless div as a placeholder for the div. But guess what, there's an even simpler solution: [padding percentages](http://www.w3.org/TR/CSS2/box.html#padding-properties) work the exactly same way. The final solution: 
    
```html
<style>
   .video {
      position: relative;
      padding-top: 56.25%;
   }
   .video > iframe {
      position: absolute;
      top: 0px; left: 0px;
      width: 100%; height: 100%;
   }
</style>
<div class="video">
    <iframe …></iframe>
</div>
```

    
    

[Demo](/showcase/fluid-proportion.html)
