jQuery.fn.roundtext = function( options ) {
	
	var settings = jQuery.extend({
		radius: 200
	} , options );
	
	var counter = 0;
	
	var action = function( elem , radius ) {
		var target = $(elem);
		var text = target.text();
		
		var html = '';
		for (var i=0; i < text.length; i++) {
			html += '<span><span>' + text.substr( i , 1 ) + '</span></span>';
		};
		target.html( html );
		
		var charWidths = [];
		var textWidth = 0;
		var charWidth;
		target.children().each(function(index) {
			charWidth = $(this).width();
			charWidths[index] = charWidth;
			textWidth += charWidth;
		});
		
		var pos = 0;
		target.children().each(function(index) {
			var angle = ( (textWidth/2-charWidths[0]/2) - pos ) / radius;
			var rotTransform = 'rotate(' + (-angle/Math.PI*180) + 'deg )';
			var css = {
				display: 'block' ,
				position: 'absolute' ,
				'top': -Math.cos(angle) * radius + radius ,
				'left': -Math.sin(angle) * radius,
				'-webkit-transform': rotTransform,
				'-moz-transform': rotTransform,
				'-o-transform': rotTransform,
				'-ms-transform': rotTransform
			};
			$(this).css( css );
			$(this).children().css( {
				display: 'block' ,
				position: 'absolute' ,
				left: -$(this).children().width() / 2 ,
				bottom: -0.2 * $(this).children().height()
			});
			pos += charWidths[index] / 2 + charWidths[index+1]/2;
		} );
	}
	
	return this.each(function(){
		action( this , settings.radius );
	});
	
}