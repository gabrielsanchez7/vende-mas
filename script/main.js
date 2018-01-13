$(document).ready(function(){

	//scroll menu
	var itMenu = $('#menu-header ul:first-child li');
	var imgLogo = $('header img');
	$(window).scroll(function(){
		if($(window).scrollTop() != 0){
			itMenu.css('lineHeight', '65px');
			imgLogo.width(95);
			$('body').css({paddingTop: '66px'});
		}
		else {
			itMenu.css('lineHeight', '125px');
			imgLogo.width(171);
			$('body').css({paddingTop: '125px'});
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
			image: 'unico-pago.png',
			title: 'Pago Único',
			description: 'Esta moderna herramienta puede ser tuya a un costo mínimo. ¡Olvídate de los alquileres mensuales, realiza el primer pago y el MPOS ya es tuyo!'
		},
		{
			image: 'dinero-seguro.png',
			title: 'Tu dinero está más seguro',
			description: 'Porque nos preocúpanos por tu seguridad, a través de esta herramienta evitarás acumular mucho efectivo en tu local. De esta manera podrás reducir riesgos de robo.'
		},
		{
			image: 'requisitos.png',
			title: 'Requisitos Mínimos',
			description: 'Sólo necesitas de un smartphone con un plan de datos, tu correo electrónico y una cuenta bancaria. ¡Así de simple!'
		},
		{
			image: 'unico-pago.png',
			title: 'Depósito dentro de las 48 horas útiles',
			description: 'Ingresa tu cuenta de ahorros o cuenta corriente en concordancia con los datos de tu registro.'
		}
	];

	var templateListBeneficios = Handlebars.compile($('#template-list-beneficios').html());

	$.each(data, function(index, value){
		$('#list-beneficios ul').append(templateListBeneficios(value));
	});

	//menu links
	$('#menu-header .menu').click(function(ev){
		ev.preventDefault();
		var target = $(ev.target).attr('class');
		var goZone = $('#' + target).offset().top;
		console.log(target + ': ' + goZone);
		$('html, body').animate({scrollTop: (goZone - 66) + 'px'}, 500, 'easeInQuart');
	});

	//validación de formulario
	var nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s+]{3,25}$/;
	var dniRegex = /^([0-9]{8})+$/i;
	var tlfRegex = /^([0-9]{9})+$/i;
	var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

	function invalidForm(){
		$('form#contacto').find('input[type="text"]').animate({opacity: 0}, 100);
		setTimeout(function(){
			$('form#contacto').find('input[type="text"]').animate({opacity: 1}, 100);
		}, 270);
	}

	function validate(input, regex){
		if(regex.test($(input).val())){
			$(input).attr('data-valid', true);
			$(input).css({
				'-webkit-box-shadow': '0px 0px 11px 0px transparent',
				'-moz-box-shadow': '0px 0px 11px 0px transparent',
				'box-shadow': '0px 0px 11px 0px transparent',
				'border': '1px solid transparent'
			});
			$(input).focus(function(){
				$(this).css({
					'-webkit-box-shadow': '0px 0px 11px 0px rgba(85,152,219,1)',
					'-moz-box-shadow': '0px 0px 11px 0px rgba(85,152,219,1)',
					'box-shadow': '0px 0px 11px 0px rgba(85,152,219,1)',
					'border': '1px solid rgba(85,152,219,1)'
				});
			});
			$(input).focusout(function(){
				$(this).css({
					'-webkit-box-shadow': '0px 0px 11px 0px transparent',
					'-moz-box-shadow': '0px 0px 11px 0px transparent',
					'box-shadow': '0px 0px 11px 0px transparent',
					'border': '1px solid transparent'
				});
			});
			return true;
		}
		else {
			$(input).focus();
			$(input).css({
				'-webkit-box-shadow': '0px 0px 11px 0px rgba(161,103,53,1)',
				'-moz-box-shadow': '0px 0px 11px 0px rgba(161,103,53,1)',
				'box-shadow': '0px 0px 11px 0px rgba(161,103,53,1)',
				'border': '1px solid rgba(161,103,53,1)'
			});
			$(input).focus(function(){
				$(this).css({
					'-webkit-box-shadow': '0px 0px 11px 0px rgba(161,103,53,1)',
					'-moz-box-shadow': '0px 0px 11px 0px rgba(161,103,53,1)',
					'box-shadow': '0px 0px 11px 0px rgba(161,103,53,1)',
					'border': '1px solid rgba(161,103,53,1)'
				});
			});
			return false;
		}
	}

	$('form#contacto').submit(function(){
		validate('#email', emailRegex);
		validate('#telefono', tlfRegex);
		validate('#dni', dniRegex);
		validate('#name', nameRegex);

		var validos = $(this).find('input[data-valid="true"]');
		if(validos.length != 4) {
			invalidForm();
			return false;
		}
		else {
			return true;
		}
	});

});