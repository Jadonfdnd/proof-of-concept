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
const form = document.querySelector('#ronde-form')
const closeForm = document.querySelector('.btn-annuleer')

if (form) {
  form.classList.add('hidden')
}

if (addRound) {
  addRound.addEventListener('click', () => {
    form.classList.remove('hidden')
    form.classList.add('open')
  })
}

if (closeForm) {
  closeForm.addEventListener('click', () => {
    form.classList.remove('open')
    form.classList.add('hidden')
  })
}