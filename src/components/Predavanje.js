import $ from "jquery";
import {
    formatirajDatum,
    formatirajVrijeme,
    vratiSNulom
} from "./HelperFunctions";

class Predavanje {
    constructor(id, naslov, predavac, pocetak, kraj, poredak) {
        this.id = id;
        this.naslov = naslov;
        this.predavac = predavac;
        this.pocetakTekst = pocetak;
        this.krajTekst = kraj;
        this.poredak = poredak;
        this.pocetak =
            this.pocetakTekst == "" ? "" : new Date(String(this.pocetakTekst));
        this.kraj =
            this.krajTekst == "" ? "" : new Date(String(this.krajTekst));
    }

    getId() {
        return Number(this.id);
    }
    getNaslov() {
        return this.naslov;
    }
    getPredavac() {
        return this.predavac;
    }
    getDatumPocetka() {
        return this.pocetak == "" ? "-" : formatirajDatum(this.pocetak);
    }
    getDatumKraja() {
        return this.kraj == "" ? "-" : formatirajDatum(this.kraj);
    }
    getVrijemePocetka() {
        return this.pocetak == "" ? "-" : formatirajVrijeme(this.pocetak);
    }
    getVrijemeKraja() {
        return this.kraj == "" ? "-" : formatirajVrijeme(this.kraj);
    }
    getTekstualniPocetak() {
        if (this.pocetak == "") {
            return this.pocetak;
        } else {
            return (
                this.pocetak.getFullYear() +
                "/" +
                vratiSNulom(Number(this.pocetak.getMonth()) + 1) +
                "/" +
                vratiSNulom(this.pocetak.getDate()) +
                " " +
                formatirajVrijeme(this.pocetak)
            );
        }
    }
    getTekstualniKraj() {
        if (this.kraj == "") {
            return this.kraj;
        } else {
            return (
                this.kraj.getFullYear() +
                "/" +
                vratiSNulom(Number(this.kraj.getMonth()) + 1) +
                "/" +
                vratiSNulom(this.kraj.getDate()) +
                " " +
                formatirajVrijeme(this.kraj)
            );
        }
    }
    getPoredak() {
        return this.poredak;
    }

    setNaslov(novo) {
        this.naslov = novo;
    }
    setPredavac(novo) {
        this.predavac = novo;
    }
    setPocetak(novo) {
        this.pocetakTekst = novo;
        this.pocetak =
            this.pocetakTekst == "" ? "" : new Date(String(this.pocetakTekst));
    }
    setKraj(novo) {
        this.krajTekst = novo;
        this.kraj =
            this.krajTekst == "" ? "" : new Date(String(this.krajTekst));
    }
    setPoredak(novo) {
        this.poredak = novo;
    }

    construct() {
        var template = `
            <tr data-id="${this.id}">
                <td class="td-poredak">${this.poredak}.</td>
                <td class="td-datum">${this.getDatumPocetka()}</td>
                <td class="td-pocetak">${this.getVrijemePocetka()}</td>
                <td class="td-kraj">${this.getVrijemeKraja()}</td>
                <td class="td-naslov">${this.naslov}</td>
                <td class="td-predavac">${this.predavac}</td>
                <td class="td-uredi"><button type="button" onClick="urediPredavanje(${
                    this.id
                });"  class="btn-primary btn-raspored" id="btn-uredi"><i class="fas fa-edit"></i> Uredi</button></td>
                <td class="td-obrisi"><button type="button" onClick="obrisiPredavanje(${
                    this.id
                });" class="btn-primary btn-raspored" id="btn-obriši"><i class="fas fa-trash-alt"></i> Obriši</button></td>
            </tr>
        `;
        return $(template);
    }

    constructSingle() {
        var template = `
            <div class="raspored-stavka">
                <div class="raspored-vrijeme">${this.getVrijemePocetka()}${
            this.getVrijemeKraja() != "-" ? " - " + this.getVrijemeKraja() : ""
        }</div>
                <div class="raspored-naslov">${this.naslov}</div>
                <div class="raspored-predavac">${this.predavac}</div>
            </div>
        `;
        return template;
    }
}
export default Predavanje;
