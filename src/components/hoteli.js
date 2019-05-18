import Hotel from "./Hotel";

var hoteli = [];
hoteli.push(
    new Hotel(hoteli.length, "Convention centre Šibenik", [
        {
            naslov: "Dvorane 1 - 2",
            slika: "1-2.png",
            kat: "Prizemlje"
        },
        {
            naslov: "Dvorane 3 - 6",
            slika: "3-6.png",
            kat: "Razina -1"
        },
        {
            naslov: "Dvorane 7 - 9",
            slika: "7-9.png",
            kat: "1. kat"
        },
        {
            naslov: "Dvorane 10 - 11",
            slika: "10-11.png",
            kat: "Mezzanine 0/-1"
        }
    ])
);
hoteli.push(
    new Hotel(hoteli.length, "Hotel Ivan", [
        {
            naslov: "Žirje",
            slika: "Ivan.png",
            kat: "Prizemlje"
        },
        {
            naslov: "Lavsa",
            slika: "Ivan.png",
            kat: "Prizemlje"
        }
    ])
);
hoteli.push(
    new Hotel(hoteli.length, "Hotel Jure", [
        {
            naslov: "Event room Jure",
            slika: "Jure.png",
            kat: "Prizemlje"
        }
    ])
);
hoteli.push(
    new Hotel(hoteli.length, "Hotel Niko", [
        {
            naslov: "Krka I",
            slika: "Niko.png",
            kat: "Prizemlje"
        },
        {
            naslov: "Krka II",
            slika: "Niko.png",
            kat: "Prizemlje"
        },
        {
            naslov: "Krka II",
            slika: "Niko.png",
            kat: "Prizemlje"
        }
    ])
);

export default hoteli;
