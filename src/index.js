import $ from "jquery";
import Predavanje from "./components/Predavanje";
import Predavac from "./components/Predavac";
import Radionica from "./components/Radionica";
import Obavijest from "./components/Obavijest";
import hoteli from "./components/hoteli";
import stranice from "./components/stranice";
import * as navFunctions from "./components/navFunctions";
import { nadiElement, ucitajLokalno } from "./components/HelperFunctions";

//#region Globalne varijable
var user = ucitajLokalno("dani-nastavnika");
var neprocitaneNovosti = [];
//var server = 'http://localhost:8080/'; // lokalno
var server = "https://dedal-api.appspot.com/"; // na gCloudu
var projekt = "dani-nastavnika";
var aktivnaStranica = "";
var predavanjaSektori = {};
var raspored = [],
    novosti = [],
    predavanja = [],
    predavaci = [];
var pocetniHTMLNovosti;
var currentEvent = "dani-nastavnika";
//#endregion

//#region Onload
$(function() {
    ucitajRaspored();
    ucitajNovosti();
    var ucitaniPredavaci = ucitajPredavanja();
    ucitaniPredavaci.then(ucitajPredavace).then(() => {
        $(".loading-window").hide();
    });

    $(".nav-link").click(function() {
        var id = $(this).attr("data-id");
        if (aktivnaStranica != id) {
            let stranica = nadiElement(stranice, id);
            aktivnaStranica = stranica.ucitajStranicu(aktivnaStranica);
            switch (id) {
                case "obavijesti":
                    navFunctions.otvoriObavijesti(
                        neprocitaneNovosti,
                        user,
                        novosti,
                        pocetniHTMLNovosti
                    );
                    break;
                case "program":
                    navFunctions.otvoriProgram(raspored);
                    break;
                case "raspored":
                    navFunctions.otvoriRaspored(predavanjaSektori, predavaci);
                    break;
                case "predavaci":
                    navFunctions.otvoriPredavace(predavaci);
                    break;
                case "mapa":
                    navFunctions.otvoriMape(hoteli);
                    break;
            }
        }
    });

    $(".header-ikona").click(function() {
        var id = $(this).attr("data-id");
        switch (id) {
            case "nav":
                $(".nav-sidebar").addClass("active");
                $(".nav-overlay").addClass("active");
                break;
            case "back":
                home();
                break;
            case "raspored":
                $(".predavac-sidebar").removeClass("active");
                $(".header h1").html("Raspored");
                $(this).attr("data-id", "back");
                break;
            default:
                break;
        }
    });

    $(".zatvori-nav").click(function() {
        $(".nav-sidebar").removeClass("active");
        $(".nav-overlay").removeClass("active");
    });

    $(".sadrzaj").on("click", ".predavaci-predavanja-link", function() {
        var id = $(this).attr("data-id");
        $(".header-ikona").attr("data-id", "raspored");
        var predavac = nadiElement(predavaci, id);
        $(".header h1").html(predavac.getImePrezime());
        $(".predavac-sidebar").html(predavac.constructSidebar(predavanja));
        $(".predavac-sidebar").addClass("active");
    });

    //#region Toggle tekst novosti
    $(".sadrzaj").on("click", ".vise-button", function() {
        var id = $(this).attr("data-id");
        var akcija = $(this).attr("data-akcija");

        var obavijest = nadiElement(novosti, id);
        switch (akcija) {
            case "vise":
                $(`.obavijest[data-id=${id}] .tekst-obavijesti`).html(
                    obavijest.getTekst()
                );
                $(this).attr("data-akcija", "manje");
                break;
            case "manje":
                $(`.obavijest[data-id=${id}] .tekst-obavijesti`).html(
                    obavijest.getShortTekst()
                );
                $(this).attr("data-akcija", "vise");
                break;
        }
    });
    //#endregion

    //#region Toggle raspored
    $(".sadrzaj").on("click", ".collapse-btn", function() {
        var id = $(this).attr("data-id");
        var akcija = $(this).attr("data-akcija");
        var elem = $(`.collapse-elem[data-id=${id}]`);

        switch (akcija) {
            case "prikazi":
                elem.animate(
                    {
                        height: elem.get(0).scrollHeight
                    },
                    300,
                    function() {
                        $(this).height("auto");
                    }
                );
                elem.addClass("collapsed");
                $(this)
                    .attr("data-akcija", "sakrij")
                    .addClass("collapsed");
                break;
            case "sakrij":
                elem.animate({ height: "0px" }, 300);
                elem.removeClass("collapsed");
                $(this)
                    .attr("data-akcija", "prikazi")
                    .removeClass("collapsed");
                break;
        }
    });
    //#endregion
});
//#endregion

//#region Učitaj raspored
function ucitajRaspored() {
    var data = { akcija: "ucitaj raspored" };
    $.ajax({
        dataType: "json",
        url: server + projekt,
        data: data,
        method: "post"
    }).done(res => {
        for (let i in res) {
            if (res[i].event == currentEvent) {
                unesiPredavanje(res[i]);
            }
        }
        console.log("Raspored");
        console.log(raspored);
    });
}
//#endregion
//#region Učitaj novosti
function ucitajNovosti() {
    var data = { akcija: "ucitaj novosti" };
    $.ajax({
        dataType: "json",
        url: server + projekt,
        data: data,
        method: "post"
    }).done(res => {
        for (let i in res) {
            if (res[i].event == currentEvent) {
                unesiObavijest(res[i]);
            }
        }
        console.log("Novosti");
        console.log(novosti);
        if (novosti.length > 0) {
            pocetniHTMLNovosti = $(".obavijest-wrap").html();
            let brojNeprocitanih = 0;
            let neprocitanaNovost;
            if (user != null) {
                if (user.hasOwnProperty("novosti")) {
                    for (let i in novosti) {
                        if (!user.novosti.includes(novosti[i].getId())) {
                            brojNeprocitanih++;
                            neprocitanaNovost = novosti[i];
                            neprocitaneNovosti.push(novosti[i].getId());
                        }
                    }
                }
            } else {
                for (let i in novosti) {
                    neprocitaneNovosti.push(novosti[i].getId());
                }
                neprocitanaNovost = novosti[Number(novosti.length) - 1];
                brojNeprocitanih = Number(novosti.length);
            }
            if (brojNeprocitanih > 0) {
                upisiNovuObavijest(neprocitanaNovost, brojNeprocitanih);
            }
        }
    });
}
//#endregion
//#region Učitaj predavanja
function ucitajPredavanja() {
    return new Promise(resolve => {
        var data = { akcija: "ucitaj predavanja", order: "pocetakPredavanja" };
        $.ajax({
            dataType: "json",
            url: server + projekt,
            data: data,
            method: "post"
        }).done(res => {
            for (let i in res) {
                if (res[i].event == currentEvent) {
                    unesiRadionicu(res[i]);
                }
            }
            console.log("Predavanja");
            console.log(predavanja);

            for (let i in predavanja) {
                if (
                    !predavanjaSektori.hasOwnProperty(
                        predavanja[i].getLijepiDatum()
                    )
                ) {
                    predavanjaSektori[predavanja[i].getLijepiDatum()] = {};
                }
                let objSaDatumom =
                    predavanjaSektori[predavanja[i].getLijepiDatum()];

                let sektor =
                    predavanja[i].getSektor() == ""
                        ? "bezSektora"
                        : predavanja[i].getSektor();
                if (!objSaDatumom.hasOwnProperty(sektor)) {
                    objSaDatumom[sektor] = [];
                }

                let objSaSektorom = objSaDatumom[sektor];

                objSaSektorom.push(predavanja[i]);
            }
            resolve(true);
        });
    });
}
//#endregion
//#region Učitaj predavače
function ucitajPredavace() {
    return new Promise(resolve => {
        var data = { akcija: "ucitaj predavace", order: "predavacPrezime" };
        $.ajax({
            dataType: "json",
            url: server + projekt,
            data: data,
            method: "post"
        }).done(res => {
            for (let i in res) {
                unesiPredavaca(res[i]);
            }
            sortirajPredavace();
            resolve(true);
        });
    });
}
//#endregion

//#region Unos predavanja u modul
function unesiPredavanje(predavanje) {
    raspored.push(
        new Predavanje(
            predavanje.id,
            predavanje.naslovPredavanja,
            predavanje.imePredavaca,
            predavanje.vrijemePocetka,
            predavanje.vrijemeKraja,
            predavanje.poredak
        )
    );
}
//#endregion
//#region Unos obavijesti u modul
function unesiObavijest(obavijest) {
    novosti.push(
        new Obavijest(
            obavijest.id,
            obavijest.naslovObavijesti,
            obavijest.tekstObavijesti,
            obavijest.kreiran
        )
    );
}
//#endregion
//#region Unos radionice u modul
function unesiRadionicu(radionica) {
    predavanja.push(
        new Radionica(
            radionica.id,
            radionica.naslov,
            radionica.idPredavaca,
            radionica.pocetakPredavanja,
            radionica.krajPredavanja,
            radionica.sazetakPredavanja,
            radionica.dvoranaPredavanja,
            radionica.sektorPredavanja,
            radionica.ID
        )
    );
}
//#endregion
//#region Unos predavača u modul
function unesiPredavaca(predavac) {
    predavaci.push(
        new Predavac(
            predavac.id,
            predavac.predavacIme,
            predavac.predavacPrezime,
            predavac.predavacPredavanja,
            predavac.predavacSlika,
            predavac.predavacZivotopis
        )
    );
}
//#endregion

//#region Sortiraj predavače
function sortirajPredavace() {
    var abeceda = [
        "a",
        "b",
        "c",
        "č",
        "ć",
        "d",
        "dž",
        "đ",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "lj",
        "m",
        "n",
        "nj",
        "o",
        "ö",
        "p",
        "r",
        "s",
        "š",
        "t",
        "u",
        "v",
        "w",
        "z",
        "ž"
    ];

    // Ne radi sa hrvatsko/švedskim znakovima
    // predavaci.sort((a, b) => {
    //     return (
    //         a
    //             .getPrezime()
    //             .toLowerCase()
    //             .localeCompare(b.getPrezime().toLowerCase(), "hr") -
    //         a
    //             .getPrezime()
    //             .toLowerCase()
    //             .localeCompare(b.getPrezime().toLowerCase(), "hr")
    //     );
    // });
    // console.log(predavaci);

    var swapped;
    do {
        swapped = false;
        for (let i = 0; i < predavaci.length - 1; i++) {
            for (let j = 0; j < 2; j++) {
                var znakTrenutni = abeceda.indexOf(
                    predavaci[i].getPrezime()[j].toLowerCase()
                );
                var znakSljedeci = abeceda.indexOf(
                    predavaci[i == predavaci.length - 1 ? 0 : i + 1]
                        .getPrezime()
                        [j].toLowerCase()
                );
                if (znakTrenutni != znakSljedeci) {
                    break;
                }
            }

            if (znakTrenutni > znakSljedeci) {
                let temp = predavaci[i];
                predavaci[i] = predavaci[i + 1];
                predavaci[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}
//#endregion

//#region Upiši novu obavijest u polje za nove obavijeti
function upisiNovuObavijest(obavijest, neprocitane) {
    $(".naslov-obavijesti").html(obavijest.getNaslov());
    $(".datum-obavijesti").html(obavijest.getLijepiDatum());
    $(".tekst-obavijesti").html(obavijest.getShortTekst());
    $(".nove-obavijesti-naslov .broj-obavijesti").html(`(${neprocitane})`);
}
//#endregion

//#region Otvori home
function home() {
    aktivnaStranica = "home";
    $(".header h1").html("Dani strukovnih nastavnika");
    $("#sadrzaj").removeClass("active");
    $("#sadrzaj").scrollTop(0);
    $(".header")
        .removeClass("sivo")
        .removeClass("plavo");
    $(".nav_icons").removeClass("aktiv-nav");
    $(".header-ikona").attr("data-id", "nav");
}
//#endregion
