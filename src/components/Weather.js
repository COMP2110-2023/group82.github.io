import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


let check = '';

class WeatherApp extends LitElement {
    static properties = {
      header: { type: String },
      temperature: {type: Number},
      lat: {type: Number},
      long: {type: Number},
      WhatDay: {type: String},
      is_day: {Number},
      forecast: {type: String},
      selectedItem: {type: String},
      check: {type: String},
      weathercode: {type: Number},
       }

      
    static styles = css`
      :host {
          display: block;
          width: 250px;
          height: 250px;
          background-size: cover;
          background-repeat: no-repeat;
          font-family: Verdana;
          border: solid black 1px;
          margin: 10px, 0px, 10px, 0px;
          border-radius: 30px;
      }

      p{ 
      font-style: italic;
      font-weight: bold;
      font-size: small;
      margin: 4px;
      }

    h2{
      margin: 10px;
    }

    h3{
      margin: 10px;
    }

      #image{
        width: 120px;
        height: 70px;
        background-position: center;
        mix-blend-mode: screen;
        opacity: 0.9;
      }

      .dropbox{
        margin: 0px;
        padding: 3px 25px;
        background-color: #d7d9d7;
        color: #727B76;
        border-radius: 20px;
        border 2px solid #646E68;
        font-family: verdana;
        font-size: medium;
        font-weight: bold;
        opacity: 0.5;
         text-align: center;
        cursor: grab;
        -webkit-appearance: none; 
      }

      .droplist{
        text-align: left;
        cursor: grab;
      }`;

    constructor() {
      super();
      this.header = 'Widget';
      this.temperature = null;
      this.WhatDay = null;
      this.is_day = null;
      this.forecast = null;
      this.selectedItem = null;
      this.image = null;
      this.weathercode = null;
      this._fetch()
    }

//function to update location when user chooses different element from drop down list
    _updateLocation (e) {
    this.selectedItem = e.target.value;
    check = this.selectedItem;
    urlLocator();
    this._fetch()
    }

    //fetches the appropriate url for the api and assigns variables. 
_fetch () {
  this.temperature = undefined
  fetch(urlLocator())
  .then(response => response.json())
  .then(data => {
    this.temperature = data.current_weather.temperature;
    const is_day = data.current_weather.is_day;
    let weathercode = data.current_weather.weathercode;
    
    //checks to see if it is day time or night time ('1 or '0') and style accordingly 
    if(is_day === 0){
      this.WhatDay = "It is currently night time";
      this.style = 'color: white;'
      this.style.backgroundImage = 'url("../group82.github.io/src/Weather_Images/night.jpg")';
    }
    if(is_day === 1) {
      this.WhatDay = "It is currently day time";
      this.style = 'color: black;'
      this.style.backgroundImage = 'url("../group82.github.io/src/Weather_Images/day.jpg")';
    }

//this also checks the weather code in the api and also styles accordingly (Weather Codes explained further in Readme.md)
    if ((weathercode === 0 && is_day === 1)){
      this.forecast = "Clear Sky";
      this.image = "../group82.github.io/src/Weather_Images/Dayclear.jpg";
    }
else if((weathercode === 0 && is_day === 0)){
      this.forecast = "Clear Sky";
      this.image = "../group82.github.io/src/Weather_Images/Nightclear.jpg";
    }
    else if((weathercode === 1 && is_day === 1) || (weathercode === 2 && is_day === 1) || (weathercode === 3 && is_day === 1)){
      this.forecast = "Mainly Clear, Partly Cloudy and Overcast";
      this.image = "../group82.github.io/src/Weather_Images/Daycloudy.jpg";
    }
    else if((weathercode === 1 && is_day === 0) || (weathercode === 2 && is_day === 0) || (weathercode === 3 && is_day === 0)){
      this.forecast = "Mainly Clear, Partly Cloudy and Overcast";
      this.image = "../group82.github.io/src/Weather_Images/Nightcloudy.jpg";
      console.log("night time");
    }
    else if((weathercode === 45) || (weathercode === 48)){
      this.forecast = "Foggy";
      this.image = "../group82.github.io/src/Weather_Images/Foggy.jpg";
    }
    else if((weathercode === 51) || (weathercode === 53) || (weathercode === 55)){
      this.forecast = "Slight to Moderate Drizzle";
      this.image = "../group82.github.io/src/Weather_Images/rainShowers.jpg";
    }
    else if((weathercode === 56) || (weathercode === 57)){
      this.forecast = "Freezing Drizzle";
      this.image = "../group82.github.io/src/Weather_Images/rainShowers.jpg";
    }
    else if((weathercode === 61) || (weathercode === 63) || (weathercode === 65)){
      this.forecast = "Raining";
      this.image = "../group82.github.io/src/Weather_Images/Rain.jpg";
    }
    else if((weathercode === 66) || (weathercode === 67)){
      this.forecast = "Freezing Rain";
      this.image = "../group82.github.io/src/Weather_Images/Rain.jpg";
    }
    else if((weathercode === 71) ||(weathercode === 73) || (weathercode ===75)){
      this.forecast = "Snowing";
      this.image = "../group82.github.io/src/Weather_Images/Snow.jpg";
    }
    else if(weathercode === 77){
      this.forcast = "Snow Grains";
      this.image = "../group82.github.io/src/Weather_Images/Snow.jpg";
    }
    else if((weathercode === 80) || (weathercode ===81) || (weathercode === 82)){
      this.forecast = "Rain Showers";
      this.image = "../group82.github.io/src/Weather_Images/rainShowers.jpg";
    }
    else if((weathercode === 85) || (weathercode === 86)){
      this.forecast = "Snow Showers";
      this.image = "../group82.github.io/src/Weather_Images/snowShowers.jpg";
    }
    else if(weathercode === 95){
      this.forecast = "Thunderstorms";
      this.image = "../group82.github.io/src/Weather_Images/Thunder.jpg";
    }
    else if((weathercode === 96) ||(weathercode === 99)){
      this.forecast = "Thunderstorms and Hail";
      this.image = "../group82.github.io/src/Weather_Images/ThunderRain.jpg";
    }
  })


}

//this is the drop down list..assigned to a function for ease of access
    formTemplate(){
      return html `
      <form>
      <select @change=${this._updateLocation} name ="Location" class = "dropbox"> 
        <option value = "Sydney" class = "droplist"  selected>Sydney</option>
        <option value = "London"class = "droplist" >London</option>
        <option value = "New York"class = "droplist">New York</option>
        <option value = "Tokyo"class = "droplist" >Tokyo</option>
        <option value = "Auckland"class = "droplist">Auckland</option>
        <option value = "Your Location" class = "droplist">Your Location</option>
      </select>
  </form>
      `
    }

//renders the page with the relevant content when loaded

    render() {
      let show; 
      if (this.temperature){
      show =  html`<div>
          <h3>${this.header}</h3>
          <h2>${this.temperature}&deg;c </h2>
          <img src = ${this.image} id = 'image'> </img>
          <p> The current forecast is ${this.forecast}</p>
    </div>`

}

//if there is still a state of render, and he widget has not loaded, the following loading 
//status then occurs, where the show variable turns into a different element.

else {show =  html `<br><br><h3>Please wait, whilst we load the weather for ${check}`}
return  html `
  ${show}
  ${this.formTemplate()}`
    }
  }  
{ 
}

//this function locates the user selection on the drop down list and changes the api url accordingly

function urlLocator  () {

  let url = "https://api.open-meteo.com/v1/forecast?latitude=-33.865143&longitude=151.209900&current_weather=true";

if(check === "London"){
  url = "https://api.open-meteo.com/v1/forecast?latitude=51.509865&longitude=-0.118092&current_weather=true";
}
else if(check === "Sydney"){
  url = "https://api.open-meteo.com/v1/forecast?latitude=-33.865143&longitude=151.209900&current_weather=true";
}
else if(check === "New York"){
  url = "https://api.open-meteo.com/v1/forecast?latitude=40.730610&longitude=-73.935242&current_weather=true";
}
else if((check === "Tokyo")){
  url = "https://api.open-meteo.com/v1/forecast?latitude=35.652832&longitude=139.839478&current_weather=true";
}
else if(check === "Auckland"){
  url = "https://api.open-meteo.com/v1/forecast?latitude=-36.848461&longitude=174.763336&current_weather=true";
}

//this last statement occurs if the user selects 'Your Location'. If this occurs geolocation is used
//this gets a way to return the users latitude and longitude, then edits this data into the url address
else if((check === "Your Location")){

navigator.geolocation.getCurrentPosition(function(Yourlocation) {
     lat = Yourlocation.coords.latitude;
     long = Yourlocation.coords.longitude;
     url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
  });
}
return url;    
}


  customElements.define('widget-weather', WeatherApp);

