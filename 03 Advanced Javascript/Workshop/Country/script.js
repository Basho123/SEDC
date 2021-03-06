// # Build your own app 
// ## CountrySearch
// CountrySearch is an application that is meant to search for countries and get data for them in real time. The application is very simple. It only has one functionality: Search and show the countries in a table
// ### Requirements
// * There should be one search input to input name or partial name of a country
// * There should be a button for search to innitiate
// * When the button is clicked, a table shows with the possible answers
// * The table shows:
//   * Flag
//   * Name
//   * Population
//   * Capital
//   * Area
// * The API for countries is: https://restcountries.eu/
// * Read the API documentation in order to figure out how to call for the countries
// ### Extra requirements
//   * List language names and currency names in the table as well ( only names and divided by , EX: Spanish, English )
//   * Add loading image while it is getting the data
//   * Add a filter by name, area and population in descending order
//   * Add a filter by name, area and population in ascending order

let page = {
    input: document.getElementById(`countryValue`),
    button: document.getElementById(`searchButton`),
    table: document.getElementById(`tBody`),
    ascendingFilter: document.getElementById(`filter1`),
    precisionFilter: document.getElementById(`filter2`),
    loader: document.getElementById(`loader`),
}

page.loader.style.display = `none`;

let apiData = {
    apiUrl: `https://restcountries.eu/rest/v2/`,
}

page.button.addEventListener(`click`, () => {
    page.table.innerHTML = ``
    if (page.input.value != undefined) {

        page.loader.style.display = `block`;

        (async function getData() {
            let data = await fetch(`${apiData.apiUrl}name/${page.input.value}`);
            let countries = await data.json();

            page.loader.style.display = `none`;

            sortByNameAsc = (a, b) => (a.name).localeCompare(b.name);
            sortByNameDesc = (a, b) => (b.name).localeCompare(a.name);

            sortByAreaAsc = (a, b) => a.area - b.area;
            sortByAreaDesc = (a, b) => b.area - a.area;

            sortByNumberAsc = (a, b) => a.population - b.population;
            sortByNumbersDesc = (a, b) => b.population - a.population;


            if (page.ascendingFilter.value === `ascending`) {
                switch (page.precisionFilter.value) {
                    case `name`:
                        countries.sort(sortByNameAsc)
                        break;
                    case `area`:
                        countries.sort(sortByAreaAsc)
                        break;
                    case `population`:
                        countries.sort(sortByNumberAsc)
                        break;
                    default:
                        break;
                }
            }
            else if (page.ascendingFilter.value === `descending`) {
                switch (page.precisionFilter.value) {
                    case `name`:
                        countries.sort(sortByNameDesc)
                        break;
                    case `area`:
                        countries.sort(sortByAreaDesc)
                        break;
                    case `population`:
                        countries.sort(sortByNumberDesc)
                        break;
                    default:
                        break;
                }
            }
            else null;

            countries.forEach(country => {
                page.table.innerHTML += `
                <tr>
                    <td> <img src="${country.flag}" alt="" width="100px"></td>
                    <td>${country.name}</td>
                    <td>${country.population}</td>
                    <td>${country.area}</td>
                    <td>${country.capital}</td>
                    <td>${country.languages.map(language => language.name)}</td>
                    <td>${country.currencies.map(currency => currency.name)}</td>
                </tr>            
            `
            })
        })()
    }

})

