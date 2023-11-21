let response;

const checkIP = () => {
    var xmlhttp = new XMLHttpRequest();
    var ip_address = document.getElementById('ip_address').value;
    var auth = 'at_ypYEpbVvcwby2yWquZHyTfyEwa8oT';
    const BASE_URL = "https://geo.ipify.org/api/v2/country,city";
    const API_KEY = `?apiKey=${auth}`
    const IP_ADDRESS = ip_address ? `&ipAddress=${ip_address}` : ''
    var url = BASE_URL+API_KEY+IP_ADDRESS;

    xmlhttp.onreadystatechange = async  function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            await updateResults();
            updateMap();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

const updateResults = async () => {
    const ip = document.querySelector('#resIPAddress');
    const location = document.querySelector('#resLocation');
    const timezone = document.querySelector('#resTimezone');
    const isp = document.querySelector('#resISP');
    ip.innerHTML = response.ip;
    location.innerHTML = `${response.location.country} ${response.location.region} ${response.location.city}`;
    timezone.innerHTML = `UTC ${response.location.timezone}`;
    isp.innerHTML = response.isp;
    document.getElementById('ip_address').value = response.ip;
    return;
}

// initialize the map
const map = L.map('map')

const updateMap = async () => {
    const latitude = response.location.lat;
    const longitude = response.location.lng;
    map.setView(
            [latitude,longitude], 
            18 // zoom scale (0 - 18)
        );   
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([latitude,longitude]).addTo(map);
}

document.addEventListener('onready', checkIP());
