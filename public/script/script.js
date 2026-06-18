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
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        overlay.classList.remove('hidden')
        overlay.classList.add('open')
      })
    } else {
      overlay.classList.remove('hidden')
      overlay.classList.add('open')
    }
  })
}

if (closeForm && overlay) {
  closeForm.addEventListener('click', () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        overlay.classList.remove('open')
      }).finished.then(() => {
        overlay.classList.add('hidden')
      })
    } else {
      overlay.classList.remove('open')
      overlay.classList.add('hidden')
    }
  })
}

// Doel handicap met pe
const doelMin = document.querySelector('.doel-min')
const doelPlus = document.querySelector('.doel-plus')
const doelWaarde = document.querySelector('#doel-waarde')

if (doelMin && doelPlus && doelWaarde) {
  const golferId = doelMin.dataset.golferId
  let huidigDoel = parseFloat(doelWaarde.textContent)

  doelMin.addEventListener('click', async (e) => {
    e.preventDefault()
    huidigDoel = Math.round((huidigDoel - 0.1) * 10) / 10
    doelWaarde.textContent = huidigDoel.toFixed(1)

    await fetch(`/golfer/${golferId}/doel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `goal_target=${huidigDoel.toFixed(1)}`
    })
  })

  doelPlus.addEventListener('click', async (e) => {
    e.preventDefault()
    huidigDoel = Math.round((huidigDoel + 0.1) * 10) / 10
    doelWaarde.textContent = huidigDoel.toFixed(1)

    await fetch(`/golfer/${golferId}/doel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `goal_target=${huidigDoel.toFixed(1)}`
    })
  })
}
// end doel hcp

// delete pe 
const deleteLinks = document.querySelectorAll('.btn-delete')

deleteLinks.forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault()

    const rondeItem = link.closest('.ronde-item')
    
    // Maak ronde rood
    rondeItem.style.background = '#fce8e6'
    
    // Vervang prullenbak met vinkje
    link.textContent = '✓'
    link.style.color = '#ea4335'

    // Wacht op bevestiging
    link.addEventListener('click', async () => {
      const url = link.href.replace('/bevestiging-ronde', '/delete')
      
      await fetch(url, { method: 'POST' })
      
      // Verwijder ronde uit de lijst
      rondeItem.remove()
    }, { once: true })
  })
})
// end delete pe

// Back to top button
const backToTop = document.querySelector('#back-to-top')

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('zichtbaar')
    } else {
      backToTop.classList.remove('zichtbaar')
    }
  })

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
// ENd back to top button


// open sluit 