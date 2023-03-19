//weather api url plus search function for city
    let weather = {
        apiKey: "c049ffc93d7825412d943b36b0223607",
        fetchWeather: function (city) {
          fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
              city +
              "&units=imperial&appid=" +
              this.apiKey)
              //alert if no location found with alert
            .then((response) => {
              if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");}
              return response.json();})
            .then((data) => this.displayWeather(data));},
        displayWeather: function (data) {
          const { name } = data;
          const { icon, description } = data.weather[0];
          const { temp, humidity } = data.main;
          const { speed } = data.wind;
          document.querySelector(".city").innerText = "Weather in " + name;
          document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
          document.querySelector(".description").innerText = description;
          document.querySelector(".temp").innerText = Math.round(temp) + "°F";
          document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
          document.querySelector(".wind").innerText =
            "Wind: " + Math.round(speed) + " mph";
          document.querySelector(".weather").classList.remove("loading");},
        search: function () {
          this.fetchWeather(document.querySelector(".search-bar").value);},
      };
    //click function for searching location
      document.querySelector(".search button").addEventListener("click", function () {
        weather.search();}
        );
    //enter function for searching
      document
        .querySelector(".search-bar")
        .addEventListener("keyup", function (event) {
          if (event.key == "Enter") {
            weather.search();}}
            );
    //fetch weather for Austin as default
      weather.fetchWeather("Austin");