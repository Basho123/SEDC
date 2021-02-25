//script.js beer fetch

// https://punkapi.com/documentation/v2?fbclid=IwAR0cH640GtgtbQ2U3BE_8P1f_hT-isFvPXQzGvr18w1tvUVgPZhb7OIqgbU

/* 

abv_gt	number	Returns all beers with ABV greater than the supplied number
abv_lt	number	Returns all beers with ABV less than the supplied number
ibu_gt	number	Returns all beers with IBU greater than the supplied number
ibu_lt	number	Returns all beers with IBU less than the supplied number
ebc_gt	number	Returns all beers with EBC greater than the supplied number
ebc_lt	number	Returns all beers with EBC less than the supplied number
beer_name	string	Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA), if you need to add spaces just add an underscore (_).
yeast	string	Returns all beers matching the supplied yeast name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
brewed_before	date	Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011
brewed_after	date	Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011
hops	string	Returns all beers matching the supplied hops name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
malt	string	Returns all beers matching the supplied malt name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
food	string	Returns all beers matching the supplied food string, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
ids	string (id|id|...)	Returns all beers matching the supplied ID's. You can pass in multiple ID's by separating them with a | symbol.
Get a Single Beer

*/

// fetch (`https://api.punkapi.com/v2/beers/1`)
// .then(response => response.json())
// .then(beer =>{
// console.log(beer);
// })
// .catch(error => console.error(error))
let baseUrl = `https://api.punkapi.com/v2/beers?page=`;
;
async function getBeers(pageNumber) {
  let data = await fetch(baseUrl + pageNumber);
  let parsedData = await data.json(); 
  return parsedData;
}

// async function functionForBeers() {
//   let data = await fetch(testUrl);
//   let parsedData = await data.json(); 
//   return parsedData;
// }

async function listBeers() {
  for (let i = 1; i < 13; i++) {
    for(let g = 0; g < 25; g++){
      let result = await getBeers(i);
      console.log(result[g].name);
    }    
  }
}



listBeers();

