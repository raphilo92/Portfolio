'use strict'

// Elements

const navbar = document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height
const logoName = document.querySelector('.navbar__logo__name')
const logoImg = document.querySelector('.navbar__logo__icon')
const active = document.querySelector('.navbar__menu__items')

const home = document.querySelector('#home')
const homeHeight = home.getBoundingClientRect().height

const about = document.querySelector('#about')
const aboutHeight = about.getBoundingClientRect().height

const skills = document.querySelector('#skills')
const skillsHeight = skills.getBoundingClientRect().height

const work = document.querySelector('#work')
const workHeight = work.getBoundingClientRect().height

// scroll down effect.
document.addEventListener('scroll', () => {
  // Navbar
  if (window.scrollY > navbarHeight) {
    work.classList.add('work__fade')
    active.classList.add('onscroll')
    navbar.classList.add('navbar-dark')
    active.classList.add('onscroll')
  } else {
    navbar.classList.remove('navbar-dark')
    active.classList.remove('onscroll')
  }
  // Home
  if (navbarHeight + 80 < window.scrollY) {
    home.classList.add('home__fade')
    active.classList.add('onscroll')
  } else {
    home.classList.remove('home__fade')
    active.classList.remove('onscroll')
  }
  //  about
  if (homeHeight + aboutHeight * 0.8 < window.scrollY) {
    about.classList.add('about__fade')
    active.classList.add('onscroll')
  } else {
    about.classList.remove('about__fade')
    active.classList.remove('onscroll')
  }
  // skills
  if (homeHeight + aboutHeight + skillsHeight < window.scrollY) {
    skills.classList.add('skills__fade')
    active.classList.add('onscroll')
  } else {
    skills.classList.remove('skills__fade')
    active.classList.remove('onscroll')
  }
  if (homeHeight + aboutHeight < window.scrollY) {
    work.classList.remove('work__fade')
    active.classList.remove('onscroll')
  } else {
    work.classList.add('work__fade')
    active.classList.add('onscroll')
  }
})

// Home text effect

// function([string1, string2],target id,[color1,color2])
consoleText(
  ['Hello World.', "I'm Kipack Jeong", 'A Software Developer.'],
  'text',
  ['white', '#f5f5b9', 'lightblue'],
)

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff']
  var visible = true
  var con = document.getElementById('console')
  var letterCount = 1
  var x = 1
  var waiting = false
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function () {
    if (letterCount === 0 && waiting === false) {
      waiting = true
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function () {
        var usedColor = colors.shift()
        colors.push(usedColor)
        var usedWord = words.shift()
        words.push(usedWord)
        x = 1
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x
        waiting = false
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true
      window.setTimeout(function () {
        x = -1
        letterCount += x
        waiting = false
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x
    }
  }, 120)
  window.setInterval(function () {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false
    } else {
      con.className = 'console-underscore'

      visible = true
    }
  }, 400)
}

//Menu button click

var navbarMenu = document.querySelector('.navbar__menu')
navbarMenu.addEventListener('click', (event) => {
  const target = event.target
  const link = target.dataset.link
  if (link == null) {
    return
  }
  const scrollTo = document.querySelector(link)
  scrollTo.scrollIntoView({ behavior: 'smooth' })
})

// Menu toggle click
const toggle = document.querySelector('.navbar__togglebtn')
toggle.addEventListener('click', () => {
  // if menu is already on display.
  if (navbarMenu.classList.contains('navbar__menu__onclick')) {
    // close it
    navbarMenu.classList.remove('navbar__menu__onclick')
    return
  }
  // else, open
  navbarMenu.classList.add('navbar__menu__onclick')
  activityWatcher()
})

// ContactMe Button Click

/*
  Need to Work on this
*/

/*
  Img Lazy Load
*/

document.addEventListener('DOMContentLoaded', function () {
  var lazyloadImages

  if ('IntersectionObserver' in window) {
    lazyloadImages = document.querySelectorAll('.lazy1')
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target
          image.src = image.dataset.src
          image.classList.remove('lazy1')
          imageObserver.unobserve(image)
        }
      })
    })

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image)
    })
  } else {
    var lazyloadThrottleTimeout
    lazyloadImages = document.querySelectorAll('.lazy1')

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout)
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src
            img.classList.remove('lazy1')
          }
        })
        if (lazyloadImages.length == 0) {
          document.removeEventListener('scroll', lazyload)
          window.removeEventListener('resize', lazyload)
          window.removeEventListener('orientationChange', lazyload)
        }
      }, 20)
    }

    document.addEventListener('scroll', lazyload)
    window.addEventListener('resize', lazyload)
    window.addEventListener('orientationChange', lazyload)
  }
})

function activityWatcher() {
  //The number of seconds that have passed
  //since the user was active.
  var secondsSinceLastActivity = 0

  //Setup the setInterval method to run
  //every second. 1000 milliseconds = 1 second.
  setInterval(function () {
    secondsSinceLastActivity++
    console.log(
      secondsSinceLastActivity + ' seconds since the user was last active',
    )
    //if the user has been inactive or idle for longer
    //then the seconds specified in maxInactivity
    if (secondsSinceLastActivity > 2) {
      navbarMenu.classList.remove('navbar__menu__onclick')
      return
    }
  }, 1000)

  //The function that will be called whenever a user is active
  function activity() {
    //reset the secondsSinceLastActivity variable
    //back to 0
    secondsSinceLastActivity = 0
  }

  //An array of DOM events that should be interpreted as
  //user activity.
  var activityEvents = [
    'mousedown',
    'mousemove',
    'keydown',
    'scroll',
    'touchstart',
  ]

  //add these events to the document.
  //register the activity function as the listener parameter.
  activityEvents.forEach(function (eventName) {
    document.addEventListener(eventName, activity, true)
  })
}
