/**
 * pjaxAddress plugin
 */
;(function($){
	
	
	function _callAddressPlugin(options){
		
		var url = options.url
			, $container = $( options.container )
			, ref = options.ref || url;
		
		if( $.address.value() == ref){
			$container.trigger("pjax:end");
			return;
		}
		
		$container.load( url + " " + options.fragment, function(xhr, s){
			
	        var title = $.trim( $(this).find('title').remove().text() );
	        if ( title ) document.title = title;
	        
			$.address.value( ref );
			
			// Google Analytics support
			if ( (options.replace || options.push) && window._gaq ){
				_gaq.push(['_trackPageview'], url);
			}
			
			$( this ).trigger("pjax:end");
		});
	}
	
	
	$.pjaxAddress = function( options ) {
		
		// init options
		optiosns = $.extend({
				push	: true,
				replace : false
			}
			,options);
		
		if( $.support.pjax ){
			$.pjax(options);
		}else{
			_callAddressPlugin( options );
		}
		return this;
	};
})(jQuery);
