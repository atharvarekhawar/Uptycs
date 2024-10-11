/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const EmployeeDetails = ({ setEmployeeDetailsOpen }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [user, setUser] = useState({
    ...JSON.parse(localStorage.getItem("user")),
  });
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    designation: user.designation,
    department: user.department,
    joiningDate: user.joiningDate,
    salary: user.salary,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setRequestSent(true);
    const newEmployee = {
      ...formData,
    };

    await axios.put(
      `http://1localhost:8000/employees/${user.id}`,
      newEmployee
    );

    setFormData({
      name: "",
      designation: "",
      department: "",
      joiningDate: "",
      salary: "",
      email: "",
      phoneNumber: "",
    });

    setRequestSent(false);
    setEmployeeDetailsOpen(false);
    window.location.reload()
  };

  const HandleDelete = async () => {
    try {
      setRequestSent(true);
      await axios.delete(
        `http://localhost:8000/employees/${user.id}`
      );

      setRequestSent(false);
      setEmployeeDetailsOpen(false);
      window.location.reload()
      
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const navigate = useNavigate();

  const hasChanges = JSON.stringify(user) !== JSON.stringify(formData);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-md shadow-lg p-6 w-96 ">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setEmployeeDetailsOpen(false)}
        >
          <RxCross1 size={24} />
        </button>
        <p className="block text-lg  font-medium mb-2">Employee Details</p>
        <form onSubmit={HandleSubmit}>
          <div className="mb-2">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="employeeName"
            >
              Employee Name
            </label>
            <input
              type="text"
              id="employeeName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter employee name"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter designation"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            >
              <option value="">Select department</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="joiningDate"
            >
              Joining Date
            </label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="salary">
              Salary
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter salary"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className=" flex justify-between">
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md ${
                hasChanges
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!hasChanges || requestSent}
            >
              Save Employee
            </button>
            <div
              className="bg-red-600 p-2 rounded-md text-white cursor-pointer "
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </div>
          </div>
        </form>
        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-md shadow-lg p-6 w-96">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setConfirmDelete(false)}
              >
                <RxCross1 size={20} />
              </button>
              <div className="block text-md font-bold">
                Do you really want to delete the user?
              </div>

              <div className="w-full flex gap-2 justify-around mt-3">
                <div
                  className="w-20 bg-red-600 p-2 rounded-md text-white cursor-pointer text-center "
                  onClick={HandleDelete}
                  disabled={requestSent}
                >
                  Yes
                </div>
                <div
                  className=" w-20 bg-emerald-600 p-2 rounded-md text-white cursor-pointer text-center "
                  onClick={() => setConfirmDelete(false)}
                >
                  No
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
