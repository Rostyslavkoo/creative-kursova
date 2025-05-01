const animItems = document.querySelectorAll('.c-anim-items')


if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)

    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i]; // об'єкт
            const animItemHeight = animItem.offsetHeight; // висота об'єкта
            const animItemOffset = offset(animItem).top // позиція об'єкта
            const animItemStart = 4; // коефіцієнт

            let animItemPoint = window.innerHeight - animItemHeight / animItemStart // від висоти браузера віднімаю висоту елемента
            if (animItemHeight > window.innerHeight) { //  перевірка чи висота об'єкта не більша за висоту робочого екрану
                let animItemPoint = window.innerHeight - window.innerHeight / animItemStart
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && (pageYOffset < animItemOffset + animItemPoint)) {
                animItem.classList.add('_active')
            } else {
                if (!animItem.classList.contains('c-anim-hide')) {
                    animItem.classList.remove('_active')
                }
            }


        }
    }




    let preloader = document.querySelector('.c-preloader');
    body.onload = function() {

        setTimeout(() => {
            body.classList.add('c-hide-preloader')
            body.classList.remove('preloader-active')

            setTimeout(function() {
                body.classList.add('c-preloader-hidden')
                body.classList.remove('no-scroll')
                animOnScroll();
                                window.scrollTo(0, 0);

            }, 100)

        }, 999)
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollTop = window.pageYOffset || document.documentElement.scrollTop

        return { top: rect.top + scrollTop }
    }

}