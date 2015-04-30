---
title: Reset all CSS
date: 2014-12-10
---


I know there's been a lot of debate on this one, but I still like the simplicity of a universal reset:
    
    
```css
html {
  font-size: 100%;
  line-height: 1;
}
* {
  margin: 0;
  padding: 0;
  font: inherit;
  line-height: inherit;
  text-decoration: none;
  border: 0;
  outline: 0;
  vertical-align: baseline;
  background: transparent;
}
```

Of course you **have to** define / normalise a few elements. But in most design weighted projects you'd have to do this anyway. Just may be do it on the element selector for form inputs at least:



