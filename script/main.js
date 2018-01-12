$(document).ready(function(){

	//scroll menu
	var itMenu = $('#menu-header ul:first-child li');
	var imgLogo = $('header img');
	$(window).scroll(function(){
		if($(window).scrollTop() != 0){
			itMenu.css('lineHeight', '50px');
			imgLogo.width(95);
			$('body').css('padding-top: 80px');
		}
		else {
			itMenu.css('lineHeight', '124px');
			imgLogo.width(171);
			$('body').css('padding-top: 124px');
		}
	});

	//Icon top
	var top = $('#gotop');
	$(window).scroll(function(){
		if($(window).scrollTop() >= 100){ top.fadeIn(); }
		else { top.fadeOut(); }
	})

	top.click(function(){
		$('body, html').animate({scrollTop: 0}, '2000');
	});

	//Drag image
	$('#banner .banner-1[data-orientation!="vertical"]').twentytwenty({
		default_offset_pct:0.5,
		no_overlay: true
	});

	//dots
	var banners = $('#banner .banner');
	$.each(banners, function(){
		$('#banner .handlers').append('<div class="dot" />');
	});
	$('#banner .handlers .dot').first().addClass('active');

	$('body').mousedown(function(ev){
		
	})

});