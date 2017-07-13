var anchors = [];
var currentAnchor = -1;
var isAnimating  = false;
var click = false;
var render = false;
var firstMousWell = true;
var windWidth = document.documentElement.clientWidth; 
var windHeigth = document.documentElement.clientHeight;
var stop = false;


function fly() {
    setTimeout(function () {
                $('.line-aus').addClass('path-aus');
                $('.houston-flex .composition').addClass('show-composition');
            }, 800);
            setTimeout(function () {
                $('.line-isr').addClass('path-isr');
                $('.isr-flex .composition').addClass('show-composition');
            }, 1000);
            setTimeout(function () {
                $('.line-bzr').addClass('path-bzr');
                $('.brz-flex .composition').addClass('show-composition');
            }, 1200);
            setTimeout(function () {
                 $('.line-usa').addClass('path-usa');
                $('.aus-flex .composition').addClass('show-composition');
                
            }, 1400);
            setTimeout(function () {
                $('.usa-flex .composition').addClass('show-composition');
            }, 1600);
}

function cloudFly (){
     setTimeout(function () {
                    $(".flex-cloud").attr('id','flex-cloud');
                    $(".we-specilise").attr('id','we-specilise');
                }, 600);
}

$(function(){
    function updateAnchors() {
        anchors = [];
        $('.anchor').each(function(i, element){
            anchors.push( $(element).offset().top );
        });
    }
        var cells = document.getElementById('is-home');
        if (cells) {
        $('body').on('mousewheel', function(e){
            e.preventDefault();
            e.stopPropagation();
            console.log(isAnimating);

            if( isAnimating) {

                return false;
            }
            isAnimating  = true;
            
            // Increase or reset current anchor
            if( e.originalEvent.wheelDelta >= 0 ) {
                currentAnchor--;
            }else{
                currentAnchor++;
            }
            if( currentAnchor > (anchors.length - 1) 
               || currentAnchor < 0 ) {
                currentAnchor = 0;
            }
            isAnimating  = true;
            if( anchors[currentAnchor] > 600) {
                fly();
            }
             if (parseInt(anchors[currentAnchor]) > 1200) {
                   cloudFly();
            }
                render = true;
            if (firstMousWell) {
                   $('html, body').animate({
                    scrollTop: parseInt(615)
                }, 1100, 'swing', function(){
                    isAnimating  = false;
                });
                   firstMousWell = false;
                   fly();
                    currentAnchor++;
            } else {
                $('html, body').animate({
                    scrollTop: parseInt( anchors[currentAnchor] )
                }, 1100, 'swing', function(){
                    isAnimating  = false;
                });
            }
        });
    }
    

    $('body').on('touchmove', function(e){
        e.preventDefault();
        e.stopPropagation();
        fly();
        cloudFly();
        
    });
    updateAnchors(); 
});

function come(elem) {
  var docViewTop = $(window).scrollTop() + $(window).height();
  
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(elem).offset().top + 100;
  if (parseInt(docViewTop) > parseInt(elemTop)) {
    return true;
  }
  return false;
}

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
            var _this = $(this);
            $('.active').removeClass('active');
            _this.addClass('active');
        });

        $('.height-composition').each(function(i, element){
                var composition = $(this)[0];
                composition.style.height = composition.clientWidth + 'px';
                window.onresize = function() {
                composition.style.height = composition.clientWidth + 'px';
            }
        });
            if ($('body').hasClass('is-home')){
                if (come('.earth') && !device.ios()) {
                 fly();
            } 
            if (come('.cloud')) {
                cloudFly();
            }
        }
});


$(function() {
    var canvas = $('#canvasElement');
    var context = canvas.get(0).getContext('2d');
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();
    var canvasItem = canvasWidth/10;
    var x = 0;
    var y = 0;

    function moveBox() {
        // clear holst
        context.clearRect(0,0, canvasWidth, canvasHeight);
        // draw 
        context.fillRect(x, y, 25, 25);
        //move 
        y++;

        // В цикле каждые 33 миллисекунды вызываем moveBox()

        setTimeout(moveBox, 33);
    }

    moveBox();
});
