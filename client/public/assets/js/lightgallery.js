const lg = document.getElementById('c-gallery');

lightGallery(lg, {

    speed: 500,
    appendSubHtmlTo: false,
    closeOnTap: true,
    download: false,

})

lg.addEventListener('lgBeforeOpen', () => {
document.body.classList.add('no-scroll')
});lg.addEventListener('lgBeforeClose', () => {
document.body.classList.remove('no-scroll')
});