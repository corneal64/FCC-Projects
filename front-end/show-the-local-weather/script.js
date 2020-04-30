let weatherInfo = "";

$(document).ready(function () {
  if ("geolocation" in navigator) {
    getLocation();
  } else {
    $("body").html(
      "<h3 class='text-center'>Sorry, your browser does not support geolocation.</h3>"
    );
  }
});

function getLocation() {
  navigator.geolocation.getCurrentPosition(async function (position) {
    await fetch(
        `https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data) => data.json())
      .then((resp) => fetchWeatherInfo(resp[0].woeid))
      .catch((err) => console.log(err));
  });
}

async function fetchWeatherInfo(woeid) {
  await fetch(
      `https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/${woeid}/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((data) => data.json())
    .then((resp) => {
      weatherInfo = {
        city: resp.title,
        country: resp.parent.title,
        time: resp.time,
        sunrise: formatTime(resp.sun_rise),
        sunset: formatTime(resp.sun_set),
        weather_data: resp.consolidated_weather,
      };
    })
    .catch((err) => console.log(err));

  renderData(weatherInfo);
}

function waitForData() {
  if (weatherInfo) {
    $("#loader").hide();
    $(".container").fadeIn();
  } else {
    $("#loader").fadeIn();
  }
}

setInterval(waitForData, 1000);