// Change this to your repository name
var GHPATH = '/suape-na-palma-da-mao';
 
// Choose a different app prefix name
var APP_PREFIX = 'suapemap_';
 
// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_00';
 
// The files to make available for offline use. make sure to add 
// others to this list
var URLS  = [
    `${GHPATH}/`,
    `${GHPATH}/index.html`,
    `${GHPATH}/manifest.json`,
    `${GHPATH}/pages/faq.html`,
    `${GHPATH}/pages/sobre.html`,
    `${GHPATH}/javascript/initial-screen.js`,
    `${GHPATH}/javascript/bootstrap.bundle.min.js`,
    `${GHPATH}/css/bootstrap.min.css`,
    `${GHPATH}/css/style.css`,
    `${GHPATH}/css/faq.css`,
    `${GHPATH}/css/sobre.css`,
    `${GHPATH}/imgs/porto-suape-img1.webp`,
    `${GHPATH}/imgs/porto-suape-img2.webp`,
    `${GHPATH}/imgs/Arcor.jpg`,
    `${GHPATH}/imgs/LMWIND.png`,
    `${GHPATH}/imgs/ache.jpg`,
    `${GHPATH}/imgs/andaluz.jpg`,
    `${GHPATH}/imgs/bunge.png`,
    `${GHPATH}/imgs/comexport.jpg`,
    `${GHPATH}/imgs/cone.png`,
    `${GHPATH}/imgs/copagaz.jpg`,
    `${GHPATH}/imgs/decal.jpg`,
    `${GHPATH}/imgs/ecoposto.jpg`,
    `${GHPATH}/imgs/griflanges.png`,
    `${GHPATH}/imgs/pepsico.png`,
    `${GHPATH}/imgs/siw.jpg`,
    `${GHPATH}/imgs/suapeenergia.png`,
    `${GHPATH}/imgs/termope.jpg`,
]