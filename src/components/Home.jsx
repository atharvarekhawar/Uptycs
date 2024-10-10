/* eslint-disable react-hooks/exhaustive-deps */
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

import { IoFilterSharp } from "react-icons/io5";

export default function Home() {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/employees");
      let employeeTableData = [];

      for (const e of res.data) {
        employeeTableData.push({
          employeeId: e.id,
          employeeName: e.name,
          employeeDesignation: e.designation,
          employeeDepartment: e.department,
          employeeJoiningData: e.joiningDate,
        });
      }

      setData(employeeTableData);
      setTableData(employeeTableData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === "" && departmentFilter === "") {
      setTableData(data);
      return;
    }
    if (departmentFilter == "") {
      const filteredData = data.filter((employee) => {
        const employeeName = employee.employeeName.toLowerCase();
        const employeeDepartment = employee.employeeDepartment.toLowerCase();
        const employeeDesignation = employee.employeeDesignation.toLowerCase();

        return (
          employeeName.includes(searchQuery.toLowerCase()) ||
          employeeDepartment.includes(searchQuery.toLowerCase()) ||
          employeeDesignation.includes(searchQuery.toLowerCase())
        );
      });
      setTableData(filteredData);
      return;
    }

    if (searchQuery === "") {
      const filteredData = data.filter(
        (employee) => employee.employeeDepartment == departmentFilter
      );
      setTableData(filteredData);
      return;
    }

    const filteredData = data.filter((employee) => {
      const employeeName = employee.employeeName.toLowerCase();
      const employeeDepartment = employee.employeeDepartment.toLowerCase();
      const employeeDesignation = employee.employeeDesignation.toLowerCase();

      return (
        (employeeName.includes(searchQuery.toLowerCase()) ||
          employeeDepartment.includes(searchQuery.toLowerCase()) ||
          employeeDesignation.includes(searchQuery.toLowerCase())) &&
        employee.employeeDepartment === departmentFilter
      );
    });
    setTableData(filteredData);
    return;
  }, [searchQuery,departmentFilter]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="w-full flex justify-between">
        <AddEmployeeButton />
        <div className="w-1/3 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search employee"
            value={searchQuery}
            onChange={handleSearchQuery}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="w-1/3 relative flex gap-3 justify-center items-center ">
          <IoFilterSharp className="cursor-pointer" width={24} />
          <div className=" mt-2">
            <select
              id="department"
              name="department"
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
            >
              <option value="">Select department</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
      </div>
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
            {tableData.map((employee) => (
              <TableRow
                key={employee.employeeId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employee.employeeId}
                </TableCell>
                <TableCell
                  align="center"
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(`/${employee.employeeId}`);
                  }}
                >
                  {employee.employeeName}
                </TableCell>
                <TableCell align="center">
                  {employee.employeeDesignation}
                </TableCell>
                <TableCell align="center">
                  {employee.employeeDepartment}
                </TableCell>
                <TableCell align="center">
                  {employee.employeeJoiningData}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
