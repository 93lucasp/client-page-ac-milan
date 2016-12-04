/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	$(function () {
	    $('.box-white img').hide();
	    $('.box-color').hide();
	});
	
	$('#icon-menu').click(function () {
	    $(this).toggleClass('open');
	});
	
	/* NAVBAR  EFFECT RESPONSIVE HAMBURGER */
	
	$(".menu-drop-down").hide();
	$("#icon-menu").click(function () {
	    $(".menu-drop-down").slideToggle("slow", function () {});
	});
	
	$(".open").click(function () {
	    closeResponsiveMenu();
	});
	var closeResponsiveMenu = function () {
	    $(".menu-drop-down").slideToggle("slow", function () {});
	};
	/* END NAVBAR  EFFECT RESPONSIVE HAMBURGER */
	
	/* NAVBAR  EFFECT FROM TRANSPARENT TO BLACK */
	var scroll_pos = 0;
	$(document).scroll(function () {
	    scroll_pos = $(this).scrollTop();
	    if (scroll_pos > 10) {
	        $(window).scroll(function () {
	            $("nav").css({
	                "background-color": '#000',
	                'transition': 'all 0.6s ease-out'
	            }).fadeIn("slow");
	        });
	    } else {
	        $(window).scroll(function () {
	            $("nav").css({
	                "background-color": 'transparent'
	            });
	        });
	    }
	});
	/* END NAVBAR  EFFECT FROM TRANSPARENT TO BLACK */
	
	/* CHECKING IF ELEMENT THAT PASS IS PRESENT ON SCROLLING */
	function isElementInViewport(elem) {
	    var $elem = $(elem);
	    var scrollElem = navigator.userAgent.toLowerCase().indexOf('webkit') != -1 ? 'body' : 'html';
	    var viewportTop = $(scrollElem).scrollTop();
	    var viewportBottom = viewportTop + $(window).height();
	    var elemTop = Math.round($elem.offset().top);
	    var elemBottom = elemTop + $elem.height();
	    return elemTop < viewportBottom && elemBottom > viewportTop;
	}
	/* END CHECKING IF ELEMENT THAT PASS IS PRESENT ON SCROLLING */
	
	function checkAnimationInfo(classToAdd) {
	    var $elem = $(classToAdd);
	    // CALLING FUNCTION AND PASS AN ELEMENT IF ON SCROLL THE ELEMNT IS PRESENT ADD A CLASS
	    if (isElementInViewport($elem)) {
	        $elem.addClass('start');
	    }
	}
	
	function checkAnimationColor(classToAdd) {
	    var $elem = $(classToAdd);
	    if (isElementInViewport($elem)) {
	        // CALLING FUNCTION AND PASS AN ELEMENT IF ON SCROLL THE ELEMNT IS PRESENT ADD A CLASS
	        $('.box-color').show();
	        $elem.addClass('animation');
	    }
	}
	
	function checkAnimationImg(classToAdd) {
	    var $elem = $(classToAdd);
	    if (isElementInViewport($elem)) {
	        // CALLING FUNCTION AND PASS AN ELEMENT IF ON SCROLL THE ELEMNT IS PRESENT ADD A CLASS
	        $('.box-white img').show();
	        $elem.addClass('animation');
	    }
	}
	$(window).scroll(function () {
	    // ON SCROLL CALLING ALL THE FUNCTIONS TO CHECK IF THE CLASS THAT I PASS IS THERE
	    checkAnimationInfo(".wrapper-transition-box .box-client, .wrapper-transition-box .box-solution-challenge, .wrapper-transition-box .box-our-info");
	    checkAnimationColor(".fig-block");
	    checkAnimationColor(".box-font");
	    checkAnimationColor(".fig-vertical");
	    checkAnimationColor(".fig-horizontal");
	    checkAnimationImg(".box-white");
	});

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map