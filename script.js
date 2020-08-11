const timeAroundClock = 58500
const degreePerMinute = 360 / 60
const degreePerHour = 360 / 12
const degreePerHourInMinutes = degreePerHour / 60

window.addEventListener('DOMContentLoaded', () => {
    firstMinute()
})

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        let animations = document.getAnimations()
        if (animations.length > 0) {
            animations.forEach(animation => {
                animation.finish()
            })
        }
    } else {
        firstMinute()
    }
})

function firstMinute() {
    const dateNow = new Date();
    const elapsed = dateNow.getSeconds() * 1000 + dateNow.getMilliseconds()

    hour(dateNow.getHours(), dateNow.getMinutes())
    setMinute(dateNow.getMinutes())
    if (elapsed >= timeAroundClock) {
        finishedMinuteAnimation()
    } else {
        second(elapsed / timeAroundClock, (timeAroundClock - elapsed) / timeAroundClock)
    }
}

async function finishedMinuteAnimation() {
    const initialHour = new Date().getHours()
    const initialMinute = new Date().getMinutes()
    let newMinute = await nextMinute()
    if (newMinute === 0) {
        newMinute = 60
    }
    second()
    minute(initialMinute, newMinute)
    hour(initialHour, newMinute)
}

function nextMinute() {
    return new Promise(resolve => {
        const now = new Date()
        const remainingMilliseconds = ((60 - now.getSeconds()) * 1000) + (1000 - now.getMilliseconds())
        setTimeout(() => {
            resolve(new Date().getMinutes())
        }, remainingMilliseconds)
    })
}

function hour(hour, minute) {
    const hourInDegree = (hour % 12) * degreePerHour
    const hourElement = document.querySelector('.hours-container');
    hourElement.style.transform = 'rotate(' + (hourInDegree + (minute * degreePerHourInMinutes)) + 'deg)'
    hourElement.style.opacity = 1
}

function setMinute(value) {
    const minuteElement = document.querySelector('.minutes-container');
    minuteElement.style.transform = 'rotate(' + (value * degreePerMinute) + 'deg)'
    minuteElement.style.opacity = 1
}

function minute(initialMinute, newMinute) {
    const minuteElement = document.querySelector('.minutes-container');
    if (newMinute === 60) {
        let animation = minuteElement.animate([
            {transform: 'rotate(' + initialMinute * degreePerMinute + 'deg)'},
            {transform: 'rotate(' + newMinute * degreePerMinute + 'deg)'}
        ], {duration: 300, iterations: 1, easing: 'cubic-bezier(1, 2.52, 0.71, 0.6)', fill: 'forwards'})
        animation.finished.then(() => {
            minuteElement.style.transform = 'rotate(0deg)'
        })
        animation.play()
    } else {
        let animation = minuteElement.animate([
            {transform: 'rotate(' + initialMinute * degreePerMinute + 'deg)'},
            {transform: 'rotate(' + newMinute * degreePerMinute + 'deg)'}
        ], {duration: 300, iterations: 1, easing: 'cubic-bezier(1, 2.52, 0.71, 0.6)', fill: 'both'}).play()
    }
}

function second(start = 0, iterations = 1) {
    const secondsElement = document.querySelector('.seconds-container');
    let animation = secondsElement.animate([
        {transform: 'rotate(0)', easing: 'cubic-bezier(0.2, 0, 1, 1)'},
        {transform: 'rotate(0.25turn)', easing: 'cubic-bezier(0.11, 0.12, 0.85, 0.86)', offset: 0.25},
        {transform: 'rotate(0.95turn)', easing: 'cubic-bezier(1, 1.36, 0.88, 0.88)', offset: 0.95},
        {transform: 'rotate(1turn)'}
    ], {
        duration: timeAroundClock,
        fill: 'none',
        iterationStart: start,
        iterations: iterations
    })
    animation.finished.then(() => {
        finishedMinuteAnimation()
    })
    animation.play()
    secondsElement.style.opacity = 1
}