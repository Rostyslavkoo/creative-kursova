let scrollPos = 0;

window.onscroll = function showHeader() {
    let header = document.querySelector('.c-header')
    let headerimg = document.querySelector('#header-img')
    let headerfixedimg = document.querySelector('#header-fixed-img')

    if (pageYOffset < scrollPos) {

        if (window.pageYOffset > 700) {
            header.classList.add('c-header__fixed')
            headerimg.style.display = "none";
            headerfixedimg.style.display = "block";
        } else {
            header.classList.remove('c-header__fixed')
            headerimg.style.display = "block";
            headerfixedimg.style.display = "none";

        }
    }else{
         header.classList.remove('c-header__fixed')
            headerimg.style.display = "block";
            headerfixedimg.style.display = "none";
    }
            scrollPos = pageYOffset
}
// (document.body.getBoundingClientRect()).top;