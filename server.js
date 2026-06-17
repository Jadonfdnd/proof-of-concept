import express from "express";

import {Liquid} from "liquidjs";

const app = express();


app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));


const engine = new Liquid();
app.engine("liquid", engine.express());


app.set("views", "./views");




app.get('/', async function (request, response) {
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/into_golf_golfers')
  const apiData = await apiResponse.json()
    // Handicap afronden
  const golfers = apiData.data.map(golfer => ({
    ...golfer,
    handicap: parseFloat(golfer.handicap).toFixed(1)
  }))

  console.log(golfers[0].handicap)
  response.render('index.liquid', { golfers: golfers })

  
})


app.get('/golfer/:id', async function (request, response) {
  const id = request.params.id

  try {
    // fetch 1 - de golfer
    const golferResponse = await fetch(`https://fdnd-agency.directus.app/items/into_golf_golfers/${id}`)
    const golferData = await golferResponse.json()

    // fetch 2 rondes
    const rondesResponse = await fetch(`https://fdnd-agency.directus.app/items/into_golf_rounds?filter[golfer_id][_eq]=${id}`)
    const rondesData = await rondesResponse.json()

    // fetch 3 - handicap geschiedenis
    const handicapResponse = await fetch(`https://fdnd-agency.directus.app/items/into_golf_handicap_history?filter[golfer_id][_eq]=${id}`)
    const handicapData = await handicapResponse.json()

    // fetch 4 - milestones
    const milestonesResponse = await fetch(`https://fdnd-agency.directus.app/items/into_golf_milestones?filter[golfer_id][_eq]=${id}`)
    const milestonesData = await milestonesResponse.json()

    // fetch 5 - ranking
    const rankingResponse = await fetch(`https://fdnd-agency.directus.app/items/into_golf_monthly_ranking?filter[golfer_id][_eq]=${id}`)
    const rankingData = await rankingResponse.json()

    // ranking JSON parsen naar een array
    const ranking = rankingData.data.map(item => ({
      ...item,
      rankings: JSON.parse(item.rankings)
    }))

    const status = request.query.status
    console.log('status:', status)

    response.render('golfer.liquid', { 
      golfer: golferData.data,
      rondes: rondesData.data,
      history: handicapData.data,
      milestones: milestonesData.data,
      ranking: ranking,
      status: status

    })

  } catch (error) {
    response.status(500).render('error.liquid', {
      statusCode: 500,
      message: 'Kon de data niet ophalen, probeer het later opnieuw.'
    })
  }
})
// POST RECENTE RONDES
app.post('/golfer/:id/score', async function (req, res){
  const id = req.params.id

  try {
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
    res.redirect(303, `/golfer/${id}?status=success`)
  } catch (error) {
    res.redirect(303, `/golfer/${id}?status=error`)
  }
})


//  DELETE RONDE
app.post('/golfer/:id/ronde/:rondeId/delete', async function (req, res) {
  const id = req.params.id
  const rondeId = req.params.rondeId

  try {
    await fetch(`https://fdnd-agency.directus.app/items/into_golf_rounds/${rondeId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    res.redirect(303, `/golfer/${id}?status=deleted`)
  } catch (error) {
    console.error('Fout DELETE ronde:', error.message)
    res.redirect(303, `/golfer/${id}?status=error`)
  }
})

//   BEVESTIG DELETE zonder pe
app.get('/golfer/:id/ronde/:rondeId/bevestiging-ronde', async function (req, res) {
  const id = req.params.id
  const rondeId = req.params.rondeId

  const rondeResponse = await fetch(`https://fdnd-agency.directus.app/items/into_golf_rounds/${rondeId}`)
  const rondeData = await rondeResponse.json()

  res.render('bevestiging-ronde.liquid', {
    golfer_id: id,
    ronde: rondeData.data
  })
})
// end delete


// als laatst
app.set("port", process.env.PORT || 8000);


app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\n`)
})