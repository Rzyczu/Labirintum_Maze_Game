"use strict"

export { poczekalnia };

const poczekalnia = {
    tablicaUzytkownikow: [],
    bazaDanych: {},
    kimJestem: {},
    ktoChceGrac: [],
    tablicaSpanow: [],
    numerGracza: null,
    synchronizacjaUzytkownikowInt: null,
    pobierzUzytkownikow() {
        /* 
        Funkcja służąca do pobrania wszystkich aktualnie obecnych graczy wywoływana 1 przy starcie i cyklicznie aż do statu gry
        */
        fetch('/uzytkownicy', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.bazaDanych = {
                    ...data
                }
                this.numerGracza = data.kimJestem.idGracza
                this.kimJestem = {
                    ...data.kimJestem
                }
                this.nazwijUzytkownikow()
                if (data.status) {
                    this.startGry()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    nazwijUzytkownikow() {
        this.tablicaSpanow = document.querySelectorAll('span');
        this.bazaDanych.nicks.forEach((element, counter) => {
            // this.tablicaSpanow[counter].innerText = element
        });
        Object.keys(this.bazaDanych.ktoChceGrac).forEach((element, counter) => {
            if (this.bazaDanych.ktoChceGrac[element].chceGrac) {
                // poczekalnia.tablicaSpanow[counter].classList.add(element)
            } else {
                // poczekalnia.tablicaSpanow[counter].classList.remove(element)
            }
        })

    },
    synchronizujPoczkelanie() {
        this.synchronizacjaUzytkownikowInt = setInterval(() => {
            this.pobierzUzytkownikow()
        }, 3000)
    },
    chceGrac(e) {
        console.log(e.target.checked)
        console.log(poczekalnia.kimJestem)
        console.log(poczekalnia.tablicaSpanow[poczekalnia.numerGracza])
        if (e.target.checked) {
            // poczekalnia.tablicaSpanow[poczekalnia.numerGracza].classList.add(poczekalnia.kimJestem.color)
            poczekalnia.chceGracNaSerer(e.target.checked)
        } else {
            // poczekalnia.tablicaSpanow[poczekalnia.numerGracza].classList.remove(poczekalnia.kimJestem.color)
            poczekalnia.chceGracNaSerer(e.target.checked)
        }
        if (poczekalnia.kimJestem.idGracza == 0)
            poczekalnia.timeoutLevelPage()
    },

    chceGracNaSerer(status) {
        fetch('/taKtoraWysylaZapytania', { // adres serwera
            method: 'POST', //metoda
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                color: this.kimJestem.color,
                status: status
            }), //to co wysyłamy w postaci stringu JSONO'podonnego 
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, startGry() {
        clearInterval(poczekalnia.synchronizacjaUzytkownikowInt)
        this.synch()
    }, synch() {
        var Dane = {
            gracze: this.bazaDanych.nicks,
            kimJestem: this.kimJestem,
            startTime: this.bazaDanych.users[0].startTime
        }
        let timeoutCount = this.bazaDanych.users[0].startTime - new Date().getTime();
        setTimeout(() => {
            console.log("Start Gry")
            console.log(this.bazaDanych)
            window.location.href = "/game";

        }, timeoutCount);
    }, timeoutLevelPage() {
        setTimeout(() => {
            window.location.href = "/levelPage";

        }, 4500);
    }

}
