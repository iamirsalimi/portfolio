let spaTitle = 'Portfolio Website'

let router = {
    '/' : {
        template : './index.html',
        title : `${spaTitle} | Home`
    },
    '/About' : {
        template : './about.html',
        title : `${spaTitle} | About`
    },
    '/Articles' : {
        template : './Articles.html',
        title : `${spaTitle} | Articles`
    },
    '/projects' : {
        template : './projects.html',
        title : `${spaTitle} | Projects`
    },
    404 : {
        template : './404.html',
        title : `${spaTitle} | Not Found`
    }
}

export {router}