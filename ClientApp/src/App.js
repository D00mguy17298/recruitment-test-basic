import React, { useState, useEffect } from 'react';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        getEmployees();
    }, []);

    async function getEmployees() {
        try {
            const response = await fetch("/employees");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched employees:", data);  // Debugging log
            setEmployees(data);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        }
    }

    async function createEmployee(name, value) {
        try {
            const response = await fetch("/employees", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, value })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            getEmployees(); // Refresh employee list after creating
        } catch (error) {
            console.error("Failed to create employee:", error);
        }
    }

    async function updateEmployee(id, name, value) {
        try {
            const response = await fetch(`/employees/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, value })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            getEmployees(); // Refresh employee list after updating
        } catch (error) {
            console.error("Failed to update employee:", error);
        }
    }

    function handleEdit(employee) {
        setEditingEmployee(employee);
        setName(employee.name);
        setValue(employee.value);
    }

    function handleUpdate(e) {
        e.preventDefault();
        if (editingEmployee) {
            updateEmployee(editingEmployee.id, name, value);
            setEditingEmployee(null);
            setName('');
            setValue('');
        }
    }

    function handleAdd(e) {
        e.preventDefault();
        createEmployee(name, value);
        setName('');
        setValue('');
    }

    return (
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.value}
                        <button onClick={() => handleEdit(employee)}>
                            Edit
                        </button>
                    </li>
                ))}
            </ul>

            <h2>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={editingEmployee ? handleUpdate : handleAdd}>
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
                <button type="submit">{editingEmployee ? 'Update' : 'Add'}</button>
            </form>

            <h2>Get Employees</h2>
            <button onClick={getEmployees}>Refresh Employee List</button>
        </div>
    );
}