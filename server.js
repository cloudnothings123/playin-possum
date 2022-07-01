const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
require('dotenv').config()




let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'playin-possum'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
//    });

app.get('/',(request, response)=>{
    db.collection('playin-possum').find().toArray()
    .then(data => {
        let showList = data.map(a => `${a.date} - ${a.bands} - ${a.venue} - ${a.ticketPrice} - ${a.startTime}`)
        console.log(showList)
        response.render('index.ejs', { info: showList })
    })
    .catch(error => console.error(error))
})

app.post('/api', (req,res) => {
    console.log('post heard')
    db.collection('playin-possum').insertOne(
        req.body
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/updateEntry', (req,res) => {
    console.log(req.body)
    Object.keys(req.body).forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined || req.body[key] === '') {
          delete req.body[key];
        }
      });
    console.log(req.body)
    db.collection('playin-possum').findOneAndUpdate(
        {name: req.body.name},
        {
            $set:  req.body  
        },
        // {
        //     upsert: true
        // }
    )
    .then(result => {
        console.log(result)
        res.json('Success')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteEntry', (request, response) => {
    db.collection('playin-possum').deleteOne({name: request.body.bands})
    .then(result => {
        console.log('Entry Deleted')
        response.json('Entry Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server running on port`)
})