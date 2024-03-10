const weather = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityInput");
const tempdis = document.querySelector(".tempdis");
const apiKey = "bc5b47fbe68029cde715f9404ca517ba";

weather.addEventListener("submit", async (event) => {
  tempdis.innerHTML = "";
  // console.log("button clicked " + cityinput.value);
  event.preventDefault();
  const city = cityinput.value;
  if(city==''){
    alert("please enter city name");
  }
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      // console.log(weatherData);
      displayinfo(weatherData);
    } catch (error) {
      // console.log("error");
      displayError(error);
      cityinput.value = "";
    }
  } else {
    displayError("city name not found !!!!!... ");
    // console.log("the  function call");
  }
});

async function getWeatherData(city) {
  const apiurl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiurl);
  // console.log(response);
  if (!response.ok) {
    throw new Error("could not fetch weather data");
  }
  return await response.json();
}

async function displayinfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
console.log("Description : "+description);
  const cityDisplaye = document.createElement("h1");
  cityDisplaye.classList.add("cityDisplay");
  cityDisplaye.textContent = city;

  const tempyDisplaye = document.createElement("p");
  tempyDisplaye.classList.add("tempDisplay");
  tempyDisplaye.textContent = "Temp : " + `${(temp-273.15).toFixed(1)}°C`;

  const humiditye = document.createElement("p");
  humiditye.classList.add("humidity");
  humiditye.textContent = "humidity : " + humidity;

  const descriptione = document.createElement("p");
  descriptione.classList.add("description");
  descriptione.textContent = "description : " + description;

  tempdis.appendChild(cityDisplaye);
  tempdis.appendChild(tempyDisplaye);
  tempdis.appendChild(humiditye);
  tempdis.appendChild(descriptione)
}

async function displayError(message) {
  // console.log("the displayError function call");
  const error = document.createElement("p");
  error.classList.add("error");
  error.textContent = message;
  tempdis.appendChild(error);
}
