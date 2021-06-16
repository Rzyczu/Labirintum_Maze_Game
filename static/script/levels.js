window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("level01").addEventListener('click', setMap.one)
    document.getElementById("level02").addEventListener('click', setMap.two)
    document.getElementById("level03").addEventListener('click', setMap.three)

})

const setMap = {
    map: null,
    one() {
        fetch('/setMap', { // adres serwera
            method: 'POST', //metoda
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ map: 0 }),
        })
            .then(response => response.json())
            .then(data => {
                setMap.synch()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    two() {
        fetch('/setMap', { // adres serwera
            method: 'POST', //metoda
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ map: 1 }),
        })
            .then(response => response.json())
            .then(data => {
                setMap.synch()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    three() {
        fetch('/setMap', { // adres serwera
            method: 'POST', //metoda
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ map: 2 }),
        })
            .then(response => response.json())
            .then(data => {
                setMap.synch()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    synchInfo() {
        fetch('/uzytkownicy', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setMap.nazwijUzytkownikow()
                if (data.status) {
                    setMap.startGry()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    synch() {
        setMap.synchronizacjaUzytkownikowInt = setInterval(() => {
            setMap.synchInfo()
        }, 3000)
    },
    startGry() {
        clearInterval(poczekalnia.synchronizacjaUzytkownikowInt)
        setMap.synch()
    },
    synch() {
        var Dane = {
        }
        setTimeout(() => {
            console.log("Start Gry")
            console.log(setMap.bazaDanych)
            window.location.href = "/game";

        }, 1000);
    },

}