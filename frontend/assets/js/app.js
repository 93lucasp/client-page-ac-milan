/**
 * Main Application File
 *
 * Use for bootstrapping large application
 * or just fill it with JS on small projects
 *
 */
$(function() {
   


});

$('#icon-menu').click(function() {
    $(this).toggleClass('open');
});

// NAVBAR

$(".menu-drop-down").hide();
$("#icon-menu").click(function() {
    $(".menu-drop-down").slideToggle("slow", function() {

    });
});

$(".open").click(function() {
    closeResponsiveMenu();
});
var closeResponsiveMenu = function() {
    $(".menu-drop-down").slideToggle("slow", function() {

    });
};

var scroll_pos = 0;
$(document).scroll(function() {
    scroll_pos = $(this).scrollTop();
    if (scroll_pos > 10) {
        $(window).scroll(function() {
            $("nav").css({
                "background-color": '#000',
                'transition': 'all 0.6s ease-out'
            }).fadeIn("slow");

        });
    } else {
        $(window).scroll(function() {
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
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round($elem.offset().top);
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation() {
    var $elem = $('.wrapper-transition-box .box-client, .wrapper-transition-box .box-solution-challenge, .wrapper-transition-box .box-our-info');

    // If the animation has already been started
    if ($elem.hasClass('start')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('start');
    }
}

// Capture scroll events
$(window).scroll(function() {
    checkAnimation();
});
