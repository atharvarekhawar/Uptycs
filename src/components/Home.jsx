import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";

import AddEmployeeButton from "./AddEmployeeButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/employees");
      let employeeTableData = [];

      for (const e of res.data) {
        employeeTableData.push({employeeId:e.id,employeeName:e.name,employeeDesignation:e.designation,employeeDepartment:e.department,employeeJoiningData:e.joiningDate})
      }

      setData(employeeTableData);
    }

    fetchData();
  }, []);
  return (
    <>
      <AddEmployeeButton />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Designation</TableCell>
              <TableCell align="center">Department</TableCell>
              <TableCell align="center">Joining Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((employee) => (
              <TableRow
                key={employee.employeeId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employee.employeeId}
                </TableCell>
                <TableCell align="center" className="cursor-pointer" onClick={() => {
                  navigate(`/${employee.employeeId}`)
                }}>{employee.employeeName}</TableCell>
                <TableCell align="center">{employee.employeeDesignation}</TableCell>
                <TableCell align="center">{employee.employeeDepartment}</TableCell>
                <TableCell align="center">{employee.employeeJoiningData}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
