const APIKey = '9ee03f5c3db61861f36c5914aec1a590'
const searchBtn = document.getElementById('searchBtn')

searchBtn.addEventListener('click', e => {
    e.preventDefault()
    getWeatherData()
})


 function getWeatherData(){
    let city = "San+Diego";
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    let currentWeather;

    fetch(queryURL)
        .then(function(resp){
            return resp.json();
        })
        .then(function(data){
            currentWeather = data
            console.log(currentWeather)



        })

 }

 
