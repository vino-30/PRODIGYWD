let weather = {
    apiKey: "01d9f2d66b5fb9c863aa86b5cb001cd2",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('webg.jpg')";
    },
    search: function () {
      const city = document.querySelector(".search-bar").value;
      if (city) {
        this.fetchWeather(city);
      }
    },
    
    fetchCurrentLocation: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
          )
            .then((response) => {
              if (!response.ok) {
                alert("No weather found for current location.");
                throw new Error("No weather found for current location.");
              }
              return response.json();
            })
            .then((data) => {
              this.displayWeather(data);
            });
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
  };
  

  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  
  document.querySelector(".search button:nth-child(2)").addEventListener("click", function () {
    weather.fetchCurrentLocation();
  });;
