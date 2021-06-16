module.exports = function (req, res, bazaDanych) {
    const DB_Schema = {
        "users": [],
        "nicks": [],
        "doGry": 0,
        "ktoChceGrac": {
            red: {
                chceGrac: false
            },
            blue: {
                chceGrac: false
            },
        },
        "win": null,
        "time": null,
        "map": null,

    }
    const dostepneKolory = ["red", "blue"]
    bazaDanych.findOne({
        doGry: {
            $lt: 2
        }
    }, function (err, docs) {
        if (docs == null) {
            bazaDanych.insert(DB_Schema, function (err, newDoc) {
                bazaDanych.findOne({
                    doGry: {
                        $lt: 2
                    }
                }, function (err, docs) {
                    bazaDanych.update({
                        _id: docs._id
                    }, {
                        $push: {
                            users: {
                                nick: req.body.nick,
                                color: dostepneKolory[docs.doGry],
                                idGracza: docs.doGry,
                                startTime: new Date().getTime()


                            },
                            nicks: req.body.nick,
                            // map: Math.floor(Math.random() * (2 - 1)) + 1,
                        },
                        $set: {
                            doGry: docs.doGry + 1
                        }
                    }, {}, function (err, numUpdated) {
                        req.session.dbKey = docs._id
                        req.session.kimJestem = {
                            nick: req.body.nick,
                            color: dostepneKolory[docs.doGry],
                            idGracza: docs.doGry
                        }
                        res.json({
                            success: true
                        })

                    });
                    bazaDanych.persistence.compactDatafile()
                })
            });
        } else {
            if (docs.nicks.includes(req.body.nick)) { // sprawdzanie unikalności nicku
                res.json({
                    message: "Twoj nick nie jest unikalny",
                    success: false
                })
            } else {
                bazaDanych.update({
                    _id: docs._id
                }, {
                    $push: {
                        users: {
                            nick: req.body.nick,
                            color: dostepneKolory[docs.doGry],
                            idGracza: docs.doGry,
                            //startTime: new Date().getTime() + 5000
                        },
                        nicks: req.body.nick
                    },
                    $set: {
                        doGry: docs.doGry + 1
                    }
                }, {}, function (err, numUpdated) {
                    req.session.dbKey = docs._id
                    req.session.kimJestem = {
                        nick: req.body.nick,
                        color: dostepneKolory[docs.doGry],
                        idGracza: docs.doGry
                    }
                    res.json({
                        success: true
                    })
                });
                bazaDanych.persistence.compactDatafile() //czyści DB 

            }
        } //sprawdzenie unikalności nicku 

    });

}



/*
module.exports = {
    funkcja1(){},
    funkcja2(){},
    tablica:[]
}
const user =  require(path)
user.funckcja1(parametry)
///////////////////////////
funkcja1(){
}
funkcja2(){
}
const xd  = function(){
}
module.exports = {
    funkcja1,
    funckja2,
    xd
}
const user = require(path)
*/