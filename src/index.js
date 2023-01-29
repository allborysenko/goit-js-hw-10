import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.getElementById('search-box'),
    countryList: document.querySelector('country-list'),
    countryInfo: document.querySelector('country-info'),
};


refs.input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(event){
    event.preventDefault();

    const inputValue = refs.input.value.trim();

    if (inputValue != "") {
        fetchCountries(inputValue).then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
            } else if (data.length === 0) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else if (data.length === 2 && data.length <= 10) {
                creteMarkupList(data);
            } else if (data.length === 1) {
                creteCountryCard(data);
            }
        })
    }
}

function creteMarkupList(countries) {
    const list = countries
        .map(country => {
            return `<li>
        <img src="${country.flags.svg}">
        <p>${country.name.official}</p>
                </li>`;
        }).join('');
    
    refs.countryList.innerHTML = list;
}

function creteCountryCard(countries) {
    const list = countries
        .map(country => {
            return `<li>
        <img src="${country.flags.svg}">
        <p>${country.name.official}</p>
        <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
        }).join('');
    
    refs.countryList.innerHTML = list;
}

function clear() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}