export function vratiSNulom(broj) {
    // Pošto Date ne vraća datum/mjesec/vrijeme sa početnom nulom, funkcija koja vraća
    if (broj < 10) {
        return "0" + String(broj);
    } else {
        return String(broj);
    }
}
export function formatirajDatum(datum) {
    return (
        vratiSNulom(datum.getDate()) +
        "." +
        vratiSNulom(Number(datum.getMonth()) + 1) +
        "."
    );
}
export function formatirajVrijeme(datum) {
    return (
        vratiSNulom(datum.getHours()) + ":" + vratiSNulom(datum.getMinutes())
    );
}
export function nadiElement(modul, id) {
    var ret;
    for (let i in modul) {
        if (modul[i].getId() == id) {
            ret = modul[i];
            break;
        }
    }
    return ret;
}
export function sejvajLokalno(ime, json) {
    window.localStorage.setItem(ime, json);
}
export function ucitajLokalno(ime) {
    var ucitano = window.localStorage.getItem(ime);
    return JSON.parse(ucitano);
}
