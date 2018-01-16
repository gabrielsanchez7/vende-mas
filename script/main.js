//Lista de beneficios
function templateHome(){
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
}

function preventMenu(){
	$('#menu-header .menu').click(function(ev){
		ev.preventDefault();
	});
}

$(document).ready(function(){

	//scroll menu
	var itMenu = $('#menu-header ul:first-child li');
	var imgLogo = $('header img');
	$(window).scroll(function(){
		if($(window).scrollTop() != 0){
			itMenu.css('lineHeight', '65px');
			$('#btn-menu-responsive').css('lineHeight', '64px');
			imgLogo.width(95);
			$('body').css({paddingTop: '66px'});
		}
		else {
			itMenu.css('lineHeight', '125px');
			$('#btn-menu-responsive').css('lineHeight', '124px');
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
	bgBanner();
	inAnimationOne();

	var slide = function(){
		if($('.banner-1').is('.active')){
			banners.find('.banner').fadeOut();
			inAnimationOne();
		}
		else {
			outAnimation('.banner.active');
		}
		setTimeout(function(){
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
			bgBanner();
			inAnimation('.banner.active');
		}, 600);
	}

	intervalo = setInterval(slide, 9000);

	handlers.find('.dot').click(function(ev){
		var target = ev.target;
		var id = $(target).attr('id').split('dot')[1];
		$('#dot' + id).addClass('active').siblings().removeClass('active');
		position = id;
		if($('.banner-1').is('.active')){
			banners.find('.banner').fadeOut();
			inAnimationOne();
		}
		else {
			outAnimation('.banner.active');
		}
		setTimeout(function(){
			banners.find('.banner').fadeOut();
			banners.find('.banner-' + id).fadeIn();
			banners.find('.banner-' + id).addClass('active').siblings('.banner').removeClass('active');
			bgBanner();
			inAnimation('.banner.active');
		}, 1000);
		clearInterval(intervalo);
		intervalo = setInterval(slide, 9000);
	});

	function bgBanner(){
		if($('.banner-1').is('.active')){
			$('#banner').css('backgroundImage', 'url(../assets/fondo-banner-1a.jpg)');
		}
		else if($('.banner-5').is('.active')){
			$('#banner').css('backgroundImage', 'url(../assets/fondo-banner-5.jpg)');
		}
		else {
			$('#banner').css('backgroundImage', 'url(../assets/bg-banner.jpg)');
		}
	}

	function inAnimation(banner){
		var banner = $('#banner ' + banner);
		var optionAnimatonText = {
			animation: 'banner2-4 0.25s ease',
			opacity: 1,
			transform: 'translateY(0)'
		}
		banner.find('h2 span:first-child').css(optionAnimatonText);
		banner.find('img').css({
			transform: 'translateX(0)',
			opacity: 1
		});

		setTimeout(function(){
			banner.find('h2 span:last-child').css(optionAnimatonText);
		}, 100);

		setTimeout(function(){
			banner.find('.here p').css('opacity', 1);
		}, 400);

		setTimeout(function(){
			banner.find('.here div').css('opacity', 1);
		}, 600);
	}

	function outAnimation(banner){
		$(banner).find('h2 span:last-child, .here p, .here div').removeAttr('style');
		$(banner).find('img').css({
			opacity: 0,
			transition: '0.25s linear'
		});
		setTimeout(function(){
			$(banner).find('h2 span:first-child').css({
				transform: 'translateY(-40px)',
				opacity: 0,
				transition: '0.2s linear'
			});
			$(banner).find('img').css({
				transform: 'translateX(100%)',
				transition: '1s ease-in-out'
			});
		}, 300)
	}

	function inAnimationOne(){
		var banner = $('#banner .banner-1');
		banner.find('h2 span:first-child').css({
			transform: 'translateX(0)',
			opacity: 1
		});
		setTimeout(function(){
			banner.find('h3, p').css({
				transform: 'translateY(0)',
				opacity: 1
			});
			banner.find('img, .compralo').css('opacity', 1);
		}, 200);
		setTimeout(function(){
			banner.find('h2 span:last-child').css({
				transform: 'translateX(0)',
				opacity: 1
			});
		}, 500);
	}

	function outAnimationOne(){
		$(banner).find('h2 span:first-child').css({
			transform: 'translateX(700px)',
			opacity: 0
		});
		$(banner).find('h3, p').css({
			transform: 'translateY(250px)',
			opacity: 0
		});
		$(banner).find('img, .compralo').css('opacity', 0);
		$(banner).find('h2 span:last-child').css({
			transform: 'translateX(700px)',
			opacity: 0
		});
	}

	//menu links
	$('#menu-header .menu').click(function(ev){
		// ev.preventDefault();
		var target = $(ev.target).attr('class');
		var goZone = $('#' + target).offset().top;
		console.log(target + ': ' + goZone);
		$('html, body').animate({scrollTop: (goZone - 66) + 'px'}, 500, 'easeInQuart');
	});

	//overflow modal
	function sizeModal(id){
		var size = $(id + ' .modal').height();
		if($(window).innerHeight() < size){
			$(id + ' .modal').css('overflowY', 'scroll');
		}
		else {
			$(id + ' .modal').css('overflowY', 'visible');
		}
	}

	//mostrar y ocultar modales	
	function showModal(button, modal){
		$(button).click(function(ev){
			ev.preventDefault();
			$('body').css('overflowY', 'hidden');
			$(modal).fadeIn();
			setTimeout(function(){
				$(modal + ' .modal').css({
					animation: 'show-modal 0.3s ease',
					opacity: 1,
					transform: 'translateY(0)'
				});
				sizeModal('#modal-contacto');
				sizeModal('#modal-simulador');
				$(window).resize(function(){
					sizeModal('#modal-contacto');
					sizeModal('#modal-simulador');
				});
			}, 200);
		});

		$(modal).click(function(ev){
			ev.preventDefault();
			$(modal).fadeIn();
			setTimeout(function(){
				$(modal + ' .modal').css({
					animation: 'show-modal 0.3s ease',
					opacity: 1,
					transform: 'translateY(0)'
				});
			}, 200);
		});
	}

	function hideModal(modal){
		$(modal + ' .modal').click(function(ev){
			ev.stopPropagation();
		});

		$(modal).click(function(ev){
			var target = ev.target;
			$('body').css('overflowY', 'visible');
			if(!$(target).is('.modal')){
				$(modal + ' .modal').css({
					animation: 'hide-modal 0.3s ease',
					opacity: 0,
					transform: 'translateY(-100px)'
				});
				setTimeout(function(){
					$(modal).fadeOut();
					$(modal + ' .modal').removeAttr('style');
				}, 200);
			}
		});
	}

	showModal('#btn-contacto', '#modal-contacto');
	hideModal('#modal-contacto');

	showModal('#btn-simulador', '#modal-simulador');
	hideModal('#modal-simulador');

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
				'-webkit-box-shadow': '0px 0px 8px 0px transparent',
				'-moz-box-shadow': '0px 0px 8px 0px transparent',
				'box-shadow': '0px 0px 8px 0px transparent',
				'border': '1px solid transparent'
			});
			$(input).focus(function(){
				$(this).css({
					'-webkit-box-shadow': '0px 0px 8px 0px rgba(85,152,219,1)',
					'-moz-box-shadow': '0px 0px 8px 0px rgba(85,152,219,1)',
					'box-shadow': '0px 0px 8px 0px rgba(85,152,219,1)',
					'border': '1px solid rgba(85,152,219,1)'
				});
			});
			$(input).focusout(function(){
				$(this).css({
					'-webkit-box-shadow': '0px 0px 8px 0px transparent',
					'-moz-box-shadow': '0px 0px 8px 0px transparent',
					'box-shadow': '0px 0px 8px 0px transparent',
					'border': '1px solid transparent'
				});
			});
			return true;
		}
		else {
			$(input).focus();
			$(input).css({
				'-webkit-box-shadow': '0px 0px 8px 0px rgba(161,103,53,1)',
				'-moz-box-shadow': '0px 0px 8px 0px rgba(161,103,53,1)',
				'box-shadow': '0px 0px 8px 0px rgba(161,103,53,1)',
				'border': '1px solid rgba(161,103,53,1)'
			});
			$(input).focus(function(){
				$(this).css({
					'-webkit-box-shadow': '0px 0px 8px 0px rgba(161,103,53,1)',
					'-moz-box-shadow': '0px 0px 8px 0px rgba(161,103,53,1)',
					'box-shadow': '0px 0px 8px 0px rgba(161,103,53,1)',
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

	//Simulador de comisión
	$('#venta').keypress(function(ev){
		if(ev.keyCode >= 48 && ev.keyCode <= 57){
			return true;
		}
		else {
			return false;
		}
	});

	$('#venta').on('input', function(){
		var value = $(this).val();
		var comision = value * 0.03528;
		var total = value - comision;
		$('#total').val(total.toFixed(2));
		$('#comision').val(comision.toFixed(2));
	});

	//Play video
	var cntVideo = $('.cnt-video .video-after');
	cntVideo.click(function(ev){
		for(i = 0; i < cntVideo.length; i++){
			$(cntVideo[i]).siblings('video').get(0).pause();
		}
		$(this).siblings('video').get(0).play();
		$(this).hide();
	});

	cntVideo.siblings('video').click(function(){
		$(this).get(0).pause();
		$(this).siblings('.video-after').show();
	});

	// Preguntas frecuentes
	var pregunta = $('#cont-preguntas .pregunta');
	pregunta.find('span').click(function(ev){
		ev.stopPropagation();
	});
	pregunta.click(function(ev){
		for(i = 0; i < pregunta.length; i++){
			$(pregunta[i]).siblings('.respuesta').slideUp();
		}
		var target = ev.target;
		if(!$(ev.target).siblings('.respuesta').is(':visible')){
			$(ev.target).siblings('.respuesta').slideDown().css('display', 'flex');
		}
		if($(ev.target).closest('article').is('#pregunta-1')){
			var imagePregunta = $('#pregunta-1 img.active');
			$('#pregunta-1 .slide').animate({height: imagePregunta.height() + 'px'});
		}
		if($(ev.target).closest('article').is('#pregunta-12')){
			var imagePregunta = $('#pregunta-12 img.active');
			$('#pregunta-12 .slide').animate({height: imagePregunta.height() + 'px'});
		}
	});

	var positions = 1;
	var imagePregunta = $('#pregunta-12 img.active');
	$('#pregunta-12 .slide').animate({height: imagePregunta.height() + 'px'});
	setInterval(function(){
		imagePregunta.addClass('pass').removeClass('active').next().addClass('active');
		setTimeout(function(){
			imagePregunta.prev().hide().removeClass('pass');
		}, 500);
		setTimeout(function(){
			$('#pregunta-12 img:first-child').show();
		}, 1000);
		positions++;
		if(positions >= 3){
			$('#pregunta-12 img:last-child').removeClass('active');
			$('#pregunta-12 img:first-child').addClass('active');
			setTimeout(function(){
				$('#pregunta-12 img:last-child').hide().removeClass('active pass');
			}, 500);
			setTimeout(function(){
				$('#pregunta-12 img:last-child').show();
			}, 1000);
			positions = 1;
		}
		imagePregunta = $('#pregunta-12 img.active');
	}, 5000);

	var positions2 = 1;
	var imagePregunta2 = $('#pregunta-1 img.active');
	$('#pregunta-1 .slide').animate({height: imagePregunta2.height() + 'px'});
	setInterval(function(){
		imagePregunta2.addClass('pass').removeClass('active').next().addClass('active');
		setTimeout(function(){
			imagePregunta2.prev().hide().removeClass('pass');
		}, 500);
		setTimeout(function(){
			imagePregunta2.prev().show();
		}, 1000);
		positions2++;
		if(positions2 >= 4){
			$('#pregunta-1 img:last-child').addClass('pass').removeClass('active');
			$('#pregunta-1 img:first-child').addClass('active');
			setTimeout(function(){
				$('#pregunta-1 img:last-child').hide().removeClass('active pass');
			}, 500);
			setTimeout(function(){
				$('#pregunta-1 img:last-child').show();
			}, 1000);
			positions2 = 1;
		}
		imagePregunta2 = $('#pregunta-1 img.active');
		$('#pregunta-1 .slide').animate({height: imagePregunta2.height() + 'px'});
	}, 5000);

	//Menu responsive
	$('#btn-menu-responsive').click(function(){
		$('#menu-responsive').slideToggle();
	});

	

});

//Lazy Load
function lazyLoadIndex(){
	$(window).scroll(function(){
		var windowTop = $(document).scrollTop();
		var windowBot = windowTop + window.innerHeight;

		var loadSimulador = ($('#btn-simulador').offset().top) + ($('#btn-simulador').height());
		if(loadSimulador <= windowBot){
			$('#btn-simulador').css('animation', 'lazyButton 0.25s ease');
		}

		var loadPosMovil = ($('#pos-movil > div > div:first-child').offset().top) + ($('#pos-movil > div > div:first-child').height());
		if(loadPosMovil <= windowBot){
			$('#pos-movil > div > div:first-child').css({
				animation: 'lazyPosMovil 0.15s ease',
				transform: 'translateX(0)',
				opacity: 1
			});
			setTimeout(function(){
				$('#pos-movil .here img:first-child').css({
					animation: 'lazyImgPos 0.15s ease',
					transform: 'translateX(0)',
					opacity: 1
				});
			}, 250);
			setTimeout(function(){
				$('#pos-movil > div > div:nth-child(3) img').css({
					animation: 'lazyImgPos 0.15s ease',
					transform: 'translateX(0)',
					opacity: 1
				});
			}, 500);
			setTimeout(function(){
				$('#pos-movil .here img:last-child').css({
					animation: 'lazyImgPos 0.35s ease',
					transform: 'translateX(0)',
					opacity: 1
				});
			}, 750);
		}

		var loadBeneficios = ($('#list-beneficios ul').offset().top) + ($('#list-beneficios ul').height());
		if(loadBeneficios <= windowBot){
			$('#list-beneficios ul li:nth-child(1), #list-beneficios ul li:nth-child(2)').css({
				animation: 'lazyBeneficiosOne 0.25s ease',
				transform: 'translateX(0)',
				opacity: 1
			});
			$('#list-beneficios ul li:nth-child(3), #list-beneficios ul li:nth-child(4)').css({
				animation: 'lazyBeneficiosTwo 0.25s ease',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

		var loadBtnBeneficios = ($('#mas-beneficios').offset().top) + ($('#mas-beneficios').height());
		if(loadBtnBeneficios <= windowBot){
			$('#mas-beneficios').css({
				animation: 'lazyButton 0.25s ease',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

		var loadBtnYoutube = ($('#go-youtube').offset().top) + ($('#go-youtube').height());
		if(loadBtnYoutube <= windowBot){
			$('#go-youtube').css({
				animation: 'lazyButton 0.25s ease',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

		var loadBtnPreguntas = ($('#btnPreguntasFrecuentes').offset().top) + ($('#btnPreguntasFrecuentes').height());
		if(loadBtnPreguntas <= windowBot){
			$('#btnPreguntasFrecuentes').css({
				animation: 'lazyButton 0.25s ease',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

		var loadBtnContacto = ($('#btn-contacto').offset().top) + ($('#btn-contacto').height());
		if(loadBtnContacto <= windowBot){
			$('#btn-contacto').css({
				animation: 'lazyButton 0.25s ease',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

	});
}

function lazyLoadBeneficios(){
	$(window).scroll(function(){
		var windowTop = $(document).scrollTop();
		var windowBot = windowTop + window.innerHeight;

		var loadCatalogo = ($('#catalogo > div div ul').offset().top) + ($('#catalogo > div div ul').height());
		if(loadCatalogo <= windowBot){
			$('#catalogo > div div ul li:nth-child(1)').css({
				animation: 'lazyCatalogo 0.15s ease',
				transform: 'translateX(0)',
				opacity: 1
			});
			setTimeout(function(){
				$('#catalogo > div div ul li:nth-child(2)').css({
					animation: 'lazyCatalogo 0.15s ease-out',
					transform: 'translateX(0)',
					opacity: 1
				});
			}, 400);
			setTimeout(function(){
				$('#catalogo > div div ul li:nth-child(3)').css({
					animation: 'lazyCatalogo 0.15s ease-out',
					transform: 'translateX(0)',
					opacity: 1
				});
			}, 800);
		}

		var loadBase = ($('#base-clientes > div:not(.cnt-video)').offset().top) + ($('#base-clientes > div:not(.cnt-video)').height());
		if((loadBase - 500) <= windowBot){
			$('#base-clientes > div:not(.cnt-video)').css({
				animation: 'lazyBase 0.25s ease-out',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

		var loadHistorial = ($('#historial > div > div:first-child').offset().top) + ($('#historial > div > div:first-child').height());
		if(loadHistorial <= windowBot){
			$('#historial > div > div:first-child').css({
				animation: 'lazyCatalogo 0.25s ease-out',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

		var loadStaff = ($('#staff').offset().top) + ($('#staff').height());
		if(loadStaff <= windowBot){
			$('#staff').css({
				animation: 'lazyCatalogo 0.25s ease-out',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

		var loadPanel = ($('#panel-control > div > div:first-child').offset().top) + ($('#panel-control > div > div:first-child').height());
		if(loadPanel <= windowBot){
			$('#panel-control > div > div:first-child').css({
				animation: 'lazyCatalogo 0.25s ease-out',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

	});
}

function lazyLoadPreguntas(){
	$(window).scroll(function(){
		var windowTop = $(document).scrollTop();
		var windowBot = windowTop + window.innerHeight;

		var loadPreguntas = ($('#cont-preguntas h3, #cont-preguntas h4').offset().top) + ($('#cont-preguntas h3, #cont-preguntas h4').height());
		if(loadPreguntas <= windowBot){
			$('#cont-preguntas h3, #cont-preguntas h4').css({
				animation: 'lazyCatalogo 0.15s ease',
				transform: 'translateX(0)',
				opacity: 1
			});
		}

	});
}