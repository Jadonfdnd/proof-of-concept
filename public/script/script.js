const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.nav-menu')
const sluit = document.querySelector('.nav-sluit')

if (hamburger) {
  hamburger.addEventListener('click', () => {
    menu.classList.add('open')
  })
}

if (sluit) {
  sluit.addEventListener('click', () => {
    menu.classList.remove('open')
  })
}



// form add round: show and hide
const addRound = document.querySelector('#open-form')
const overlay = document.querySelector('#modal-popover')
const closeForm = document.querySelector('.btn-annuleer')

if (overlay) {
  overlay.classList.add('hidden')
}

if (addRound && overlay) {
  addRound.addEventListener('click', () => {
    overlay.classList.remove('hidden')
    overlay.classList.add('open')
  })
}

if (closeForm && overlay) {
  closeForm.addEventListener('click', () => {
    overlay.classList.remove('open')
    overlay.classList.add('hidden')
  })
}