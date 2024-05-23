var searchHistoryList = JSON.parse(localStorage.getItem('searchHistory'));
const searchHistoryEl = $('#searchHistory');

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=f33bf20affa316ba4d95961d5e07550c')
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//response.lat
//response.lon

//response.list[0-5].dt for unix time
//response.list[0-5].main.(temp, feels_like, temp_min, temp_max, pressure, sea_level, grnd_level, humidity, temp_kf)
//response.list[0-5].weather.(id, main, description, icon)
//response.list[0-5].clouds.(all)
//response.list[0-5].wind.(speed, deg, gust)
//response.list[0-5].visibility
//response.list[0-5].pop
//response.list[0-5].rain.3h
//response.list[0-5].sys.pod
//response.list[0-5].dt_txt for formatted date


function saveSearchHistory() {
    const newCity = $('#citySearch').val();
    // later this will return not only if null but if city is invalid
    if (!newCity) {
        return;
    }
    searchHistoryList.push(newCity);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));
}

function displaySearchHistory() {
    if(!searchHistoryList){
        searchHistoryList = [];
    }
    
    for (var search of searchHistoryList) {
        const searchCard = $('<button>').addClass('border m-2 bg-secondary text-center rounded-1').attr('type', 'button');
        searchCard.attr('id', search);
        searchCard.text(search);
        searchHistoryEl.append(searchCard);
    }
}

function displayForecastCard(cityData) {
    // everything is temporary for now until i start fetching from the api
    const mainCard = $('#mainCard');
    const mainCardCity = $('#cityName');
    const mainCardTemp = $('#temp');
    const mainCardWind = $('#wind');
    const mainCardHumidity = $('#humidity');

    const city = 'alexandria';
    const temp = '72';
    const wind = 'lots';
    const humidity = '73';

    mainCardCity.text(city);
    mainCardTemp.text(temp);
    mainCardWind.text(wind);
    mainCardHumidity.text(humidity);

    const forecastCardArea = $('#forecastCards');

    for (let i = 0; i < 5; i++) {
        forecastCardArea.append(generateCard())
    }
}

function generateCard() {
    // everything is temporary for now until i start fetching from the api
    const cardDate = $('<p>').addClass('fw-bold m-0');
    const cardEmoji = $('<p>').addClass('m-0');
    const cardTemp = $('<p>').addClass('m-0');
    const cardWind = $('<p>').addClass('m-0');
    const cardHumidity = $('<p>').addClass('m-0 mb-1');
    const cardSection = $('<section>').addClass('card col-2 bg-secondary rounded-0 text-white');

    cardDate.text('05/06/2024');
    cardEmoji.text('sun');
    cardTemp.text('56');
    cardWind.text('45');
    cardHumidity.text('78');

    cardSection.append(cardDate, cardEmoji, cardTemp, cardWind, cardHumidity);

    return cardSection;
}

function fetchCity (event) {
    // fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=f33bf20affa316ba4d95961d5e07550c')
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         return data
//     })
}

function geoCodeCity (city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},CA&appid=f33bf20affa316ba4d95961d5e07550c`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if(data.length === 0){
                console.log('superInvalid');
                return;
            }
            else if(data[0].name === 'Fort St. James') {
                console.log('invalid');
                return;
            }

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=f33bf20affa316ba4d95961d5e07550c`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
            })
        })
           
}

$(document).ready(function (){
    // displayForecastCard();
    displaySearchHistory();
    // $('.btn-search').click(saveSearchHistory);
    
    const srcButton = $('#btn-search1');
    srcButton[0].addEventListener('click', function(event){
        event.preventDefault();
        const citySearched = $('#citySearch').val();
        geoCodeCity(citySearched);
    });
});

