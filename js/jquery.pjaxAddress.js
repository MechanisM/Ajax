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
		
		
		$.ajax({
			url: url,
			datType: "html",
			context: $container,
			beforeSend: function(xhr){
				xhr.setRequestHeader('X-Pjax-Address', 'true');
			},
			success: function(data, dataType, xhr){
				
				var $data		= $(data)
					, $contents	= $data.find( options.fragment )
					, title		= $("title",data).text();
				
				
				$(this).html( $contents );
				
				$.address.value( ref );
				
			},
			complete: function(xhr, textStatus){
				$(this).trigger("pjax:end",[xhr, textStatus]);
			},
			error:function(xhr, status, errorThrown){
				
			}
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
