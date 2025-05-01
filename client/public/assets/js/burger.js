const burger = document.getElementById('sidebarToggle')
const sidebar = document.getElementById('sidebar')
const wrapper = document.querySelector('.c-wrapper')
let header = document.querySelector('.c-header')

const burgerItems = document.querySelectorAll('.c-burger__item')

burger.addEventListener('click', event => {
    event.stopPropagation();
    sidebar.classList.toggle('active-sidebar')


    setTimeout(() => {
        document.body.classList.toggle('active-burger')


    }, 1)

})
burgerItems.forEach(item => {
    item.addEventListener('click', event => {
        sidebar.classList.remove('active-sidebar')
        document.body.classList.remove('active-burger')
    })
})
sidebar.addEventListener('click', event => {
    event.stopPropagation();
})
header.addEventListener('click', event => {
    event.stopPropagation();
})


wrapper.addEventListener('click', (event) => {
    sidebar.classList.remove('active-sidebar')
    document.body.classList.remove('active-burger')
})