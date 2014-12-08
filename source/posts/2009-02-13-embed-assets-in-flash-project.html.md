---
title: Embed Assets in Flash Project
link: http://blog.betabong.com/2009/02/13/embed-assets-in-flash-project/
date: 2009-02-13
---


There's still quite a gap between Flash and Flex – while Flash is great for creating animations, vector symbols and just keeping little assets within one place, Flex Builder is so very much better for anything code. So how to link those two together? Though I've written some posts about how to code within Flex Builder and [compile from there using Flash IDE](/2008/12/03/test-movie-from-flex-to-flash-easy-way/), I personally don't like that at all and only use it for some few older AS3 projects. There are better methods, ways to compile from within Flex Builder while still being able to make use of Flash comfort. There's a neat way to **embed a library** without loosing any functionality (like little scripts). I've first seen it at [Grant Skinner](http://www.gskinner.com/blog/archives/2007/03/using_flash_sym.html) (who's doing great stuff, one of my favorites in the flash community really). Let's say, you have a assets.fla and a published assets.swf. Now here we go:
    
    
    [SWF(width="750", height="500", frameRate="30", backgroundColor="#111111")]
    dynamic public class MyApplication extends Sprite
    {
    	
    	[Embed(source="assets/assets.swf", mimeType="application/octet-stream")]
    	public var StageAssets:Class;
    	
    	public function GlobusFlow()
    	{
    		loadEmbedded( StageAssets );
    	}
    
    	public function loadEmbedded( cls : Class ) : void {
    		trace( "[Preloader] Loading embedded" );
    		var loader : Loader = new Loader();
    		loader.contentLoaderInfo.addEventListener( Event.COMPLETE , this.handleComplete );
    		var context : LoaderContext = new LoaderContext( false , ApplicationDomain.currentDomain );
    		loader.loadBytes( new cls() , context );
    	}
    
    	protected function handleComplete( e : Event ) : void {
    		var app : Sprite = Sprite( LoaderInfo( e.target ).content );
    		this.loaded( app );
    	}
    	
    	protected function loaded(target:Sprite):void {
    		var background : MovieClip = target as MovieClip;
    					
    		var mainChildren : Array = [];
    		for ( var i:int = 0 ; i
    
    This does a bit more than just make the library available. In loaded() we'll loop through all assets that are «on stage» in the loaded/embedded movieclip (assets.swf), and add each of them to our stage. That leads to a state that's quite similar to as if we'd code within assets.fla itself. Hmm... well, really, that sounds more complicated than it is :-) It mainly gives you the feeling of being able to code within a SWF file. You can visually do your stuff in assets.fla, you can add a background and whatever to its stage, keep a nice library with graphics, animations, sounds and fonts.. and schwupps, here you go!
    
    If you have Fonts embedded in your library, there's a tiny little more to do:
    
    
    
    
    protected function loaded(target:Sprite):void {
    	// ... (all the other stuff, see above)
    	registerFont( 'BoldFont' );
    }
    
    public static function registerFont( fontLinkageId : String ) : void {
    	var fontClass : Class = getDefinitionByName( fontLinkageId ) as Class;
    	Font.registerFont( fontClass );
    }
    

If you just wanna embed fonts without any registering, you can also go like that: 
    
    
    [Embed(source='assets/fonts.swf' , symbol='BoldFont')]
    public var BoldFont : Class;
    

Of course, instead of embedding everything, you can also load this dynamically (I mean, after all we have the Loader ready, don't we? :) The advantage of that is that you can give your assets to some dumb Flasher and he can mess around with it without you having to recompile the app. I know, this is all snippets and frickets, I'm just too lazy right now to build an example Flex project. Still I hope it's of some use for one or the other.

## Comments

**[Kirill](#45 "2009-05-30 13:06:23"):** One thing I don't like about this is that the code is tightly-bound to the graphics, which makes dynamic skinning somewhat of a pain. Imagine having several kinds of buttons in your application. Using this approach you have to create a class for each of them (at least to embed the swf, the main button logic can be put into the superclass). In terms of code having to create a subclass just to embed a different swf? Ehhh... What we ended up doing is having a pretty good asset loading engine take care of loading the required swfs at run time and then in the application logic pulling out the needed graphics from its ApplicationDomain. That way you only need one class for a button. The button skin is loaded dynamically at run time as opposed to be hardwired into it at compile time. This also allows for on the fly skinning of the button while the application is running. Another advantage of this is that we didn't make our framework+applications dependent on one kind of compiler. If somebody in the future makes a better compiler than mxmlc (and that's easily possibly with lack of some important compiler functionality on part of mxmlc) and decides to change the syntax of all those compiler directives or not implement them at all, then using your and Grant's approach you're out of luck and have to continue to use the crappy, old mxmlc compiler. As opposed to our approach with which the better compiler can be used instead and the application will still function like it did.

**[Sev](#46 "2009-06-02 09:39:01"):** Just to clarify, this really isn't some kind of standard method "how you should do it" or "how I usually do it". It's just a technique, and like most techniques, this one can be useful too for specific needs (in my case it was for an easy conversion of an older fla-project into flex, without having to redesign too much). Also I want to mention that, no, you don't need a class for each one of the loaded assets (for each button, graphic, movieclip etc.) That's the whole point: you instead embed the library, and then you're able to access any asset within that embedded library, as if you'd loaded it dynamically into your Application Domain.

**[Markavian](#64 "2009-08-27 17:42:08"):** I've been a flash develop for some 8 years now, and I'm constantly reviewing the way I work between the Flash IDE and pure AS3 to simplifying and separate layouts from code without causing myself too much work. On the whole, its a hassle, with me ending up with named definitions in Flash IDE, the Flash Library and duplicate references in my code. As much as I'd like to create purely code based apps, some layouts are just impossible to reason about. I like the look of above solution because it faithfully reproduces a flash layout in a purely AS3 program independent of the Flash IDE compiler. I shall investigate and see if it works for my current project. At the moment I'm struggling because I don't think the Flash IDE Compiler understands: [Embed(source="GameAssets.swf", symbol="character_john")] public static var John:Class; And so, this is a bit useless to me at the moment.

