'use strict'

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


// https://restcountries.com/

const renderCountry = function (data, className = '') {
    const languages = Object.values(data.languages);
    const currencies = Object.values(data.currencies);
    const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.official}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currencies[0].name}</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}


const getCountryAndNeighbour = function (country) {

    // AJAX call country 1

    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data); // use this to study the data you want to use

        // render country 1
        renderCountry(data);

        // Get neighbour country (2);
        // const neighbour = data.borders?.[1];
        const neighbours = data.borders;
neighbours.forEach(neighbour => {


        if (!neighbours) return;

        // AJAX call country 2
        const request2 = new XMLHttpRequest();

        request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function () {
            const [data2] = JSON.parse(this.responseText);
            console.log(data2);

            renderCountry(data2, 'neighbour');
        })
})

    });

};

// sample countries whose we want to display
// getCountryData('portugal');
// getCountryData('vatican city');
// getCountryData('san marino');
// getCountryData('spain');

// getCountryAndNeighbour('lithuania');
getCountryAndNeighbour('gibraltar');
// getCountryAndNeighbour('italy');






