//script.js beer fetch

// https://punkapi.com/documentation/v2?fbclid=IwAR0cH640GtgtbQ2U3BE_8P1f_hT-isFvPXQzGvr18w1tvUVgPZhb7OIqgbU

/* # region Display querry parameter functions
abv_gt      	number	Returns all beers with ABV greater than the supplied number
abv_lt	      number	Returns all beers with ABV less than the supplied number
ibu_gt	      number	Returns all beers with IBU greater than the supplied number
ibu_lt	      number	Returns all beers with IBU less than the supplied number
ebc_gt	      number	Returns all beers with EBC greater than the supplied number
ebc_lt      	number	Returns all beers with EBC less than the supplied number
beer_name   	string	Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA), if you need to add spaces just add an underscore (_).
yeast	        string	Returns all beers matching the supplied yeast name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
brewed_before	date	Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011
brewed_after	date	Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011
hops	        string	Returns all beers matching the supplied hops name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
malt        	string	Returns all beers matching the supplied malt name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
food	        string	Returns all beers matching the supplied food string, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
ids	          string (id|id|...)	Returns all beers matching the supplied ID's. You can pass in multiple ID's by separating them with a | symbol.
Get a Single Beer
*/
// //#endregion

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
let searchBar = document.getElementById(`searchBar`);
let searchButton = document.getElementById(`searchButton`);
let querryParameters = [`beer_name`, `yeast`, `hops`, `malt`, `food`, `ids`]
let globalPageCounter = 1; //this is a counter used to show/hide previous buttons
let baseUrl = `https://api.punkapi.com/v2/beers?page=`; //base url from where pages are fetched later

//FUNCTION FOR FETCHING THE DATA
async function getBeers(pageNumber) {
  let data = await fetch(baseUrl + pageNumber);
  let parsedData = await data.json();
  return parsedData;
}

//FUNCTION TO PRINT ONE DETAILED BEER PAGE, SHORTCUT FUNCTION
let printDiv = (data)=>{
  detailedShow.innerHTML += `      
  <div id="mainContainer">  
    <div>
      <h1>${data.name}</h1>       
      <p><i>#id ${data.id}</i></p>  
      <p><i>${data.tagline}</i></p>
      <h3>Alcohol: ${data.abv}%</h3>
      <p><b>First brewed: ${data.first_brewed}</b></p>
      <p>${data.description}</p>
      <p>Food that goes along well with this beer: ${data.food_pairing}</p>
      <p>Brewer tips: <i>${data.brewers_tips}</i></p>
    </div>
    <div>
     <img src=${data.image_url} height ="600px">
    </div>      
  </div> 
  `
}

//THIS FUNCTION PRINTS DETAILED BEER PAGE AND ALLOWS NAVIGATION, JUST PASS THE URL OF THE ELEMENT
async function detailedBeerBrowse(url) {
  let response = await fetch(url)
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
  printDiv(data[0]);

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
    printDiv(data[0]); 
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

//THIS PRINTS THE HOME PAGE TABLE
async function listBeers(counter = 1, querySelector = ``, perPage = `&per_page=80`) {
  table.innerHTML = ``
  table.innerHTML = `
  <tr> 
      <th><button id="previous"><</button></th>
      <th colspan=2>Page ${counter}</th>
      <th><button id="next">></button></th>
  </tr>
  <tr>
    <th>ID</th>    
    <th>Beer Name</th>
    <th>Alcohol Percentage</th>
    <th>Image of beer</th>
  </tr>`

  //all the beers in a page are fetched here
  let previous = document.getElementById(`previous`);
  let next = document.getElementById(`next`);

  let result = await getBeers(counter + querySelector + perPage);
  for (let i = 0; i < 80; i++) {
    if (result[i] === undefined) {
      next.hidden = true;
      break;
    }
    else {
      if (result[i].image_url == null) result[i].image_url = "noImg.jpg"
      table.innerHTML += `
        <tr>
            <td class ="tableId">${result[i].id}</td>
            <td><a href="https://api.punkapi.com/v2/beers/${result[i].id}" onclick="return false";>${result[i].name}</a></td>
            <td>${result[i].abv}%</td>
            <td><img src=${result[i].image_url} height="150px"></td>
        </tr>
        `

    }

  }

  //DOM targeting for newly created buttons
  previous = document.getElementById(`previous`);
  next = document.getElementById(`next`);

  //validation for show/hide next and previous buttons
  // globalPageCounter == 5 ? next.hidden = true : next.hidden = false;
  globalPageCounter == 1 ? previous.hidden = true : previous.hidden = false;

  //change to the next page
  next.addEventListener(`click`, () => {
    globalPageCounter < 13 ? globalPageCounter++ : false;
    listBeers(globalPageCounter, window.sessionStorage.getItem(`globalQuerySelector`));

  })

  //change to the previous page
  previous.addEventListener(`click`, () => {
    globalPageCounter > 1 ? globalPageCounter-- : false;
    listBeers(globalPageCounter, window.sessionStorage.getItem(`globalQuerySelector`));
  })


  //get all the <a> tags from the newly created html elements
  let anchors = document.getElementsByTagName(`a`)

  //this targets the clicked a tag
  for (let url of anchors) {
    // for (let i = 0; i < anchors.length; i++) {
    url.addEventListener(`click`, () => {

      //this was used for debugging purposes, may be needed later
      window.sessionStorage.setItem(`anchors`, url.href)

      //this function opens a detailed page for a beer clicked
      async function detailedBeerBrowse(url) {
        let response = await fetch(url)
        let data = await response.json()

        //this saves to session storage the id number for later manipulation
        window.sessionStorage.setItem(`pageNumber`, data[0].id)

        //if there is no image present, use a local image
        if (data[0].image_url == null) data[0].image_url = "noImg.jpg"

        table.parentElement.border = 0;
        table.innerHTML = `

        <tr>
          <td><button id="previousButton">Previous</button></td>
          <td><button id="nextButton">Next</button></td>
        </tr>
        `;

        detailedShow.innerHTML = ``;
        //the data to be shown
        printDiv(data[0]);

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
          printDiv(data[0]);

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
      detailedBeerBrowse(url);
    })
  }
}

//what the post button will do when something from the drop down menu is chosen
postButton.addEventListener(`click`, () => {
  table.parentElement.border = 1;
  detailedShow.innerHTML = ``;
  if (select[select.options.selectedIndex].value == `displayAll`) {
    globalPageCounter = 1;
    window.sessionStorage.removeItem(`globalQuerySelector`)
    window.sessionStorage.setItem(`globalQuerySelector`, ``)
    listBeers(globalPageCounter);
  }
  if (select[select.options.selectedIndex].value == `displayStrong`) {
    window.sessionStorage.removeItem(`globalQuerySelector`)
    window.sessionStorage.setItem(`globalQuerySelector`, `&abv_gt=4`)
    globalPageCounter = 1;
    listBeers(globalPageCounter, window.sessionStorage.getItem(`globalQuerySelector`));
  }
  if (select[select.options.selectedIndex].value == `displayWeak`) {
    globalPageCounter = 1;
    window.sessionStorage.removeItem(`globalQuerySelector`)
    window.sessionStorage.setItem(`globalQuerySelector`, `&abv_lt=4`)
    listBeers(globalPageCounter, window.sessionStorage.getItem(`globalQuerySelector`));
  }
  if (select[select.options.selectedIndex].value == `displayUltra`) {
    globalPageCounter = 1;
    window.sessionStorage.removeItem(`globalQuerySelector`)
    window.sessionStorage.setItem(`globalQuerySelector`, `&abv_gt=30`)
    listBeers(globalPageCounter, window.sessionStorage.getItem(`globalQuerySelector`));
  }

})

//SEARCH BUTTON FUNCTION
searchButton.addEventListener(`click`, () => {
  if (searchBar.value.length != 0) {
    table.innerHTML = ``
    detailedShow.innerHTML = `<h1>Search results for "${searchBar.value}"</h1>`;
    async function searchEngine() {
      for (let querryParameter of querryParameters) {
        let data = await fetch(`https://api.punkapi.com/v2/beers?${querryParameter}=${searchBar.value}`)
        let searchResult = await data.json();
        if (searchResult.length > 0) {
          detailedShow.innerHTML += `
          <h2>In category "${querryParameter}"</h2>
          `;
          for (let result of searchResult) {
            detailedShow.innerHTML += `<p><a href="https://api.punkapi.com/v2/beers/${result.id}" onclick = "return false">${result.name}</a></p>`
          }
          async function navigateFromSearchEngine() {
            let anchor = document.getElementsByTagName(`a`)
            for (let url of anchor) {
              url.addEventListener(`click`, () => {
                detailedBeerBrowse(url.href);
              })
            }
          }
          navigateFromSearchEngine();
        }
      }
    }
    searchEngine();
  }



  // navigateLinks();

})


