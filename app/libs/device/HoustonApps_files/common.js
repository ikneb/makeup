var anchors = [];
var currentAnchor = -1;
var isAnimating  = false;
var click = false;
var render = false;
var firstMousWell = true;
var windWidth = document.documentElement.clientWidth; 
var windHeigth = document.documentElement.clientHeight;
var stop = false;
var isAnim = true;
var swichOfAnimate = false;


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

function aboutUsFly (){
     setTimeout(function () {
                    $(".header-flex-about").attr('id','about-us-fly-text');
                    $(".about-img").addClass('about-us-fly-img');

                }, 1000);
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


$(function() {
    var cells = document.getElementById('is-about-us');
        if (cells) {
    var canvas = $('#canvasElement');
    canvas.attr('width', windWidth).attr('height', windHeigth);
    var context = canvas.get(0).getContext('2d');
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();
    var canvasItem = canvasWidth/10;


    var x1 = 0, x2 = canvasItem, x3 = canvasWidth -(canvasWidth - x2) + canvasItem , x4 = canvasWidth -(canvasWidth - x3) + canvasItem, x5 =canvasWidth -(canvasWidth - x4) + canvasItem, x6 = canvasWidth -(canvasWidth - x5) + canvasItem, x7 = canvasWidth -(canvasWidth - x6) + canvasItem, x8 = canvasWidth -(canvasWidth - x7) + canvasItem, x9 = canvasWidth -(canvasWidth - x8) + canvasItem , x10 = canvasWidth -(canvasWidth - x9) + canvasItem;
    var y1 = canvasHeight - canvasItem, y2 = canvasHeight - canvasItem, y3 = canvasHeight - canvasItem, y4 = canvasHeight - canvasItem, y5 = canvasHeight - canvasItem, y6 = canvasHeight - canvasItem, y7 = canvasHeight - canvasItem, y8 = canvasHeight - canvasItem, y9 = canvasHeight - canvasItem, y10 = canvasHeight - canvasItem ;
    
    var x11 = 0, x12 = canvasItem, x13 = canvasWidth -(canvasWidth - x12) + canvasItem, x14 = canvasWidth -(canvasWidth - x13) + canvasItem, x15 =canvasWidth -(canvasWidth - x14) + canvasItem, x16 = canvasWidth -(canvasWidth - x15) + canvasItem, x17 = canvasWidth -(canvasWidth - x16) + canvasItem, x18 = canvasWidth -(canvasWidth - x17) + canvasItem, x19 = canvasWidth -(canvasWidth - x18) + canvasItem , x20 = canvasWidth -(canvasWidth - x19) + canvasItem;
    var y11 = canvasHeight - canvasItem * 2, y12 = -canvasItem , y13 = -canvasItem, y14 = canvasHeight - canvasItem * 2, y15 = -canvasItem, y16 = -canvasItem, y17 = canvasHeight - canvasItem * 2, y18 = -canvasItem, y19 = canvasHeight - canvasItem * 2, y20 = canvasHeight - canvasItem * 2 ;
        
    var x21 = 0, x22 = canvasWidth -(canvasWidth - x8) + canvasItem, x23 = canvasWidth -(canvasWidth - x9) + canvasItem;
    var y21 = -canvasItem, y22 = -canvasItem, y23 = -canvasItem;

    var y12w = y12 - canvasItem;
    var y13w = y13 - canvasItem;
    var y15w = y15 - canvasItem;
    var y16w = y16 - canvasItem;
    var y18w = y18 - canvasItem;
    var y21w = y21 - canvasItem;
    var y22w = y22 - canvasItem;
    var y23w = y23 - canvasItem;

    var color1 = "#09606a";
    var color2 = "#00c2e9";
    var color3 = "#b4d8f4";
    var color4 = "#a9e8f9";
    var color5 = "#6abfc9";
    var widthItems = canvasItem;
    var heightItems = canvasItem;

    function moveBox1() {
        context.fillStyle = color1;
        context.fillRect(x1, y1, widthItems, heightItems);
    }

    function moveBox2() {
        // draw 
        context.fillStyle = color2;
        context.fillRect(x2, y2, widthItems, heightItems);
    }

    function moveBox3() {
        // draw 
        context.fillStyle = color3;
        context.fillRect(x3, y3, widthItems, heightItems);
    }

    function moveBox4() {
        // draw 
        context.fillStyle = color2;
        context.fillRect(x4, y4, widthItems, heightItems);
    }

    function moveBox5() {
        // draw 
        context.fillStyle = color1;
        context.fillRect(x5, y5, widthItems, heightItems);
    }

    function moveBox6() {
        // draw 
        context.fillStyle = color3;
        context.fillRect(x6, y6, widthItems, heightItems);
    }

    function moveBox7() {
        // draw 
        context.fillStyle = color1;
        context.fillRect(x7, y7, widthItems, heightItems);
    }

    function moveBox8() {
        // draw 
        context.fillStyle = color4;
        context.fillRect(x8, y8, widthItems, heightItems);
    }

    function moveBox9() {
        // draw 
        context.fillStyle = color3;
        context.fillRect(x9, y9, widthItems, heightItems);
    }

    function moveBox10() {
        // draw 
        context.fillStyle = color4;
        context.fillRect(x10, y10, widthItems, heightItems);
    }

    function moveBox11() {
        // draw 
        context.fillStyle = color4;
        context.fillRect(x11, y11, widthItems, heightItems);
    }

    function moveBox12() {
        // draw 
        context.fillStyle = color1;
        context.fillRect(x12, y12, widthItems, heightItems);

        context.fillStyle = '#fff';
        context.fillRect(x12, y12w, widthItems, heightItems);

        //move 
        y12 = y12 + 5;
        y12w = y12w + 5;
        var timerId = setTimeout( moveBox12, 1);

        var stop = canvasHeight - canvasItem * 2;
        
        if (
            parseInt(y12) == parseInt(stop) - 1 
            || parseInt(y12) == parseInt(stop) - 2 
            || parseInt(y12) == parseInt(stop) - 3 
            || parseInt(y12) == parseInt(stop) - 4 
            || parseInt(y12) == parseInt(stop) - 4
            || parseInt(y12) == parseInt(stop) - 5
            || parseInt(y12) == parseInt(stop) - 4
            || parseInt(y12) == parseInt(stop) + 5
            || parseInt(y12) == parseInt(stop) + 4
            || parseInt(y12) == parseInt(stop) + 3
            || parseInt(y12) == parseInt(stop) + 2
            || parseInt(y12) == parseInt(stop) + 1
            || parseInt(y12) == parseInt(stop)) {
             
            var back = parseInt(stop) - parseInt(y12);
                
            context.fillStyle = color1;
            context.fillRect(x12, y12 + back, widthItems, heightItems);

            context.fillStyle = '#fff';
            context.fillRect(x12, y12w + back, widthItems, heightItems);

            clearTimeout(timerId);
        }
    }

    function moveBox13() {
        // draw 
        context.fillStyle = color4;
        context.fillRect(x13, y13, widthItems, heightItems);

        context.fillStyle = '#fff';
        context.fillRect(x13, y13w, widthItems, heightItems);
        //move 
        y13 = y13 + 5;
        y13w = y13w + 5;
        var timerId = setTimeout( moveBox13, 1);

        var stop = canvasHeight - canvasItem * 2 + 1 ;
        
        if (
            parseInt(y13) == parseInt(stop) - 1 
            || parseInt(y13) == parseInt(stop) - 2 
            || parseInt(y13) == parseInt(stop) - 3 
            || parseInt(y13) == parseInt(stop) - 4 
            || parseInt(y13) == parseInt(stop) - 4
            || parseInt(y13) == parseInt(stop) - 5
            || parseInt(y13) == parseInt(stop) - 4
            || parseInt(y13) == parseInt(stop) + 5
            || parseInt(y13) == parseInt(stop) + 4
            || parseInt(y13) == parseInt(stop) + 3
            || parseInt(y13) == parseInt(stop) + 2
            || parseInt(y13) == parseInt(stop) + 1
            || parseInt(y13) == parseInt(stop)) {
             
             var back = parseInt(stop) - parseInt(y13);
                

            context.fillStyle = color4;
            context.fillRect(x13, y13 + back, widthItems, heightItems);

            context.fillStyle = '#fff';
            context.fillRect(x13, y13w + back, widthItems, heightItems);

            clearTimeout(timerId);
        }
    }

    function moveBox14() {
        // draw 
        context.fillStyle = color5;
        context.fillRect(x14, y14, widthItems, heightItems);
        //move 
        y14++;
    }

    function moveBox15() {
        // draw 
        context.fillStyle = color3;
        context.fillRect(x15, y15, widthItems, heightItems);

        context.fillStyle = '#fff';
        context.fillRect(x15, y15w, widthItems, heightItems);
        //move 
        y15 = y15 + 5;
        y15w = y15w + 5;
        var timerId = setTimeout( moveBox15, 1);

        var stop = canvasHeight - canvasItem * 2;
        
        if (
            parseInt(y15) == parseInt(stop) - 1 
            || parseInt(y15) == parseInt(stop) - 2 
            || parseInt(y15) == parseInt(stop) - 3 
            || parseInt(y15) == parseInt(stop) - 4 
            || parseInt(y15) == parseInt(stop) - 4
            || parseInt(y15) == parseInt(stop) - 5
            || parseInt(y15) == parseInt(stop) - 4
            || parseInt(y15) == parseInt(stop) + 5
            || parseInt(y15) == parseInt(stop) + 4
            || parseInt(y15) == parseInt(stop) + 3
            || parseInt(y15) == parseInt(stop) + 2
            || parseInt(y15) == parseInt(stop) + 1
            || parseInt(y15) == parseInt(stop)) {
             
             var back = parseInt(stop) - parseInt(y15);
            context.fillStyle = color3;
            context.fillRect(x15, y15 + back, widthItems, heightItems);

            context.fillStyle = '#fff';
            context.fillRect(x15, y15w + back, widthItems, heightItems);

            clearTimeout(timerId);
        }
    }

    function moveBox16() {
        // draw 
        context.fillStyle = color5;
        context.fillRect(x16, y16, widthItems, heightItems);

        context.fillStyle = '#fff';
        context.fillRect(x16, y16w, widthItems, heightItems);
        //move 
        y16 = y16 + 5;
        y16w = y16w + 5;
        var timerId = setTimeout( moveBox16, 1);

        var stop = canvasHeight - canvasItem * 2;
        
        if (
            parseInt(y16) == parseInt(stop) - 1 
            || parseInt(y16) == parseInt(stop) - 2 
            || parseInt(y16) == parseInt(stop) - 3 
            || parseInt(y16) == parseInt(stop) - 4 
            || parseInt(y16) == parseInt(stop) - 4
            || parseInt(y16) == parseInt(stop) - 5
            || parseInt(y16) == parseInt(stop) - 4
            || parseInt(y16) == parseInt(stop) + 5
            || parseInt(y16) == parseInt(stop) + 4
            || parseInt(y16) == parseInt(stop) + 3
            || parseInt(y16) == parseInt(stop) + 2
            || parseInt(y16) == parseInt(stop) + 1
            || parseInt(y16) == parseInt(stop)) {
             
             var back = parseInt(stop) - parseInt(y16);
                

            context.fillStyle = color5;
            context.fillRect(x16, y16 + back, widthItems, heightItems);

            context.fillStyle = '#fff';
            context.fillRect(x16, y16w + back, widthItems, heightItems);

            clearTimeout(timerId);
        }
    }

    function moveBox17() {
        // draw 
        context.fillStyle = color3;
        context.fillRect(x17, y17, widthItems, heightItems);
        //move 
        y17++;
    }

    function moveBox18() {
        // draw 
        context.fillStyle = color5;
        context.fillRect(x18, y18, widthItems, heightItems);

        context.fillStyle = '#fff';
        context.fillRect(x18, y18w, widthItems, heightItems);
        //move 
        y18 = y18 + 5;
        y18w = y18w + 5;
        var timerId = setTimeout( moveBox18, 1);

        var stop = canvasHeight - canvasItem * 2;
        
        if (
            parseInt(y18) == parseInt(stop) - 1 
            || parseInt(y18) == parseInt(stop) - 2 
            || parseInt(y18) == parseInt(stop) - 3 
            || parseInt(y18) == parseInt(stop) - 4 
            || parseInt(y18) == parseInt(stop) - 4
            || parseInt(y18) == parseInt(stop) - 5
            || parseInt(y18) == parseInt(stop) - 4
            || parseInt(y18) == parseInt(stop) + 5
            || parseInt(y18) == parseInt(stop) + 4
            || parseInt(y18) == parseInt(stop) + 3
            || parseInt(y18) == parseInt(stop) + 2
            || parseInt(y18) == parseInt(stop) + 1
            || parseInt(y18) == parseInt(stop)) {
             
             var back = parseInt(stop) - parseInt(y18);

            context.fillStyle = color5;
            context.fillRect(x18, y18 + back, widthItems, heightItems);

            context.fillStyle = '#fff';
            context.fillRect(x18, y18w + back, widthItems, heightItems);

            clearTimeout(timerId);
        }
    }

    function moveBox19() {
        // draw 
        context.fillStyle = color2;
        context.fillRect(x19, y19, widthItems, heightItems);
        //move 
        y19++;
    }

    function moveBox20() {
        // draw 
        context.fillStyle = color1;
        context.fillRect(x20, y20, widthItems, heightItems);
        //move 
        y20++;
    }

    function moveBox21() {
        // draw 
        context.fillStyle = color5;
        context.fillRect(x21, y21, widthItems, heightItems);

        context.fillStyle = '#fff';
        context.fillRect(x21, y21w, widthItems, heightItems);
        //move 

        y21 = y21 + 5;
        y21w = y21w + 5;
        var timerId = setTimeout( moveBox21, 1);

        var stop = canvasHeight - canvasItem * 2 - canvasItem;
        
        if (
            parseInt(y21) == parseInt(stop) - 1 
            || parseInt(y21) == parseInt(stop) - 2 
            || parseInt(y21) == parseInt(stop) - 3 
            || parseInt(y21) == parseInt(stop) - 4 
            || parseInt(y21) == parseInt(stop) - 4
            || parseInt(y21) == parseInt(stop) - 5
            || parseInt(y21) == parseInt(stop) - 4
            || parseInt(y21) == parseInt(stop) + 5
            || parseInt(y21) == parseInt(stop) + 4
            || parseInt(y21) == parseInt(stop) + 3
            || parseInt(y21) == parseInt(stop) + 2
            || parseInt(y21) == parseInt(stop) + 1
            || parseInt(y21) == parseInt(stop)) {
             
             var back = parseInt(stop) - parseInt(y21);

            context.fillStyle = color5;
            context.fillRect(x21, y21 + back, widthItems, heightItems);

            context.fillStyle = '#fff';
            context.fillRect(x21, y21w + back, widthItems, heightItems);

            clearTimeout(timerId);
        }
        
    }

    function moveBox22() {
        // draw 
        context.fillStyle = color4;
        context.fillRect(x22, y22, widthItems, heightItems);

        context.fillStyle = '#fff';
        context.fillRect(x22, y22w, widthItems, heightItems);
        //move 

        y22 = y22 + 5;
        y22w = y22w + 5;
        var timerId = setTimeout( moveBox22, 1);

        var stop = canvasHeight - canvasItem * 2 - canvasItem;
        
        if (
            parseInt(y22) == parseInt(stop) - 1 
            || parseInt(y22) == parseInt(stop) - 2 
            || parseInt(y22) == parseInt(stop) - 3 
            || parseInt(y22) == parseInt(stop) - 4 
            || parseInt(y22) == parseInt(stop) - 4
            || parseInt(y22) == parseInt(stop) - 5
            || parseInt(y22) == parseInt(stop) - 4
            || parseInt(y22) == parseInt(stop) + 5
            || parseInt(y22) == parseInt(stop) + 4
            || parseInt(y22) == parseInt(stop) + 3
            || parseInt(y22) == parseInt(stop) + 2
            || parseInt(y22) == parseInt(stop) + 1
            || parseInt(y22) == parseInt(stop)) {
             
             var back = parseInt(stop) - parseInt(y22);

            context.fillStyle = color4;
            context.fillRect(x22, y22 + back, widthItems, heightItems);

            context.fillStyle = '#fff';
            context.fillRect(x22, y22w + back, widthItems, heightItems);

            clearTimeout(timerId);
        }
        
    }

    function moveBox23() {
        // draw 
        context.fillStyle = color5;
        context.fillRect(x23, y23, widthItems, heightItems);

        context.fillStyle = '#fff';
        context.fillRect(x23, y23w, widthItems, heightItems);
        //move 

        y23 = y23 + 5; 

        y23w = y23w + 5;

        var timerId = setTimeout( moveBox23, 1);

        var stop = canvasHeight - canvasItem * 2 - canvasItem;
        
        if (
            parseInt(y23) == parseInt(stop) - 1 
            || parseInt(y23) == parseInt(stop) - 2 
            || parseInt(y23) == parseInt(stop) - 3 
            || parseInt(y23) == parseInt(stop) - 4 
            || parseInt(y23) == parseInt(stop) - 4
            || parseInt(y23) == parseInt(stop) - 5
            || parseInt(y23) == parseInt(stop) - 4
            || parseInt(y23) == parseInt(stop) + 5
            || parseInt(y23) == parseInt(stop) + 4
            || parseInt(y23) == parseInt(stop) + 3
            || parseInt(y23) == parseInt(stop) + 2
            || parseInt(y23) == parseInt(stop) + 1
            || parseInt(y23) == parseInt(stop)) {
             var back = parseInt(stop) - parseInt(y23);

            context.fillStyle = color5;
            context.fillRect(x23, y23 + back, widthItems, heightItems);

            context.fillStyle = '#fff';
            context.fillRect(x23, y23w + back, widthItems, heightItems);

            clearTimeout(timerId);
        }
    }

            moveBox1();
            moveBox2();
            moveBox3();
            moveBox4();
            moveBox5();
            moveBox6();
            moveBox7();
            moveBox8();
            moveBox9();
            moveBox10();
            moveBox11();
            moveBox14();
            moveBox17();
           
            moveBox19();
            moveBox20();
            


            mouse();
    }

    function mouse () {
        $('body').on('mousewheel', function(e){
                e.preventDefault();
                e.stopPropagation(); 
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
                if( anchors[currentAnchor] > 600 && isAnim == true) {
                      flyBecome();
                }
                    render = true;
                if (firstMousWell) {
                       $('html, body').animate({
                        scrollTop: parseInt(windHeigth)
                    }, 1100, 'swing', function(){
                        isAnimating  = false;
                        flyBecome();
                    });
                       firstMousWell = false;
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


    function flyBecome() {
         moveBox18();   
            setTimeout(function () {
                moveBox12();
            }, 1600);
            setTimeout(function () {
                moveBox13();
            }, 400);
           
            setTimeout(function () {
                moveBox15();
            }, 1500);
            setTimeout(function () {
                moveBox16();
            }, 400);
            setTimeout(function () {
            moveBox21();
            }, 500);
            setTimeout(function () {
                moveBox22();
            }, 1100);
                setTimeout(function () {
            moveBox23();
            }, 600);
            isAnim = false;
            $('body').unbind();
    }
});

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
        if ($('body').hasClass('is-about-us')){
             aboutUsFly();
        } 
});



