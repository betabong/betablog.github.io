---
title: 3D Point Cloud with Javascript and Canvas
link: http://blog.betabong.com/2009/03/05/javascript-canvas-3d/
description: 
post_id: 208
date: 2009-03-05
created: 2009/03/05 16:02:32
created_gmt: 2009/03/05 15:02:32
post_name: javascript-canvas-3d
post_type: post
---


I was doing some stuff with 3D in Flash. And so I wondered wether sth similar might be achieved with pure HTML/Javascript. And yes, modern browsers (so not IE) can! What I've done is this (a litte simplified): 

  * Migrated my 3D engine I've written years ago from AS1 to Javascript
  * Extracted point cloud from Colada 3D object
  * Draw rectangles for every point to canvas
And that's how it looks:  Should work on Safari, Firefox and Opera.
