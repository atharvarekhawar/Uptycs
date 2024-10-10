/* eslint-disable no-unused-vars */
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const AddEmployeeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "",
    joiningDate: "",
    salary: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setFormData((prevState) => {
          return {
              ...prevState,
              [name]: value
          }
      });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = {
      id: uuidv4(),
      ...formData,
    };

    await axios.post("http://localhost:3000/employees", newEmployee);

    setFormData({
      name: "",
      designation: "",
      department: "",
      joiningDate: "",
      salary: "",
      email: "",
      phoneNumber: "",
    });
    window.location.reload();
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-md shadow-lg p-6 w-96">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <RxCross1 size={24} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
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
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="salary"
                >
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
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
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
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Employee Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => setIsOpen(true)}
      >
        Add Employee
      </button>
    </div>
  );
};

export default AddEmployeeButton;
