const newUser = require('./newUserComp')
const poczekalniaStatus = require('./poczekalniaSync')


module.exports = function routing(app, path, dirname, bazaDanych, maps) {
    app.get("/TEST", (req, res) => {
        req.session.SIEMA = "HELo"
    })
    // GET
    app.get("/", (req, res) => {
        if (req.session.dbKey)
            res.redirect("/room")
        else
            res.sendFile(path.join(dirname, "/static/pages/register.html"))
    })

    app.get("/room", (req, res) => {
        if (req.session.dbKey)
            res.sendFile(path.join(dirname, "/static/pages/room.html"))
        else
            res.redirect("/")
    })

    app.get("/levelPage", (req, res) => {
        if (req.session.dbKey)
            res.sendFile(path.join(dirname, "/static/pages/levels.html"))
        else
            res.redirect("/")
    })

    app.get("/game", (req, res) => {
        if (req.session.dbKey)
            res.sendFile(path.join(dirname, "/static/pages/game/index.html"))
        else
            res.redirect("/")
    })

    app.get("/gameOver", (req, res) => {
        if (req.session.dbKey)
            res.sendFile(path.join(dirname, "/static/pages/end.html"))
        else
            res.redirect("/")
    })

    app.get("/getMap", (req, res) => {
        //console.log(maps[0])
        if (req.session.dbKey)
            bazaDanych.findOne({
                _id: req.session.dbKey
            }, function (err, doc) {
                res.json(maps[doc.map])
            })
    })
    app.get("/updateBazaDanych", (req, res) => {
        //console.log(maps[0])
        if (req.session.dbKey)
            bazaDanych.findOne({
                _id: req.session.dbKey
            }, function (err, doc) {
                if (doc.win != null)
                    res.json({ status: true })
            })

    })

    app.get("/uzytkownicy", (req, res) => {
        if (req.session.dbKey)
            bazaDanych.findOne({
                _id: req.session.dbKey
            }, function (err, doc) {
                let poczatekGry = poczekalniaStatus.sprawdzRozpoczecieGry(doc)
                console.log("poczatekGry");
                console.log(poczatekGry);
                if (poczatekGry)
                    bazaDanych.update({
                        _id: req.session.dbKey
                    }, {
                        $set: {
                            doGry: 2,
                            time: new Date().getTime(),
                        }
                    }, {},
                        function (err, upd) {
                            bazaDanych.persistence.compactDatafile()
                            res.json({
                                status: poczatekGry,
                                ...doc,
                                kimJestem: {
                                    ...req.session.kimJestem
                                }
                            })
                        })
                else
                    res.json({
                        status: poczatekGry,
                        ...doc,
                        kimJestem: {
                            ...req.session.kimJestem
                        }
                    })
            });
        else
            res.redirect("/")
    })

    //wysyła wszystkich użtkownikow bazy danychn 

    //---------------POST ---------------

    app.post("/newUser", (req, res) => {
        //nasz nick jest unikalny 
        newUser(req, res, bazaDanych)
        //do jakiegoś pokoju / tworzy nowy pokój 
    })

    app.post("/winGame", (req, res) => {
        //nasz nick jest unikalny 
        console.log("wygrał " + req.body.nick)
        //do jakiegoś pokoju / tworzy nowy pokój 
        if (req.session.dbKey)
            bazaDanych.findOne({
                _id: req.session.dbKey
            }, function (err, doc) {
                bazaDanych.update({
                    _id: req.session.dbKey
                }, {
                    $set: {
                        win: { nick: req.body.nick, idGracza: req.body.idGracza, color: req.body.color, time: new Date().getTime() - doc.time }
                    }
                }, {},
                    function (err, upd) {
                        bazaDanych.persistence.compactDatafile()
                        res.json({
                            ...doc,
                        })
                    })
            });
        else
            res.redirect("/")
    })

    app.post("/setMap", (req, res) => {
        console.log("Wybrano mape nr " + req.body.map)
        if (req.session.dbKey)
            bazaDanych.findOne({
                _id: req.session.dbKey
            }, function (err, doc) {
                bazaDanych.update({
                    _id: req.session.dbKey
                }, {
                    $set: {
                        map: req.body.map
                    }
                }, {},
                    function (err, upd) {
                        bazaDanych.persistence.compactDatafile()
                        res.json({
                            ...doc,
                        })
                    })
            });
        else
            res.redirect("/")
    })

    app.post('/taKtoraWysylaZapytania', function (req, res) {
        if (req.session.dbKey)
            poczekalniaStatus.chceGrac(req, res, bazaDanych)
        else
            res.redirect("/")

    })

    // kto jest gotowy 
}
