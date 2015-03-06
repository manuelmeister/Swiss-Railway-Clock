$(document)

    // on document ready
    .ready(function () {

        initLocalClocks();

        // new Date
        refreshDate();

        console.log('Animation: rotate-' + seconds);

        // set animation to the generated @keyframes for the remaining time until the next minute
        set_First_CSS_Second_Animation();

        $('#seconds-container')
            // when the animation ends, the setSeconds() function will get executed
            .bind('animationEnd webkitAnimationEnd', function (e) {
                setSeconds();
            })
        ;
    })
    // When you change the tab and come back, the hands are repainted
    .on('visibilitychange', function () {

        // replaces the #seconds-container, to reset the animation
        resetAnimation();

        refreshDate();

        set_First_CSS_Second_Animation();

        initLocalClocks();
    });


function initLocalClocks() {
    // Get the local time using JS
    refreshDate();
    global_current_minute = minutes

    // Log current time
    console.log(hours + ":" + minutes);

    //Set the hands
    $('.hours').css({
        '-webkit-transform': 'rotateZ(' + (hours * 30) + (minutes / 2) + 'deg)',
        'transform': 'rotateZ(' + (hours * 30) + (minutes / 2) + 'deg)'
    });
    $('.minutes').css({
        '-webkit-transform': 'rotateZ(' + (minutes * 6)+ 'deg)',
        'transform': 'rotateZ(' + (minutes * 6) + 'deg)'
    });
}

function setSeconds() {
    $('#seconds-container').attr('style', '').removeClass('active');

    // replaces the #seconds-container, to reset the animation
    resetAnimation();

    //Wait for "impulse" of new minute
    timing = setInterval(function () {

        refreshDate();
        console.log("minutes: " + minutes + "| seconds: " + seconds);

        // checks if the minute has changed or if the next minute is in the next hour
        if (((global_current_minute + 1) == minutes) || ((global_current_minute == 59) && (minutes == 0))) {

            clearInterval(timing);
            setTimeout(function () {
                activateSeconds();
            }, 250);
        }
    }, 250);

}

function activateSeconds() {
    console.log("it's time: " + date.getMinutes());
    initLocalClocks();
    $('#seconds-container').addClass('active');
}

function refreshDate() {
    date = new Date;
    seconds = date.getSeconds();
    minutes = date.getMinutes();
    hours = date.getHours();
}

function resetAnimation() {
    var el = $('.seconds-container'),
        newone = el.clone(true);
    el.before(newone);
    $(".seconds-container:nth-child(-n+3)").remove();
}

function set_First_CSS_Second_Animation() {
    $('#seconds-container').css({
        '-webkit-animation': 'rotate-' + seconds + ' ' + (59 - seconds) + 's linear',
        'animation': 'rotate-' + seconds + ' ' + (59 - seconds) + 's linear'
    });
}