const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const moment = require('moment')
require('dotenv').config()

function getNowFormattedDate(){
    const format = "YYYY-MM-DD"
    const date = new Date();
    dateTime = moment(date).format(format)
    return dateTime
}

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

app.get('/',(request, response)=>{
    const formattedDate = getNowFormattedDate()
    db.collection('playin-possum').find({"date" : { $gte : formattedDate }}).sort({date: 1}).toArray()
    .then(data => {
        let showObject = Object.assign({}, data)
        showObject = Object.values(showObject)
        response.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.get('/playinpossum',(request, response)=>{
    const formattedDate = getNowFormattedDate()
    db.collection('playin-possum').find({"date" : { $gte : formattedDate }}).sort({date: 1}).toArray()
    .then(data => {
        let showObject = Object.assign({}, data)
        showObject = Object.values(showObject)
        response.render('playinpossum.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.post('/api', (req,res) => {
    db.collection('playin-possum').insertOne(
        req.body,
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server running on port`)
})