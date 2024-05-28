var searchHistoryList = JSON.parse(localStorage.getItem('searchHistory'));
const searchHistoryEl = $('#searchHistory');
var dataHistoryArray = JSON.parse(localStorage.getItem('dataHistory'));

if(!dataHistoryArray) {
    dataHistoryArray = [];
}
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

function displaySearchHistory() {
    searchHistoryEl.empty();
    const dataHistoryArrayReversed = dataHistoryArray.toReversed();  
    for (var city of dataHistoryArrayReversed) {
        const searchCard = $('<button>').addClass('border m-2 bg-secondary text-center rounded-1').attr('type', 'button');
        searchCard.attr('id', city.city.name);
        searchCard.text(city.city.name);
        searchHistoryEl.append(searchCard);
    }
}

function displayForecastCard(city) {
    // everything is temporary for now until i start fetching from the api
    const mainCard = $('#mainCard');
    const mainCardCity = $('#cityName');
    const mainCardTemp = $('#temp');
    const mainCardWind = $('#wind');
    const mainCardHumidity = $('#humidity');
    const mainCardDate = $('#date');
    const mainCardEmoji = $('#emoji');

    mainCardCity.text(city.city.name);
    mainCardDate.text(city.list[0].dt_txt);
    mainCardEmoji.text('emoji');
    mainCardTemp.text(city.list[0].main.temp);
    mainCardWind.text(city.list[0].wind.speed);
    mainCardHumidity.text(city.list[0].main.humidity);

}

const cardArea = $('#forecastCards');

function generateCard(city) {
    // everything is temporary for now until i start fetching from the api
    const cardDate = $('<p>').addClass('fw-bold m-0');
    const cardEmoji = $('<p>').addClass('m-0');
    const cardTemp = $('<p>').addClass('m-0');
    const cardWind = $('<p>').addClass('m-0');
    const cardHumidity = $('<p>').addClass('m-0 mb-1');
    const cardSection = $('<section>').addClass('card col-2 bg-secondary rounded-0 text-white');

    cardDate.text(city.dt_txt);
    cardEmoji.text('emoji');
    cardTemp.text(city.main.temp);
    cardWind.text(city.wind.speed);
    cardHumidity.text(city.main.humidity);

    cardSection.append(cardDate, cardEmoji, cardTemp, cardWind, cardHumidity);
    cardArea.append(cardSection);
}

function display5DayForecastCard (citySearched) {
    var counter = 0;
    for (data of dataHistoryArray) {
        if(citySearched.toLowerCase() === data.city.name.toLowerCase()) {
            cardArea.empty();
            const tmp = dataHistoryArray.splice(counter, 1);
            dataHistoryArray.push(tmp[0]);
            displaySearchHistory();
            if(dayjs().diff(dayjs(data.list[0].dt_txt), 'd') < 1){
                localStorage.setItem('dataHistory', JSON.stringify(dataHistoryArray));
                displayForecastCard(data);
                for (let i = 0; i < 40; i++){
                    if(i%8 === 0) {
                        generateCard(data.list[i]);
                    }
                }
                return 0;
            } 
        }
        counter++;
    }
    fetchCity(citySearched)
}

function fetchCity (city) {  
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},CA&units=metric&appid=f33bf20affa316ba4d95961d5e07550c`)
        .then(function(response) {
            if(response.status === 200) {
                return response.json() 
                .then(function(data) {  
                    dataHistoryArray.push(data);
                    if(dataHistoryArray.length > 7) {
                        dataHistoryArray.shift();
                    }
                    localStorage.setItem('dataHistory', JSON.stringify(dataHistoryArray));
                    cardArea.empty();
                    displayForecastCard(data);
                    for (let i = 0; i < 40; i++){
                        if(i%8 === 0) {
                            generateCard(data.list[i]);
                        }
                    }
                    displaySearchHistory();
                })
            } else {
                alert('invalid city, please enter a canadian city. Make sure the spelling is correct.')
                return;
            }
        })
}

$(document).ready(function (){
    // displayForecastCard();
    displaySearchHistory();
    // $('.btn-search').click(saveSearchHistory);
    
    const srcButton = $('#btn-search1');
    const cityButton = $('#searchHistory');

    cityButton[0].addEventListener('click', function(event){
        if(event.target.type === 'button') {
            display5DayForecastCard(event.target.id);
        }
    })

    srcButton[0].addEventListener('click', function(event){
        event.preventDefault();
        const citySearched = $('#citySearch').val();
        if(citySearched === '') {
            alert('please enter city before pressing search');
            return;
        } 
       display5DayForecastCard(citySearched);
    });
});

