"use strict"

import { poczekalnia } from './room.js';


window.addEventListener('DOMContentLoaded', () => {
    poczekalnia.pobierzUzytkownikow()
    poczekalnia.synchronizujPoczkelanie()
    document.querySelector('input[type=checkbox]').addEventListener('input', poczekalnia.chceGrac)
})


