async function getWeather() {

    let city = document.getElementById("cityInput").value;

    const apiKey = "56b24389eec6aebe1aa1de7afe62423a";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        document.getElementById("loading").style.display="block";

        const response = await fetch(url);

        const data = await response.json();
        document.getElementById("loading").style.display="none";
        document.getElementById("loading").innerHTML = "";
        if (data.cod == "404") {

            document.getElementById("cityName").innerHTML = "City Not Found";
            document.getElementById("temperature").innerHTML = "";
            document.getElementById("description").innerHTML = "";
            document.getElementById("humidity").innerHTML = "";
            document.getElementById("wind").innerHTML = "";
            document.getElementById("weatherIcon").src = "";

            return;
        }

        document.getElementById("cityName").innerHTML = data.name;
        let today = new Date();

        document.getElementById("dateTime").innerHTML =
        today.toLocaleString();
        document.getElementById("temperature").innerHTML =
            data.main.temp + " °C";

        document.getElementById("description").innerHTML =
            data.weather[0].description;
        document.getElementById("feelsLike").innerHTML =
        "Feels Like : " +
        data.main.feels_like +
        " °C";
        document.getElementById("humidity").innerHTML =
            "Humidity: " + data.main.humidity + "%";

        document.getElementById("wind").innerHTML =
            "Wind Speed: " + data.wind.speed + " m/s";

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    }

    catch (error) {

        document.getElementById("cityName").innerHTML = "Something went wrong!";
        document.getElementById("temperature").innerHTML = "";
        document.getElementById("description").innerHTML = "";
        document.getElementById("humidity").innerHTML = "";
        document.getElementById("wind").innerHTML = "";
        document.getElementById("weatherIcon").src = "";

    }
    let weather = data.weather[0].main;

if(weather=="Clear"){

document.body.style.background=
"linear-gradient(135deg,#56CCF2,#2F80ED)";

}

else if(weather=="Clouds"){

document.body.style.background=
"linear-gradient(135deg,#bdc3c7,#2c3e50)";

}

else if(weather=="Rain"){

document.body.style.background=
"linear-gradient(135deg,#4b79a1,#283e51)";

}

else if(weather=="Snow"){

document.body.style.background=
"linear-gradient(135deg,#E6DADA,#274046)";

}

else{

document.body.style.background=
"linear-gradient(135deg,#4facfe,#00f2fe)";

}

}
function getLocation(){

navigator.geolocation.getCurrentPosition(success);

}

function success(position){

let lat = position.coords.latitude;

let lon = position.coords.longitude;

alert(
"Latitude : "+lat+
"\nLongitude : "+lon
);

}
document.getElementById("cityInput").addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        getWeather();

    }

});
document.getElementById("weatherResult").style.opacity = "0";

setTimeout(() => {

    document.getElementById("weatherResult").style.opacity = "1";

},100);