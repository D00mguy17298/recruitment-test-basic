import React, { useState, useEffect } from 'react';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        // Fetch employees when the component mounts
        getEmployees();
    }, []);

    async function getEmployees() {
        const response = await fetch("/employees");
        const data = await response.json();
        setEmployees(data);
    }

    async function createEmployee(name, value) {
        await fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
        getEmployees(); // Refresh employee list after creating
    }

    async function updateEmployee(id, name, value) {
        await fetch(`/employees/${id}`, {  // Assuming your API requires the ID in the URL for update
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
        getEmployees(); // Refresh employee list after updating
    }

    return (
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.value}
                        <button onClick={() => updateEmployee(employee.id, employee.name, employee.value)}>
                            Edit
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Add Employee</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                createEmployee(name, value);
                setName('');
                setValue('');
            }}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Value" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                />
                <button type="submit">Add</button>
            </form>

            <h2>Get Employees</h2>
            <button onClick={getEmployees}>Refresh Employee List</button>
        </div>
    );
}