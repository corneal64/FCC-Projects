function renderData(data) {
    let imgUrl = `https://www.metaweather.com/static/img/weather/${data.weather_data[0].weather_state_abbr}.svg`;

    $("#location").text(`${data.city}, ${data.country}`);
    $("#todaysDate").text(`${new Date(data.time).toLocaleDateString()}`);

    $("#temperature").html(
        `${Math.round(data.weather_data[0].the_temp)}&#x2103;`
    );
    $("#pic").html(`<img src=${imgUrl} />`);

    $("#sunrise").html(`<i class="fas fa-sun fa-2x"> ${data.sunrise}</i>`);
    $("#sunset").html(`<i class="fas fa-moon fa-2x"> ${data.sunset}</i>`);

    $("#minTemp").html(
        `<i class="fas fa-thermometer-quarter fa-2x"> ${Math.round(
        data.weather_data[0].min_temp
      )}&#x2103;</i>`
    );
    $("#maxTemp").html(
        `<i class="fas fa-thermometer-three-quarters fa-2x"> ${Math.round(
        data.weather_data[0].max_temp
      )}&#x2103;</i>`
    );

    $("#humidity").html(
        `<i class="fas fa-tint fa-2x"> ${Math.round(
        data.weather_data[0].humidity
      )}%</i>`
    );
    $("#windSpeed").html(
        `<i class="fas fa-wind fa-2x"> ${Math.round(
        data.weather_data[0].wind_speed
      )} mph</i>`
    );

    const moreWeatherInfo = fetchMoreWeatherInfo(weatherInfo);
    $("#tableBody").append(`${moreWeatherInfo.join("")}`);
}

$("#showMore").click(() => {
    $("#moreInfo").removeClass("animated fadeOut");
    $("#moreInfo").addClass("animated fadeIn");
    $("#moreInfo").slideToggle(500);
    $("#showMore").hide();
    $("#showLess").show();
    $(".footer").slideToggle();
});

$("#showLess").click(() => {
    $("#moreInfo").removeClass("animated fadeIn");
    $("#moreInfo").addClass("animated fadeOut");
    $("#moreInfo").slideToggle(700);
    $("#showLess").hide();
    $("#showMore").show();
    $(".footer").slideToggle();
});

function fetchMoreWeatherInfo(weatherInfo) {
    let moreInfo = [];

    for (i = 1; i < 6; i++) {
        let info = `
      <tr>
      <td class="text-left align-middle weekday">${getWeekday(
        weatherInfo.weather_data[i].applicable_date
      )}
      </td>
      <td class="text-right align-middle temp">${Math.round(
        weatherInfo.weather_data[i].the_temp
      )}&#x2103;
      </td>
      <td class="text-right align-middle weatherIcon"><img src='${`https://www.metaweather.com/static/img/weather/${weatherInfo.weather_data[i].weather_state_abbr}.svg'`} /></td></tr>`;

        moreInfo.push(info);
    }
    return moreInfo;
}

function formatTime(time) {
    let timeStr = new Date(time).toLocaleTimeString();
    let newTime = [];

    newTime.push(timeStr.split(":")[0]);
    newTime.push(timeStr.split(":")[1]);

    return `${newTime.join(":")} ${timeStr
      .split(":")[2]
      .split(" ")
      .splice(1, 1)}`;
}

function getWeekday(date) {
    const d = new Date(date);
    const weekday = new Array(7);

    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const day = weekday[d.getDay()];
    return day;
}