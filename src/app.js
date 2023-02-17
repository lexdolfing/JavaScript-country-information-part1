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
            return `<li class="${allCountriesSortByPop[index].region}"><img src="${allCountriesSortByPop[index].flag}" class="flag-image"/> ${allCountriesSortByPop[index].name}  </li>
    <p class="population_paragraph">Has a population of: ${allCountriesSortByPop[index].population} people</p>`
        })
        // Hier maak ik van de ge-mapte array één lange lijst, waarbij de komma's verwijderd worden en er een enter achter elk element komt.
        const displayAllCountriesJoined = displayAllCountries.join(" <br>")
        const banaan = document.getElementById("first-country")
        banaan.innerHTML = displayAllCountriesJoined;


    } catch (e) {
        console.error(e);
    }
}

fetchAllCountries();




