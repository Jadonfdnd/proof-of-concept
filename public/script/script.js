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

// Doel handicap met pe
const doelForm = document.querySelector('#doel-form')
const doelWaarde = document.querySelector('#doel-waarde')
const doelInput = document.querySelector('#goal-target-input')
const doelOpslaan = document.querySelector('#doel-opslaan')
const doelMin = document.querySelector('#doel-min')
const doelPlus = document.querySelector('#doel-plus')

if (doelForm && doelOpslaan) {
  // Enhancement: verberg opslaan knop
  doelOpslaan.style.display = 'none'

  let huidigDoel = parseFloat(doelInput.value)

  doelMin.addEventListener('click', () => {
    huidigDoel = Math.round((huidigDoel - 0.1) * 10) / 10
    doelWaarde.textContent = huidigDoel.toFixed(1)
    doelInput.value = huidigDoel.toFixed(1)
    doelForm.submit()
  })

  doelPlus.addEventListener('click', () => {
    huidigDoel = Math.round((huidigDoel + 0.1) * 10) / 10
    doelWaarde.textContent = huidigDoel.toFixed(1)
    doelInput.value = huidigDoel.toFixed(1)
    doelForm.submit()
  })
}
// end doel hcp