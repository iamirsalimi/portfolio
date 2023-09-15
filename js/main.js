let menuWrapper = document.querySelector('.left-nav ul')
let changeThemeBtn = document.querySelectorAll('.right-nav #themeBtn')[0]
let changeThemeImgElem = document.querySelector('.right-nav button img')
let loader = document.querySelector('.loader')
let firstLoader = document.querySelector('.firstLoader')
let hamburgerBtn = document.querySelector('.hamburger-menu')
let menuElem = document.querySelector('#content .menu')
let menuChangeThemeBtn = document.querySelectorAll('#content .menu #themeBtn')[0]
let themeFlag = false

let colors = {
    dark : '#1b1b1b',
    light : '#f5f5f5'
}

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
    changeTheme(hireMeImg , event.target ,menuChangeThemeBtn)
})

menuChangeThemeBtn.addEventListener('click' , event =>{
    themeFlag = !themeFlag
    
    localStorage.setItem('theme' , themeFlag ? 'dark' : 'light')
    
    let hireMeImg = document.querySelectorAll('.hireMeSec img')
    changeTheme(hireMeImg , event.target , changeThemeBtn)
    hideMenuHandler()
})

const changeTheme = (hireMeImages , changeThemeImgElem , changeThemeImgElem2) => {
    changeThemeImgElem.src = themeFlag ?  
    './images/moon-filled-to-sunny-filled-loop-transition.svg' : './images/sunny-filled-loop-to-moon-filled-loop-transition.svg'

    changeThemeImgElem2.src = themeFlag ?  
    './images/moon-filled-to-sunny-filled-loop-transition.svg' : './images/sunny-filled-loop-to-moon-filled-loop-transition.svg'

    hireMeImages.forEach(hireMeImg => {
        hireMeImg.src = themeFlag ?  
        "./images/text-light.png" : "./images/text-dark.svg"
    })

    themeFlag ? menuElem.classList.remove('dark') : menuElem.classList.remove('light')
    menuElem.classList.add(themeFlag ? 'light' : 'dark')

    // setting variables
    if(themeFlag){
        document.documentElement.style.setProperty('--dark' ,  colors.light)
        document.documentElement.style.setProperty('--light' ,  colors.dark)
    } else {
        document.documentElement.style.setProperty('--dark' ,  colors.dark)
        document.documentElement.style.setProperty('--light' ,  colors.light)
    }
}

const getTheme = () => {
    firstLoader.classList.add('off')
    firstLoader.lastElementChild.addEventListener('animationend' , () => {
        firstLoader.querySelectorAll('span').forEach(span => {
            span.style.width = '0%'
        })
        firstLoader.classList.remove('off')
        firstLoader.style.display = 'none'
    })
    
    themeFlag = localStorage.getItem('theme') === 'dark' ? true : false
    
    menuElem.classList.add(themeFlag ? 'light' : 'dark')

    
    let hireMeImg = document.querySelectorAll('.hireMeSec img')
    changeTheme(hireMeImg , menuChangeThemeBtn , changeThemeBtn)
}

function toggleMenu(){
    hamburgerBtn.classList.toggle('open')
    menuElem.classList.toggle('open')
}


hamburgerBtn.addEventListener('click' , toggleMenu)
window.addEventListener('load' , getTheme)
AOS.init()