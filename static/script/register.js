// sprawdzanie nicku 
// sprawdzanie długości 
// wysyłanie nicku do serwera => bazy danych 
// sprawdzanie unikalności nicku [SERWER]

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector('button').addEventListener('click', nickNameValidator.getNick)
})

//pobierze nam nick 
// sprawdzi nick 
// OK => wysyła do serwera 
// NIE => prosi o poprawe 
const nickNameValidator = {
    nick: null, // globalny nick ;)
    getNick() {
        let nick = document.querySelector('input').value // pobranie nicku 
        if (nick.length == 0) { // sprawdzenie czy nick nie jest pusty 
            alert("Podano pusty nick")
        } else {
            this.nick = nick.toString() // nie pozwala na błędy 
            // ROBI WZIUM DALEJ 

            //WYSYŁANIE NICKU DO SERWERA 
            fetch('/newUser', { // adres serwera
                method: 'POST', //metoda
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nick: this.nick
                }), //to co wysyłamy w postaci stringu JSONO'podonnego 
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data.success) {
                        window.location.href = "/room"   // jeśli nick jest unikalny przekierowanie do poczekalni
                    } else {                //jesli nick jest nie unikalny powiadamia użytkownika
                        alert(data.message)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }
    }

}