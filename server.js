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

  // fetch 1 - de golfer
  const golferResponse = await fetch(`https://fdnd-agency.directus.app/items/into_golf_golfers/${id}`)
  const golferData = await golferResponse.json()

  // fetch 2 rondes...
  const rondesResponse = await fetch(`https://fdnd-agency.directus.app/items/into_golf_rounds?filter[golfer_id][_eq]=${id}`)
  const rondesData = await rondesResponse.json()

  // fetch 3 -handicap geschiedenis...history
  const handicapResponse = await fetch(`https://fdnd-agency.directus.app/items/into_golf_handicap_history?filter[golfer_id][_eq]=${id}`)
  const handicapData = await handicapResponse.json()

  //fetch 4 milestones
  const milestonesResponse = await fetch (`https://fdnd-agency.directus.app/items/into_golf_milestones?filter[golfer_id][_eq]=${id}`)
  const milestonesData = await milestonesResponse.json()

  //fetch 5 ranking
  const rankingResponse = await fetch (`https://fdnd-agency.directus.app/items/into_golf_monthly_ranking?filter[golfer_id][_eq]=${id}`)
  const rankingData = await rankingResponse.json()

  //ranking JSOn parsen naar een array
  const ranking = rankingData.data.map(item => ({
    ...item,
    rankings:JSON.parse(item.rankings)
    }))

  
  
  

  response.render('golfer.liquid', { 
    golfer: golferData.data,
    rondes: rondesData.data,
    history: handicapData.data,
    milestones: milestonesData.data,
    ranking: ranking

  })
})



// als laatst
app.set("port", process.env.PORT || 8000);


app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}/\n\n`)
})