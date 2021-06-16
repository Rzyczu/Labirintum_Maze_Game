module.exports = {
    chceGrac(req, res, bazaDanych) {
        bazaDanych.findOne({
            _id: req.session.dbKey

        }, function (err, docs) {
            let kolorki = docs.ktoChceGrac
            kolorki[req.body.color].chceGrac = req.body.status // kolorki.red / kolorki.blue => [zminna ] => kolorki.zmienna
            bazaDanych.update({
                _id: req.session.dbKey
            }, {
                $set: {
                    ktoChceGrac: {
                        ...kolorki
                    }
                }
            }, {}, function (err, numUpdated) {
                bazaDanych.findOne({
                    _id: req.session.dbKey

                }, function (err, docs) {
                    bazaDanych.persistence.compactDatafile() //czyści DB 
                    res.json({
                        ...docs
                    })
                })
            });

        })



    },


    sprawdzRozpoczecieGry(bazaDanych) {
        let wszyscy = bazaDanych.nicks.length
        let ktoChceGrac = bazaDanych.ktoChceGrac
        let chetni = 0;
        Object.keys(ktoChceGrac).forEach(element => {
            if (ktoChceGrac[element].chceGrac)
                chetni++
        })
        if (chetni == 2 && bazaDanych.map != null) {
            return true
        } else {
            return false
        }


    }


}