/* eslint-disable react-hooks/exhaustive-deps */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EmployeeDetails from "./EmployeeDetailsPage";

import { TiPencil } from "react-icons/ti";

import axios from "axios";

import AddEmployeeButton from "./AddEmployeeButton";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeDetailsOpen, setEmployeeDetailsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://localhost:3000/employees');
      let employeeTableData = [];

      for (const e of res.data) {
        employeeTableData.push({ ...e });
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
    if (departmentFilter === "") {
      const filteredData = data.filter((employee) => {
        const employeeName = employee.name.toLowerCase();
        const employeeDepartment = employee.department.toLowerCase();
        const employeeDesignation = employee.designation.toLowerCase();

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
        (employee) => employee.department == departmentFilter
      );
      setTableData(filteredData);
      return;
    }

    const filteredData = data.filter((employee) => {
      const employeeName = employee.name.toLowerCase();
      const employeeDepartment = employee.department.toLowerCase();
      const employeeDesignation = employee.designation.toLowerCase();

      return (
        (employeeName.includes(searchQuery.toLowerCase()) ||
          employeeDepartment.includes(searchQuery.toLowerCase()) ||
          employeeDesignation.includes(searchQuery.toLowerCase())) &&
        employee.department === departmentFilter
      );
    });
    setTableData(filteredData);
    return;
  }, [searchQuery, departmentFilter]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between">
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
        <div className="w-1/3 flex gap-4 justify-center items-center ">
          <div className="w-fit text-sm mt-2">
            <select
              id="department"
              name="department"
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
            >
              <option value="">Filter by department</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
      </div>
      {tableData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-slate-400">
                  <p className="font-bold text-md">Employee ID</p>
                </TableCell>
                <TableCell align="center" className="bg-slate-400">
                  <p className="font-bold text-md"> Name</p>
                </TableCell>
                <TableCell align="center" className="bg-slate-400">
                  <p className="font-bold text-md">Designation</p>
                </TableCell>
                <TableCell align="center" className="bg-slate-400">
                  <p className="font-bold text-md">Department</p>
                </TableCell>
                <TableCell align="center" className="bg-slate-400">
                  <p className="font-bold text-md">Joining Date</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {employee.id}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="cursor-pointer"
                    onClick={() => {
                      localStorage.setItem(
                        "user",
                        JSON.stringify({ ...employee })
                      );
                      setEmployeeDetailsOpen(true);
                    }}
                  >
                    <div className="flex gap-1 justify-center  items-center">
                      <TiPencil width={24}  />
                      {employee.name}
                    </div>
                  </TableCell>
                  <TableCell align="center">{employee.designation}</TableCell>
                  <TableCell align="center">{employee.department}</TableCell>
                  <TableCell align="center">{employee.joiningDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className=" h-screen flex justify-center items-center">
          <p className="text-lg font-bold">No results found!</p>
        </div>
      )}
      {employeeDetailsOpen && (
        <EmployeeDetails setEmployeeDetailsOpen={setEmployeeDetailsOpen} />
      )}
    </div>
  );
}
