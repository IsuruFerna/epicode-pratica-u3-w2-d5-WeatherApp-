import SingleDayComp from "./SingleDayComp";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
// import API_KEY from "./api";

const NextDaysComp = ({ lon, lat, getIcon, windowWidth, setWindowWidth }) => {
   const [data, setData] = useState(null);
   const [city, setCity] = useState(null);
   // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   const numCarosel = function () {
      // get the length of list and decide the number of carolels to be rendered
      if (data) {
         if (windowWidth <= 576) {
            return data.length / 2;
         } else {
            return data.length / 4;
         }
      }
   };
   const [currnetCarosel, setCurrnetCarosel] = useState(0);

   // retreave data asd set data using userState
   useEffect(() => {
      const API_KEY = process.env.REACT_APP_API_KEY;
      fetch(
         `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
         .then((response) => {
            if (!response.ok) {
               throw new Error("retreaving data error!");
            }
            return response.json();
         })
         .then((output) => {
            console.log("fetch went fine", output);
            setData(output.list);
            setCity(output.city.name);
         })
         .catch((err) => console.log("ERROR!", err));
   }, [lon, lat]);

   // handle the width of the window
   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // cleanup function
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, [setWindowWidth]);

   // decides how many carosel items should be in a carosel slide
   const itemAmountCarosel = function () {
      if (windowWidth <= 576) {
         return 2;
      } else {
         return 4;
      }
   };

   return (
      <>
         <div>
            <h3 className="border-bottom py-3 ps-2 text-white mb-0">
               Next Hours in {city}
            </h3>
            <Carousel
               className="pb-3"
               onSlid={(incommingIndex) => {
                  // updata current carosel
                  setCurrnetCarosel(incommingIndex);
               }}
            >
               {data &&
                  //  create an array with undefined values to fit the length of carosel items
                  [...Array(numCarosel())].map((e, i) => {
                     return (
                        <Carousel.Item key={i}>
                           <Container fluid>
                              <Row>
                                 {/* slice the main array and populate data on the carosel item */}
                                 {data
                                    .slice(
                                       currnetCarosel * itemAmountCarosel(),
                                       itemAmountCarosel() * currnetCarosel +
                                          itemAmountCarosel()
                                    )
                                    .map((day) => {
                                       return (
                                          <SingleDayComp
                                             key={day.dt}
                                             day={day.dt}
                                             date={day.dt_txt}
                                             temp={day.main.temp}
                                             temp_min={day.main.temp_min}
                                             temp_max={day.main.temp_max}
                                             weather={day.weather[0].main}
                                             description={
                                                day.weather[0].description
                                             }
                                             icon={day.weather[0].icon}
                                             humidity={day.main.humidity}
                                             getIcon={getIcon}
                                          />
                                       );
                                    })}
                              </Row>
                           </Container>
                        </Carousel.Item>
                     );
                  })}
            </Carousel>
         </div>
      </>
   );
};

export default NextDaysComp;
