const body = document.getElementById("main");

// initialise le programme
function init() {
    dynamicFavicon();
    let input = document.createElement("input");
    input.type = "text";
    input.id = "inputCity"

    let btn = document.createElement("button");
    btn.textContent = "Search";
    btn.id = "btnSearchCity";

    let div = document.createElement("div");
    div.id = "results";

    body.appendChild(input);
    body.appendChild(btn);
    body.appendChild(div);
    detectSearch(input, btn);
}

function dynamicFavicon() {
    let favicon = document.getElementById("favicon");
    let sunnyLink = "./images/weather/png/basics/044-sunny.png";
    let moonLink = "./images/weather/png/047-crescent-moon.png";
    let date = new Date();
    let hours = date.getHours();
    if (hours >= 6 && hours < 18) {
        favicon.href = sunnyLink;
    } else if (hours >= 18 || hours < 6) {
        favicon.href = moonLink;
    }
}

// détect si l'utilisateur cherche une ville
function detectSearch(input, btn) {
    input.addEventListener("keyup", function () {
        let cityRead = input.value;
        searchCity(cityRead);
    });
    btn.addEventListener("click", function() {
        let cityRead = input.value;
        searchCity(cityRead);
    });
}

// fonction permmettant de chercher une vile grace l'api data.gouv
function searchCity(cityRead) {
    let results = document.getElementById("results");
    results.innerHTML = "";
    let newLink = "https://api-adresse.data.gouv.fr/search/?q=";
    fetch(newLink + cityRead).then(function (response) {
        return response.json();
    }).then(function (json) {
        for (let i = 0; i < 5; i++) {
            if (json.features[i].properties.type != "street") {
                let p = document.createElement("p");
                p.classList.add("list");
                p.textContent = json.features[i].properties.name + ", " + json.features[i].properties.postcode;
                p.style.cursor = "pointer";
                results.appendChild(p);

                p.addEventListener("click", function () {
                    launchApi(json.features[i].properties, results);
                });
            }
        }
    })
}

// lance l'api
function launchApi(element, results) {
    document.getElementById("inputCity").value = element.name;
    results.innerHTML = "";
    searchMeteoApi(element.citycode);
}

// api meteo concept
function searchMeteoApi(insee) {
    let link = "https://api.meteo-concept.com/api/forecast/daily?token=";
    fetch(link + token + "&insee=" + insee).then(function (response) {
        return response.json();
    }).then(function (json) {
        // information ville
        let cityInformation = [];
        cityInformation.push(json.city);
        titleCity(cityInformation[0]);
        // prévision météo sur 2 semaine
        let weatherForecast = [];
        weatherForecast.push(json.forecast);
        weeksWeather(weatherForecast[0]);
    })
}

function titleCity(city) {
    let results = document.getElementById("results");
    let h2 = document.createElement("h2");
    h2.textContent = city.name;
    results.appendChild(h2);
}

function weeksWeather(weather) {
    let results = document.getElementById("results");
    let img = document.createElement("img");
    let weatherCode = weather[0].weather;
    console.log(weatherCode);
    if (weatherCode === 0) {
        // soleil 044-sunny.png
        console.log("sun");
        img.src = "../images/weather/png/basics/044-sunny.png";
    } else if (weatherCode >= 1 && weatherCode <= 2) {
        // peut nuageux 010-cloudy-day.png
        console.log("peut nuageux");
        img.src = "../images/weather/png/basics/010-cloudy-day.png";
    } else if (weatherCode >= 3 && weatherCode <= 5) {
        //  nuageux 026-cloud.png
        console.log("nuageux");
        img.src = "../images/weather/png/basics/026-cloud.png";
    } else if (weatherCode >= 6 && weatherCode <= 7) {
        // brouillard 027-fog.png
        console.log("brouillard");
        img.src = "../images/weather/png/basics/027-fog.png";
    } else if (weatherCode >= 10 && weatherCode <= 15 || weatherCode >= 40 && weatherCode <= 48 || weatherCode >= 210 && weatherCode <= 212) {
        // pluie 023-rain.png
        console.log("pluie");
        img.src = "images/weather/png/basics/023-rain.png";
    } else if (weatherCode === 16) {
        // brume undefined image
        console.log("brume");
    } else if (weatherCode >= 20 && weatherCode <= 22 || weatherCode >= 60 && weatherCode <= 68 || weatherCode >= 220 && weatherCode <= 222) {
        // neige 018-snowfall.png
        console.log("neige");
        img.src = "images/weather/png/basics/018-snowfall.png";
    } else if (weatherCode >= 30 && weatherCode <= 32 || weatherCode >= 70 && weatherCode <= 78 || weatherCode >= 230 && weatherCode <= 232) {
        // neige + pluie undefined image
        console.log("neige et pluie mêlées");
    } else if (weatherCode >= 100 && weatherCode <= 128) {
        // orage 032-bolt.png
        console.log("orage");
        img.src = "images/weather/png/basics/032-bolt.png";
    } else if (weatherCode >= 130 && weatherCode <= 142) {
        // orage + pluie 034-rain.png
        console.log("orage et pluie");
        img.src = "images/weather/png/basics/034-rain.png";
    } else if (weatherCode === 235) {
        // grêle 013-hail.png
        console.log("grêle");
        img.src = "images/weather/png/basics/013-hail.png";
    }
    results.appendChild(img);
}

init();