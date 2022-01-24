let APIKey = '9ee03f5c3db61861f36c5914aec1a590'
const searchBtn = document.getElementById('searchBtn')
let tempText = document.getElementById('temp')
let cityHeader = document.getElementById('cityHeader')
searchBtn.addEventListener('click', e => {
    e.preventDefault();
    getWeatherData();
    get5DayWeatherData();
})


 function getWeatherData(){
    let city = "San+Diego";
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&cnt=5" + "&appid=" + APIKey + "&units=imperial";
    let currentWeather;
    

    fetch(queryURL)
        .then(function(resp){
            return resp.json();
        })
        .then(function(data){
            currentWeather = data
            console.log(currentWeather)
            cityHeader.innerText = currentWeather.name + ' (' + new Date().toLocaleDateString() + ')'
            tempText.innerText = currentWeather.main.temp


        })

 }

 function get5DayWeatherData(){
    
     let city = "San+Diego"
     let query5DayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5" + "&appid=" + APIKey
     let current5DayWeather;

     fetch(query5DayURL)
        .then(function(resp){
            return resp.json();
        })
        .then(function(data){
            current5DayWeather = data;
            console.log(current5DayWeather)
            

        })
 }

 
