'use strict';

$(window).on("load", function() {
    $(".loader .inner").fadeOut(500, function() {
        $(".loader").fadeOut(750);
    });
});

$(document).ready(()=>{
    //  fire up superslides
    $('#slides').superslides({
        animation: 'fade',
        play: 3000,
        pagination: false
    });

    //  fire up typed
    let typed = new Typed(".typed", {
        strings: ["Web Developer.", "Front End.", "Back End.", "Full Stack.", "App Developer."],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });

    // fire up the carousel
    $('.owl-carousel').owlCarousel({
        items: 4,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            938: {
                items: 4
            }
        }
    });

    //  set positioning for skills charts
    let skillsTopOffset = $(".skillsSection").offset().top;
    let statsTopOffset = $(".statsSection").offset().top;
    let countUpFinished = false;

    //  fire up the easyPieChart
    $(window).scroll(() => {
        if ( window.pageYOffset > skillsTopOffset - $(window).height() + 200 ) {
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#6495ed',
                trackColor: false,
                scaleColor: false,
                lineWidth: 5,
                size: 152
            });
        }

        //  fire up the countup - but only once
        if ( !countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200 ) {
            $(".counter").each(function () {
                let element = $(this);
                let endVal = parseInt(element.text());

                element.countup(endVal);
            });

            countUpFinished = true;
        }
    });

    //fire up fancybox
    $("[data-fancybox]").fancybox();

    //  fire up animations for portfolio box - isotope with the ALL (*) filter
    $(".items").isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing: 'linear',
            queue: false
        }
    });

    //  set selector functionality (click)
    $("#filters a").click(function() {
        $("#filters .current").removeClass("current");
        $(this).addClass("current");
        //re-fire isotope with the selector filter
        let selector = $(this).attr("data-filter");
        $(".items").isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false
            }
        });

        return false;   //  ends processing of click
    });

    //  smooth scroll the navigation
    $("navigation li a").click(function(e) {
        e.preventDefault();

        let targetElement = $(this).attr("href");
        let targetPosition = $(targetElement).offset().top;
        $("html, body").animate( { scrollTop: targetPosition - 50 }, "slow" );
    });

    //  stickify the navbar on scroll
    const nav = $("#navigation");
    const navTop = nav.offset().top;

    $(window).on("scroll", stickyNavigation);

    function stickyNavigation() {
        const body = $("body");

        if ($(window).scrollTop() >= navTop) {
            body.css("padding-top", nav.outerHeight() + "px");
            body.addClass("fixedNav");
        }
        else {
            body.css("padding-top", 0);
            body.removeClass("fixedNav");
        }
    }

});