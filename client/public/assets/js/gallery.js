'use strict';
let sizer = '.size4';
let galleryBlock = document.querySelector('#c-gallery');

document.addEventListener("DOMContentLoaded", function() {
    imagesLoaded(galleryBlock).on('progress', function() {
        var msnry = new Masonry(galleryBlock, {
            itemSelctor: '.c-section-gallery-block__item ',
            percentPosition: true,
            gutter: 6,
        });
    });
});