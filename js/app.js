const permit = $("#home");
const button = $('#btnStar');
const returnBtn = $('#return');
const containerWeek = $('#containerWeek');
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
};

let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function showPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log(long);
  (function getNews() {
    const weatherRequest = new XMLHttpRequest();
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var apiLinkDS = `https://api.darksky.net/forecast/d8357bb7c234554d5f2a50ed82099069/${lat},${long}`;
    console.log(weatherRequest);
    weatherRequest.open(`GET`, proxy + apiLinkDS);
    weatherRequest.onload = timeWeather;
    weatherRequest.onerror = handleError;
    weatherRequest.send();
  })();
};

function nextPage() {
  window.location.href = 'views/prediction.html';
};

function handleError() {
  console.log('Se ha presentado un error');
}

function timeWeather() {
    let img = $('.icon');
    let precipType =$('.predic');
    let contentWeek = $('#content-week');
    let temperature = $('.temperature');
    let wind = $('#wind');
    let humidity = $('#humidity');
    let uvIndex = $('#uvIndex');
    let pressure = $('#pressure');
    let summary = $('#summary');

    const data = JSON.parse(this.responseText);

    let today = data.currently;
    let week = data.daily.data;
    let convertH = today.humidity * 100;
    console.log(today.icon);

    img.attr('src', `assets/images/seasons/${today.icon}.PNG`);
    precipType.attr('src', `assets/images/seasons/${today.precipType}.PNG`);
    temperature.text(celsius(today.temperature) + '°');
    wind.text(today.windSpeed + 'm/s');
    humidity.text(convertH + '%');
    uvIndex.text(today.uvIndex);
    summary.text(today.summary);
    pressure.text(today.pressure + 'hPa');

    let array = week.slice(0, 7);
    array.forEach((element, index) => {
      let min = element.temperatureMin;
      let max = element.temperatureMax;
      let box = `<div class = "week col s5 z-depth-5">
    <img class="responsive-img" src="../assets/images/seasons/${element.icon}.PNG">
    <p>${days[index]}</p>
    <p class='predictWeek'>${celsius(min)}° Min</p>
    <p class='predictWeek'>${celsius(max)}° Max</p>
    </div>`;
      containerWeek.append(box);
    });
}

function celsius(e) {
  var num = (e-32)/1.8;
  var result = num.toFixed(2);
  return result;
};

function returnbtn() {
  window.location.href = '../index.html';
};

$('button').click(nextPage);
$('#return').click(returnbtn);

$(document).ready(getLocation);
