import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import API_KEY from "./api";

// import Datetime from "react-datetime";
// import "react-datetime/css/react-datetime.css";
// import DateTimePicker from "react-datetime-picker";

const CurrentWeatherComp = ({ lon, lat, getIcon }) => {
   const [city, setCity] = useState(null);
   const [weather, setWeather] = useState(null);
   const [description, setDescription] = useState(null);
   const [temp, setTemp] = useState(null);
   const [icon, setIcon] = useState(null);
   const [feelsLike, setFeelsLike] = useState(null);

   // generate date according to a format
   const date = new Date();
   const formattedDate = `${date.getDate()} ${date.toLocaleDateString(
      "default",
      { month: "short" }
   )}`;

   // console.log("this is date", date);
   // console.log("icons: ", icons);

   // i can get the coutry on sys.country or the city and publish a picture on currenet weather as a background
   // I could use sys.country to get current local time of the city

   useEffect(() => {
      fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
         .then((response) => {
            if (!response.ok) {
               throw new Error("fetch data retreaving error!");
            }
            return response.json();
         })
         .then((data) => {
            console.log("data retreaved", data);
            setCity(data.name);
            setWeather(data.weather[0].main);
            setDescription(data.weather[0].description);
            setTemp(data.main.temp);
            setIcon(getIcon(data.weather[0].description.toString()));
            setFeelsLike(data.main.feels_like);
         })
         .catch((err) => console.log("ERROR", err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lon, lat]);

   // console.log("seted data: ", city, weather, description, temp);
   // console.log("this is the icon:", icon);

   return (
      <Container fluid>
         <Row className="flex-column">
            <Col sx={12} className="tmp-color">
               <p className="fw-bold mt-3 mb-0 mx-3 text-white">{city}</p>
               <p className="my-0 text-white mx-3">
                  <small>{formattedDate}</small>
               </p>
            </Col>
            <Col sx={12} className="tmp-color">
               <Row className="mb-3">
                  <Col className="d-flex">
                     <Image className="w-50 p-1 me-2 p-2" src={icon} />
                     <h1 className="ms-1 p-1 text-white">
                        {temp ? temp.toFixed(1) : ""}°C
                     </h1>
                  </Col>
                  <Col className="m-3 mt-1 ms-0 d-flex flex-column align-items-start text-white">
                     <h6 className="fw-blod mb-0 text-capitalize">
                        {description}
                     </h6>
                     <p className="m-0">
                        <small>
                           Feels like {feelsLike ? feelsLike.toFixed(1) : ""}°
                        </small>
                     </p>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default CurrentWeatherComp;
