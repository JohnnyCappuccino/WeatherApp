const url = "https://api.weatherapi.com/v1/current.json?key=cee5207d09d44c488b390448232012&q=";
const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#search");
const temp = document.querySelector("#temp");
const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const cityName = document.querySelector("#cityName");
const icon = document.querySelector("#icon");
const change = document.querySelector("#change");

let currentMesure = "Metric";
let currentCity = "";

let currentTemp = 0;
let feelsLikeTemp = 0;
let currentWindSpeed = 0;


searchButton.addEventListener("click",()=>{
  getInfo(cityInput.value);
  currentCity = cityInput.value;
  cityInput.value = "";
});

change.addEventListener("click" ,()=>{
  if(currentMesure === "Metric"){
    currentMesure = "Imperial";

    currentTemp = (9/5 * currentTemp) + 32;
    feelsLikeTemp = (9/5 * feelsLikeTemp) + 32;
    currentWindSpeed /= 1.6093440006147;

    currentTemp =  Math.round(currentTemp * 10) / 10;
    feelsLikeTemp = Math.round(feelsLikeTemp * 10) / 10;
    currentWindSpeed = Math.round(currentWindSpeed * 10) / 10;

    temp.innerHTML = currentTemp+"°F";
    feelsLike.innerHTML = feelsLikeTemp+"°F";
    windSpeed.innerHTML = currentWindSpeed+"mph";
    change.innerHTML = "to metric";
  }
  else if(currentMesure === "Imperial"){
    currentMesure = "Metric";

    currentTemp =  (currentTemp - 32) * 5/9;
    feelsLikeTemp = (feelsLikeTemp - 32) * 5/9;
    currentWindSpeed *= 1.6093440006147;

    currentTemp =  Math.round(currentTemp * 10) / 10;
    feelsLikeTemp = Math.round(feelsLikeTemp * 10) / 10;
    currentWindSpeed = Math.round(currentWindSpeed * 10) / 10;

    temp.innerHTML = currentTemp+"°C";
    feelsLike.innerHTML = feelsLikeTemp+"°C";
    windSpeed.innerHTML = currentWindSpeed+"km/h";
    change.innerHTML = "to imperial";
  }
});

async function getInfo(city){

  const res = await fetch(url+city, {mode: 'cors'})
  const data = await res.json();
  console.log(data);

  cityName.innerHTML = data.location.name + "/" + data.location.country;
  humidity.innerHTML = data.current.humidity+"%";
  if(currentMesure === "Metric"){
    temp.innerHTML = data.current.temp_c+"°C";
    feelsLike.innerHTML = data.current.feelslike_c+"°C";
    windSpeed.innerHTML = data.current.wind_kph+"km/h";

    currentTemp = data.current.temp_c;
    feelsLikeTemp = data.current.feelslike_c;
    currentWindSpeed = data.current.wind_kph;
  }
  else if(currentMesure === "Imperial"){
    temp.innerHTML = data.current.temp_f+"°F";
    feelsLike.innerHTML = data.current.feelslike_f+"°F";
    windSpeed.innerHTML = data.current.wind_mph+"mph";

    currentTemp = data.current.temp_f;
    feelsLikeTemp = data.current.feelslike_f;
    currentWindSpeed = data.current.wind_mph;
  }
  icon.setAttribute("src", data.current.condition.icon);
}