
export default async function handler(req, res) {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ message: "City is required" });
    }

    try {
        const weatherURL =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

        const weatherResponse = await fetch(weatherURL);
        const weather = await weatherResponse.json();

        if (!weatherResponse.ok) {
            return res.status(weatherResponse.status).json({
                message: weather.message || "Weather not found"
            });
        }

        const prompt = `Give exactly 3 short weather tips for:
Temperature: ${weather.main.temp} °C
Humidity: ${weather.main.humidity}%
Wind: ${weather.wind.speed} m/s
Weather: ${weather.weather[0].description}`;

        const aiResponse = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=" + process.env.GEMINI_API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const aiData = await aiResponse.json();

        const advice = aiResponse.ok
            ? aiData.candidates?.[0]?.content?.parts?.[0]?.text
            : "Stay hydrated and dress according to the weather.";

        return res.status(200).json({
            city: weather.name,
            temperature: weather.main.temp,
            humidity: weather.main.humidity,
            wind: weather.wind.speed,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon,
            advice: advice || "Stay hydrated and check the weather before going out."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch weather. Please try again."
        });
    }
}
