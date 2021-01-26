const body = document.getElementById("main");

// initialise le programme
function init() {
    let input = document.createElement("input");
    input.type = "text";
    input.id = "inputCity"

    let btn = document.createElement("button");
    btn.textContent = "Search";
    btn.id = "btnSearchCity";

    let div = document.createElement("div");
    div.id = "wrapper";

    body.appendChild(input);
    body.appendChild(btn);
    body.appendChild(div);
    detectSearch(input, btn);
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
    let wrapper = document.getElementById("wrapper");
    wrapper.innerHTML = "";
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
                wrapper.appendChild(p);

                p.addEventListener("click", function () {
                    launchApi(json.features[i].properties, wrapper);
                });
            }
        }
    })
}

// lance l'api
function launchApi(element, wrapper) {
    document.getElementById("inputCity").value = element.name;
    wrapper.innerHTML = "";
    searchMeteoApi(element.citycode);
}

// api meteo concept
function searchMeteoApi(insee) {
    let link = "https://api.meteo-concept.com/api/forecast/daily?token=";
    fetch(link + token + "&insee=" + insee).then(function (response) {
        return response.json();
    }).then(function (json) {
        // information ville
        console.log(json.city)
        // prévision météo sur 2 semaine
        console.log(json.forecast);
        let wrapper = document.getElementById("wrapper");
        // wrapper.textContent = json.city.name;
    })
}

init();