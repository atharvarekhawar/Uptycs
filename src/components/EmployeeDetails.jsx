//import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
    let { employeeId } = useParams();
    console.log(employeeId); 
  return <div>employeeDetails</div>;
};

export default EmployeeDetails;
