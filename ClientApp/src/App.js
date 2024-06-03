import React, { useState, useEffect } from 'react';

/*export default function () {

    async function getEmployees() {
        return fetch("/employees").then(response => response.json());
    }

    async function createEmployee(name, value) {
        return fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    async function updateEmployee(name, value) {
        return fetch("/employees", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }
    

    return (
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.Name} - {employee.Value}
                        <button onClick={() => updateEmployee(employee.id, employee.name, employee.value)}>
                            Edit
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Add Employee</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                createEmployee(e.target.name.value, e.target.value.value);
                e.target.reset();
            }}>
            </form>

            <h2>Get Employees</h2>
            <button onClick={getEmployees}>Refresh Employee List</button> 
        </div>
  );
}
*/

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  // Fetch employees on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/employees");
      const data = await response.json();
      setEmployees(data);
    };
    fetchData();
  }, []);

  // Add a new employee
  const handleAddEmployee = async (name, value) => {
    const response = await fetch("/employees", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, value })
    });
    const newEmployee = await response.json();
    setEmployees([...employees, newEmployee]); // Add to state
  };

  // Edit an existing employee
  const handleEditEmployee = async (id, name, value) => {
    const response = await fetch(`/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, value })
    });
    const updatedEmployee = await response.json();
    setEmployees(employees.map(employee => (employee.id === id ? updatedEmployee : employee))); // Update state
  };

  // Delete an employee (implementation not shown here)
  const handleDeleteEmployee = (id) => {
    // Implement logic to delete employee from server and update state
  };

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.value}
            <button onClick={() => handleEditEmployee(employee.id, employee.name, employee.value)}>Edit</button>
            <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Employee</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const value = e.target.value.value;
        handleAddEmployee(name, value);
      }}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="value">Value:</label>
        <input type="text" id="value" name="value" required />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default EmployeeList;