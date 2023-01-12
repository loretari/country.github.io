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
};

    const renderError = function (msg) {
        countriesContainer.insertAdjacentText('beforeend', msg);
        countriesContainer.style.opacity = 1;

};

    const getJSON = function (url, errorMsg = `Something went wrong`) {
        return fetch(url).then(response => {
            if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

            return response.json();
        });
    };

    const getPosition = function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    const whereAmI = function () {
        getPosition().then(pos => {
            const {latitude: lat, longitude: lng} = pos.coords;
            return fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json&auth=144588167875121e15886605x125889`);
        })
            .then(response => {
                console.log(response);
                if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log(data);
                console.log(`You are in ${data.city}, ${data.country}`);
                return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
            })
            .then(response => {
                if (!response.ok)  throw new Error(`Country not found (${response.status})`);
                return response.json();
            })
            .then(data => renderCountry(data[0]))
            .catch(err => console.error(`${err.message}`));
    };

// const getCountryData = function (country) {
//     // country 1
//     getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
//
//         .then(data => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders;
//             if (!neighbour) throw new Error('No neighbour found');
//
//             // country 2
//            return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour[1]}`, `Country not found` );
//         })
//
//         .then(data => renderCountry(data[0], 'neighbour'))
//         .catch(err => {
//             console.error(`${err}`);
//             renderError(`Something went wrong ${err.message}. Try again!`)
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         });
//
// };

btn.addEventListener('click', whereAmI);








