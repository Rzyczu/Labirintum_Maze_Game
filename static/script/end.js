window.addEventListener("DOMContentLoaded", () => {


    fetch('/uzytkownicy', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            var bazaDanych = {
                ...data
            }
            init(bazaDanych);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    //main class object
})
function init(data) {
    var stats = document.getElementById("stats");
    console.log(data)

    hours = Math.floor(data.win.time / 1000 / 3600);
    minutes = Math.floor((data.win.time / 1000 - (hours * 3600)) / 60);
    seconds = data.win.time / 1000 - (hours * 3600) - (minutes * 60);

    timeString =
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');

    if (data.kimJestem.idGracza == data.win.idGracza)
        stats.innerHTML = "Brawo! Wygrałeś z czasem " + timeString;
    else
        stats.innerHTML = "Wygrał gracz " + data.win.nick + " z czasem " + timeString;

}