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
    // countriesContainer.style.opacity = 1;
};

    const renderError = function (msg) {
        countriesContainer.insertAdjacentText('beforeend', msg);

};

    const getJSON = function (url, errorMsg = `Something went wrong`) {
        return fetch(url).then(response => {
            if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

            return response.json();
        });
    };

const getCountryData = function (country) {
    // country 1
    getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)

        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders;
            if (!neighbour) throw new Error('No neighbour found');

            // country 2
           return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour[1]}`, `Country not found` );
        })

        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            console.error(`${err}`);
            renderError(`Something went wrong ${err.message}. Try again!`)
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });

};

btn.addEventListener('click', function () {
    getCountryData('lithuania');
});
    getCountryData('australia');







