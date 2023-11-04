import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import API_KEY from "./api";

const CurrentWeatherComp = ({ lon, lat }) => {
   const [city, setCity] = useState(null);
   const [weather, setWeather] = useState(null);
   const [description, setDescription] = useState(null);
   const [temp, setTemp] = useState(null);

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
         })
         .catch((err) => console.log("ERROR", err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lon, lat]);

   console.log("seted data: ", city, weather, description, temp);

   return (
      <Container fluid>
         <Row className="flex-column">
            <Col sx={12} className="tmp-color">
               <p className="fw-bold mt-3 mb-0 mx-3 text-white">{city}</p>
               <p className="my-0 text-white mx-3">
                  <small>10:35"fix time"</small>
               </p>
            </Col>
            <Col sx={12} className="tmp-color">
               <Row className="mb-3">
                  <Col className="d-flex">
                     <Image
                        className="w-50 p-1 me-2 p-2"
                        src="assets/daily_mood/sunny.png"
                     />
                     <h1 className="ms-1 p-1 text-white">
                        {temp ? temp.toFixed(1) : ""}°C
                     </h1>
                  </Col>
                  <Col className="m-3 mt-1 ms-0 d-flex flex-column align-items-start text-white">
                     <h6 className="fw-blod mb-0 text-capitalize">
                        {description}
                     </h6>
                     <p className="m-0">
                        <small>Precipita 24°</small>
                     </p>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default CurrentWeatherComp;
