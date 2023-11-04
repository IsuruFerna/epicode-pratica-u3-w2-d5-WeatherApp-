import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const SingleDayComp = ({ day }) => {
   return (
      <Col
         xs={6}
         md={3}
         className="d-flex flex-column align-items-center justify-content-center text-white"
      >
         <p>Single day: {day}</p>
         <Image
            className="w-50"
            fluid
            src="assets/daily_mood/sunny.png"
            alt="daily-mood"
         />
         <p>19°</p>
         <p>16°</p>
         <p>22%</p>
      </Col>
   );
};

export default SingleDayComp;
