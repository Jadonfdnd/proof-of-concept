Ontwerp en maak een data driven online concept voor een opdrachtgever

De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)



# IntoGolf  Mijn Progressie

Een webapp waarmee golfers hun handicap progressie kunnen bijhouden, rondes kunnen toevoegen en verwijderen, en hun doelhandicap kunnen aanpassen.

https://proof-of-concept-mwnq.onrender.com/
<img width="676" height="652" alt="image" src="https://github.com/user-attachments/assets/7ad8f88d-b68a-4506-8ec2-96c3b35ab812" />


## Beschrijving

Deze webapp is gebouwd voor IntoGolf als onderdeel van de ikgagolfen.nl webapp. De pagina toont de handicap progressie van een golfer, inclusief recente rondes, doelen en ranking.

De app bestaat uit:
- **Overzichtspagina** alle golfers met hun handicap
- **Progressiepagina** handicap stats, recente rondes, doelen en ranking
- **Scorekaart**  ronde toevoegen via een formulier
- **Bevestigingspagina**  ronde verwijderen met bevestiging

<img width="786" height="810" alt="image" src="https://github.com/user-attachments/assets/0a831928-e595-4601-82a3-c0ffa519427f" />

<img width="714" height="866" alt="image" src="https://github.com/user-attachments/assets/9382864f-bdfb-45d9-acda-8f688c613ddc" />


## Gebruik

### 1. POST scorekaart & DELETE ronde

Golfers kunnen een nieuwe ronde toevoegen via een formulier. Na het invullen van datum, baan en differential wordt de ronde opgeslagen in Directus via een POST request.

```javascript
await fetch('https://fdnd-agency.directus.app/items/into_golf_rounds', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    golfer_id: id,
    date: req.body.date,
    course: req.body.course,
    differential: req.body.differential,
    type: req.body.type
  })
})
```

Voor het verwijderen van een ronde is er een bevestigingspagina gebouwd. Dit zorgt ervoor dat golfers niet per ongeluk een ronde verwijderen. Met javascript wordt er gebruik gemaakt van Progessive Enhancement, en als dat niet werkt dan ga je naar een aparte bevestigingspagina om niet per ongeluk iets te verwijderen.

**Flow:**
<img width="646" height="448" alt="image" src="https://github.com/user-attachments/assets/d664f633-964d-4373-978b-c5db3809df2f" />
<img width="615" height="383" alt="image" src="https://github.com/user-attachments/assets/1a423c70-469e-471f-99cc-0927600f94d8" />
<img width="618" height="893" alt="image" src="https://github.com/user-attachments/assets/28f398e4-7143-4d53-858d-3b46f83ede49" />


### 2. Progressive Enhancement  modal popover

Het formulier voor het toevoegen van een ronde is gebouwd volgens Progressive Enhancement:

**Zonder JavaScript:** het formulier is altijd zichtbaar op de pagina en werkt direct.

**Met JavaScript:** het formulier wordt verborgen en opent als een modal popover met een view transition animatie.

```javascript
// Enhancement check
if (document.startViewTransition) {
  document.startViewTransition(() => {
    overlay.classList.remove('hidden')
    overlay.classList.add('open')
  })
} else {
  // Basis — werkt altijd
  overlay.classList.remove('hidden')
  overlay.classList.add('open')
}


### 3. Pleasurable enhancements

De app heeft een aantal extra verbeteringen voor een prettige gebruikerservaring:

**View transitions** soepele animaties bij het openen en sluiten van de modal:
```css
::view-transition-new(modal) {
  animation: fade-in 220ms ease;
}
```

**Scroll driven animations** elementen animeren in als je ernaar scrollt, puur met CSS:
```css
.stat, .ronde-item, .doel-item {
  animation: fade-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 20%;
}
```

**Reduced motion** alle animaties worden uitgeschakeld voor gebruikers die dat prefereren:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

**Back to top knop** verschijnt na 300px scrollen.
<img width="724" height="523" alt="image" src="https://github.com/user-attachments/assets/fb335759-d190-4299-b3c5-8443ec26a49a" />



https://github.com/user-attachments/assets/c581c7a8-d6f8-46f7-a2c2-4ea78139809c


### Code conventies
- CSS variabelen voor kleuren, spacing en shadows
- CSS nesting voor gerelateerde stijlen
- Camelcase voor JavaScript variabelen
- Nederlandse class namen voor componenten

### Installatie
```bash
git clone https://github.com/jouw-repo
cd proof-of-concept
npm install
npm start
```

Open `http://localhost:8000` in je browser.


### Technieken
- **Node.js** met Express server-side rendering
- **Liquid**  templating engine
- **Directus** REST API voor data
- **Vanilla CSS** met CSS nesting en custom properties
- **Vanilla JavaScript** progressive enhancement

### URL structuur
GET  /                          → overzicht golfers

GET  /golfer/:id                → progressiepagina

POST /golfer/:id/score          → ronde toevoegen

POST /golfer/:id/ronde/:id/delete → ronde verwijderen

GET  /golfer/:id/ronde/:id/bevestiging-ronde → bevestigingspagina

PATCH /golfer/:id/doel          → doelhandicap aanpassen


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)



This project is licensed under the terms of the [MIT license](./LICENSE).
