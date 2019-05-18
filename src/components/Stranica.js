import $ from "jquery";

class Stranica {
    constructor(id, naziv) {
        this.id = id;
        this.naziv = naziv;
        this.html = $(`#templejt-${this.id}`).html();
    }
    getId() {
        return this.id;
    }
    getNaziv() {
        return this.naziv;
    }
    getHtml() {
        return this.html;
    }
    ucitajStranicu(aktivnaStranica) {
        var ucitano = this.getHtml();
        $("#sadrzaj").html(ucitano);
        $(".header h1").html(this.naziv);
        $("#sadrzaj").addClass("active");
        if (aktivnaStranica == "eventa") {
            $(".header").addClass("sivo");
        } else {
            $(".header").addClass("plavo");
        }
        $(".nav_icons").addClass("aktiv-nav");
        $(".header-ikona").attr("data-id", "back");
        if ($(".nav-sidebar").hasClass("active")) {
            $(".nav-sidebar").removeClass("active");
            $(".nav-overlay").removeClass("active");
        }
        return this.id;
    }
}

export default Stranica;
