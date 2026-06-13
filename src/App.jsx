import { use } from "react";
import { useState } from "react";


function Weather(){
  const [city,setCity] = useState("");
  const [weather,setWeather] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  async function getWeather() {
    
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }
    
    setLoading(true);
    const apiKey = "e867f05860de3d6c925dba68ca1c2ab4";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    const data = await response.json();

    if(data.cod === "404"){
      setError("City not Found");
      setWeather(null);
    }else {
      setWeather(data);
    }

    setCity("");

    setLoading(false);
  }

  // const weather={
  //   city:"Salem",
  //   temperature : 32,
  //   condition :"Summer",
  // };

  let bgClass = "bg-light";

  if(weather) {
    switch(weather.weather[0].main){
      case "Clear":
        bgClass="bg-warning";
        break;
      case "Clouds":
        bgClass="bg-secondary text-white";
        break;
      case "Rain":
        bgclass="bg-primary text-white";
        break;
      case "Thunderstorm":
        bgClass="bg-drak text-white";
        break;
      case "Snow":
        bgClass="bg-info";
        break;
      
      default:
        bgClass="bg-light";      
    }
  }
  const today = new Date().toLocaleDateString();
  return(
    <div className={`container mt-5 p-4 rounded ${bgClass}`}>
      <h1 className="text-center mb-4"> Weather</h1>

      <div className="input-group mb-3">
        <input 
        type="text"
        className="form-control"
        value={city}
        placeholder="Enter the City"
        onChange={(e)=>setCity(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === "Enter") getWeather();
        }}
        />
        <button className="btn btn-primary"
        onClick={getWeather}
        >Search</button>
      </div>

      { error && (
        <p className="text-danger text-center">{error}</p>
      )}
      { loading && (
        <h3 className="text-center">Loading...</h3>
      )}
      
      { weather && (
        <div className="card shadow-lg p-4 text-center">
          <h2 className="fw-bold">{weather.name},{weather.sys.country}</h2>
          <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
          style={{
            width: "100px",
            height: "100px",
          }}
          className="mx-auto"
          />
          <h3>{weather.main.temp}°C</h3>
          <p>{today}</p>
          <p className="text-capitalize">{weather.weather[0].description}</p>
          <p>Humidity:{weather.main.humidity}%</p>
          <p>wind Speed:{weather.wind.speed} m/s</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
      </div>      
      )}
      
    </div>
  );
}

export default Weather;