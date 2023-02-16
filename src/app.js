import axios from 'axios';
console.log('Hallo daar!');

// Schrijf een asynchrone functie die een GET request maakt naar endpoint /all

async function fetchAllCountries () {
    try {
        const result = await axios.get("https://restcountries.com/v2/all");
        console.log(result.data)
        console.log(result.data[0].name);
        const banaan = document.getElementById("first-country")
        banaan.innerHTML = `
        <li>${result.data[0].name} </li>
        <p>Has a population of: ${result.data[0].population} amount people</p>`


    } catch (e) {
        console.error(e);
    }
}

fetchAllCountries();
