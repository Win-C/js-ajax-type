"use strict";

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// Fetch city data from endpoint using Fetch API
fetch(endpoint)
  .then(resp => resp.json())
  .then(data => cities.push(...data));


/** Function finds matches in provided cities data
 *  Takes in a word like "New" and cities as an array like
 *    [
 *      {
 *        "city": "New York", 
 *        "growth_from_2000_to_2013": "4.8%", 
 *        "latitude": 40.7127837, 
 *        "longitude": -74.0059413, 
 *        "population": "8405837", 
 *        "rank": "1", 
 *        "state": "New York"
 *      },
 *      ...
 *    ]
 *  Returns match found in city or state name
 */
function findMatches(word, cities){
  return cities.filter(place => {
    const regex = new RegExp(word, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}


/** Function calls findMatches and displays matches in DOM */
function displayMatches(){
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(
      regex, 
      `<span class="hl">${this.value}</span>`
    );
    const stateName = place.state.replace(
      regex, 
      `<span class="hl">${this.value}</span>`
    );
    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
    `
  }).join('');
  suggestions.innerHTML = html;
}


/** Helper function to insert commas into numbers using regex */
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Add event listeners on search input - both on change and keystrokes
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);