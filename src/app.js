import axios from 'axios';
console.log('Hallo daar!');

// Schrijf een asynchrone functie die een GET request maakt naar endpoint /all

async function fetchAllCountries () {
    try {
        const result = await axios.get("https://restcountries.com/v2/all");
        console.log(result)
        // Hier maak ik een array van alleen de data van de landen
        const allCountriesArray = result.data;
        // Hier sorteer ik die array op basis van populatie van laag naar hoog
        const allCountriesSortByPop = allCountriesArray.sort((a, b) =>  {
            return a.population - b.population;
        });
        // Map functie, waarin ik een array maak met alle html-elementen die geprint moeten worden per land. Elk <li> element heeft een class gebaseerd op de regio van het land, daarom is de aparte functie voor kleuren afwezig.
        const displayAllCountries = allCountriesSortByPop.map((country, index) => {
            return `<article><li class="${allCountriesSortByPop[index].region}"><img src="${allCountriesSortByPop[index].flag}" class="flag-image"/> ${allCountriesSortByPop[index].name}  </li>
    <p class="population_paragraph">Has a population of: ${allCountriesSortByPop[index].population} people</p></article>`
        })
        // Hier maak ik van de ge-mapte array één lange lijst, waarbij de komma's verwijderd worden en er een enter achter elk element komt.
        const displayAllCountriesJoined = displayAllCountries.join(" <br>")
        const banaan = document.getElementById("first-country")
        banaan.innerHTML = displayAllCountriesJoined;


    } catch (e) {
        console.error(e);
    }
}

// fetchAllCountries();

async function fetchOneCountry(country) {
    // BONUS check of de naam van het opgegeven land in de lijst voorkomt
    try {
        // maak een string van de url met de naam van het land
        const url = "https://restcountries.com/v2/name/" + country
        console.log(url)
        // doe een get request met die url
        let thisCountry = await axios.get(url);
        //haal de nodige info op, zet in variabele
        thisCountry = thisCountry.data[0];
        // Maak een array waarin alle html-elementen zitten die geprint moeten worden naar de webpagina
        const displaySelectedCountry = `<article id="country_information"><span class="country_information_header"><img src=${thisCountry.flag} alt="country flag" class="chosen-country_flag"/> ${thisCountry.name} </span>
            <p class="country_information_text">${thisCountry.name} is situated in ${thisCountry.subregion}. It has a population of ${thisCountry.population} people. </br>
            The capital is ${thisCountry.capital} and you can pay with ${getValuta(thisCountry)}. </br>
            They speak ${getLanguages(thisCountry)}</p></article>`
        console.log(displaySelectedCountry);

        //Hier print ik het op de pagina met een innerHTML
        const countryTextBox = document.getElementById("country_information_container");
        countryTextBox.innerHTML = displaySelectedCountry;
    } catch (e) {
        const countryTextBox = document.getElementById("country_information_container");
        countryTextBox.innerHTML = "Dit land bestaat niet, controleer je invoer";

    }
}

function getValuta (thisCountry) {
        // map, maak een array met alle valuta
        const currencies = thisCountry.currencies.map((currency) => {
            return currency.name;
        });
        return currencies.join(" and the ");
}

function getLanguages (thisCountry) {
    // maak een array met alle talen die gesproken worden in het opgegeven land
    let languages = thisCountry.languages.map((language) => {
        return language.name;
    })
    // Als er meer dan twee talen gesproken worden, maak een string waar de laatste twee elementen gescheiden worden door "and" en de voorgaande door een komma
    if (languages.length > 2) {
        // maak een array met de laatste twee talen
        const lastTwoLanguages = languages.slice(-2);
        // maak een array met de voorgaande talen
        const precedingLanguages = languages.slice(0, -2);
        // join deze arrays
        return `${precedingLanguages.join(", ")}, ${lastTwoLanguages.join(" and ")}`

    } else {
        return languages.join(" and ");
    }
}

//Event listener

// sla referentie naar het button element op
const searchForm = document.getElementById("search_country_form");

// plaats er een eventlistener op
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const countryInputField = document.getElementById('text-field')
    const countryInput = countryInputField.value;
    fetchOneCountry(countryInput);
    countryInputField.value= '';
    });




