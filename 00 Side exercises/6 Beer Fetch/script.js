//script.js beer fetch

// https://punkapi.com/documentation/v2?fbclid=IwAR0cH640GtgtbQ2U3BE_8P1f_hT-isFvPXQzGvr18w1tvUVgPZhb7OIqgbU

/* Display functions
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

// #region Display class properties

/* 

[
  {
    "id": 192,
    "name": "Punk IPA 2007 - 2010",
    "tagline": "Post Modern Classic. Spiky. Tropical. Hoppy.",
    "first_brewed": "04/2007",
    "description": "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
    "image_url": "https://images.punkapi.com/v2/192.png",
    "abv": 6.0,
    "ibu": 60.0,
    "target_fg": 1010.0,
    "target_og": 1056.0,
    "ebc": 17.0,
    "srm": 8.5,
    "ph": 4.4,
    "attenuation_level": 82.14,
    "volume": {
      "value": 20,
      "unit": "liters"
    },
    "boil_volume": {
      "value": 25,
      "unit": "liters"
    },
    "method": {
      "mash_temp": [
        {
          "temp": {
            "value": 65,
            "unit": "celsius"
          },
          "duration": 75
        }
      ],
      "fermentation": {
        "temp": {
          "value": 19.0,
          "unit": "celsius"
        }
      },
      "twist": null
    },
    "ingredients": {
      "malt": [
        {
          "name": "Extra Pale",
          "amount": {
            "value": 5.3,
            "unit": "kilograms"
          }
        }
      ],
      "hops": [
        {
          "name": "Ahtanum",
          "amount": {
            "value": 17.5,
            "unit": "grams"
           },
           "add": "start",
           "attribute": "bitter"
         },
         {
           "name": "Chinook",
           "amount": {
             "value": 15,
             "unit": "grams"
           },
           "add": "start",
           "attribute": "bitter"
         },
         ...
      ],
      "yeast": "Wyeast 1056 - American Ale™"
    },
    "food_pairing": [
      "Spicy carne asada with a pico de gallo sauce",
      "Shredded chicken tacos with a mango chilli lime salsa",
      "Cheesecake with a passion fruit swirl sauce"
    ],
    "brewers_tips": "While it may surprise you, this version of Punk IPA isn't dry hopped but still packs a punch! To make the best of the aroma hops make sure they are fully submerged and add them just before knock out for an intense hop hit.",
    "contributed_by": "Sam Mason <samjbmason>"
  }
]
*/

// #end region


let table = document.getElementById(`table`);
let postButton = document.getElementById(`post`);
let optionValue = document.getElementsByTagName(`option`);
let select = document.getElementById(`select`);
let detailedShow = document.getElementById(`detailedShow`)

//this is a counter used to show/hide previous next buttons
let globalPageCounter = 1;

//base url from where pages are fetched later
let baseUrl = `https://api.punkapi.com/v2/beers?page=`;

//function for fetching the data
async function getBeers(pageNumber) {
  let data = await fetch(baseUrl + pageNumber);
  let parsedData = await data.json();
  return parsedData;
}


//this is a function to make a list of all the beers
async function listBeers(counter = 1) {
  table.innerHTML = ``
  table.innerHTML = `
  <tr> 
      <th><button id="previous">Previous Page</button></th>
      <th colspan=2>Page ${counter}</th>
      <th><button id="next">Next Page</button></th>
  </tr>
  <tr>
    <th style="width: 25px;">ID</th>    
    <th>Beer Name</th>
    <th>Alcohol Percentage</th>
    <th>Image of beer</th>
  </tr>`

  //all the beers in a page are fetched here
  for (let i = 0; i < 20; i++) {
    let result = await getBeers(counter);
    if (result[i].image_url == null) result[i].image_url = "noImg.jpg"
    table.innerHTML += `
      <tr>
          <td>${result[i].id}</td>
          <td><a href="https://api.punkapi.com/v2/beers/${result[i].id}" onclick="return false";>${result[i].name}</a></td>
          <td>${result[i].abv}%</td>
          <td><img src=${result[i].image_url} height="150px"></td>
      </tr>
      `
  }

  //DOM targeting for newly created buttons
  let previous = document.getElementById(`previous`);
  let next = document.getElementById(`next`);

  //validation for show/hide next and previous buttons
  globalPageCounter == 13 ? next.hidden = true : next.hidden = false;
  globalPageCounter == 1 ? previous.hidden = true : previous.hidden = false;

  //change to the next page
  next.addEventListener(`click`, () => {
    globalPageCounter < 13 ? globalPageCounter++ : false;
    listBeers(globalPageCounter);

  })

  //change to the previous page
  previous.addEventListener(`click`, () => {
    globalPageCounter > 1 ? globalPageCounter-- : false;
    listBeers(globalPageCounter);
  })


  //get all the <a> tags from the newly created html elements
  let anchors = document.getElementsByTagName(`a`)

  //this targets the clicked a tag
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener(`click`, () => {
      
      //this was used for debugging purposes, may be needed later
      window.sessionStorage.setItem(`anchors`, anchors[i].href)

      //this function opens a detailed page for a beer clicked
      async function detailedBeerBrowse() {
        let response = await fetch(anchors[i].href)
        let data = await response.json()

        //this saves to session storage the id number for later manipulation
        window.sessionStorage.setItem(`pageNumber`, data[0].id)

        //if there is no image present, use a local image
        if (data[0].image_url == null) data[0].image_url = "noImg.jpg"

        table.innerHTML = `

        <tr>
          <td><button id="previousButton">Previous</button></td>
          <td><button id="nextButton">Next</button></td>
        </tr>
        `;
        
        detailedShow.innerHTML = ``;
        //the data to be shown
        detailedShow.innerHTML += `        
        <h1>${data[0].name}</h1>
        <img src=${data[0].image_url} height ="600px">
        <p><i>${data[0].tagline}</i></p>
        <h3>Alcohol: ${data[0].abv}%</h3>
        <p><b>First brewed: ${data[0].first_brewed}</b></p>
        <p>${data[0].description}</p>
        <p>Food that goes along well with this beer: ${data[0].food_pairing}</p>
        <p>Brewer tips: <i>${data[0].brewers_tips}</i></p>
        `

        //separate function for the next and previous buttons to navigate from the page itself directly
       //almost identical to the function above
       //could've adjusted the function parameters, but maybe later.
        async function prevNextPage(number) {
          //the `number` parameter will be the session storage number actually
          let response = await fetch(`https://api.punkapi.com/v2/beers/${number}`)
          let data = await response.json()

          if (data[0].image_url == null) data[0].image_url = "noImg.jpg"

          window.sessionStorage.setItem(`pageNumber`, data[0].id)

          table.innerHTML = `
        
          <tr>
            <td><button id="previousButton">Previous</button></td>
            <td><button id="nextButton">Next</button></td>
          </tr>
          `; 
          detailedShow.innerHTML = ``;
          detailedShow.innerHTML += `        
          <h1>${data[0].name}</h1>
          <img src=${data[0].image_url} height ="600px">
          <p><i>${data[0].tagline}</i></p>
          <h3>Alcohol: ${data[0].abv}%</h3>
          <p><b>First brewed: ${data[0].first_brewed}</b></p>
          <p>${data[0].description}</p>
          <p>Food that goes along well with this beer: ${data[0].food_pairing}</p>
          <p>Brewer tips: <i>${data[0].brewers_tips}</i></p>
          `
          document.getElementById(`previousButton`).addEventListener(`click`, () => {
            if (window.sessionStorage.pageNumber == 1) {
              window.sessionStorage.pageNumber = 325
              prevNextPage(window.sessionStorage.pageNumber)
            }
            else prevNextPage(+window.sessionStorage.pageNumber - 1)
          })

          document.getElementById(`nextButton`).addEventListener(`click`, () => {
            if (window.sessionStorage.pageNumber == 325) {
              window.sessionStorage.pageNumber = 1
              prevNextPage(+window.sessionStorage.pageNumber)
            }
            else prevNextPage(+window.sessionStorage.pageNumber + 1)
          })
        }

        document.getElementById(`previousButton`).addEventListener(`click`, () => {
          if (window.sessionStorage.pageNumber == 1) {
            window.sessionStorage.pageNumber = 325
            prevNextPage(window.sessionStorage.pageNumber)
          }
          else prevNextPage(+window.sessionStorage.pageNumber - 1)
        })

        document.getElementById(`nextButton`).addEventListener(`click`, () => {
          if (window.sessionStorage.pageNumber == 325) {
            window.sessionStorage.pageNumber = 1
            prevNextPage(+window.sessionStorage.pageNumber)
          }
          else prevNextPage(+window.sessionStorage.pageNumber + 1)
        })
      }


      detailedBeerBrowse();
    })
  }
}

//what the post button will do when something from the drop down menu is chosen
postButton.addEventListener(`click`, () => {
  if (select[select.options.selectedIndex].value == `displayAll`) {
    globalPageCounter = 1;
    listBeers(globalPageCounter);
  }
})



