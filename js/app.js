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
var searchCity = document.querySelector('#city');

var API_KEY = '21e37b818a4f47199b124bc687a8fbdd';

searchCity.focus();

searchCity.addEventListener('input', function(event) {
    search(event.target.value);
    searchCurrent(event.target.value);
});

var debounce = function(fn){
    var timeoutId;
    return function (...args) {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(function() {
           fn.apply(null, args);
        }, 500);
    };
};

var search = debounce(function getWeekWeatherData (locationWeek) {
    if(!locationWeek) {
        locationWeek = 'Rosario,AR';
    }
    fetch('https://api.weatherbit.io/v2.0/forecast/daily?city='+locationWeek+'&days=8&key='+API_KEY)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        showWeekWeather(data);
        console.log(data);
    }).catch(function (error) {
         console.log(error);
    })
});

var searchCurrent = debounce(function getCurrentWeatherData (locationCurrent) {
    if(!locationCurrent) {
        locationCurrent = 'Rosario,AR';
    }
    fetch('https://api.weatherbit.io/v2.0/current?city='+locationCurrent+'&key='+API_KEY)
    .then(function (response) {
        return  response.json();
    }).then(function (data) {
        showCurrentWeather(data);
        console.log(data);
    }).catch(function (error) {
        console.log(error);
    })
});

function showWeekWeather(data) {
    var today = new Date(data.data[1].datetime).toString();
    var otherDayForcast = '';
    var title = [];
    var counter = 1;
    var sunrise_ts = data.data[0].sunrise_ts;
    var sunset_ts = data.data[0].sunset_ts;
    for(i=1; i<data.data.length; i++){
        var titles = new Date(data.data[i].datetime).toString();
        title[i] = titles.substring(0,3);
    }
    var newtitle = title[1];
    todaySunrise.innerHTML = '<img id="icon-sunrise" src="img/arrowup.PNG"> '+ TimeFormat(sunrise_ts) +'AM.' + '<img id="icon-sunset" src="img/arrowdown.PNG"> '+ TimeFormat(sunset_ts)+'PM.';
    GetToday(today);
    title.splice(1,1);
    title.push(newtitle);
    data.data.shift();
    data.data.forEach(function(day) { 
        otherDayForcast += '<li class="day">' 
        otherDayForcast += '<p class="day-title">'+title[counter]+'</p>'
        otherDayForcast += '<img class="day-img" src="icons/'+day.weather.icon+'.png">'
        otherDayForcast += '<div class="day-degrees">'
        otherDayForcast += '<h3 class="max">'+day.max_temp+'°</h3>'
        otherDayForcast += '<h3 class="max">'+day.min_temp+'°</h3>'
        otherDayForcast += '</div>'
        otherDayForcast += '</li>'
        counter++; 
    })
    degreesTemp.innerHTML = otherDayForcast;
}

function showCurrentWeather(data) {
    var wheatherElement = {
        temp: '',
        rh: '',
        uv: '',
        vis: '',
        wind_spd: '',
        aqi: '',
        precip: ''
    }
    var description = data.data[0].weather.description;
    wheatherElement.temp = data.data[0].temp;
    wheatherElement.rh = data.data[0].rh;
    wheatherElement.uv = data.data[0].uv;
    wheatherElement.vis = data.data[0].vis;
    wheatherElement.wind_spd = data.data[0].wind_spd;
    wheatherElement.aqi = data.data[0].aqi;
    wheatherElement.precip = data.data[0].precip;
    todayDegrees.innerHTML = wheatherElement.temp + '°C';
    todayDescription.innerHTML = description;
    todayRainProb.innerHTML = 'Rain - ' + wheatherElement.precip+'%';
    todayHumidity.innerHTML = wheatherElement.rh  + '%';
    todayVisibility.innerHTML = wheatherElement.vis + 'km';
    todayWind.innerHTML = wheatherElement.wind_spd + '<span>m/s</span>';
    todayAir.innerHTML = wheatherElement.aqi;
    todayUv.innerHTML = wheatherElement.uv;
    changeIcon(description);
}

function TimeFormat(num) {
    var date = new Date(num * 1000);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    return  hours + ':' + minutes.substr(-2);
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

function GetToday(today){
    if(today.substring(0,3) == 'Fri' || today.substring(0,3) == 'Mon' || today.substring(0,3) == 'Sun') {
       todayDay.innerHTML = today.substring(0,3) + 'day, ';
    }
    else if(today.substring(0,3) == 'Wed'){
        todayDay.innerHTML = today.substring(0,3) + 'nesday, ';
    }
    else if(today.substring(0,3) == 'Thu'){
        todayDay.innerHTML = today.substring(0,3) + 'rsday, ';
    }
    else if(today.substring(0,3) == 'Sat'){
        todayDay.innerHTML = today.substring(0,3) + 'urday, ';
    }
    else {
        todayDay.innerHTML = today.substring(0,3) + 'sday, ';
    }
}

setInterval(function() {
    var time = new Date();
    var hour = time.getHours();
    var hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    var minutes = time.getMinutes();
    var ampm = hour >=12 ? 'PM' : 'AM';
    todayHours.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + '<span id="am-pm">'+ampm+'</span>'
}, 1000);

var init = function() {
    search('Rosario,AR');
    searchCurrent('Rosario,AR');
}

window.onload = init;

