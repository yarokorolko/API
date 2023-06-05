// API do Weather App
const cities = [
    { city: 'Lisbon', country: 'Portugal' },
    { city: 'Washington, D.C.', country: 'Estados Unidos' },
    { city: 'Kyiv', country: 'Ucrânia' },
    { city: 'Madrid', country: 'Espanha' },
    { city: 'Paris', country: 'França' },
    { city: 'Brussels', country: 'Bélgica' },
    { city: 'Canberra', country: 'Austrália' },
    { city: 'Buenos Aires', country: 'Argentina' },
    { city: 'Brasília', country: 'Brasil' },
    { city: 'Ottawa', country: 'Canadá' }
  ];
  
  let currentCityIndex = 0;
  
  const weatherContainer = document.getElementById('weather-container');
  const prevCityBtn = document.getElementById('prev-city-btn');
  const nextCityBtn = document.getElementById('next-city-btn');
  const currentCityElement = document.getElementById('current-city');
  const countryNameElement = document.getElementById('country-name');
  
  const fetchWeatherData = (city, country) => {
    const apiKey = 'af4b184f6c09ffe3a5e6193c820ec9c7';
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br`)
      .then(response => response.json())
      .then(data => {
        const weatherData = {
          temperature: convertKelvinToCelsius(data.main.temp),
          description: translateWeatherDescription(data.weather[0].description),
          icon: data.weather[0].icon
        };
  
        const weatherElement = document.createElement('div');
        weatherElement.innerHTML = `
          <h2>${city}</h2>
          <p>${weatherData.temperature} °C</p>
          <p>${weatherData.description}</p>
          <img style="width: 100%" src="http://openweathermap.org/img/w/${weatherData.icon}.png" alt="Weather Icon">
        `;
  
        weatherContainer.innerHTML = '';
        weatherContainer.appendChild(weatherElement);
  
        // Atualiza o nome do país na interface
        countryNameElement.textContent = country;
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };
  
  const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };
  
  const translateWeatherDescription = (description) => {
    const translations = {
      'clear sky': 'céu limpo',
      'few clouds': 'algumas nuvens',
      'scattered clouds': 'nuvens dispersas',
      'broken clouds': 'nuvens quebradas',
      'shower rain': 'chuva fraca',
      'rain': 'chuva',
      'thunderstorm': 'trovoada',
      'snow': 'neve',
      'mist': 'névoa'
    };
  
    return translations[description] || description;
  };
  
  const updateCity = (city, country) => {
    currentCityElement.textContent = country;
    fetchWeatherData(city, country);
  };
  
  prevCityBtn.addEventListener('click', () => {
    currentCityIndex = (currentCityIndex - 1 + cities.length) % cities.length;
    updateCity(cities[currentCityIndex].city, cities[currentCityIndex].country);
  });
  
  nextCityBtn.addEventListener('click', () => {
    currentCityIndex = (currentCityIndex + 1) % cities.length;
    updateCity(cities[currentCityIndex].city, cities[currentCityIndex].country);
  });
  
  // Exibe a previsão do tempo da primeira cidade na lista inicialmente
  updateCity(cities[currentCityIndex].city, cities[currentCityIndex].country);

  
  // API  do Maps
  // Sua chave de API do Google Maps
var apiKey = 'AIzaSyDcK1KNzGn-XO3a9O9H_I_MH03LRlEICRs';

// Código JavaScript para inicializar o mapa e usá-lo
function initMap() {
    var myLatLng = { lat: -23.550520, lng: -46.633308 }; // Coordenadas de exemplo

    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 12
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Marker de exemplo'
    });
}

// Carregar a API do Google Maps com a chave de API
function loadGoogleMapsAPI() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// Chame a função loadGoogleMapsAPI após o carregamento da página
document.addEventListener('DOMContentLoaded', loadGoogleMapsAPI);





  