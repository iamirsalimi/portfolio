import {CountUp} from './../libraries/dist/countUp.js'

let menuWrapper = document.querySelector('.left-nav ul')
let changeThemeBtn = document.querySelector('.right-nav #themeBtn')
let changeThemeImgElem = document.querySelector('.right-nav button img')
let loader = document.querySelector('.loader')
let firstLoader = document.querySelector('.firstLoader')
let hamburgerBtn = document.querySelector('.hamburger-menu')
let menuElem = document.querySelector('#content .menu')
let menuChangeThemeBtn = document.querySelector('#content .menu #themeBtn')
let menuChangeThemeImgElem = document.querySelector('#content .menu #themeBtn img')
let backToUpBtn = document.querySelector('.backToUp')

let themeFlag = false

// colors pallete for changing theme 
let colors = {
    dark : '#1b1b1b',
    light : '#f5f5f5'
}


// load other files by using target href
function urlRoutes(href){
    history.pushState({} , '' , href)
    location.reload()
}

// changing route and load other pages on click on nav-links
function changeRoute(event , eventContainer){
    event.preventDefault()
    
    if(!event.target.className.includes('nav-link')){
        return false    
    }
    
    let prevLink = document.querySelector(`${eventContainer} .active`)
    prevLink.classList.remove('active')
    event.target.parentNode.classList.add('active')

    if(window.innerWidth <= 780){
        hideMenuHandler()
    }

    loader.classList.add('on')

    setTimeout(() => {
        urlRoutes(event.target.href)
    } ,995)

    loader.lastElementChild.addEventListener('animationend' , () => {
        loader.querySelectorAll('span').forEach(span => {
            span.style.width = '100%'
        })
    })
}

function hideMenuHandler(){
    menuElem.classList.remove('open')
    hamburgerBtn.classList.remove('open')
}

// menu's container are diffrence and for removing active class from prevLink we must have access to links container and for it we must send each container to changeRoute

menuElem.addEventListener('click' , event => changeRoute(event , '#menu-list'))
menuWrapper.addEventListener('click' , event => changeRoute(event , '.left-nav'))



// changing theme color when user click on them btn
function themeChangeHandler(){
    themeFlag = !themeFlag
    
    localStorage.setItem('theme' , themeFlag ? 'dark' : 'light')

    // getting hire me images to change their color  
    let hireMeImg = document.querySelectorAll('.hireMeSec img')

    changeTheme(hireMeImg)
}

changeThemeBtn.addEventListener('click' , themeChangeHandler)
menuChangeThemeBtn.addEventListener('click' , () =>{
    themeChangeHandler()
    hideMenuHandler()
})

const changeTheme = () => {

    changeThemeImgElem.src = themeFlag ?  './images/moon-filled-to-sunny-filled-loop-transition.svg' : './images/sunny-filled-loop-to-moon-filled-loop-transition.svg'

    menuChangeThemeImgElem.src = themeFlag ?  './images/moon-filled-to-sunny-filled-loop-transition.svg' : './images/sunny-filled-loop-to-moon-filled-loop-transition.svg'

    themeFlag ? menuElem.classList.remove('dark') : menuElem.classList.remove('light')

    menuElem.classList.add(themeFlag ? 'light' : 'dark')

    // setting css color variables
    if(themeFlag){
        document.documentElement.style.setProperty('--dark' ,  colors.light)
        document.documentElement.style.setProperty('--light' ,  colors.dark)
    } else {
        document.documentElement.style.setProperty('--dark' ,  colors.dark)
        document.documentElement.style.setProperty('--light' ,  colors.light)
    }
}

// accessing to latest color of user theme 
const getTheme = () => {
    // showing loader when site loaded for user
    firstLoader.classList.add('off')
    firstLoader.lastElementChild.addEventListener('animationend' , () => {
        firstLoader.querySelectorAll('span').forEach(span => {
            span.style.width = '0%'
        })
        firstLoader.classList.remove('off')
        firstLoader.style.display = 'none'
    })
    
    // changing theme
    themeFlag = localStorage.getItem('theme') == 'dark' ? true : false

    // menu for screens less than 780px , must be opposite of site's theme 
    menuElem.classList.add(themeFlag ? 'light' : 'dark')

    changeTheme()
}

// show and hie menu
function toggleMenu(){
    hamburgerBtn.classList.toggle('open')
    menuElem.classList.toggle('open')
}

// scroll to top
backToUpBtn.addEventListener('click' , () => {
    window.scrollTo(0,0)
})


hamburgerBtn.addEventListener('click' , toggleMenu)
window.addEventListener('load' , getTheme)
window.addEventListener('scroll' , () => {
    if(window.scrollY > 200){
        backToUpBtn.classList.add('show')
    } else {
        backToUpBtn.classList.remove('show')
    }
})

// libraries
AOS.init()