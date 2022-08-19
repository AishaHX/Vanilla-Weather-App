/**let apiKey = "bf6121cece74278e35e51abbf2e34625";
let city = "lisbon";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
*/

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
    console.log(response.data);

    celsiusTemperature = response.data.main.temp;

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML =  Math.round( celsiusTemperature)
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

    // changing the img icon attribute
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    //changing alt to description
    iconElement.setAttribute("alt" ,response.data.weather[0].description);

    
    
    
}
// function for Search getting api and displaying the temperature
function search (city){
  let apiKey = "bf6121cece74278e35e51abbf2e34625";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

 

}


// function handling the submit btn
function hadleSubmit (event){
    event.preventDefault();
    let cityElement = document.querySelector("#city-input");
    //calling the search function and passing with typed value 
    search(cityElement.value);


  
    


} //end fucn search





function displayFahrenheitTemperature (event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);


}



function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");


    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
 ;

  // Global variabels

  let form = document.querySelector("#search-form");
  form.addEventListener("submit" ,hadleSubmit);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

search("stockholm");
