module.exports = {
    checkWin(bazaDanych) {
        if (bazaDanych.win != null) {
            console.log("Koniec gry")
            return true
        } else {
            return false
        }
    }
}