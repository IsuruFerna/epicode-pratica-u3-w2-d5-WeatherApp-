import SingleDayComp from "./SingleDayComp";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useRef, useEffect } from "react";
import API_KEY from "./api";
// import { API_16 } from "./api";

const NextDaysComp = ({ lon, lat }) => {
   const windowWidth = useRef(window.innerWidth);
   const itemAmount = function () {
      if (windowWidth <= 576) {
         return 2;
      } else {
         return 4;
      }
   };

   useEffect(() => {
      fetch(
         `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
         .then((response) => {
            if (!response.ok) {
               throw new Error("retreaving data error!");
            }
            return response.json();
         })
         .then((data) => {
            console.log("fetch went fine", data);
         })
         .catch((err) => console.log("ERROR!", err));
   }, [lon, lat]);

   console.log("inner width: ", windowWidth, itemAmount());
   return (
      <>
         <div className="bg-info">
            <h3 className="border-bottom py-3 ps-2 text-white mb-3">
               Next 16 days
            </h3>
            <Carousel className="py-3">
               <Carousel.Item>
                  <Container fluid>
                     <Row>
                        <SingleDayComp day="1" />
                        <SingleDayComp day="2" />
                        <SingleDayComp day="3" />
                        <SingleDayComp day="4" />
                     </Row>
                  </Container>
               </Carousel.Item>
               <Carousel.Item>
                  <Container fluid>
                     <Row>
                        <SingleDayComp day="5" />
                        <SingleDayComp day="6" />
                        <SingleDayComp day="7" />
                        <SingleDayComp day="8" />
                     </Row>
                  </Container>
               </Carousel.Item>
               <Carousel.Item>
                  <Container fluid>
                     <Row>
                        <SingleDayComp day="9" />
                        <SingleDayComp day="10" />
                        <SingleDayComp day="11" />
                        <SingleDayComp day="12" />
                     </Row>
                  </Container>
               </Carousel.Item>
            </Carousel>
         </div>
      </>
   );
};

export default NextDaysComp;
