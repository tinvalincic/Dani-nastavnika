import $ from "jquery";

class Predavac {
    constructor(id, ime, prezime, predavanjaPredavaca, slika, zivotopis) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.predavanjaArray = [];
        if (!Array.isArray(predavanjaPredavaca)) {
            this.predavanjaArray.push(Number(predavanjaPredavaca));
        } else {
            for (let i in predavanjaPredavaca) {
                this.predavanjaArray.push(Number(predavanjaPredavaca[i]));
            }
        }
        this.slika = slika;
        this.zivotopis = zivotopis;
    }

    getId() {
        return Number(this.id);
    }
    getIme() {
        return this.ime;
    }
    getPrezime() {
        return this.prezime;
    }
    getImePrezime() {
        return this.ime + " " + this.prezime;
    }
    getPredavanjaString(predavanja) {
        var pred = [];
        for (let i in predavanja) {
            if (this.predavanjaArray.includes(predavanja[i].getId())) {
                pred.push(predavanja[i].getNaslov());
            }
        }
        return pred.toString().replace(",", ", ");
    }
    getPredavanjaArray(predavanja) {
        var pred = [];
        for (let i in predavanja) {
            if (this.predavanjaArray.includes(predavanja[i].getId())) {
                pred.push(predavanja[i]);
            }
        }
        return pred;
    }
    getSlika() {
        var slikaUrl = this.slika != "" ? this.slika : "default-image.jpg";
        var slikaTemplejt = `<img src="https://dedal.hr/asoo/img/predavaci/${slikaUrl}" alt="${
            this.ime
        }" class="img-responsive predavac-img-tablica"/>`;
        return slikaTemplejt;
    }
    getSlikaUrl() {
        return this.slika;
    }
    getZivotopis() {
        return this.zivotopis;
    }
    getShortZivotopis() {
        return this.zivotopis.substring(0, 200).replace(/<[^>]*>/g, "") + "...";
    }

    setIme(novo) {
        this.ime = novo;
    }
    setPrezime(novo) {
        this.prezime = novo;
    }
    setPredavanja(novo) {
        if (!Array.isArray(novo)) {
            this.predavanjaArray = [Number(novo)];
        } else {
            this.predavanjaArray = [...novo];
        }
    }
    setSlika(novo) {
        this.slika = novo;
    }
    setZivotopis(novo) {
        this.zivotopis = novo;
    }

    construct() {
        var template = `
            <tr data-id="${this.id}">
                <td class="td-ime">${this.getImePrezime()}</td>
                <td class="td-slika">${this.getSlika()}</td>
                <td class="td-predavanja">${this.getPredavanjaString()}</td>
                <td class="td-opis">${this.getShortZivotopis()}</td>
                <td class="td-uredi"><button type="button" onClick="urediPredavaca(${
                    this.id
                });" class="btn-primary btn-raspored" id="btn-uredi"><i class="fas fa-edit"></i> Uredi</button></td>
                <td class="td-obrisi"><button type="button" onClick="obrisiPredavaca(${
                    this.id
                });" class="btn-primary btn-raspored" id="btn-obriši"><i class="fas fa-trash-alt"></i> Obriši</button></td>
            </tr>
        `;
        return $(template);
    }
    constructSingle(predavanja) {
        var predavanjaArr = this.getPredavanjaArray(predavanja);
        var predavanjaString = "";
        for (let i in predavanjaArr) {
            predavanjaString += `
                <div class="predavanja-stavka">
                    <div class="predavanja-naslov">${predavanjaArr[
                        i
                    ].getNaslov()}</div>
                    <div class="raspored-dvorana predavanja-dvorana">${predavanjaArr[
                        i
                    ].getDvorana()}</div>
                    <div class="raspored-vrijeme predavanje-vrijeme">${predavanjaArr[
                        i
                    ].getVrijemePocetka()} - ${predavanjaArr[
                i
            ].getVrijemeKraja()}</div>
                </div>
            `;
        }
        var template = `
            <div class="program-datum kutija predavac-grupa collapse-btn" data-id="predavac-${
                this.id
            }" data-akcija="prikazi">${this.getImePrezime()}</div>
            <div class="predavac-grupa-wrap collapse-elem" data-id="predavac-${
                this.id
            }">
                <div class="predavac-wrap">
                    <div class="predavac-slika">${this.getSlika()}</div>
                    <div class="predavac-ime">${this.getImePrezime()}</div>
                    <div class="predavac-opis">${this.zivotopis}</div>
                    <div class="predavac-predavanja-naslov">Predavanja</div>
                    ${predavanjaString}
                </div>
            </div>
        `;
        return template;
    }
    constructSidebar(predavanja) {
        var predavanjaArr = this.getPredavanjaArray(predavanja);
        var predavanjaString = "";
        for (let i in predavanjaArr) {
            predavanjaString += `
                <div class="predavanja-stavka">
                    <div class="predavanja-naslov">${predavanjaArr[
                        i
                    ].getNaslov()}</div>
                    <div class="raspored-dvorana predavanja-dvorana">${predavanjaArr[
                        i
                    ].getDvorana()}</div>
                    <div class="raspored-vrijeme predavanje-vrijeme">${predavanjaArr[
                        i
                    ].getVrijemePocetka()} - ${predavanjaArr[
                i
            ].getVrijemeKraja()}</div>
                </div>
            `;
        }
        var template = `
            <div class="predavac-sidebar">
                <div class="sidebar-slika">${this.getSlika()}</div>
                <div class="predavac-ime sidebar-ime">${this.getImePrezime()}</div>
                <div class="sidebar-zivotopis">${this.zivotopis}</div>
                <div class="sidebar-predavanja">
                    <div class="predavac-predavanja-naslov">Predavanja</div>
                    <div class="sidebar-predavanja-wrap">${predavanjaString}</div>
                </div>
            </div>
        `;
        return template;
    }
}

export default Predavac;
