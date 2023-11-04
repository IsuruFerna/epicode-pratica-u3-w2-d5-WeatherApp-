import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBarComp from "./components/SearchBarCom";
import CurrentWeatherComp from "./components/CurrentWeatherComp";
import NextDaysComp from "./components/NextDaysComp";
import { useState } from "react";
// import { useState } from "react";

function App() {
   // track the current position and set these values
   const [lon, setLon] = useState(-0.1276474);
   const [lat, setLat] = useState(51.5073219);

   console.log("this is parent", lon, lat);

   return (
      <div className="App">
         <header>
            <SearchBarComp setLon={setLon} setLat={setLat} />
            <CurrentWeatherComp lon={lon} lat={lat} />
         </header>
         <main>
            <NextDaysComp lon={lon} lat={lat} />
         </main>
      </div>
   );
}

export default App;