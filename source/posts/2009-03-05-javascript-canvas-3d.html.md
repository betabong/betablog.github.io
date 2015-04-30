---
title: 3D Point Cloud with Javascript and Canvas
link: http://blog.betabong.com/2009/03/05/javascript-canvas-3d/
date: 2009-03-05
---


I was doing some stuff with 3D in Flash. And so I wondered wether sth similar might be achieved with pure HTML/Javascript. And yes, modern browsers (so not IE) can! What I've done is this (a litte simplified): 

  * Migrated my 3D engine I've written years ago from AS1 to Javascript
  * Extracted point cloud from Colada 3D object
  * Draw rectangles for every point to canvas

And that's how it looks: 

<canvas id="canvas" width="512" height="360"></canvas>  
<script src="http://www.betabong.com/work/lab/js/3d/3dEngine.js" type="text/javascript" charset="utf-8"></script>
<script src="http://www.betabong.com/work/lab/js/3d/duck.js" type="text/javascript" charset="utf-8"></script>

Should work on Safari, Firefox and Opera.
