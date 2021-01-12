const body = document.getElementById("main");

let city = "&insee=56260";
let link = "https://api.meteo-concept.com/api/forecast/daily?token=";

let testData = [];

// fetch(link + token + city).then(function (response) {
//     return response.json();
// }).then(function (json) {
//     // console.log(json);
//     testData.push(json.forecast[0]);
//     console.log(testData);
//     console.log(json.city);
// })

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

function detectSearch(input, btn) {
    input.addEventListener("keyup", function () {
        let cityRead = input.value;
        searchCity(cityRead);
    })
    btn.addEventListener("click", searchMeteoApi);
}

function searchCity(cityRead) {
    let wrapper = document.getElementById("wrapper");
    wrapper.innerHTML = "";
    let link = "https://api.meteo-concept.com/api/location/cities?token=";
    fetch(link + token + "&search=" + cityRead).then(function (response) {
        return response.json();
    }).then(function (json) {
        if (cityRead.length > 3) {
            for (let i = 0; i < 3; i++) {
                let p = document.createElement("p");
                p.classList.add("list");
                p.textContent = json.cities[i].name + ", " + json.cities[i].cp;
                p.style.cursor = "pointer";
                wrapper.appendChild(p);
                p.addEventListener("click", function () {
                    document.getElementById("inputCity").value = json.cities[i].name;
                    wrapper.innerHTML = "";
                    searchMeteoApi();
                })
            }
        }

    })
}

function searchMeteoApi() {
    console.log('plop');
}

init();