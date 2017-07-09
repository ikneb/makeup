var click = false;
$(document).ready(function () {
		$('.hamburger').click(function() {
			
			console.log($("#myPanel").attr("class") == "is-active" );
			if(click){
				$(this).removeClass('is-active').removeClass('js-hamburger');
				click = false;
			} else {
				$(this).addClass('is-active').addClass('js-hamburger');
				click = true;
			}
		}); 
});