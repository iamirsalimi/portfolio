let menuWrapper = document.querySelector('.left-nav ul')
let changeThemeBtn = document.querySelector('.right-nav #themeBtn')
let changeThemeImgElem = document.querySelector('.right-nav button img')
let hireMeImg = document.querySelector('.hire-me img')
let loader = document.querySelector('.loader')
let firstLoader = document.querySelector('.firstLoader')
let themeFlag = false

let colors = {
    dark : '#1b1b1b',
    light : '#f5f5f5'
}


menuWrapper.addEventListener('click' , event => {
    // console.log(event.target)

    event.preventDefault()

    if(event.target.matches('.menu-li')){
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
themeBtn.addEventListener('click' , () => {
    themeFlag = !themeFlag

    localStorage.setItem('theme' , themeFlag ? 'dark' : 'light')

    changeTheme()
})

const changeTheme = () => {
    changeThemeImgElem.src = themeFlag ?  
    './images/moon-filled-to-sunny-filled-loop-transition.svg' : './images/sunny-filled-loop-to-moon-filled-loop-transition.svg'
    hireMeImg.src = themeFlag ?  
    "./images/text-light.png" : "./images/text-dark.svg"

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
    
    changeTheme()
}

window.addEventListener('load' , getTheme)
AOS.init()