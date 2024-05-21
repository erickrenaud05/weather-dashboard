var searchHistoryList = JSON.parse(localStorage.getItem('searchHistory'));
const searchHistoryEl = $('#searchHistory');

function saveSearchHistory() {
    if(!searchHistoryList){
        searchHistoryList = [];
    }

    const newCity = $('#citySearch').val();

    searchHistoryList.push(newCity);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));
}

$('.btn-search').click(saveSearchHistory);
