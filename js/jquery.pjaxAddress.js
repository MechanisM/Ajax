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
	        if ( title ) $.address.title(title);
	        
			$.address.value( ref );
			
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
		
		_callAddressPlugin( options );
	};
})(jQuery);
