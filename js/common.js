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
	
	
	// click event handler
	$(targetLink).click( function(e){
			var href = $(this).attr("href");
			_loadHandler({url:href});
			return false;
		});
	
	// support pjax setup popstate handler
	if($.support.pjax){
		
		// jQuery.pjax デフォルトの挙動を解除、再設定
		$(window).unbind('popstate').bind('popstate', function(e){
			if(e.state){
				_loadHandler( {url:location.href, push:false} );
			}
		});
	}
	
	// if not support pjax, user jquery.address plugin
	if( !$.support.pjax ){
		
		// setup event listener
		// called  changeHash & page loaded
		$.address.externalChange(function(e) {
			var hash = $.address.value();
			_loadHandler({url:hash});
			return false;
		});
		
		// redirect to top
		var rex = new RegExp("^/Ajax(/.*)$","i");
		
		if( location.pathname.match(rex) ){
			location.href='/Ajax/#' + RegExp.$1;
		}
	}
});
