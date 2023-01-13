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

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
};

  const whereAmI = async function () {
      try {
          //Geolocation
          const pos = await getPosition();
          const {latitude: lat, longitude: lng} = pos.coords;

          //Reverse geocoding
          const resGeo = await fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json&auth=144588167875121e15886605x125889`);
          if (!resGeo.ok) throw new Error('Problem getting location data!');
          const dataGeo = await resGeo.json();

          // Country data
          const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
if (!res.ok) throw new Error('Problem getting country!')
          const data = await res.json();
          renderCountry(data[0]);

          return `You are in ${dataGeo.city}, ${dataGeo.country}`;
      } catch (err) {
console.error(`${err}`);
renderError(`${err.message}`);

      //Reject promise returned from async function
          throw err;
      };

  };
(async function () {
    try {
       const city = await whereAmI();
       console.log(`${city}`);
    } catch (err) {
console.log(`${err.message}`);
    }
})();









