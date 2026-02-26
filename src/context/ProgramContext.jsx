import { createContext, useContext, useState } from 'react';
import { programs as initialPrograms } from '../data/mockData';

const ProgramContext = createContext(null);

export function ProgramProvider({ children }) {
    const [programs, setPrograms] = useState(initialPrograms);

    const addProgram = (progData) => {
        const nextId = `prog-${String(programs.length + 1).padStart(2, '0')}`;

        const newProgram = {
            id: nextId,
            currentParticipants: 0,
            status: progData.status || 'geplant',
            ...progData,
            id: nextId, // ensure id cannot be overridden
        };
        setPrograms(prev => [...prev, newProgram]);
        return newProgram;
    };

    const updateProgram = (id, data) => {
        setPrograms(prev =>
            prev.map(prog => prog.id === id ? { ...prog, ...data } : prog)
        );
    };

    const deleteProgram = (id) => {
        setPrograms(prev => prev.filter(prog => prog.id !== id));
    };

    return (
        <ProgramContext.Provider value={{
            programs,
            addProgram,
            updateProgram,
            deleteProgram,
        }}>
            {children}
        </ProgramContext.Provider>
    );
}

export function usePrograms() {
    const context = useContext(ProgramContext);
    if (!context) throw new Error('usePrograms must be used within ProgramProvider');
    return context;
}
