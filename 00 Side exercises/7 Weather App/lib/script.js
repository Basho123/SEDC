//weather app script.js

/*
https://api.openweathermap.org/data/2.5/
*/

//THIS VARIABLE IS USED TO DETERMINE WHERETHER THE USER HAS NAVIGATED AWAY FROM THE INITAL HOMEPAGE
let home = true;

//all API parameters are saved here
let apiParameters = {
    globalCity: `Skopje`,  
    apiKey: `74e59f6374abe0d9b758877616ae444c`,
    apiFirstUrl: `https://api.openweathermap.org/data/2.5/onecall`,
    apiSecondUrl: `https://api.openweathermap.org/data/2.5/forecast`,
    apiPollutionUrl: `http://api.openweathermap.org/data/2.5/air_pollution`,
    imgUrl: ` http://openweathermap.org/img/wn/`,
}

//AIR POLLUTION DATA FROM GPS LOCATION OF DEVICE
let getPollutionDataFromGPS = () => {
    return new Promise((resolve) => {
        (async function resolvingGps() {
            let gpsData = await getLocation();
            let lat = gpsData.coords.latitude;
            let long = gpsData.coords.longitude;

            let locationNameByGPS = await fetch(`${apiParameters.apiSecondUrl}?lat=${lat}&lon=${long}&units=metric&appid=${apiParameters.apiKey}`)
            let locationName = await locationNameByGPS.json();
            apiParameters.globalCity = locationName.city.name;

            let pollutionData = await fetch(`${apiParameters.apiPollutionUrl}?lat=${lat}&lon=${long}&appid=${apiParameters.apiKey}`)
            let parsedData = await pollutionData.json()
            return resolve(parsedData)
        })();
      
    })
}

//AIR POLLUTION DATA FROM SEARCHED LOCATION
let getPollutionDataromSearch = () => {
    return new Promise((resolve) => {
        (async function resolvingCity() {
            let cityData = await fetch(`${apiParameters.apiSecondUrl}?q=${apiParameters.globalCity}&units=metric&appid=${apiParameters.apiKey}`);
            let response = await cityData.json();

            let lat = response.city.coord.lat;
            let long = response.city.coord.lon;

            let pollutionData = await fetch(`${apiParameters.apiPollutionUrl}?lat=${lat}&lon=${long}&appid=${apiParameters.apiKey}`)
            let parsedData = await pollutionData.json()
            return resolve(parsedData);          
        })();
       
    })
}

// HOURLY AND WEEKLY WEATHER DATA FROM DEVICE LOCATION
let getHourlyDataFromGPS = () => {
    return new Promise((resolve) => {
        (async function resolvingGps() {
            let gpsData = await getLocation();
            let lat = gpsData.coords.latitude;
            let long = gpsData.coords.longitude;

            let locationNameByGPS = await fetch(`${apiParameters.apiSecondUrl}?lat=${lat}&lon=${long}&units=metric&appid=${apiParameters.apiKey}`)
            let locationName = await locationNameByGPS.json();
            apiParameters.globalCity = locationName.city.name;

            let firstLinkData = await fetch(`${apiParameters.apiFirstUrl}?lat=${lat}&lon=${long}&units=metric&appid=${apiParameters.apiKey}&exclude=minutely`)
            let parsedData = await firstLinkData.json()
            return resolve(parsedData)
        })();
      
    })
}

//HOURLY AND WEEKLY WEATHER DATA FROM SEARCHED LOCATION
let getHourlyDataFromSearch = () => {
    return new Promise((resolve) => {
        (async function resolvingCity() {
            let cityData = await fetch(`${apiParameters.apiSecondUrl}?q=${apiParameters.globalCity}&units=metric&appid=${apiParameters.apiKey}`);
            let response = await cityData.json();

            let lat = response.city.coord.lat;
            let long = response.city.coord.lon;

            let firstLinkData = await fetch(`${apiParameters.apiFirstUrl}?lat=${lat}&lon=${long}&units=metric&appid=${apiParameters.apiKey}&exclude=minutely`)
            let parsedData = await firstLinkData.json()
            console.log(parsedData);
            return resolve(parsedData);
        })();
       
    })
}

//5 DAY EXTENDED DATA FROM DEVICE LOCATION
let getExtendedDataFromGPS = () => {
    return new Promise((resolve) => {
        (async function resolvingGps() {
            let gpsData = await getLocation();
            let lat = gpsData.coords.latitude;
            let long = gpsData.coords.longitude;

            let firstLinkData = await fetch(`${apiParameters.apiSecondUrl}?lat=${lat}&lon=${long}&units=metric&appid=${apiParameters.apiKey}&exclude=minutely`)
            let parsedData = await firstLinkData.json()
            return resolve(parsedData)
        })();   
    })
}

//5 DAY EXTENDED DATA FROM SEARCHED LOCATION
function getExtendedDataFromSearch() {
    return new Promise((resolve) => {
        (async function resolvingCity() {    
            let firstLinkData = await fetch(`${apiParameters.apiSecondUrl}?q=${apiParameters.globalCity}&units=metric&appid=${apiParameters.apiKey}&exclude=minutely`)
            let parsedData = await firstLinkData.json()
            return resolve(parsedData)
        })();
    })
}


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
function getDayName(dateStr, locale = `en-US`) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// HTML DOM TARGETING
let page = {
    city: document.getElementById('cityValue'),
    button: document.getElementById('button'),
    showHourlyButton: document.getElementById('showHourly'),
    showExtendedButton: document.getElementById('showExtended'),
    showWeeklyButton: document.getElementById('showWeeklyButton'),

    div: document.getElementById('toShow'),
    headline: document.getElementById('headerToChange'),
    tableHeadRow: document.getElementById('tHeadRow'),
    tableBody: document.getElementById('tBody'),

    setCity: this.button.addEventListener('click', () => {       
        if (page.city.value.length > 0) {
            apiParameters.globalCity = page.city.value;
            weatherFetch.hourlyWeather();
            home = false;
        }       
    })
}

//THIS OBJECT IS CONSISTED OF ALL FUNCTIONS
let weatherFetch = {
    //TEMPLATE TO BE USED IN BOTH GPS AND SEARCH INPUT DATA
    //THIS TEMPLATE IS FOR THE EXTENDED 5 DAY LIST
    printTemplateExtended: (list, timezone = 0) => {
        let { tableBody, headline } = page;
        headline.innerHTML = `<span style = "text-transform: capitalize;">${apiParameters.globalCity}</span>`
      
        
        let dayName = ``;
        tableBody.innerHTML = ``;

        //THIS IS USED FOR THE PURPOSE OF PRINTING ONLY ONE DAY WHILE KEEPING THE LOOP IN PROGRESS       
        let dayToCheck = ``;

        let rowStyleBackhroundColorSwitch = true;

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

            if(rowStyleBackhroundColorSwitch === true){
                row.style.backgroundColor = `rgb(25,25,25)`             
            }
            else{
                row.style.backgroundColor = `rgb(5,5,5)`;
            }
            rowStyleBackhroundColorSwitch = !rowStyleBackhroundColorSwitch;

            let cell = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();
            let cell4 = row.insertCell();
            let cell5 = row.insertCell();
           // let cell6 = row.insertCell();

            //WRITE THE DAY ONLY ONCE AND DIVIDE DAYS WITH BORDER
            if (days != dayToCheck) {
                cell.innerHTML = `<span class="hourlyDays"> ${dayName} <br>${date}</span>`
                cell.style = "border-top: 2px solid white"
                cell2.style = "border-top: 2px solid white"
                cell3.style = "border-top: 2px solid white"
                cell4.style = "border-top: 2px solid white"
                cell5.style = "border-top: 2px solid white"
                //cell6.style = "border-top: 2px solid white"
            }
            else {
                cell.innerHTML = ``
            }

            cell2.innerHTML = `<span class="hourlyHours">${hours}</span>`
            cell3.innerHTML = `<span class="hourlyTemperature">${parseInt(element.main.temp)}°C</span>`
            cell4.innerHTML = `<span style = "text-transform: capitalize;">${element.weather[0].description}</span>`
            cell5.innerHTML = `<img src="${apiParameters.imgUrl}${element.weather[0].icon}@2x.png">`
           // cell6.innerHTML = ` `

            //THIS IS USED FOR THE PURPOSE OF PRINTING ONLY ONE DAY WHILE KEEPING THE LOOP IN PROGRESS
            dayToCheck = days;
        }
    },

    //TEMPLATE TO BE USED IN BOTH GPS AND SEARCH INPUT DATA
    //THIS TEMPLATE IS FOR THE HOURLY LIST
    printTemplateHourly: (response, aqi) => {
        let { tableBody, headline } = page;
        headline.innerHTML = `<span style = "text-transform: capitalize;">${apiParameters.globalCity}</span>`
        tableBody.innerHTML = ``;      

        let date = new Date(+(`${response.current.dt}000`) + (response.timezone_offset * 1000) - 3600*1000)
        let dateArray = date.toString().split(` `);
        let hours = dateArray[4].substr(0, 5);

        let days = getDayName(response.current.dt*1000);

        let sunriseToConvert = new Date(+(`${response.current.sunrise}000`) + (response.timezone_offset * 1000)- 3600*1000)
        let sunriseArray = sunriseToConvert.toString().split(` `);
        let sunriseTime = sunriseArray[4].substr(0, 5);

        let sunsetToConvert = new Date(+(`${response.current.sunset}000`) + (response.timezone_offset * 1000)- 3600*1000)
        let sunsetArray = sunsetToConvert.toString().split(` `);
        let sunsetTime = sunsetArray[4].substr(0, 5);


        console.log(aqi);

        let row = tableBody.insertRow();
        let row2 = tableBody.insertRow();

        row.style.backgroundColor = `rgb(45,45,45)`      
        row2.style.backgroundColor = `rgb(35,35,35)`      

        let cell = row.insertCell();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        let cell4 = row.insertCell();
        let cell5 = row.insertCell();
      
        cell.innerHTML = `<span class="currentHours">${hours}</span><br><span class="currentDays">${days}</span>`
        cell1.innerHTML = `<img src="${apiParameters.imgUrl}${response.current.weather[0].icon}@4x.png">`
        cell2.innerHTML = `<span class = "currentTemperature">${parseInt(response.current.temp)}°C</span>`
        cell3.innerHTML = `<span class = "currentFeelsLike">RealFeel ${parseInt(response.current.feels_like)}°C</span>`
        cell4.innerHTML = `<span class = "currentWeatherDescription" style = "text-transform: capitalize;">${response.current.weather[0].description}</span>`
        cell5.innerHTML = `<span class = "currentUv">UV index: ${response.current.uvi}</span>`  
        
         

        let c2ell = row2.insertCell();
        let c2ell1 = row2.insertCell();
        let c2ell2 = row2.insertCell();
        let c2ell3 = row2.insertCell();
        let c2ell4 = row2.insertCell();
        let c2ell5 = row2.insertCell();

        c2ell.innerHTML = `<span class="aqi">AQI: ${aqi.list[0].main.aqi}</span>`
        c2ell1.innerHTML = `<span class="pm2_5">pm2.5(${aqi.list[0].components.pm2_5} ppm)</span>`
        c2ell2.innerHTML = `<span class="pm10">pm10(${aqi.list[0].components.pm10} ppm)</span>`
        c2ell3.innerHTML = `<span class="sunrise">sun rises: ${sunriseTime}</span>`
        c2ell4.innerHTML = `<span class="sunset">sun sets: ${sunsetTime}</span>`
        c2ell5.innerHTML = `<span class="humidity">humidity ${response.current.humidity}%</span>`

        let row3 = tableBody.insertRow(); 
        row3.style.height = `100px`
        let c3ell = row3.insertCell();
        c3ell.innerHTML = ` `

        let rowStyleBackhroundColorSwitch = true;

        console.log(response);
        for (let element of response.hourly) {
            //TIME AND DATE ARE ADJUSTED HERE, AND TIMEZONE IS CORRECTED ACCORDINGLY
            let date = new Date(+(`${element.dt}000`) + (response.timezone_offset * 1000))
            let dateArray = date.toString().split(` `);
            let hours = dateArray[4].substr(0, 5);
            let days = dateArray[0];

            let row = tableBody.insertRow();

            if(rowStyleBackhroundColorSwitch === true){
                row.style.backgroundColor = `rgb(25,25,25)`             
            }
            else{
                row.style.backgroundColor = `rgb(5,5,5)`;
            }
            rowStyleBackhroundColorSwitch = !rowStyleBackhroundColorSwitch;
        

            let cell = row.insertCell();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();
            let cell4 = row.insertCell();
            let cell5 = row.insertCell();

            cell.innerHTML = `<span class="hourlyHours">${hours}</span><br><span class="hourlyDays">${days}</span>`
            cell1.innerHTML = `<img src="${apiParameters.imgUrl}${element.weather[0].icon}@2x.png">`
            cell2.innerHTML = `<span class = "hourlyTemperature">${parseInt(element.temp)}°C</span>`
            cell3.innerHTML = `<span class = "hourlyFeelsLike">RealFeel ${parseInt(element.feels_like)}°C</span>`
            cell4.innerHTML = `<span class = "hourlyWeatherDescription"style = "text-transform: capitalize;">${element.weather[0].description}</span>`
            cell5.innerHTML = `<span class = "hourlyUV">UV index: ${element.uvi}</span>`           


        }
    },

     //TEMPLATE TO BE USED IN BOTH GPS AND SEARCH INPUT DATA
    //THIS TEMPLATE IS FOR THE WEEKLY LIST
    printTemplateWeekly: (response) => {

        let { tableBody, headline } = page;

        headline.innerHTML = `<span style = "text-transform: capitalize;">${apiParameters.globalCity}</span>`
        tableBody.innerHTML = ``;  

        console.log(response);

        let rowStyleBackhroundColorSwitch = true;

        for (let element of response.daily) {
            //TIME AND DATE ARE ADJUSTED HERE, AND TIMEZONE IS CORRECTED ACCORDINGLY            
            date = new Date(+(`${element.dt}000`) + (response.timezone_offset * 1000))
          
            let dateArray = date.toString().split(` `);
            let hours = dateArray[4].substr(0, 5);
            let days = getDayName(element.dt*1000);

            let row = tableBody.insertRow();

            if(rowStyleBackhroundColorSwitch === true){
                row.style.backgroundColor = `rgb(25,25,25)`             
            }
            else{
                row.style.backgroundColor = `rgb(5,5,5)`;
            }
            rowStyleBackhroundColorSwitch = !rowStyleBackhroundColorSwitch;

            let cell = row.insertCell();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();
            let cell4 = row.insertCell();

            

            cell.innerHTML = `<span class = "hourlyDays">${days}</span>`
            cell1.innerHTML = `<span class = "hourlyHours">Min. ${parseInt(element.temp.min)}°C</span>`
            cell2.innerHTML = `<span class = "hourlyHours">Max. ${parseInt(element.temp.max)}°C</span>`
            cell3.innerHTML = `<span style = "text-transform: capitalize;">${element.weather[0].description}</span>`
            cell4.innerHTML = `<img src="${apiParameters.imgUrl}${element.weather[0].icon}@2x.png">`
        }
    },

     //GET DATA FOR WEEK DAY LIST FROM SEARCH BAR
    weeklyWeather: () => {
        (async function getTheDataFromGPSOneCall() {            
            let dataWeekly = await getHourlyDataFromSearch();
            let dataExtended = await getExtendedDataFromSearch();   
         
            apiParameters.globalCity = dataExtended.city.name;          

            if (home === false) {
                weatherFetch.printTemplateWeekly(dataWeekly)
            }
        })()
      
    },

     //GET DATA FOR WEEK DAY LIST FROM DEVICE LOCATION
    weeklyWeatherGPS: () => {
        (async function getTheDataFromGPSOneCall() {
            let dataWeekly = await getHourlyDataFromGPS();
            let dataExtended = await getExtendedDataFromGPS();         
           
            //SETTING THE GLOBAL CITY NAME DEFAULT VALUE
            apiParameters.globalCity = dataExtended.city.name;
           
            if (home === true) {
                weatherFetch.printTemplateWeekly(dataWeekly)
            }
        })()     
    },

    //GET DATA FROM SEARCH BAR INPUTED CITY FOR EXTENDED 3 HOUR 5 DAY LIST
    extendedWeather: () => {
        (async function getTheData() {
            let dataFromHourly = await getHourlyDataFromSearch();      
            let data = await getExtendedDataFromSearch()           
            let { city, list } = await data;            

            //FETCH FOR TIMEZONE DATA FROM OTHER SOURCE, SINCE NOT AVAILABLE IN FIRST SOURCE          
            let responseForTimeZone = await dataFromHourly;

            //SETTING THE GLOBAL CITY NAME TO BE USED EVERYWHERE
            apiParameters.globalCity = city.name;

            if (home === false) {
                weatherFetch.printTemplateExtended(list, responseForTimeZone.timezone_offset);
            }
        })()       
    },

    //GET DATA FROM GEOLOCATION OF DEVICE FOR EXTENDED 3 HOUR 5 DAY LIST
    extendedWeatherGPS: () => {
        (async function getTheDataFromGPS() {
            let data = await getExtendedDataFromGPS()            
            let { city, list } = await data;

            //FETCH FOR TIMEZONE DATA FROM OTHER SOURCE, SINCE NOT AVAILABLE IN FIRST SOURCE
            let dataForTimezone = await getHourlyDataFromSearch();          
            let responseForTimeZone = await dataForTimezone;

            //SETTING THE GLOBAL CITY NAME TO BE USED EVERYWHERE
            apiParameters.globalCity = city.name;

            if (home === true) {
                weatherFetch.printTemplateExtended(list, responseForTimeZone.timezone_offset);
            }
        })()       
    },

    //GET DATA FROM SEARCH BAR FOR HOURLY LIST
    hourlyWeather: () => {
        (async function getTheDataFromGPSOneCall() {
            //FIRST FETCHING THE GLOBAL CITY VALUE BECAUSE OF PASSING GPS COORDINATES TO NEXT SOURCE
            let dataHourly = await getHourlyDataFromSearch();
            let dataExtended = await getExtendedDataFromSearch();  
            let aqi = await getPollutionDataromSearch();      
        
            apiParameters.globalCity = dataExtended.city.name;          

            if (home === false) {
                weatherFetch.printTemplateHourly(dataHourly, aqi)
            }
        })()
      
    },

    //GET DATA FROM  GEOLOCATION OF DEVICE FOR HOURLY LIST
    hourlyWeatherGPS: () => {
        (async function getTheDataFromGPSOneCall() {
            let dataHourly = await getHourlyDataFromGPS();
            let dataExtended = await getExtendedDataFromGPS();   
            let aqi = await getPollutionDataFromGPS();     
           
            //SETTING THE GLOBAL CITY NAME DEFAULT VALUE
            apiParameters.globalCity = dataExtended.city.name;
           
            if (home === true) {
                weatherFetch.printTemplateHourly(dataHourly, aqi)
            }
        })()     
    }
}

//HOURLY FORECAST SHOW BUTTON
page.showHourlyButton.addEventListener('click', () => home === true ? weatherFetch.hourlyWeatherGPS() : weatherFetch.hourlyWeather())

//5-DAY EXTENDED FORECAST SHOW BUTTON
page.showExtendedButton.addEventListener('click', () => home === true ? weatherFetch.extendedWeatherGPS() : weatherFetch.extendedWeather())

//WEEKLY FORECAST SHOW BUTTON
page.showWeeklyButton.addEventListener('click', () => home === true ? weatherFetch.weeklyWeatherGPS() : weatherFetch.weeklyWeather())

//DEFAULT PAGE WHEN OPENED
weatherFetch.hourlyWeatherGPS();
