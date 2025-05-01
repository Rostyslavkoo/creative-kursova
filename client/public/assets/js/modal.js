const modalBtn = document.querySelectorAll('[data-modal]')
const modalClose = document.querySelectorAll('[data-modal-close]')

const modalCloseScroll = document.querySelectorAll('[data-modal-close-scroll]')
const modal = document.querySelectorAll('.c-modal')
const body = document.body

modalBtn.forEach(item => {
    item.addEventListener('click', event => {
        let $this = event.currentTarget
        let modalId = $this.getAttribute('data-modal')
        let modal = document.getElementById(modalId)
        let modalContent = modal.querySelector('.c-modal__content')


        modalContent.addEventListener('click', event => {
            event.stopPropagation()
        })
        setTimeout(() => {
            body.classList.add('no-scroll')
        }, 100)

        modal.classList.add('show')



        setTimeout(() => {
            modalContent.style.transform = "none"
            modalContent.style.opacity = "1"
        }, 1)


    })
})
modalClose.forEach(item => {
    item.addEventListener('click', event => {
        let currentModal = event.currentTarget.closest('.c-modal')
        closeModal(currentModal)
    })
})
modal.forEach(item => {
    item.addEventListener('click', event => {
        let currentModal = event.currentTarget.closest('.c-modal')
        closeModal(currentModal)
    })
})
modalCloseScroll.forEach(item => {
    item.addEventListener('click', event => {
        let currentModal = event.currentTarget.closest('.c-modal')
        closeModalWithScroll(currentModal)
    })
})

function closeModal(currentModal) {
    let modalContent = currentModal.querySelector('.c-modal__content')

    setTimeout(() => {
        currentModal.classList.remove('show')
        body.classList.remove('no-scroll')
    }, 100)
    modalContent.removeAttribute('style')

}
function closeModalWithScroll(currentModal) {
    let modalContent = currentModal.querySelector('.c-modal__content')

    setTimeout(() => {
        currentModal.classList.remove('show')
    }, 100)
    modalContent.removeAttribute('style')

}