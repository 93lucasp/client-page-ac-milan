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

	/**
	 * Main Application File
	 *
	 * Use for bootstrapping large application
	 * or just fill it with JS on small projects
	 *
	 */
	$(function () {});
	
	$('#icon-menu').click(function () {
	    $(this).toggleClass('open');
	});
	
	// NAVBAR
	
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
	
	// import 'babel-polyfill';
	// import _ from 'lodash';
	// import { TweenMax } from 'gsap';
	
	// import './base/plugins';
	
	// const body = document.body;
	// const els = [];
	
	// _.times(12, (i) => {
	//     const el = document.createElement('div');
	//     el.innerHTML = i;
	//     TweenMax.set(el, { autoAlpha: 0 });
	//     body.appendChild(el);
	//     els.push(el);
	// });
	
	// TweenMax.staggerTo(els, 0.3, {
	//     autoAlpha: 1
	// }, 0.1);
	
	function isElementInViewport(elem) {
	    var $elem = $(elem);
	
	    // Get the scroll position of the page.
	    var scrollElem = navigator.userAgent.toLowerCase().indexOf('webkit') != -1 ? 'body' : 'html';
	    var viewportTop = $(scrollElem).scrollTop();
	    var viewportBottom = viewportTop + $(window).height();
	
	    // Get the position of the element on the page.
	    var elemTop = Math.round($elem.offset().top);
	    var elemBottom = elemTop + $elem.height();
	
	    return elemTop < viewportBottom && elemBottom > viewportTop;
	}
	
	function checkAnimationInfo() {
	    var $elem = $('.wrapper-transition-box .box-client, .wrapper-transition-box .box-solution-challenge, .wrapper-transition-box .box-our-info');
	    if (isElementInViewport($elem)) {
	        $elem.addClass('start');
	    }
	}
	function checkAnimationColor(classToAdd) {
	    var $elem = $(classToAdd);
	    if (isElementInViewport($elem)) {
	        $elem.addClass('animation');
	    }
	}
	$(window).scroll(function () {
	    checkAnimationInfo();
	    checkAnimationColor(".fig-block");
	    checkAnimationColor(".fig-font");
	    checkAnimationColor(".fig-vertical");
	    checkAnimationColor(".fig-horizontal");
	});

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map