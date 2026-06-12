const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.nav-menu')
const sluit = document.querySelector('.nav-sluit')

hamburger.addEventListener('click', () => {
  menu.classList.add('open')
})

sluit.addEventListener('click', () => {
  menu.classList.remove('open')
})


// form add round: show and hide

const addRound = document.querySelector('#open-form')
const form = document.querySelector('#ronde-form')
const closeForm = document.querySelector('.btn-annuleer')

addRound.addEventListener('click', () =>{
  form.classList.add('open')
})

// verberg form standaard (enhancement)
form.classList.add('hidden')

//cancel form (close)

closeForm.addEventListener('click', () =>{
  form.classList.remove('open')
  form.classList.add('hidden')
})