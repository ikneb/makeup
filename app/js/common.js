var click = false;
$(document).ready(function () {
		$('.hamburger').click(function() {
			if(click){
				$(this).removeClass('is-active').removeClass('js-hamburger');
				$('#my-menu').removeClass('show-menu').addClass('close-menu');
					$('.link-menu').removeClass('in-left-menu').addClass('in-right-menu');
					$('#hamburger').removeClass('in-left').addClass('in-right');
				click = false;
			} else {
				$(this).addClass('is-active').addClass('js-hamburger');
				$('#my-menu').removeClass('close-menu').addClass('show-menu');
				
					$('.link-menu').addClass('in-left-menu').removeClass('in-right-menu');
					$('#hamburger').addClass('in-left').removeClass('in-right');
			
				click = true;
			}
		}); 

		$('#my-menu>ul>li').click(function () {
			console.log(12312);
			var _this = $(this);
			$('.active').removeClass('active');
			_this.addClass('active');
		});
});