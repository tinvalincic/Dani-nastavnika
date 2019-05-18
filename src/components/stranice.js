import Stranica from "./Stranica";

var stranice = {};
stranice.obavijesti = new Stranica("obavijesti", "Obavijesti");
stranice.informacije = new Stranica("informacije", "Informacije");
stranice.program = new Stranica("program", "Program");
stranice.raspored = new Stranica("raspored", "Raspored");
stranice.predavaci = new Stranica("predavaci", "Predavači");
stranice.mapa = new Stranica("mapa", "Mapa");
stranice.eventa = new Stranica("eventa", "Eventa");
stranice.o_projektu = new Stranica("o_projektu", "O projektu");

export default stranice;
