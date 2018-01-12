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

	//Slider
	var banners = $('#banner');
	var handlers = $('#banner .handlers');
	var position = 1;
	var intervalo;

	$.each(banners.find('.banner'), function(index, value){
		handlers.append('<div class="dot" id="dot' + (index+1) + '" />');
	});

	banners.find('.banner').first().addClass('active').fadeIn();
	handlers.find('.dot').first().addClass('active');

	var slide = function(){
		if(position <= banners.find('.banner').length){
			banners.find('.banner.active').removeClass('active').next('.banner').addClass('active');
			banners.find('.banner.active').fadeIn().siblings('.banner').fadeOut();
			handlers.find('.dot.active').removeClass('active').next().addClass('active');
			position++;
			if(position > banners.find('.banner').length){
				banners.find('.banner').fadeOut();
				banners.find('.banner').first().fadeIn().addClass('active');
				handlers.find('.dot').first().addClass('active').siblings().removeClass('active');
				position = 1;
			}
		}
	}

	intervalo = setInterval(slide, 3000);

	handlers.find('.dot').click(function(ev){
		var target = ev.target;
		var id = $(target).attr('id').split('dot')[1];
		$('#dot' + id).addClass('active').siblings().removeClass('active');
		position = id;
		banners.find('.banner').fadeOut();
		banners.find('.banner-' + id).fadeIn();
		banners.find('.banner-' + id).addClass('active').siblings('.banner').removeClass('active');
		clearInterval(intervalo);
		intervalo = setInterval(slide, 3000);
	});

	//Lista de beneficios
	var data = [
		{
			image: 'vende-mas-unico-pago.png',
			title: 'Pago Único',
			description: 'Esta moderna herramienta puede ser tuya a un costo mínimo. ¡Olvídate de los alquileres mensuales, realiza el primer pago y el MPOS ya es tuyo!'
		},
		{
			image: 'vende-mas-dinero-seguro.png',
			title: 'Tu dinero está más seguro',
			description: 'Porque nos preocúpanos por tu seguridad, a través de esta herramienta evitarás acumular mucho efectivo en tu local. De esta manera podrás reducir riesgos de robo.'
		},
		{
			image: 'vende-mas-requisitos.png',
			title: 'Requisitos Mínimos',
			description: 'Sólo necesitas de un smartphone con un plan de datos, tu correo electrónico y una cuenta bancaria. ¡Así de simple!'
		},
		{
			image: 'vende-mas-unico-pago.png',
			title: 'Depósito dentro de las 48 horas útiles',
			description: 'Ingresa tu cuenta de ahorros o cuenta corriente en concordancia con los datos de tu registro.'
		}
	];

	var templateListBeneficios = Handlebars.compile($('#template-list-beneficios').html());

	$.each(data, function(index, value){
		$('#list-beneficios ul').append(templateListBeneficios(value));
	});

});