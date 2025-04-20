

let myInput = document.getElementById('myInput');
let myBtn = document.getElementById('myBtn');
let rowData = document.getElementById('rowData');
let myTitle = document.getElementById('myTitle');


let today = new Date();
let curentHour = today.getHours();
let monthName = today.toLocaleDateString('en-US', { month: 'long' }); 
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let curentDay = days[today.getDay()];
let nextDay = days[(today.getDay() + 1) %7];
let afterNextDay = days[(today.getDay() + 2)% 7] ;


myInput.addEventListener('input' , function(){
  grtWeather(myInput.value)
})

 async function grtWeather(city){
let response = await fetch(` http://api.weatherapi.com/v1/forecast.json?key=f81a6ac992fd4aa0928232731251904&q=${city}&days=3`);
let data = await response.json();
console.log(data);
display(data)
}
grtWeather()
function display(term){
let cartona= `

          <div class=" col col-4" data-aos="zoom-out-right ">
  <div class="card border-dark mb-3 mt-5 bottom-0">
  <div class="card-header">${curentDay}</div>
  <div class="card-body">
  <div class="">${term.location.name}</div>
  <h6 id="myTitle"></h6>
  <h1 class="card-title myh1">${term.current.temp_c}</h1>
  <img  src="http:${term?.current?.condition?.icon}"/>
  <p class="card-text text-primary">${term?.current?.condition?.text}</p>
  <div class=" card-footer ">
  <div class=" d-flex gap-4">
  <div><img src="../photo/icon-umberella.png"> <span>20%</span></div>
  <div><img src="../photo/icon-wind.png"> <span>20%</span></div>
  <div><img src="../photo/icon-compass.png"> <span>20%</span></div>
  </div>
  </div>
  </div>
  </div>
</div>


          <div class=" col col-4  ">
          <div class="card border-dark mb-3 mt-5 bottom-0 text-center ooo">
          <div class="card-header">${nextDay}</div>
          <div class="card-body">
          <h6 id="myTitle"></h6>
          <img  src="http:${term.forecast.forecastday[1].day.condition.icon }"/>
          <h1 class="card-title">${term.forecast.forecastday[1].day.maxtemp_c}</h1>
          <small class="card-title d-block">${term.forecast.forecastday[1].day.mintemp_c}</small>
          <small class="card-text text-primary">${term.forecast.forecastday[1].hour[curentHour].condition.text}</small>
          </div>
          </div>
          </div>


          <div class=" col col-4 ">
          <div class="card border-dark mb-3 mt-5 bottom-0 text-center">
          <div class="card-header">${afterNextDay}</div>
          <div class="card-body">
          <h6 id="myTitle"></h6>
          <img  src="http:${term.forecast.forecastday[2].day.condition.icon }"/>
          <h1 class="card-title">${term.forecast.forecastday[2].day.maxtemp_c}</h1>
          <small class="card-title d-block">${term.forecast.forecastday[2].day.mintemp_c}</small>
          <small class="card-text text-primary">${term.forecast.forecastday[2].hour[curentHour].condition.text}</small>
          </div>
          </div>
          </div>

        `
                document.getElementById('rowData').innerHTML= cartona ; 
 
              
            }




if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position){
      let latitude   =  position.coords.latitude;
      let longitude  = position.coords.longitude;
      let cityRequest =`https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=0a011d5ef52c4bd6842968a39c1ec048`;
      async function getLocation(params){
          let resopn = await fetch(params);
          let data = await resopn.json();
          let city = data.results[0].components.country;
          grtWeather(city)
      }
      getLocation(cityRequest);
  })
}