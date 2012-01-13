$(function() {
	
	var targetLink		= "a"
		, container		= fragment	= "#main"
		, $container	= $(container)
		, speed			= "slow";
	
	
	// before ajax
	function _loadHandler(op){
		
		$container.fadeOut(speed, function(){
			var _defaults = {container:container, fragment:fragment};
			op = $.extend(op, _defaults);
			
			var rex = new RegExp("^/Ajax(/.*)$","i");
			if( op.url.match(rex) ){
				op.ref = RegExp.$1;
			}
			
			$.pjaxAddress( op );
		});
		return false;
	}
	
	// after pjax
	$container.bind('pjax:end', function(e, xhr) {
			$(this).fadeIn(speed);
		});
	
	$.address.state("/Ajax");
	
	// click event handler
	$(targetLink).click( function(e){
			var href = $(this).attr("href");
			_loadHandler({url:href});
			return false;
		});
	
	
	// setup event listener
	// called  changeHash & page loaded
	$.address.externalChange(function(e) {
		var hash = $.address.value();
		_loadHandler({url:hash});
	});
	
});
