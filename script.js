$(document)

    // on document ready
    .ready(function () {

        initLocalClocks();

        // set animation to the generated @keyframes for the remaining time until the next minute
        set_First_CSS_Second_Animation();
    })
    // When you change the tab and come back, the hands are repainted
    .on('visibilitychange', refocus);

$(window).on('focus', refocus);

function refocus() {
    initLocalClocks();

    // replaces the #seconds-container, to reset the animation
    resetAnimation();

    set_First_CSS_Second_Animation();
}

function initLocalClocks() {
    // Get the local time using JS
    refreshDate();
    global_current_minute = minutes

    // Log current time
    console.log(hours + ":" + minutes);

    //Set the hands
    var final_hours = (hours * 30) + (minutes / 2);

    $('.hours').css({
        '-webkit-transform': 'rotateZ(' + final_hours + 'deg)',
        'transform': 'rotateZ(' + final_hours + 'deg)'
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
    $('#seconds-container')
            // when the animation ends, the setSeconds() function will get executed
            .bind('animationEnd webkitAnimationEnd', function (e) {
                setSeconds();
            })
            .css({
                '-webkit-animation': 'rotate-' + seconds + ' ' + (58 - seconds) + 's linear',
                'animation': 'rotate-' + seconds + ' ' + (58 - seconds) + 's linear'
            });
}
