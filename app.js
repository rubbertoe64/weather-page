let APIKey = '9ee03f5c3db61861f36c5914aec1a590'
let inputValue = document.getElementById('inputValue')
const searchBtn = document.getElementById('searchBtn')
let cityHeader = document.getElementById('cityHeader')
let tempEl = document.getElementById('temp')
let windEl = document.getElementById('wind')
let humidEl = document.getElementById('humid')
let uvEl = document.getElementById('uv')
let fiveDayEl = document.getElementById('five-day-blocks')
let btn = document.createElement('button')
let divSearch = document.getElementById('addBtn')

let btnList = [];

function init(){
    btnList = localStorage.getItem("Cities") ? JSON.parse(localStorage.getItem("Cities")) : [];
    for(let btn of btnList){
        createButton(btn)
    }
}

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    let city = inputValue.value;
    getWeatherData(city);
    
    

})

function createButton(btnName){

    let btnEl = document.createElement("BUTTON");
    let btnText = document.createTextNode(btnName);
         btnEl.appendChild(btnText);
         btnEl.addEventListener("click", e => {
             e.preventDefault();
             console.log(btnText);
             getWeatherData(btnName)
         })
         divSearch.appendChild(btnEl);

         btnEl.style.width = "100%";
         btnEl.style.margin = "4px";
}


 function getWeatherData(city){
    
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&cnt=5" + "&appid=" + APIKey + "&units=imperial";
    let currentWeather;
    

    fetch(queryURL)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            currentWeather = data
            console.log("current",currentWeather)
            cityHeader.innerText = currentWeather.name + ' (' + new Date().toLocaleDateString() + ')'
            tempEl.innerText = currentWeather.main.temp + ' °F'
            windEl.innerText = currentWeather.wind.speed + " MPH"
            humidEl.innerText = currentWeather.main.humidity + "%"
            
            getUV(data.coord.lat,data.coord.lon)
            if(!btnList.includes(currentWeather.name)){
                btnList.push(currentWeather.name)
                localStorage.setItem("Cities", JSON.stringify(btnList))
                createButton(currentWeather.name);

            }




        })
        

 }

// grabs 5 day info as well as current days UV index
 function getUV(lat, lon){
    let queryUvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&exclude=minutely,hourly,alerts&units=imperial"
    let currentUV;
    fetch(queryUvURL)
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            currentUV = data.daily[0].uvi
            uvEl.innerText = currentUV
            console.log("uv", data);

            for(let i = 1; i < data.daily.length; i++){
                const currentDaily = data.daily[i]
                if(i < 6){
                    let currentChild = fiveDayEl.children[i - 1]

                    // setting Date
                    currentChild.children[0].children[0].innerText = new Date(currentDaily.dt * 1000).toLocaleDateString()

                    // setting emoji
                    currentChild.children[1].innerHTML = '<div class="d-flex align-items-center"> <img class="emoji" src="http://openweathermap.org/img/wn/' + currentDaily.weather[0].icon + '@2x.png">' + '<h3>' + currentDaily.weather[0].main + '</h3> </div>' 

                    // setting temperature
                    currentChild.children[2].children[0].innerText = currentDaily.temp.day + " °F"

                    // setting Wind
                    currentChild.children[3].children[0].innerText = currentDaily['wind_speed'] + " MPH"

                    // setting Humidity
                    currentChild.children[4].children[0].innerText = currentDaily.humidity + "%"

                }
                
                console.log('daily time', new Date(currentDaily.dt * 1000).toLocaleDateString());
            }
        })
     
 }

 


 init();
