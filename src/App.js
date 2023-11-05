import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBarComp from "./components/SearchBarCom";
import CurrentWeatherComp from "./components/CurrentWeatherComp";
import NextDaysComp from "./components/NextDaysComp";
import icons from "./data/icons.json";
import { useState } from "react";
// import { useState } from "react";

function App() {
   // track the current position and set these values
   const [lon, setLon] = useState(-0.1276474);
   const [lat, setLat] = useState(51.5073219);

   // get the icon corresponding to the weather
   const getIcon = function (weather) {
      for (let i = 0; i < icons.weather_conditions.length; i++) {
         if (
            weather.toLowerCase() ===
            icons.weather_conditions[i].condition.toLowerCase()
         ) {
            return icons.weather_conditions[i].image_link;
         }
      }
   };

   console.log("this is parent", lon, lat);

   return (
      <div className="App">
         <header>
            <SearchBarComp setLon={setLon} setLat={setLat} />
            <CurrentWeatherComp lon={lon} lat={lat} getIcon={getIcon} />
         </header>
         <main>
            <NextDaysComp lon={lon} lat={lat} getIcon={getIcon} />
         </main>
      </div>
   );
}

export default App;
