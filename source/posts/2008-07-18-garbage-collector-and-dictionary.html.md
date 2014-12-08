---
title: Garbage Collector and Dictionary
link: http://blog.betabong.com/2008/07/18/garbage-collector-and-dictionary/
date: 2008-07-18
---


[Weak references](http://dispatchevent.org/mims/creating-weak-references-in-as3/) are cool. No. they are substantial. I don't know how we lived without them before. Anyway, they made our (we = flash developers) life better. I use them very often, when adding event listeners or caching with dictionaries (and I'm sure I'd use them even more often if there was any more possibilty provided). Still you can struggle over unexpected behaviour. First of all there is no guarantee that objects are [garbaged](http://www.adobe.com/devnet/flashplayer/articles/garbage_collection.html) (well it's probably not a memory thing.. more about unreferencing, what the heck do I know?!) as soon as there aren't any references left. But, in my experience, weak references work quite good.. I didn't have to worry about them living for some more seconds or so. But. But! They'll live on at least until next rendering step, meaning until actionscript execution is done. I struggled over this with a validation manager, that keeps tracks of unvalidated objects in a weak dictionary. So when object unvalidates, it tells so to the validator who will validate before rendering update. Now let's assume the object shall be destroyed in the mean time – it will unlisten to dispatchers, it will unlink sprites and so on.. but may be it's already registered in the validator. So it'll stay alive to fullfill next validation processing. (Which led into uncaught errors due to null references in the destroyed object in my example.) I could of course unregister at the validator at destroy. But.. hmm.. I want my engine to be as fast and robust as possible and unregistering can be difficult and time consuming (especially when 1000 objects will be destroyed). So what I've done is, I set a flag 'destroyed' when destruction is complete, and on each validation I'll check for that flag: 
    
    
    public function validateDisplay() : void {
      if ( _render_dirty && !destroyed ) {
        render();
      }
    }

Checking against a boolean flag is fast as hell, so that's cool. And also, it won't happen often (it was really a rare exceptional case actually). So besides weak references in AS3 we still have to be careful as hell about memory leaks. By the way, the profiler in Flex Pro is just fucking great :-) On a side note: Any one any info on MethodClosure objects lying around in memory?? I know what they are used for, but it seems they live and live and live....
