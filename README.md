# Weather-dashboard

## Description
This website uses https://openweathermap.org/ api to display the current weather and the weather for the next 5 days of whatever canadian city you've entered or clicked. The weather for today is displayed as the 'main card' which is the biggest card on the right side. The forecast for the next 5 days is displayed on 5 small cards underneath the main card. Your search history is displayed on the left in chronological order (top to bottom, last city searched at the top). These city names are also buttons that allow you to 'quick search' by simply pressing on them. [websiteSS](weather-dashboard-ss.jpeg).

## Usage 
Visit the webpage at https://erickrenaud05.github.io/weather-dashboard/. On the first load or if local storage was reset, the city of Ottawa will be displayed. From here you can enter Canadian cities in the search box. If nothing is entered, you will receive an alert telling you to enter a city before clicking enter. If the city you entered is not valid, you will be alerted to enter a valid Canadian city. Once you've entered a valid Canadian city, the weather and forecast will be displayed as cards on the right and your search will be saved to localStorage. The entire api call response is saved to localStorage in order to be more efficient, this simply means if you click or search for a city you've searched for within the last day, instead of fetching the data again, it simply uses what is stored on the localStorage. If it has been more than a day, it will fetch the data even though the city is in localStorage. This is to make sure that the data you receive is up to date. You can have up to 7 city in your history at a time. Any search above 7 will remove the city at the bottom of the history.

## Installation
N/A

## Credits
Credit to UofT coding bootcamp for the mockup.

## License
Please refer to the license in the repo.

