import { createContext, useContext, useState } from 'react';
import { employees as initialEmployees } from '../data/mockData';

const EmployeeContext = createContext(null);

// Add isActive field to all initial employees
const enrichedEmployees = initialEmployees.map(emp => ({
    ...emp,
    isActive: true,
}));

export function EmployeeProvider({ children }) {
    const [employees, setEmployees] = useState(enrichedEmployees);

    const addEmployee = (empData) => {
        const nextId = `emp-${String(employees.length + 1).padStart(2, '0')}`;
        const nameParts = empData.name.trim().split(/\s+/);
        const avatar = nameParts.map(p => p[0]?.toUpperCase()).join('').slice(0, 3);

        const newEmployee = {
            id: nextId,
            avatar,
            isActive: true,
            role: empData.role || 'employee',
            ...empData,
            id: nextId, // ensure id cannot be overridden
        };
        setEmployees(prev => [...prev, newEmployee]);
        return newEmployee;
    };

    const updateEmployee = (id, data) => {
        setEmployees(prev =>
            prev.map(emp => emp.id === id ? { ...emp, ...data } : emp)
        );
    };

    const toggleEmployeeActive = (id) => {
        setEmployees(prev =>
            prev.map(emp => emp.id === id ? { ...emp, isActive: !emp.isActive } : emp)
        );
    };

    const updateEmployeeRole = (id, role) => {
        setEmployees(prev =>
            prev.map(emp => emp.id === id ? { ...emp, role } : emp)
        );
    };

    return (
        <EmployeeContext.Provider value={{
            employees,
            addEmployee,
            updateEmployee,
            toggleEmployeeActive,
            updateEmployeeRole,
        }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployees() {
    const context = useContext(EmployeeContext);
    if (!context) throw new Error('useEmployees must be used within EmployeeProvider');
    return context;
}
