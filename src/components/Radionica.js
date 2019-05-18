import $ from "jquery";
import {
    formatirajDatum,
    formatirajVrijeme,
    vratiSNulom
} from "./HelperFunctions";

class Radionica {
    constructor(
        id,
        naslov,
        idPredavaca,
        pocetak,
        kraj,
        sazetak,
        dvorana,
        sektor,
        upisId
    ) {
        this.id = id;
        this.naslov = naslov;
        this.predavaciArray = [];
        if (Array.isArray(idPredavaca)) {
            for (let i in idPredavaca) {
                this.predavaciArray.push(Number(idPredavaca[i]));
            }
        } else {
            this.predavaciArray.push(Number(idPredavaca));
        }

        this.pocetakTekst = pocetak;
        this.krajTekst = kraj;
        this.pocetak =
            this.pocetakTekst == "" ? "" : new Date(String(this.pocetakTekst));
        this.kraj =
            this.krajTekst == "" ? "" : new Date(String(this.krajTekst));
        this.sazetak = sazetak;
        this.dvorana = dvorana;
        this.sektor = sektor;
        this.upisId = upisId;

        this.dvorane = [
            "Hall Šibenik I",
            "Hall Šibenik II",
            "Hall Šibenik III",
            "Hall Šibenik IV",
            "Hall Šibenik V",
            "Hall Šibenik VI",
            "Hall Šibenik VII",
            "Hall Šibenik VIII",
            "Hall Šibenik IX",
            "Hall Šibenik X",
            "Hall Šibenik XI",
            "Hotel Niko (Krka I)",
            "Krka II",
            "Krka III",
            "Žirje",
            "Lavsa",
            "Event room Jure"
        ];
        this.sektori = [
            "Poljoprivreda, prehrana i veterina",
            "Šumarstvo, prerada i obrada drva",
            "Geologija, rudarstvo, nafta i kemijska tehnologija",
            "Tekstil i koža",
            "Grafička tehnologija i audio-vizualna tehnologija",
            "Strojarstvo, brodogradnja i metalurgija",
            "Elektrotehnika i računarstvo",
            "Graditeljstvo i geodezija",
            "Ekonomija, trgovina i poslovna administracija",
            "Turizam i ugostiteljstvo",
            "Promet i logistika",
            "Zdravstvo i socijalna skrb",
            "Osobne, usluge zaštite i druge usluge"
        ];
    }

    getId() {
        return Number(this.id);
    }
    getNaslov() {
        return this.naslov;
    }
    getPredavac(predavaci) {
        var pred = [];
        for (let i in this.predavaci) {
            if (this.predavaciArray.includes(predavaci[i].getId())) {
                pred.push(predavaci[i].getImePrezime());
            }
        }
        return pred.toString().replace(",", ", ");
    }
    getPredavaciArray(predavaci) {
        var pred = [];
        for (let i in predavaci) {
            if (this.predavaciArray.includes(predavaci[i].getId())) {
                pred.push(predavaci[i]);
            }
        }
        return pred;
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
        }
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
    getTekstualniKraj() {
        if (this.kraj == "") {
            return this.kraj;
        }
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
    getSazetak() {
        return this.sazetak;
    }
    getDvorana() {
        var dvoranePovrat = [];
        for (let i in this.dvorana) {
            dvoranePovrat.push(this.dvorane[Number(this.dvorana[i])]);
        }
        dvoranePovrat = dvoranePovrat.join(", ");
        return dvoranePovrat;
    }
    getDvoranaID() {
        return this.dvorana;
    }
    getSektor() {
        if (this.sektor != "") {
            return this.sektori[Number(this.sektor)];
        } else {
            return this.sektor;
        }
    }
    getSektorID() {
        return this.sektor;
    }
    getUpisId() {
        return this.upisId;
    }
    getLijepiDatum() {
        var mjesec = Number(this.pocetak.getMonth()) + 1;

        var tekstMjesec;
        switch (mjesec) {
            case 1:
                tekstMjesec = "siječanj";
                break;
            case 2:
                tekstMjesec = "veljača";
                break;
            case 3:
                tekstMjesec = "ožujak";
                break;
            case 4:
                tekstMjesec = "travanj";
                break;
            case 5:
                tekstMjesec = "svibanj";
                break;
            case 6:
                tekstMjesec = "lipanj";
                break;
            case 7:
                tekstMjesec = "srpanj";
                break;
            case 8:
                tekstMjesec = "kolovoz";
                break;
            case 9:
                tekstMjesec = "rujan";
                break;
            case 10:
                tekstMjesec = "listopad";
                break;
            case 11:
                tekstMjesec = "studeni";
                break;
            case 12:
                tekstMjesec = "prosinac";
                break;
            default:
                break;
        }
        return vratiSNulom(this.pocetak.getDate()) + ". " + tekstMjesec;
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
    setSazetak(novo) {
        this.sazetak = novo;
    }
    setDvorana(novo) {
        this.dvorana = novo;
    }
    setSektor(novo) {
        this.sektor = novo;
    }

    construct() {
        var template = `
            <tr data-id="${this.id}">
                <td class="td-datum">${this.getDatumPocetka()}</td>
                <td class="td-pocetak">${this.getVrijemePocetka()}</td>
                <td class="td-kraj">${this.getVrijemeKraja()}</td>
                <td class="td-naslov">${this.naslov}</td>
                <td class="td-predavac">${this.getPredavac()}</td>
                <td class="td-sazetak">${this.sazetak}</td>
                <td class="td-dvorana">${this.getDvorana()}</td>
                <td class="td-sektor">${this.getSektor()}</td>
                 <td class="td-uredi"><button type="button" onClick="urediRadionicu(${
                     this.id
                 });"  class="btn-primary btn-raspored" id="btn-uredi"><i class="fas fa-edit"></i> Uredi</button></td>
                <td class="td-obrisi"><button type="button" onClick="obrisiRadionicu(${
                    this.id
                });" class="btn-primary btn-raspored" id="btn-obriši"><i class="fas fa-trash-alt"></i> Obriši</button></td>
            </tr>
        `;
        return $(template);
    }
    constructSingle(predavaci) {
        var predavaciArr = this.getPredavaciArray(predavaci);
        var predavaciString = "";
        for (let i in predavaciArr) {
            predavaciString += `
                <a href="javascript:void(0)" data-id="${predavaciArr[
                    i
                ].getId()}" class="predavaci-predavanja-link">${predavaciArr[
                i
            ].getImePrezime()}</a>
            `;
        }
        var template = `
            <div class="raspored-stavka">
                <div class="raspored-dvorana">${this.getDvorana()}</div>
                <div class="raspored-vrijeme">${this.getVrijemePocetka()} - ${this.getVrijemeKraja()}</div>
                <div class="raspored-naslov">${this.naslov}</div>
                <div class="raspored-predavac">${predavaciString}</div>
            </div>
        `;
        return template;
    }
}

export default Radionica;
