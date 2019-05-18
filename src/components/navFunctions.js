import $ from "jquery";
import { sejvajLokalno } from "./HelperFunctions";

export function otvoriObavijesti(
    neprocitaneNovosti,
    user,
    novosti,
    pocetniHTMLNovosti
) {
    if (neprocitaneNovosti != "") {
        $(".obavijest-wrap").html(pocetniHTMLNovosti);
        for (let i in neprocitaneNovosti) {
            if (user == null) user = {};
            if (!user.hasOwnProperty("novosti")) user.novosti = [];
            user.novosti.push(neprocitaneNovosti[i]);
            let zaLokalno = JSON.stringify(user);
            sejvajLokalno("dani-nastavnika", zaLokalno);
        }
    }
    var templejt = "";
    for (let i in novosti) {
        templejt += novosti[i].constructSingle();
    }

    $(".obavijesti-append").html(templejt);
}

export function otvoriProgram(raspored) {
    var templejt = "";
    var trenutniDatum = "";
    for (let i in raspored) {
        if (raspored[i].getDatumPocetka() != trenutniDatum) {
            if (i > 0) {
                templejt += "</div>";
            }
            templejt += `
                <div class="program-datum kutija">${raspored[
                    i
                ].getDatumPocetka()}</div>
                <div class="raspored-grupa">
            `;
            trenutniDatum = raspored[i].getDatumPocetka();
        }
        templejt += raspored[i].constructSingle();
    }

    $(".program-append").html(templejt);
}

export function otvoriRaspored(predavanja, predavaci) {
    console.log("predavanja", predavanja);
    var templejt = "";
    var brojacDana = 0;
    var brojacSektora = 0;
    for (let i in predavanja) {
        templejt += `
            <div class="program-datum kutija raspored-datum collapse-btn" data-id="datum-${brojacDana}" data-akcija="prikazi">${i}</div>
            <div class="raspored-dan-wrap collapse-elem" data-id="datum-${brojacDana}">
        `;
        let danPredavanja = predavanja[i];
        for (let j in danPredavanja) {
            if (j != "bezSektora") {
                templejt += `
                    <div class="program-datum kutija raspored-sektor collapse-btn" data-id="sektor-${brojacSektora}" data-akcija="prikazi">${j}<br><span class="dvorana-kartica">${danPredavanja[
                    j
                ][1].getDvorana()}</span></div>
                    <div class="raspored-sektor-wrap collapse-elem" data-id="sektor-${brojacSektora}">
                `;
            }
            let sektorPredavanja = danPredavanja[j];
            for (let k in sektorPredavanja) {
                if (j == "bezSektora" && i == "24. listopad") {
                    templejt += `
                        <div class="program-datum kutija raspored-sektor collapse-btn" data-id="predavanje-${sektorPredavanja[
                            k
                        ].getId()}" data-akcija="prikazi">${sektorPredavanja[
                        k
                    ].getNaslov()}<br><span class="dvorana-kartica">${sektorPredavanja[
                        k
                    ].getDvorana()}</span></div>
                        <div class="raspored-sektor-wrap collapse-elem" data-id="predavanje-${sektorPredavanja[
                            k
                        ].getId()}">
                    `;
                }
                templejt += sektorPredavanja[k].constructSingle(predavaci);
                if (j == "bezSektora" && i == "24. listopad") {
                    templejt += "</div>";
                }
            }
            if (j != "bezSektora") {
                templejt += "</div>";
            }
            brojacSektora++;
        }
        templejt += "</div>";
        brojacDana++;
    }

    $(".raspored-append").html(templejt);
}

export function otvoriPredavace(predavaci, predavanja) {
    var templejt = "";
    var brojac = 0;
    var nazivi = {};
    var trenutni;
    for (let i in predavaci) {
        if (brojac % 5 == 0) {
            trenutni = brojac;
            nazivi["naziv-" + trenutni] = {};
            nazivi["naziv-" + trenutni].prvi = predavaci[i]
                .getPrezime()
                .substring(0, 3);
            templejt += `
                <div class="program-datum kutija predavaci-grupa collapse-btn" data-id="predavaci-${brojac}" data-akcija="prikazi">{{naziv-${trenutni}}}</div>
                <div class="predavaci-grupa-wrap collapse-elem" data-id="predavaci-${brojac}">
            `;
        }
        templejt += predavaci[i].constructSingle(predavanja);
        brojac++;
        if (brojac % 5 == 0 || typeof predavaci[Number(i) + 1] == "undefined") {
            templejt += "</div>";
            nazivi["naziv-" + trenutni].drugi = predavaci[i]
                .getPrezime()
                .substring(0, 3);
        }
    }
    for (let i in nazivi) {
        templejt = templejt.replace(
            "{{" + i + "}}",
            nazivi[i].prvi + " - " + nazivi[i].drugi
        );
    }

    $(".predavaci-append").html(templejt);
}

export function otvoriMape(hoteli) {
    var templejt = "";
    for (let i in hoteli) {
        templejt += `
            <div class="program-datum kutija raspored-datum collapse-btn" data-id="hotel-${hoteli[
                i
            ].getId()}" data-akcija="prikazi">${hoteli[i].getNaslov()}</div>
            <div class="raspored-dan-wrap collapse-elem" data-id="hotel-${hoteli[
                i
            ].getId()}">
        `;
        templejt += hoteli[i].constructSingle();
        templejt += "</div>";
    }

    $(".mape-append").html(templejt);
}
