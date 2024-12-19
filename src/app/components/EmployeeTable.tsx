"use client"
import { useEffect, useState } from "react";
import api from "../utils/api";

interface Employee {
  id: number;
  name: string;
  user: { email: string };
  deletedAt: string | null;
}

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await api.get("/employees");
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = async () => {
    try {
      await api.post("/employees", newEmployee);
      alert("Employee added successfully!");
      setShowAddModal(false);
      location.reload();
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      alert("Employee deleted successfully!");
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again.");
    }
  };

  const handleUpdateEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      await api.put(`/employees/${selectedEmployee.id}`, {
        name: selectedEmployee.name,
        email: selectedEmployee.user.email,
      });
      alert("Employee updated successfully!");
      setShowEditModal(false);
      location.reload();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee. Please try again.");
    }
  };


  return (
    <div className="border rounded-lg shadow-md bg-white overflow-hidden">
      <div className="flex flex-row justify-between">
        <h2 className="flex items-center p-4 text-lg font-bold bg-gray-100">All Employees</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add New Employee
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={emp.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-3">{emp.id}</td>
                <td className="px-4 py-3 font-medium">{emp.name}</td>
                <td className="px-4 py-3">{emp.user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      emp.deletedAt
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {emp.deletedAt ? "Inactive" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setShowEditModal(true);
                    }}
                    className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(emp.id)}
                    className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Add New Employee</h2>
            <input
              type="text"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={newEmployee.password}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, password: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Edit Employee</h2>
            <input
              type="text"
              placeholder="Name"
              value={selectedEmployee.name}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={selectedEmployee.user.email}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  user: { ...selectedEmployee.user, email: e.target.value },
                })
              }
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateEmployee}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
