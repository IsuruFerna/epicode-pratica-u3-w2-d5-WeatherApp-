import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const SingleDayComp = ({
   day,
   date,
   temp,
   temp_min,
   temp_max,
   weather,
   icon,
   description,
}) => {
   return (
      <Col xs={6} sm={3}>
         <div className="d-flex flex-column align-items-center justify-content-center text-white glass my-4">
            <p className="mt-3">{date}</p>
            <Image
               className="w-50"
               fluid
               src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
               alt="daily-mood"
            />
            <p className="mb-0">{weather}</p>
            <p className="mt-0">
               <small>{description}</small>
            </p>
            <p className="mb-0">
               <small>{temp_max.toFixed(1)}°C</small>
            </p>
            <p className="my-0 fw-bold">{temp.toFixed(1)}°C</p>
            <p className="mt-0">
               <small>{temp_min.toFixed(1)}°C</small>
            </p>
            <p>22%</p>
         </div>
      </Col>
   );
};

export default SingleDayComp;
