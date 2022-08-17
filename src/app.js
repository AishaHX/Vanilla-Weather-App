let apiKey = "bf6121cece74278e35e51abbf2e34625";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=${apiKey}&units=metric`;


//Date and time

/*MY WAY , 
let date = new Date();
let days = ["sunday", "monday", "tuesday", "thursday", "friday", "saturday"];
let day = days[date.getDay()];
let hour = date.getHours();
let seconds = date.getMinutes();
let time = hour + ":" + seconds;
let currentDate = day + " " + time;
let dayTime = document.querySelector("#date");
dayTime.innerHTML = currentDate;*/

/* Matts way*/

function formatDate (timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours < 10 ){
        hours = `0${hours}`;
    } // end if



    let minutes = date.getMinutes();
    // to get the 0 minutes , ex 07, 05
    if(minutes < 10 ){
        minutes = `0${minutes}`;
    } // end if



    let days = ["sunday", "monday", "tuesday", "wednesday" , "thursday", "friday", "saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours} : ${minutes}`



}
 
// Temperature
function displayTemperature (response){
    //console.log(response.data.name); , findig out wich elemnt to target on the object
    console.log(response.data.wind);
    
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML =  Math.round( response.data.main.temp)
    ;

    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.name;

    let weatherDescription = document.querySelector("#description");
    weatherDescription.innerHTML = response.data.weather[0].description;

    let weatherHumidity = document.querySelector("#humidity");
    weatherHumidity.innerHTML = "Humidity : "+ response.data.main.humidity;

    let weatherWind = document.querySelector("#wind");
    weatherWind.innerHTML = "Wind : "+ Math.round(response.data.wind.speed);
    
    // Date and time
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    
    
}

axios.get(apiUrl).then(displayTemperature);
