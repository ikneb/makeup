var anchors = [];
var currentAnchor = -1;
var isAnimating  = false;
var click = false;
var render = false;





function getBezierBasis(i, n, t) {
    // factorial
    function f(n) {
        return (n <= 1) ? 1 : n * f(n - 1);
    }
   
    return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
}

function getBezierCurve(arr, step) {
    if (step === undefined) {
        step = 0.01;
    }
    
    var res = [];
    
    step = step / arr.length;
    
    for (var t = 0.0; t < 1 + step; t += step) {
        if (t > 1) {
            t = 1;
        }
        
        var ind = res.length;
        
        res[ind] = new Array(0, 0);
        
        for (var i = 0; i < arr.length; i++) {
            var b = getBezierBasis(i, arr.length - 1, t);
            
            res[ind][0] += arr[i][0] * b;
            res[ind][1] += arr[i][1] * b;
        }
    }
    
    return res;
}

function drawLines(ctx, arr, delay, pause) {
    if (delay === undefined) {
        delay = 20;
    }
    
    if (pause === undefined) {
        pause = delay;
    }
    var i = 0;

    function delayDraw() {
        if (i >= arr.length - 1) {
            return;
        }
        
        ctx.moveTo(arr[i][0],arr[i][1]);
        ctx.lineTo(arr[i+1][0],arr[i+1][1]);
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        
        ++i;

        if (delay > 0) {
            setTimeout(delayDraw, delay);
        } 
        else {
            delayDraw();
        }
    }
    
    if (pause > 0) {
        setTimeout(delayDraw, pause);
    }
    else {
        delayDraw();
    }
}

function drawPixels(ctx, arr, delay, pause) {
    if (delay === undefined) {
        delay = 10;
    }
    
    if (pause === undefined) {
        pause = delay;
    }
    var i = 0;
    var pxl = ctx.createImageData(2,2);
    var d  = pxl.data;                        // only do this once per page
    d[0]   = 0;
    d[1]   = 0;
    d[2]   = 0;
    d[3]   = 255;

    function delayDraw() {
        if (i >= arr.length - 1) {
            return;
        }
        
        ctx.putImageData(pxl, arr[i][0], arr[i][1]);   

        ++i;

        if (delay > 0) {
            setTimeout(delayDraw, delay);
        } 
        else {
            delayDraw();
        }
    }
    
    if (pause > 0) {
        setTimeout(delayDraw, pause);
    }
    else {
        delayDraw();
    }
}



function drawPoints(ctx, arr, delay, pause) {
    if (delay === undefined) {
        delay = 0;
    }
    
    if (pause === undefined) {
        pause = delay;
    }

    var i = 0;
    
    function delayDraw() {
        
        ctx.beginPath();
        ctx.arc(arr[i][0],arr[i][1],pointRadius,0,2*Math.PI);
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
        
        ctx.fillStyle = '#FF0000';
        ctx.fillText((i + 1),arr[i][0],arr[i][1] - 10);
        
        ctx.fillStyle = '#000000';
        ctx.fillText(' (' + arr[i][0] + ', ' + arr[i][1] + ')', arr[i][0] + 15,arr[i][1] - 10);
        
        if (++i >= arr.length) {
            return;
        }
        
        if (delay > 0) {
            setTimeout(delayDraw, delay);
        } 
        else {
            delayDraw();
        }
    }
    
    if (pause > 0) {
        setTimeout(delayDraw, pause);
    }
    else {
        delayDraw();
    }
}

console.log(document.documentElement.clientWidth);

$(function(){
    function updateAnchors() {
        anchors = [];
        $('.anchor').each(function(i, element){
            anchors.push( $(element).offset().top );
        });
    }
    $('body').on('mousewheel', function(e){
       	e.preventDefault();
        e.stopPropagation();
        

        if( isAnimating ) {
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
        
        if (anchors[currentAnchor] < 800) {
        	
        } else if( anchors[currentAnchor] < 1200 && render == true) {
        	setTimeout(function () {
        		$('.houston-flex .composition').addClass('show-composition');
        		drawC = document.getElementById('bezier-aus');
        		if (drawC && drawC.getContext) {
				    ctx = drawC.getContext('2d');
				    ctx.lineWidth= 0.03;
				    
				    var flow; 
				    var arr = new Array();
				    // aus
				    arr[0] = new Array(0, 5);
				    arr[1] = new Array(100, 0);
				    arr[2] = new Array(200 , 0);
				    arr[3] = new Array(300, 50);
				    arr[4] = new Array(500, 400);
				    arr[5] = new Array(700, 600);
				    arr[6] = new Array(750, 800);
				   

				    //isr
				    arr[7] = new Array(10, 10);
				    arr[8] = new Array(50, 50);
				    arr[9] = new Array(0, 80);


				    flow = getBezierCurve(new Array(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]), 0.05);
				    drawLines(ctx, flow, 10);

				    flow = getBezierCurve(new Array(arr[7], arr[8], arr[9]), 0.05);
				    drawLines(ctx, flow, 10);
				}
				    drawU = document.getElementById('bezier-usa');
        		if (drawU && drawU.getContext) {
				    ctx = drawU.getContext('2d');
				    ctx.lineWidth= 0.03;
				    
				    var flow; 
				    var arr = new Array();
				    // usa
				    arr[0] = new Array(300, 10);
				    arr[1] = new Array(300, 50);
				    arr[2] = new Array(200 , 50);
				    arr[3] = new Array(100, 50);
				    arr[4] = new Array(50, 40);
				   
				    //bzr
				    arr[5] = new Array(300, 28);
                    arr[6] = new Array(310, 60);
                    arr[7] = new Array(20, 200);

				    flow = getBezierCurve(new Array(arr[0],  arr[1], arr[2], arr[3], arr[4]), 0.05);
				    drawLines(ctx, flow, 10);

				    flow = getBezierCurve(new Array(arr[5], arr[6],  arr[7] ), 0.05);
				    drawLines(ctx, flow, 10);
                    return;
				}
        	}, 800);
        	setTimeout(function () {
        		$('.isr-flex .composition').addClass('show-composition');
        	}, 1000);
        	setTimeout(function () {
        		$('.brz-flex .composition').addClass('show-composition');
        	}, 1200);
        	setTimeout(function () {
        		$('.aus-flex .composition').addClass('show-composition');
        	}, 1400);
        	setTimeout(function () {
        		$('.usa-flex .composition').addClass('show-composition');
        	}, 1600);
            } else if (anchors[currentAnchor] >1400) {
                setTimeout(function () {
               $(".flex-cloud").attr('id','flex-cloud');
                $(".we-specilise").attr('id','we-specilise');
            }, 1000);
           
            }
            render = true;
        
        $('html, body').animate({
            scrollTop: parseInt( anchors[currentAnchor] )
        }, 500, 'swing', function(){
            isAnimating  = false;
        });
    });

    updateAnchors(); 
    
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

});


