const express = require('express')
const bodyParser = require('body-parser')
const db = require('nedb')
const path = require('path')
const session = require('express-session')
const fs = require('fs');
const favicon = require('serve-favicon');


const app = express()
var PORT = process.env.PORT || 3000

// ---- MID ------

const bazaDanych = new db({
    filename: 'static/database/game.db',
    autoload: true
});

app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json()) // Dodaje  możlwiość czytanai JSON 

app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

app.use(express.static(path.join(__dirname, 'static')))
app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 365

    }
}))

// var maps = []
// let map01 = JSON.parse(fs.readFileSync(path.resolve(__dirname, __dirname + '/static/maps/map01.json')));
// maps.push(map01)
// let map02 = JSON.parse(fs.readFileSync(path.resolve(__dirname, __dirname + '/static/maps/map02.json')));
// maps.push(map02)
// let map03 = JSON.parse(fs.readFileSync(path.resolve(__dirname, __dirname + '/static/maps/map03.json')));
// maps.push(map03)

var mapDataBase = new db({
    filename: __dirname + '/static/database/maps.db',
    autoload: true
});

// var doc = {}
// for (var i = 0; i < maps.length; i++) {
//     doc = {
//         map: maps[i]
//     };
//     mapDataBase.insert(doc);
// }

var map = []
mapDataBase.find({}, function (err, docs) {
    //zwracam dane w postaci JSON
    map.push(docs[0].map)
    map.push(docs[1].map)
    map.push(docs[2].map)
    require('./modules/routing')(app, path, __dirname, bazaDanych, map) // ==> (app,path...) == wszystko co przekazujemy do routingu z serwera 
});

//import routingu 


//console.log(maps[1])

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
