class Hotel {
    constructor(id, naslov, dvorane) {
        this.id = id;
        this.naslov = naslov;
        this.dvorane = dvorane;
    }

    getId() {
        return this.id;
    }
    getNaslov() {
        return this.naslov;
    }
    constructSingle() {
        var brojac = 0;
        var templejt = "";
        for (let i in this.dvorane) {
            templejt += `
                <div class="program-datum kutija raspored-sektor collapse-btn" data-id="dvorana-${brojac}-${
                this.id
            }" data-akcija="prikazi">${this.dvorane[i].naslov}</div>
                <div class="raspored-sektor-wrap collapse-elem" data-id="dvorana-${brojac}-${
                this.id
            }">
                    <div class="dvorana-slika">
                        <h3 class="dvorana-kat">${this.dvorane[i].kat}</h2>
                        <img src="https://dedal.hr/asoo/img/dvorane/${
                            this.dvorane[i].slika
                        }" class="img-responsive img-dvorana">
                    </div>
                </div>
            `;
            brojac++;
        }
        return templejt;
    }
}
export default Hotel;
