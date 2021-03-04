//weather app script.js

/*
https://api.openweathermap.org/data/2.5/
*/

//THIS VARIABLE IS USED TO DETERMINE WHERETHER THE USER HAS NAVIGATED AWAY FROM THE INITAL HOMEPAGE
let home = true;

//THIS FUNCTION GETS THE CURRENT GPS DEVICE LOCATION
function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                return resolve(position);
            }, function (err) {
                return reject(err);
            });
        } else {
            return reject("Geolocation is not supported by this browser.");
        }
    })
}

//THIS FUNCTION CONVERTS DATE NUMBERS TO WORDS
function getDayName(dateStr, locale) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DOM TARGETING
let page = {
    city: document.getElementById('cityValue'),
    button: document.getElementById('button'),
    showHourlyButton: document.getElementById('showHourly'),
    showExtendedButton: document.getElementById('showExtended'),
    //showDailyButton: document.getElementById('showDaily'),

    div: document.getElementById('toShow'),
    headline: document.getElementById('headerToChange'),
    tableHeadRow: document.getElementById('tHeadRow'),
    tableBody: document.getElementById('tBody'),

    setCity: this.button.addEventListener('click', () => {
        if (page.city.value.length > 0) {
            weatherFetch.city = page.city.value;
            weatherFetch.getDataForHourly();
            home = false;
        }
    })
}

//FETCHING THE DATA
let weatherFetch = {
    apiKey: "74e59f6374abe0d9b758877616ae444c",
    city: '',
    apiUrl: "https://api.openweathermap.org/data/2.5/forecast",
    apiUrlOneCall: "https://api.openweathermap.org/data/2.5/onecall",
    imgUrl: ` http://openweathermap.org/img/wn/`,

    //TEMPLATE TO BE USED IN BOTH GPS AND SEARCH INPUT DATA
    //THIS TEMPLATE IS FOR THE EXTENDED 5 DAY LIST
    printTemplateExtended: (list, timezone = 0) => {
        let { tableBody, headline } = page;
        headline.innerHTML = `<span style = "text-transform: capitalize;">${weatherFetch.city}</span>`

        let dayName = ``;
        tableBody.innerHTML = ``;

        //THIS IS USED FOR THE PURPOSE OF PRINTING ONLY ONE DAY WHILE KEEPING THE LOOP IN PROGRESS       
        let dayToCheck = ``;

        for (let element of list) {
            //TIME AND DATE STRING ARE FETCHED HERE, 2 SEPARATE API LINKS ARE USED AND INTERTWINED, TIMEZONE SET ACCORDINGLY
            dayName = getDayName(element.dt_txt, `en-US`)
            let dateTimeArray = element.dt_txt.split(` `);
            let date = dateTimeArray[0].substr(5).split(`-`);
            date = `${date[1]}/${date[0]}`
            hourDate = new Date(+(`${element.dt}000`) + (timezone * 1000))
            let dateArray = hourDate.toString().split(` `);
            let hours = dateArray[4].substr(0, 5);
            let days = dateArray[0];

            let row = tableBody.insertRow();

            let cell = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();
            let cell4 = row.insertCell();
            let cell5 = row.insertCell();
            let cell6 = row.insertCell();

            //WRITE THE DAY ONLY ONCE AND DIVIDE DAYS WITH BORDER
            if (days != dayToCheck) {
                cell.innerHTML = `${date} ${dayName}`
                cell.style = "border-top: 2px solid white"
                cell2.style = "border-top: 2px solid white"
                cell3.style = "border-top: 2px solid white"
                cell4.style = "border-top: 2px solid white"
                cell5.style = "border-top: 2px solid white"
                cell6.style = "border-top: 2px solid white"
            }
            else {
                cell.innerHTML = ``
            }

            cell2.innerHTML = `${hours}`
            cell3.innerHTML = `${parseInt(element.main.temp)}°C`
            cell4.innerHTML = `<span style = "text-transform: capitalize;">${element.weather[0].description}</span>`
            cell5.innerHTML = `<img src="${weatherFetch.imgUrl}${element.weather[0].icon}@2x.png">`
            cell6.innerHTML = ` `

            //THIS IS USED FOR THE PURPOSE OF PRINTING ONLY ONE DAY WHILE KEEPING THE LOOP IN PROGRESS
            dayToCheck = days;
        }
    },

    //TEMPLATE TO BE USED IN BOTH GPS AND SEARCH INPUT DATA
    //THIS TEMPLATE IS FOR THE HOURLY LIST
    printTemplateHourly: (response) => {
        let { tableBody, headline } = page;
        headline.innerHTML = `<span style = "text-transform: capitalize;">${weatherFetch.city}</span>`
        tableBody.innerHTML = ``;

        for (let element of response.hourly) {
            //TIME AND DATE ARE ADJUSTED HERE, AND TIMEZONE IS CORRECTED ACCORDINGLY
            date = new Date(+(`${element.dt}000`) + (response.timezone_offset * 1000))
            let dateArray = date.toString().split(` `);
            let hours = dateArray[4].substr(0, 5);
            let days = dateArray[0];

            let row = tableBody.insertRow();

            let cell = row.insertCell();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();
            let cell4 = row.insertCell();

            cell.innerHTML = `${days}`
            cell1.innerHTML = `${hours}`
            cell2.innerHTML = `${parseInt(element.temp)}°C`
            cell3.innerHTML = `<span style = "text-transform: capitalize;">${element.weather[0].description}</span>`
            cell4.innerHTML = `<img src="${weatherFetch.imgUrl}${element.weather[0].icon}@2x.png">`
        }
    },

    //GET DATA FROM SEARCH BAR INPUTED CITY FOR EXTENDED 3 HOUR 5 DAY LIST
    getDataForExtended: () => {
        async function getTheData() {
            let data = await fetch(`${weatherFetch.apiUrl}?q=${weatherFetch.city}&units=metric&appid=${weatherFetch.apiKey}`)
            let weatherData = data.json();
            let { city, list } = await weatherData;

            //FETCH FOR TIMEZONE DATA FROM OTHER SOURCE, SINCE NOT AVAILABLE IN FIRST SOURCE
            let dataForTimezone = await fetch(`${weatherFetch.apiUrlOneCall}?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${weatherFetch.apiKey}&exclude=minutely`)
            let parsedDataForTimezone = dataForTimezone.json();
            let responseForTimeZone = await parsedDataForTimezone;

            //SETTING THE GLOBAL CITY NAME TO BE USED EVERYWHERE
            weatherFetch.city = city.name;

            if (home === false) {
                weatherFetch.printTemplateExtended(list, responseForTimeZone.timezone_offset);
            }
        }
        getTheData();
    },

    //GET DATA FROM GEOLOCATION OF DEVICE FOR EXTENDED 3 HOUR 5 DAY LIST
    getDataForExtendedFromGPS: () => {
        async function getTheDataFromGPS() {
            let coordinates = await getLocation();
            let lat = await coordinates.coords.latitude;
            let long = await coordinates.coords.longitude;
            let data = await fetch(`${weatherFetch.apiUrl}?lat=${lat}&lon=${long}&units=metric&appid=${weatherFetch.apiKey}`)
            let parsedData = data.json();
            let { city, list } = await parsedData;

            //FETCH FOR TIMEZONE DATA FROM OTHER SOURCE, SINCE NOT AVAILABLE IN FIRST SOURCE
            let dataForTimezone = await fetch(`${weatherFetch.apiUrlOneCall}?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${weatherFetch.apiKey}&exclude=minutely`)
            let parsedDataForTimezone = dataForTimezone.json();
            let responseForTimeZone = await parsedDataForTimezone;

            //SETTING THE GLOBAL CITY NAME TO BE USED EVERYWHERE
            weatherFetch.city = city.name;

            if (home === true) {
                weatherFetch.printTemplateExtended(list, responseForTimeZone.timezone_offset);
            }
        }
        getTheDataFromGPS();
    },

    //GET DATA FROM SEARCH BAR FOR HOURLY LIST
    getDataForHourly: () => {
        async function getTheDataFromGPSOneCall() {
            //FIRST FETCHING THE GLOBAL CITY VALUE BECAUSE OF PASSING GPS COORDINATES TO NEXT SOURCE
            let locationBuffer = await fetch(`${weatherFetch.apiUrl}?q=${weatherFetch.city}&units=metric&appid=${weatherFetch.apiKey}`)
            let location = locationBuffer.json();
            let { city } = await location;

            //THIS DATA IS USED FOR HOURLY LIST
            let data = await fetch(`${weatherFetch.apiUrlOneCall}?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${weatherFetch.apiKey}&exclude=minutely`)
            let parsedData = data.json();

            let response = await parsedData;
            if (home === false) {
                weatherFetch.printTemplateHourly(response)
            }
        }
        getTheDataFromGPSOneCall();
    },

    //GET DATA FROM  GEOLOCATION OF DEVICE FOR HOURLY LIST
    getDataForHourlyFromGPS: () => {
        async function getTheDataFromGPSOneCall() {

            //FETCHING GPS DATA FROM GEOLOCATION PROMISE
            let coordinates = await getLocation();
            let lat = await coordinates.coords.latitude;
            let long = await coordinates.coords.longitude;

            //THIS IS ONLY USED TO FETCH THE GPS CITY VALUE
            let dataForCity = await fetch(`${weatherFetch.apiUrl}?lat=${lat}&lon=${long}&units=metric&appid=${weatherFetch.apiKey}`)
            let parsedDataForCity = dataForCity.json();
            let { city } = await parsedDataForCity;
            //SETTING THE GLOBAL CITY NAME DEFAULT VALUE
            weatherFetch.city = city.name;

            //AND HERE WE GET THE DATA THAT IS NEEDED FOR HOURLY LIST
            let data = await fetch(`${weatherFetch.apiUrlOneCall}?lat=${lat}&lon=${long}&units=metric&appid=${weatherFetch.apiKey}&exclude=minutely`)
            let parsedData = data.json();
            let response = await parsedData;

            if (home === true) {
                weatherFetch.printTemplateHourly(response)
            }
        }
        getTheDataFromGPSOneCall();
    }
}

//HOURLY FORECAST SHOW BUTTON
page.showHourlyButton.addEventListener('click', () => home === true ? weatherFetch.getDataForHourlyFromGPS() : weatherFetch.getDataForHourly())  

//5-DAY EXTENDED FORECAST SHOW BUTTON
page.showExtendedButton.addEventListener('click', () => home === true ? weatherFetch.getDataForExtendedFromGPS() : weatherFetch.getDataForExtended())


weatherFetch.getDataForHourlyFromGPS();
