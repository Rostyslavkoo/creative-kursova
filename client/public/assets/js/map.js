const animItemsMap = document.querySelectorAll('.c-anim-map')
let activeMap = [0]

if (animItemsMap.length > 0) {
    window.addEventListener('scroll', animOnScroll)
       let map = L.map('map', {
                        center: [48.5272835313596, 25.035663911309364],
                        zoom: 17
                    });
    function animOnScroll() {
        for (let i = 0; i < animItemsMap.length; i++) {
            const animItemMap = animItemsMap[i]; // об'єкт
            const animItemHeightMap = animItemMap.offsetHeight; // висота об'єкта
            const animItemOffsetMap = offset(animItemMap).top // позиція об'єкта
            const animItemStartMap = 1; // коефіцієнт

            let animItemPointMap = window.innerHeight - animItemHeightMap / animItemStartMap // від висоти браузера віднімаю висоту елемента
            if (animItemHeightMap > window.innerHeight) { //  перевірка чи висота об'єкта не більша за висоту робочого екрану
                let animItemPointMap = window.innerHeight - window.innerHeight / animItemStartMap
            }
            if ((pageYOffset > animItemOffsetMap - animItemPointMap) && (pageYOffset < animItemOffsetMap + animItemPointMap)) {
                if (activeMap.length == 1) {
             
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    L.marker([48.5272835313596, 25.035663911309364]).addTo(map)
                        .bindPopup('Школа музики «Креатив»')
                        .openPopup();
                        activeMap.push(1)

                }





            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollTop = window.pageYOffset || document.documentElement.scrollTop

        return { top: rect.top + scrollTop }
    }

}