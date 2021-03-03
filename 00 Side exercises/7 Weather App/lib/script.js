//weather app script.js

/*
https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

*/



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

// DOM TARGETING
let page = {
    city: document.getElementById('cityValue'),
    button: document.getElementById('button'),
    div: document.getElementById('toShow'),

    setCity: this.button.addEventListener('click', () => {
        if (page.city.value.length > 0) {
            weatherFetch.city = page.city.value;
            weatherFetch.getData();
        }

    })
}

//FETCHING THE DATA
let weatherFetch = {   
    apiKey: "74e59f6374abe0d9b758877616ae444c",
    city: "skopje",
    apiUrl: "https://api.openweathermap.org/data/2.5/forecast",

    //TEMPLATE TO BE USED IN BOTH GPS AND SEARCH INPUT DATA
    printTemplate: (city,list)=>{
        page.div.innerHTML =  `
            <h2>${city.name}</h2>
            <table bodrer = '1px'>
                <tbody>
                    <tr>
                        <th>Current temperature</th>
                        <th>${list[1].dt_txt}</th>
                        <th>${list[2].dt_txt}</th>
                        <th>${list[3].dt_txt}</th>
                        <th>${list[4].dt_txt}</th>
                        <th>${list[5].dt_txt}</th>
                        <th>${list[6].dt_txt}</th>
                        <th>${list[7].dt_txt}</th>
                    </tr>
                    <tr>
                        <td>${list[0].main.temp}°C</td>
                        <td>${list[1].main.temp}°C</td>
                        <td>${list[2].main.temp}°C</td>
                        <td>${list[3].main.temp}°C</td>
                        <td>${list[4].main.temp}°C</td>
                        <td>${list[5].main.temp}°C</td>
                        <td>${list[6].main.temp}°C</td>
                        <td>${list[7].main.temp}°C</td>
                    </tr>
                    <tr>
                        <td>${list[0].weather[0].main}</td>                      
                        <td>${list[1].weather[0].main}</td>                      
                        <td>${list[2].weather[0].main}</td>                      
                        <td>${list[3].weather[0].main}</td>                      
                        <td>${list[4].weather[0].main}</td>                      
                        <td>${list[5].weather[0].main}</td>                      
                        <td>${list[6].weather[0].main}</td>                      
                        <td>${list[7].weather[0].main}</td>                      
                    </tr>
                </tbody>
            </table>
            `
    },

    //GET DATA FROM SEARCH BAR INPUTED CITY
    getData: () => {
        async function getTheData() {
            let data = await fetch(`${weatherFetch.apiUrl}?q=${weatherFetch.city}&units=metric&appid=${weatherFetch.apiKey}`)
            let weatherData = data.json();
            let { city, list } = await weatherData;
            weatherFetch.printTemplate(city,list);
        }
        getTheData();
    },

    //GET DATA FROM GEOLOCATION OF DEVICE
    getDataFromGPS: () => {
        async function getTheDataFromGPS() {
            let coordinates = await getLocation();
            let lat = await coordinates.coords.latitude;
            let long = await coordinates.coords.longitude;
            let data = await fetch(`${weatherFetch.apiUrl}?lat=${lat}&lon=${long}&units=metric&appid=${weatherFetch.apiKey}`)
            let parsedData = data.json();

            let { city, list } = await parsedData;

            weatherFetch.printTemplate(city,list);  
        }
        getTheDataFromGPS();
    }
}

//call the gps device weather location by default
weatherFetch.getDataFromGPS();