var todayHours = document.getElementById('hour');
var todayDay = document.getElementById('day');
var todayIcon = document.getElementById('today-icon');
var todayDegrees = document.getElementById('today-degrees');
var todayDescription = document.getElementById('today-description');
var todayRainProb = document.getElementById('today-rain__prob');
var todayMiniIcon = document.getElementById('cloud-icon');

var todayHumidity = document.getElementById('humidity');
var todayVisibility = document.getElementById('visibility');
var todaySunrise = document.getElementById('sunrise');
var todayWind = document.getElementById('wind');
var todayUv = document.getElementById('uv');
var todayAir = document.getElementById('air');
var degreesTemp = document.getElementById('week');
var weekIcon = document.getElementsByClassName('day-img');
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

//var API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
var API_KEY = '21e37b818a4f47199b124bc687a8fbdd';

getCurrentWeatherData('https://api.weatherbit.io/v2.0/current?city=Rosario,AR&key='+API_KEY);
getWeatherData('https://api.weatherbit.io/v2.0/forecast/daily?city=Rosario,AR&days=8&key='+API_KEY);
function getWeatherData (url) {
       fetch(url)
        .then(function (response) {
            return  response.json();
         }).then(function (data) {
            showWeekWeather(data);
            console.log(data);
         }).catch(function (error) {
            console.log(error);
         })
}

function getCurrentWeatherData (url) {
       fetch(url)
        .then(function (response) {
            return  response.json();
         }).then(function (data) {
            showCurrentWeather(data);
            console.log(data);
         }).catch(function (error) {
            console.log(error);
         })
}

function showWeekWeather(data) {
    let otherDayForcast = ''
    data.data.shift();
    data.data.forEach((day) => {
        otherDayForcast += `
            <li class="day">
                <img class="day-img" src="icons/${day.weather.icon}.png">
                <div class="day-degrees">
                    <h3 class="max">${day.max_temp}</h3>
                    <h3 class="min">${day.min_temp}</h3>
                </div>
            </li>
        `
        console.log(day.datetime)
    })
    
    degreesTemp.innerHTML = otherDayForcast;
}

function showCurrentWeather(data) {
    var {temp, rh, sunrise, sunset, uv, vis, wind_spd, aqi, precip} = data.data[0];
    var {description} = data.data[0].weather;
    todayDegrees.innerHTML = temp + '°C';
    todayDescription.innerHTML = description;
    todayRainProb.innerHTML = 'Rain - ' + precip+'%';
    todayHumidity.innerHTML = rh  + '%';
    todayVisibility.innerHTML = vis + 'km';
    todaySunrise.innerHTML = '<img id="icon-sunrise" src="img/arrowup.PNG"> '+ sunrise +'AM.' + '<img id="icon-sunset" src="img/arrowdown.PNG"> '+ sunset+'PM.';
    todayWind.innerHTML = wind_spd + '<span>m/s</span>';
    todayAir.innerHTML = aqi;
    todayUv.innerHTML = uv;
    changeIcon(description);
}

function changeIcon(m){
    if(m.includes('louds')) {
        todayIcon.className = 'clouds';
        todayMiniIcon.className = 'cloudy';
    }
    else if (m.includes('lear')) {
        todayIcon.className = 'clear';
        todayMiniIcon.className = 'sunny';
    }
    else if (m.includes('ain')) {
        todayIcon.className = 'rain';
        todayMiniIcon.className = 'raining';
    }
    else {
        todayIcon.className = 'cloud-rain-sun';
        todayMiniIcon.className = 'cloud_rain_sun';
    }
}


setInterval(() => {
    const time = new Date();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM';
    todayHours.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    todayDay.innerHTML = days[day] + ', ';

}, 1000);

