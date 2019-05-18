import $ from "jquery";
import {
    formatirajDatum,
    formatirajVrijeme,
    vratiSNulom
} from "./HelperFunctions";

class Obavijest {
    constructor(id, naslov, tekst, kreirano) {
        this.id = id;
        this.naslov = naslov;
        this.tekst = tekst;
        this.kreiranoTekst = kreirano;
        this.kreirano = new Date(String(this.kreiranoTekst));
    }

    getId() {
        return Number(this.id);
    }
    getNaslov() {
        return this.naslov;
    }
    getTekst() {
        return this.tekst;
    }
    getShortTekst() {
        var shortTekst = this.tekst.substring(0, 200);
        shortTekst = shortTekst.replace(/<[^>]*>/g, "");
        shortTekst = shortTekst + "...";
        return shortTekst;
    }
    getDatumKreiranja() {
        return (
            formatirajDatum(this.kreirano) +
            " " +
            formatirajVrijeme(this.kreirano)
        );
    }

    getLijepiDatum() {
        var mjesec = Number(this.kreirano.getMonth()) + 1;

        var tekstMjesec;
        switch (mjesec) {
            case 1:
                tekstMjesec = "sij";
                break;
            case 2:
                tekstMjesec = "velj";
                break;
            case 3:
                tekstMjesec = "ožu";
                break;
            case 4:
                tekstMjesec = "tra";
                break;
            case 5:
                tekstMjesec = "svi";
                break;
            case 6:
                tekstMjesec = "lip";
                break;
            case 7:
                tekstMjesec = "srp";
                break;
            case 8:
                tekstMjesec = "kol";
                break;
            case 9:
                tekstMjesec = "ruj";
                break;
            case 10:
                tekstMjesec = "lis";
                break;
            case 11:
                tekstMjesec = "stu";
                break;
            case 12:
                tekstMjesec = "pro";
                break;
            default:
                break;
        }
        return (
            vratiSNulom(this.kreirano.getDate()) +
            " " +
            tekstMjesec +
            " " +
            formatirajVrijeme(this.kreirano)
        );
    }

    setNaslov(novo) {
        this.naslov = novo;
    }
    setTekst(novo) {
        this.tekst = novo;
    }

    construct() {
        var template = `
            <tr data-id="${this.id}">
                <td class="td-kreirano">${this.getDatumKreiranja()}</td>
                <td class="td-naslov">${this.naslov}</td>
                <td class="td-tekst">${this.tekst}</td>
                <td class="td-uredi"><button type="button" onClick="urediObavijest(${
                    this.id
                });"  class="btn-primary btn-raspored" id="btn-uredi"><i class="fas fa-edit"></i> Uredi</button></td>
                <td class="td-obrisi"><button type="button" onClick="obrisiObavijest(${
                    this.id
                });" class="btn-primary btn-raspored" id="btn-obriši"><i class="fas fa-trash-alt"></i> Obriši</button></td>
            </tr>
        `;
        return $(template);
    }

    constructSingle() {
        var template = `
            <div class="obavijest" data-id="${this.id}">
                <h5 class="naslov-obavijesti">${this.naslov}</h5>
                <p class="datum-obavijesti">${this.getLijepiDatum()}</p>
                <p class="tekst-obavijesti">${this.getShortTekst()}</p>
                ${
                    this.tekst.length > 200
                        ? '<button class="vise-button" data-id="' +
                          this.id +
                          '" data-akcija="vise">POGLEDAJ VIŠE</button>'
                        : ""
                }
            </div>
        `;
        return template;
    }
}

export default Obavijest;
