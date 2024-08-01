import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
// import API_KEY from "./api";

const SearchBarComp = function ({ setLon, setLat }) {
   // const API_KEY = process.env.REACT_APP_API_KEY;

   const [city, setCity] = useState("London");
   //  const [lon, setLon] = useState(null);
   //  const [lat, setLat] = useState(null);

   const API_KEY = process.env.REACT_APP_API_KEY;

   useEffect(() => {
      fetch(
         `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
      )
         .then((response) => {
            if (!response.ok) {
               throw new Error("API retreave failed!");
            }
            return response.json();
         })
         .then((data) => {
            console.log("Data loaded correctly", data[0]);
            setCity(data[0].name);
            setLon(data[0].lon);
            setLat(data[0].lat);
         })
         .catch((err) => console.log("ERROR", err));

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [city]);

   const handleChange = (e) => {
      setCity(e.target.value);
      console.log(city);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setCity(e.target.value);
      e.target.reset();
   };

   return (
      <Container className="glass-main" fluid>
         <Row className="justify-content-center p-4">
            <Col xs={12} md={8}>
               <Form onSubmit={handleSubmit}>
                  <InputGroup className="mb-3">
                     <Form.Control
                        placeholder="Search Location"
                        aria-label="Search Location"
                        aria-describedby="basic-addon2"
                        onChange={handleChange}
                     />
                     <Button variant="primary" id="button-addon2">
                        Search
                     </Button>
                  </InputGroup>
               </Form>
            </Col>
         </Row>
      </Container>
   );
};

export default SearchBarComp;
