var searchHistoryList = JSON.parse(localStorage.getItem('searchHistory'));
const searchHistoryEl = $('#searchHistory');

function saveSearchHistory() {
    const newCity = $('#citySearch').val();

    searchHistoryList.push(newCity);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));
}

function displaySearchHistory() {
    if(!searchHistoryList){
        searchHistoryList = [];
    }
    
    for (var search of searchHistoryList) {
        const searchCard = $('<div>').addClass('border m-2 bg-secondary text-center rounded-1');
        searchCard.text(search);
        searchHistoryEl.append(searchCard);
    }
}

displaySearchHistory();
$('.btn-search').click(saveSearchHistory);
