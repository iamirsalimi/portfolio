let menuWrapper = document.querySelector('.left-nav ul')
let changeThemeBtn = document.querySelector('.right-nav #themeBtn')
let changeThemeImgElem = document.querySelector('.right-nav button img')
let loader = document.querySelector('.loader')
let firstLoader = document.querySelector('.firstLoader')
let hamburgerBtn = document.querySelector('.hamburger-menu')
let menuElem = document.querySelector('#content .menu')
let menuChangeThemeBtn = document.querySelector('#content .menu #themeBtn')
let menuChangeThemeImgElem = document.querySelector('#content .menu #themeBtn img')
let themeFlag = false

// colors pallete for changing theme 
let colors = {
    dark : '#1b1b1b',
    light : '#f5f5f5'
}

// changing spa and load other pages on click on nav-links
menuElem.addEventListener('click' , event => {
    console.log(event.target)
    
    event.preventDefault()

    if(!event.target.matches('#menu-list a')){
        return false    
    }
    
    let prevLink = document.querySelector('#menu-list .active')
    prevLink.classList.remove('active')
    event.target.parentNode.classList.add('active')

    hideMenuHandler()

    loader.classList.add('on')
    loader.lastElementChild.addEventListener('animationend' , () => {
        loader.querySelectorAll('span').forEach(span => {
            span.style.width = '0%'
        })
        loader.classList.remove('on')
    })
})

function hideMenuHandler(){
    menuElem.classList.remove('open')
    hamburgerBtn.classList.remove('open')
}

menuWrapper.addEventListener('click' , event => {
    console.log(event.target)
    
    event.preventDefault()

    if(!event.target.matches('.menu-li a')){
        return false    
    }
    
    let prevLink = document.querySelector('.left-nav .active')
    prevLink.classList.remove('active')
    event.target.parentNode.classList.add('active')

    loader.classList.add('on')
    loader.lastElementChild.addEventListener('animationend' , () => {
        loader.querySelectorAll('span').forEach(span => {
            span.style.width = '0%'
        })
        loader.classList.remove('on')
    })
})


// changing theme color when user click on them btn
changeThemeBtn.addEventListener('click' , event => {
    themeFlag = !themeFlag

    localStorage.setItem('theme' , themeFlag ? 'dark' : 'light')


    let hireMeImg = document.querySelectorAll('.hireMeSec img')

    changeTheme(hireMeImg)
    
})

menuChangeThemeBtn.addEventListener('click' , event =>{
    themeFlag = !themeFlag
    
    localStorage.setItem('theme' , themeFlag ? 'dark' : 'light')
    
    let hireMeImg = document.querySelectorAll('.hireMeSec img')

    changeTheme(hireMeImg)
    hideMenuHandler()
})

const changeTheme = (hireMeImages) => {

    changeThemeImgElem.src = themeFlag ?  './images/moon-filled-to-sunny-filled-loop-transition.svg' : './images/sunny-filled-loop-to-moon-filled-loop-transition.svg'

    menuChangeThemeImgElem.src = themeFlag ?  './images/moon-filled-to-sunny-filled-loop-transition.svg' : './images/sunny-filled-loop-to-moon-filled-loop-transition.svg'


    hireMeImages.forEach(hireMeImg => {
        hireMeImg.src = themeFlag ?  
        "./images/text-light.png" : "./images/text-dark.svg"
    })

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
    
    let hireMeImg = document.querySelectorAll('.hireMeSec img')
    changeTheme(hireMeImg)
}

// show and hie menu
function toggleMenu(){
    hamburgerBtn.classList.toggle('open')
    menuElem.classList.toggle('open')
}


hamburgerBtn.addEventListener('click' , toggleMenu)
window.addEventListener('load' , getTheme)

// libraries
AOS.init()