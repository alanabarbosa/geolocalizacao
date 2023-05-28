const h2 = document.querySelector('h2');
let map;

const success = (position) => {
    h2.innerText = `Latitude:${position.coords.latitude}, Longitude:${position.coords.longitude}`;
    
    if (map === undefined) map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    else {
        map.remove();
        map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    }
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        .bindPopup('A localização exata')
        .openPopup();
}

const error = (err) => {
  h2.innerText = `Erro na sua localização`;
}

const watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});

