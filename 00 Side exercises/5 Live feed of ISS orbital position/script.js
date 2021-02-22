//script.js
//ISS charting

//map and tiles
const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
const tiles = L.tileLayer(tileUrl, { attribution })

//changing the marker icon
let myIcon = L.icon({
    iconUrl: 'ISS.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16], 
}); 

const mymap = L.map('issMap').setView([0, 0], 2)
const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);
const api_url = `https://api.wheretheiss.at/v1/satellites/25544` 


async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude, velocity } = await data;

    //set icon position
    marker.setLatLng([latitude,longitude]);

    document.getElementById('lat').innerText = latitude;
    document.getElementById('long').innerText = longitude;
    document.getElementById('vel').innerText = `${Math.floor(velocity)} KM/h`;
}


tiles.addTo(mymap);
getISS();
setInterval(getISS, 5000)