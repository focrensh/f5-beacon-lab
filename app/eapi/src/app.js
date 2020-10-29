const express = require('express')
const {startJobs, clearJobs, getDeclare} = require('./render')
const {Bacon, getBacon} = require('./mongo')
const {VarHolder} = require('./varholder')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })


  app.get('/apicheck', async (req, res) => {

    const vh = await VarHolder()
    console.log(vh)

    if (vh === 'fail') {
        res.status(500).json( { status: 'Failed Scenario' })
    } else {
        try {
            // return res.json(js)
            console.log(req.headers)
            return res.json({'bacon': vh, 'reqHeaders':req.headers})
        } catch (e) {
            console.log(e)
            res.status(500).json( { status: 'Failed' })
        }
    }

    
})

app.post('/apicheck', async (req, res) => {

    const bd = req.body
    try {
        return res.json(bd)
    } catch (e) {
        console.log(e)
        res.status(500).json( { status: 'Failed' })
    }
    
})


app.post('/apiset', async (req, res) => {

    const bacon = req.body.bacon
    console.log(bacon)
    const vh = await VarHolder(bacon)
    
    try {
        return res.json(req.body)
    } catch (e) {
        console.log(e)
        res.status(500).json( { status: 'Failed' })
    }
    
})

app.post('/declare', async (req, res) => {

    const declaration = req.body
    // const start = clearJobs()
    try {
        // const start = startJobs(declaration)
        console.log('Started')
        res.json({ status: 'Started'})
    } catch (e) {
        console.log(e)
        res.status(500).json( { status: 'Failed' })
    }
    
})




app.get('/declare', async (req, res) => {

    try {
        var js = JSON.parse(`{"bacon": "yummy"}`);
        return res.json(js)
    } catch (e) {
        console.log(e)
        res.status(500).json( { status: 'Failed' })
    }
    
})

app.get('/bacon/:n', async (req, res) => {
    const n = req.params.n

    // Creates and Queries for number passed to GET, then deletes all temp records created
    //  if N == 2: then 2 queries, 2 creates, 1 delete
    for (i = 0; i < n; i ++) {

        try {
            const newbacon = new Bacon({"Name": "TempBacon"})
            const updatebacon = await newbacon.save()
            const allbacon = await Bacon.find({})
            console.log(allbacon)
            if (i === n-1) {
                const deletebacon = await Bacon.deleteMany({"Name": "TempBacon"})
                res.send({ status: 'Finished' })
            }
            
        } catch (e) {
            console.log(e)
            res.status(500).json( { status: 'Broken Bacon' })
        }
    }

    
})

app.post('/stop', async (req, res) => {

    
    try {
        const start = clearJobs()
        console.log('Stopped')
        res.json({ status: 'Stopped'})
    } catch (e) {
        console.log(e)
    }
    
})


app.listen(port, () => {
    console.log('Server up on port ' + port)
})