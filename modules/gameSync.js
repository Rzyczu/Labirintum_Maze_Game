module.exports = {
    checkWin(bazaDanych) {
        if (bazaDanych.win != null) {
            console.log("koniec gry")
            return true
        } else {
            return false
        }
    }
}