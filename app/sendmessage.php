<?php
session_start();

$domain = $_SERVER['HTTP_HOST'];
$_SESSION['http_host'] = $domain.$_SERVER['SCRIPT_URL'];

$token = '8b2c9d7d2bd0ef485ffe2852d0b80a1cca02f123';
$sendTo = 'lum.com.ua@yandex.ru';
$sendToIms = 'client@imsmedia.net.ua';
$from = "info@$domain";
$title = '';

$subject = "Заявка Landing page $domain " . $title;

if(isset($_GET['forms_script'])){
    header("Content-Type: application/javascript");
    ?>

    (function($) {
    "use strict";

    $.fn.formData = function(options) {

    if (this === undefined) {
    return ("error");
    }

    var settings = $.extend({
    'select_attr': 'name',
    'textvalue': false,
    'validator': false,
    'invalid': false,
    'valid': false,
    'callback': false
    }, options);


    var send_obj = {},
    put = function(key, val, title, obj) {
    if (key.indexOf('[]') > -1 && key[key.length - 1] === ']' && key[key.length - 2] === '[') {
    key = key.replace('[]', '');

    if (send_obj[key] !== undefined && Object.prototype.toString.call(send_obj[key]) === '[object Array]') {
    send_obj[key].push({val: val, title: title, obj: obj});
    } else {
    send_obj[key] = [{val: val, title: title, obj: obj}];
    }
    } else {
    send_obj[key] = {val: val, title: title, obj: obj};
    }
    obj.rules = getValidateRules(obj);

    if(settings.validator === false)
    settings.validator = {};

    for(var rule in obj.rules) {
    if(typeof settings.validator[key] == 'undefined')
    settings.validator[key] = [];
    settings.validator[key][settings.validator[key].length] = rule;
    }
    },
    getValidateRules = function(obj){
    var data = obj.data(),
    rules = {},
    dataKey;
    for(dataKey in data){
    if(dataKey.indexOf("validate") === 0){
    rules[dataKey.replace("validate", "").toLowerCase()] = data[dataKey];
    }
    }

    return rules;
    };

    // get text/hidden input and textarea
    var txt = $('textarea:enabled:visible:enabled, input[type=hidden]:enabled, input[type!=checkbox][type!=radio]:enabled:visible', this);

    $.each(txt, function(i, j) {
    if ($(j).attr(settings.select_attr) !== undefined && $(j).not(':disabled')) {
    put($(j).attr(settings.select_attr), $(j).val(), $(j).data('title'), $(j));
    }
    });


    // get select
    var select = $('select:visible:enabled', this);

    $.each(select, function(i, j) {
    if ($(j).attr(settings.select_attr) !== undefined && $(j).not(':disabled')) {
    if (settings.textvalue === true) {
    put($(j).attr(settings.select_attr), $(j).children("option:selected").text(), $(j).data('title'), $(j));
    } else {
    put($(j).attr(settings.select_attr), $(j).val(), $(j).data('title'), $(j));
    }
    }
    });


    // get checkboxes
    var checkBox = $('input[type=checkbox]:enabled');

    $.each(checkBox, function(i, j) {
    var Name = $(j).attr('name');

    if (send_obj[Name] === undefined) {
    send_obj[Name] = [];
    }

    if ($(j).prop('checked') === true) {
    send_obj[Name].push($(j).attr('value'), $(j).data('title'), $(j));
    }

    });

    // get radiobuttons
    var radio = $('input[type=radio]:checked:enabled');

    $.each(radio, function(i, j) {
    put($(j).attr('name'), $(j).attr('value'), $(j).data('title'), $(j));
    });

    // validation  ==============================================
    var checkValid = function(val, rule) {
    var re;

    switch (rule) {
    case 'required':
    return !(val === undefined || val.length === 0);

    case 'email':
    re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);

    case 'phone':
    re = /^\+?[-\(\)\d\s]{5,19}$/;
    return re.test(val);

    case 'uaphone':
    re = /\+38 \(0[0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/g;
    return re.test(val);

    case 'url':
    re = /^(https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)*?$/;
    return re.test(val);

    case 'alpha':
    re = /^[a-zA-Z]+$/;
    return re.test(val);

    case 'alpha_num':
    re = /^[a-zA-Z0-9]+$/;
    return re.test(val);

    case 'alpha_dash':
    re = /^[-_a-zA-Z0-9]+$/;
    return re.test(val);
    }

    if (rule.indexOf(':') > -1) {
    rule = rule.split(':');
    switch (rule[0]) {
    case 'len':
    return rule.slice(1, rule.length).some(function(el) {
    return val.length == el;
    });

    case 'range_len':
    return (val.length >= rule[1] && val.length <= rule[2]);

    case 'max':
    return val <= rule[1];

    case 'min':
    return val >= rule[1];

    case 'range':
    return (val >= rule[1] && val <= rule[2]);

    case 'not':
    return val != rule[1];

    case 'is':
    return rule.slice(1, rule.length).some(function(el) {
    return val == send_obj[el];
    });

    case 'same':
    return val == send_obj[rule[1]];

    case 'diff':
    return val != send_obj[rule[1]];
    }
    }

    return true;
    };

    var inValidEl = {};

    if (settings.validator) {
    for (var k in settings.validator) {
    for (var i = 0; i < settings.validator[k].length; i++) {
    if (!checkValid(send_obj[k].val, settings.validator[k][i])) {
    if (inValidEl[k] === undefined)
    inValidEl[k] = [];
    inValidEl[k].push(settings.validator[k][i].split(':')[0]);
    }
    }
    }
    }

    if (!$.isEmptyObject(inValidEl) && settings.invalid) {
    settings.invalid({'errors':inValidEl, obj:send_obj});
    return false;
    } else if (settings.valid) {
    settings.valid();
    }


    // callback function =========================================
    if (settings.callback) {
    inValidEl = $.isEmptyObject(inValidEl) || inValidEl;
    settings.callback(send_obj, inValidEl);
    }

    return send_obj;
    };

    $.fn.validateTooltip = function(options) {
    var $this = $(this);
    var top = parseInt($this.offset().top - 34);
    var left = parseInt($this.offset().left + $this.width()/2);

    $this.tooltip = $('<div class="validate-error" style="position: absolute; display: inline-block; opacity: 1;' +
                    ' padding: 5px 0; z-index: 1070; font-family: -apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif;' +
                    ' line-height: 1.5; font-style: normal; font-weight: 400; letter-spacing: normal; text-align: start;' +
                    ' text-decoration: none; text-shadow: none; text-transform: none; white-space: normal; word-break: normal;' +
                    ' word-spacing: normal; font-size: 12px; word-wrap: break-word; transform: translateX(-50%);' +
                    ' top:' + top + 'px; left:' + left + 'px">' +
        '<div class="animated" style="padding-bottom: 5px;">' +
            '<div style="max-width: 200px; padding: 3px 8px; color: #fff; text-align: center; background-color: #000; ' +
                    'border-radius: .25rem;">' +
                '<i style="bottom: 0; left: 50%; margin-left: -5px; border-width: 5px 5px 0; border-top-color: #000;' +
                    ' position: absolute; width: 0; height: 0; border-left-color: transparent; border-right-color: transparent; border-style: solid;"></i>' +
                options.text +
                '</div>' +
            '</div>' +
        '</div>');

    $('body').append($this.tooltip);

    $this.tooltip.find('.animated').addClass('shake');

    $this.click(function () {
    $this.tooltip.remove();
    });
    };

    $(document).on('submit', 'form', function(e){
    e.preventDefault();
    var form = $(this);
    if(!form.hasClass('disabled')) {
    var data = form.formData({
    validator: {},
    invalid: function (data) {
    for(var name in data.errors){
    data.obj[name].obj.validateTooltip({
    text: data.obj[name].obj.rules[data.errors[name][0]]
    });
    }
    }
    });

    if(data === false)
    return false;
    else{
    for(var el in data){
    delete data[el].obj;
    }
    }

    var info = getInfo();

    $.extend(data, info);

    $.ajax({
    url: '/sendmessage.php',
    type: 'POST',
    data: {data: JSON.stringify(data)},
    dataType: 'json',
    beforeSend: function () {
    	form.addClass('disabled');
    	form.find('button[type="submit"]').html('Отправляем...');
    },
    success: function (response) {
    	form.trigger('reset');
    	form.find('button[type="submit"]').html('Отправлено');
    
    	if(typeof response.status !== 'undefined' && response.status == 'success') {
    		form.trigger('sent', response);
    	}else{
    		form.trigger('error', response);
    	}
    	if($(form).hasClass('popup-form_catalog')){
    		
    		var product = window.location.pathname;
    		if($(form).hasClass('popup-form_catalog-lamp')){
				$(location).attr('href', 'files/price-lum.pdf');
			}
			if($(form).hasClass('popup-form_catalog-led')){
				$(location).attr('href', 'files/price-lum_led.pdf');
			}
			if($(form).hasClass('popup-form_catalog-linzi')){
				$(location).attr('href', 'files/price-lum_linzi.pdf');
			}
			}
    },
    error: function(response){
    form.removeClass('disabled');
    form.find('button[type="submit"]').html('Не вышло :(');
    form.trigger('error', response);
    }
    });
    }

    });

    function getValidateRules(obj){
    var data = obj.data(),
    rules = {},
    dataKey;
    for(dataKey in data){
    if(dataKey.indexOf("validate") === 0){
    rules[dataKey.replace("validate", "").toLowerCase()] = data[dataKey];
    }
    }

    return rules;
    }

    $('body').append('<style>' +
        '.animated { -webkit-animation-duration: 1s;animation-duration: 1s; -webkit-animation-fill-mode: both;animation-fill-mode: both;}' +
        '.animated.infinite {-webkit-animation-iteration-count: infinite; animation-iteration-count: infinite;}' +
        '.animated.hinge{ -webkit-animation-duration: 2s;animation-duration: 2s;}' +
        '.animated.flipOutX, .animated.flipOutY, .animated.bounceIn, .animated.bounceOut {-webkit-animation-duration: .75s; animation-duration: .75s;}' +
        '@-webkit-keyframes shake { from, to { =-webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0);}' +
        '10%, 30%, 50%, 70%, 90% {-webkit-transform: translate3d(-10px, 0, 0); transform: translate3d(-10px, 0, 0);}' +
        '20%, 40%, 60%, 80% { -webkit-transform: translate3d(10px, 0, 0);transform: translate3d(10px, 0, 0);}}' +
        '@keyframes shake {from, to {-webkit-transform: translate3d(0, 0, 0);transform: translate3d(0, 0, 0);}' +
        '10%, 30%, 50%, 70%, 90% {-webkit-transform: translate3d(-10px, 0, 0); transform: translate3d(-10px, 0, 0);}' +
        '20%, 40%, 60%, 80% { -webkit-transform: translate3d(10px, 0, 0);transform: translate3d(10px, 0, 0);}}' +
        '.shake {-webkit-animation-name: shake;animation-name: shake;}' +
        '</style>');

    })(jQuery);

    function toFormData(obj) {
    var data = new FormData();

    $.each(obj, function(key, value) {
    data.append(key, value);
    });

    return data;
    }

    function parseGetParams(){
    var $_GET = {};
    var __GET = window.location.search.substring(1).split("&");
    for(var i=0; i<__GET.length; i++){
    var getVar = __GET[i].split("=");
    $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
    }
    return $_GET;
    }

    function getInfo(){
    var keys = parseGetParams();
	var host_s = window.location.host+window.location.pathname.slice(0,-1);
    return {
    history: {title: '', val: history.length},
    js_user_agent: {title: '', val: getUserAgent(navigator.userAgent)},
    get: {title: 'Страница', val: window.location.href},
	referer: {title: 'Заявка пришла со страницы', val: (typeof document.referrer == 'undefined' ? 'NULL' : document.referrer)},
    host: {title: '', val: host_s},
    utm_source: {title: 'Поисковая система', val: (typeof(keys['utm_source'])=="undefined" ? "" : keys['utm_source'])},
    utm_campaign: {title: 'Кампания', val: (typeof(keys['utm_campaign'])=="undefined" ? "" : keys['utm_campaign'])},
    utm_term: {title: 'Ключ', val: (typeof(keys['utm_term'])=="undefined" ? "" : decodeURIComponent(keys['utm_term']))}
    };
    }

    function getUserAgent(u){
    var ua=u.toLowerCase(),
    is=function(t){
    return ua.indexOf(t)>-1
    },
    g='gecko',
    w='webkit',
    s='safari',
    o='opera',
    m='mobile',
    h=document.documentElement,
    b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?
    ('ie ie'+RegExp.$1):is('firefox/2')?
    g+' ff2':is('firefox/3.5')?
    g+' ff3 ff3_5':is('firefox/3.6')?
    g+' ff3 ff3_6':is('firefox/3')?
    g+' ff3':is('gecko/')?
    g:is('opera')?
    o+(/version\/(\d+)/.test(ua)?
    ' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?
    ' '+o+RegExp.$2:'')):is('konqueror')?
    'konqueror':is('blackberry')?
    m+' blackberry':is('android')?
    m+' android':is('chrome')?
    w+' chrome':is('iron')?
    w+' iron':is('applewebkit/')?
    w+' '+s+(/version\/(\d+)/.test(ua)?
    ' '+s+RegExp.$1:''):is('mozilla/')?
    g:'',is('j2me')?
    m+' j2me':is('iphone')?
    m+' iphone':is('ipod')?
    m+' ipod':is('ipad')?
    m+' ipad':is('mac')?
    'mac':is('darwin')?
    'mac':is('webtv')?
    'webtv':is('win')?
    'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?
    'freebsd':(is('x11')||is('linux'))?
    'linux':'','js'];

    c = b.join(' ');
    h.className += ' '+c;
    return c;
    }

    <?php
    die();
}

function sendStatistics($data)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://statistics.imsmedia.net.ua/remote/addstat');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $result = curl_exec($ch);
    curl_close($ch);

    $category = $_SERVER['DOCUMENT_ROOT'] . "/";
    $fp = fopen($category . 'log_stat.txt', "a");
    $user_ip = $_SERVER['REMOTE_ADDR'];
    $curenr_time = date("H:i:s d.m.Y", time());
    fwrite($fp, $user_ip . " in $curenr_time. Stat say: $result \r\n");
    fclose($fp);
    //return $result;
}

function prepare_data($data, $key)
{
    switch ($key) {
        case 'referer':
            return substr($data, 0, 30);
        case 'term':
            return urldecode($data);
        default:
            return $data;
    }
}

if (array_key_exists('data', $_POST)) {
	//return print_r($_POST);die();
    $headers = "From: $from\nReply-To: $from\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

    $msg = "<html><body style='font-family:Arial,sans-serif;'>";
    $msg .= "<h2 style='color:#161616;font-weight:bold;font-size:30px;border-bottom:2px dotted #bd0707;'>Новая заявка на сайте $domain " . $title . "</h2>\r\n";

    $data = json_decode($_POST['data']);
    $session_data = ['referer' => 'Заявка пришла со страницы', 'sourse' => 'Поисковая система', 'term' => 'Ключ', 'campaign' => 'Кампания'];

    if (!isset($data->phone) || empty($data->phone->val)) {
        header("HTTP/1.0 404 Not Found");
        echo '{"status":"error", "message":"Не заполнено поле телефон"}';
        die();
    }

    $stat = array(
        'token' => $token,
        'ip' => $_SERVER['REMOTE_ADDR'],
        'user_agent' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : NULL,
        'additional_user_stat' => $_POST['data']
    );

    foreach ($data as $key => $params) {
        if (!empty($params->title) && !empty($params->val)) {
            $val = prepare_data($params->val, $key);
            $msg .= "<p><strong>$params->title:</strong> $val</p>\r\n";
            if (isset($session_data[$key]))
                unset($session_data[$key]);
        }
		if(empty($params->val)){
			$stat[$key] = 'Лось!';
		}else{
        	$stat[$key] = prepare_data($params->val, $key);
		}

    }
//
    foreach ($session_data as $key => $title) {
        if (array_key_exists($key, $_SESSION)) {
            $val = prepare_data($_SESSION[$key], $key);
            $msg .= "<p><strong>$title:</strong> $val</p>\r\n";

            if (!empty($val)) {
                $stat[$key] = $val;
            }
        }
    }

    $msg .= "</body></html>";

    sendStatistics($stat);
    //die();

    if ((mail($sendTo, $subject, $msg, $headers)) && (mail($sendToIms, $subject, $msg, $headers))) {
        header("HTTP/1.0 200 OK");
        echo '{"status":"success"}';
    } else {
        header("HTTP/1.0 404 Not Found");
        echo '{"status":"error"}';
    }
} else {
    header("HTTP/1.0 404 Not Found");
    echo '{"status":"error2"}';
}
?>