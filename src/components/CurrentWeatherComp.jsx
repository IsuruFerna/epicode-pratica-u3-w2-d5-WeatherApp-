import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
// import API_KEY from "./api";

// import Datetime from "react-datetime";
// import "react-datetime/css/react-datetime.css";
// import DateTimePicker from "react-datetime-picker";

const CurrentWeatherComp = ({ lon, lat, getIcon, windowWidth }) => {
   const API_KEY = process.env.REACT_APP_API_KEY;
   const [city, setCity] = useState(null);
   // const [weather, setWeather] = useState(null);
   const [description, setDescription] = useState(null);
   const [temp, setTemp] = useState(null);
   const [icon, setIcon] = useState(null);
   const [feelsLike, setFeelsLike] = useState(null);
   const [imgBackground, setImgBackground] = useState(null);

   // generate date according to a format
   const date = new Date();
   const formattedDate = `${date.getDate()} ${date.toLocaleDateString(
      "default",
      { month: "short" }
   )}`;

   // choose the image based on the window width
   const chooseImage = (windowWidth, source) => {
      if (windowWidth <= 768) {
         // choose image for mobile
         // image for mobile is a square if I keep it i have to modify a lot, therefor I'm keeping the web version for now
         // return source.mobile;
         return source.web;
      } else {
         // choose image for large screen
         return source.web;
      }
   };

   // console.log("this is date", date);
   // console.log("icons: ", icons);

   // i can get the coutry on sys.country or the city and publish a picture on currenet weather as a background
   // I could use sys.country to get current local time of the city

   // track the current location and use the values at the begining

   // get a image corresponding the city
   const getCityImage = async function (city) {
      try {
         const response = await fetch(
            `https://api.teleport.org/api/urban_areas/slug:${city.toLowerCase()}/images/`
         );
         if (response.ok) {
            const data = await response.json();
            console.log("image data retreived: ", data.photos[0].image);
            // return data;
            // set image based on the window width
            setImgBackground(chooseImage(windowWidth, data.photos[0].image));
         } else {
            throw new Error("Error getting image data");
         }
      } catch (error) {
         console.log("ERROR: ", error);
      }
   };

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
            // setWeather(data.weather[0].main);
            setDescription(data.weather[0].description);
            setTemp(data.main.temp);
            setIcon(getIcon(data.weather[0].description.toString()));
            setFeelsLike(data.main.feels_like);
            getCityImage(data.name);
         })
         .catch((err) => console.log("ERROR", err));

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lon, lat]);

   // console.log("seted bg: ", imgBackground);
   // console.log("seted data: ", city, weather, description, temp);
   // console.log("this is the icon:", icon);

   return (
      <Container className="position-relative" fluid>
         <Image
            className="py-4 my-4"
            src={imgBackground ? imgBackground : ""}
            alt="background-img"
            fluid
         />
         <Row className="flex-column position-absolute top-0 w-100 glass-main">
            <Col sx={12}>
               <div>
                  <p className="fw-bold mt-3 mb-0 mx-3 text-white text-shadow">
                     {city}
                  </p>
                  <p className="my-0 text-white mx-3 text-shadow">
                     <small>{formattedDate}</small>
                  </p>
               </div>
            </Col>
            <Col sx={12}>
               <Row className="mb-3 z-1">
                  <Col className="d-flex">
                     <Image className="w-50 p-1 me-2 p-2" src={icon} />
                     <h1 className="ms-1 p-1 text-white text-shadow">
                        {temp ? temp.toFixed(1) : ""}°C
                     </h1>
                  </Col>
                  <Col className="m-3 mt-1 ms-0 d-flex flex-column align-items-start text-white">
                     <h6 className="fw-blod mb-0 text-capitalize text-shadow">
                        {description}
                     </h6>
                     <p className="m-0 ">
                        <small className="text-shadow">
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
