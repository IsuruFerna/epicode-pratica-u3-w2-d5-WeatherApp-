import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBarComp from "./components/SearchBarCom";
import CurrentWeatherComp from "./components/CurrentWeatherComp";
import NextDaysComp from "./components/NextDaysComp";
import icons from "./data/icons.json";
import { useState, useEffect } from "react";
// import { useState } from "react";

function App() {
   // track the current position and set these values
   const [lon, setLon] = useState(-0.1276474);
   const [lat, setLat] = useState(51.5073219);
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   // get user current location/position
   useEffect(() => {
      const options = {
         enableHighAccuracy: true,
         timeout: 5000,
         maximumAge: 0,
      };

      function success(pos) {
         const crd = pos.coords;
         setLat(crd.latitude);
         setLon(crd.longitude);
      }

      function error(err) {
         console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
   }, []);

   // get the icon corresponding to the weather
   // icons are not perfect and sometimes are not completely relavant sometimes but I wanted to try and save little bit of time. Replacing the images in assets fix this issue
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
            <CurrentWeatherComp
               lon={lon}
               lat={lat}
               getIcon={getIcon}
               windowWidth={windowWidth}
            />
         </header>
         <main>
            <NextDaysComp
               lon={lon}
               lat={lat}
               getIcon={getIcon}
               windowWidth={windowWidth}
               setWindowWidth={setWindowWidth}
            />
         </main>
      </div>
   );
}

export default App;
