
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const loading = document.getElementById("loading");
    const weatherResult = document.getElementById("weatherResult");

    try {
        loading.style.display = "block";

        const response = await fetch(
            `/api/weather/${encodeURIComponent(city)}`
        );

        const data = await response.json();

        loading.style.display = "none";

        if (!response.ok) {
            throw new Error(data.message || "City not found.");
        }

        document.getElementById("cityName").innerHTML = data.city;

        document.getElementById("dateTime").innerHTML =
            new Date().toLocaleString();

        document.getElementById("temperature").innerHTML =
            data.temperature + " °C";

        document.getElementById("description").innerHTML =
            data.description;

        document.getElementById("feelsLike").innerHTML = "";

        document.getElementById("humidity").innerHTML =
            "Humidity: " + data.humidity + "%";

        document.getElementById("wind").innerHTML =
            "Wind Speed: " + data.wind + " m/s";

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

        document.getElementById("aiAdvice").innerHTML =
            (data.advice || "Stay hydrated and check the weather before going out.")
            .replace(/\n/g, "<br>");

        weatherResult.style.opacity = "1";

        const weather = data.description.toLowerCase();

        if (weather.includes("clear")) {
            document.body.style.background =
                "linear-gradient(135deg,#56CCF2,#2F80ED)";
        } else if (weather.includes("cloud")) {
            document.body.style.background =
                "linear-gradient(135deg,#bdc3c7,#2c3e50)";
        } else if (weather.includes("rain")) {
            document.body.style.background =
                "linear-gradient(135deg,#4b79a1,#283e51)";
        } else if (weather.includes("snow")) {
            document.body.style.background =
                "linear-gradient(135deg,#E6DADA,#274046)";
        } else {
            document.body.style.background =
                "linear-gradient(135deg,#4facfe,#00f2fe)";
        }

    } catch (error) {
        loading.style.display = "none";

        document.getElementById("cityName").innerHTML =
            "Something went wrong!";

        document.getElementById("temperature").innerHTML = "";
        document.getElementById("description").innerHTML = "";
        document.getElementById("feelsLike").innerHTML = "";
        document.getElementById("humidity").innerHTML = "";
        document.getElementById("wind").innerHTML = "";
        document.getElementById("weatherIcon").src = "";
        document.getElementById("aiAdvice").innerHTML =
            error.message;
    }
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            alert(
                "Latitude: " + lat +
                "\nLongitude: " + lon
            );
        },
        function() {
            alert("Unable to access your location.");
        }
    );
}

document.getElementById("cityInput").addEventListener(
    "keypress",
    function(event) {
        if (event.key === "Enter") {
            getWeather();
        }
    }
);

document.getElementById("weatherResult").style.opacity = "0";

setTimeout(() => {
    document.getElementById("weatherResult").style.opacity = "1";
}, 100);
