var searchHistoryList = JSON.parse(localStorage.getItem('searchHistory'));
const searchHistoryEl = $('#searchHistory');

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

function displayForecastCard() {
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

$(document).ready(function (){
    displayForecastCard();
    displaySearchHistory();
    $('.btn-search').click(saveSearchHistory);
});

