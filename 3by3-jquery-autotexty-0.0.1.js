/**
 * Autotexty attaches to text inputs and allows the user to choose text for the
 * input from the text you provide.
 *
 * Send autotexty a collection of words or phrases and when the user focuses on
 * the input that collection will be rendered and each word or phrase will be
 * clickable. The words are rendered as links with the class 'autotexty_item'
 * inside a <div> with the class 'autotexty'
 *
 * When the user clicks on one of the words or phrases it will be added to the
 * attached input.
 *
 * Here's an example:
 * $('#text_input').autotexty({data: ['my','list','of','words']})
 *
 * The available settings are as follows:
 *
 * data: an array of words or phrases for autotexty
 * separator: the character(s) to add between words when they are added to the input
 * width: the width for the autotexty <div>
 * maxHeight: the maximum height for the autotexty <div> before it becomes scrollable
 * track: move the autotexty <div> to the input in case the input moves
 * background: set the background of the autotexty <div>
 *
 * Copyright (c) 2014 Ben Levy
 * Released under the MIT License
 *
 */

(function($){
	$.fn.autotexty = function( options ) {
		var settings = $.extend({
			data: null,
			separator: ', ',
			width: null,
			maxHeight: 100,
			track: true,
			background: "#FFF"
			}, options );

		return this.each(function() {
			if(!settings.data.length){
				return;
			}

			var input = $(this);
			var div = $('<div/>').addClass('autotexty');
			var autotext, item, index, value;

			setWidth(div, input, settings.width);
			div.css('position', 'absolute');
			div.css('background', settings.background);
			div.css('z-index', 500);
			div.hide();

			$.each(settings.data, function(index, value){
				item = $('<a/>');
				item.addClass('autotexty_item');
				item.css('padding', '5px');
				item.css('cursor', 'pointer');
				item.text(value);
				item.on('click', null, null, function(){
					var re = new RegExp($(this).text());
					if(input.val().match(re)){
						return;
					}
					autotext = '';
					if(input.val()){
						autotext += input.val() + settings.separator;
					}
					autotext += $(this).text();
					$(input).val(autotext);
				});
				div.append(item);
			});

			input.after(div);

			div.css('min-height', div.height() + 10);
			if(settings.maxHeight){
				div.css('max-height', settings.maxHeight);
				div.css('overflow', 'auto');
				div.css('word-wrap', 'break-word');
			}

			input.on("focus", null, null, function(){
				if(div.is(':visible')){
					div.hide();
				}else{
					if(settings.track){
						div.css('top', input.position().top + input.outerHeight() + 2);
					}
					// if the input was hidden (or was changed) then it won't
					// have a resolved pixel width until it is displayed, so the
					// width needs setting again to be safe
					setWidth(div, input, settings.width);
					div.show();
				}
			});

			input.on("blur", null, null, function(){
				if(div.is(':visible')){
					div.hide();
				}
			});

			$('body').on("mousedown", null, null, function(event){
				var container = $('.autotexty');

				if(!input.is(event.target)
					&& !container.is(event.target)
					&& container.has(event.target).length === 0){
			        container.hide();
			    }
			});

		});


		function setWidth(div, input, width){
			var autoTextWidth = width ? width : input.width();
			div.width(autoTextWidth);
		}

	};
}( jQuery ));