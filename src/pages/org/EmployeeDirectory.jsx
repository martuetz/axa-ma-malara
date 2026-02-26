import { useState } from 'react';
import { departments, teams, evaluations } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useEmployees } from '../../context/EmployeeContext';
import { Search, Pencil, X, Check, UserPlus } from 'lucide-react';

const emptyEmployee = {
    name: '', email: '', position: '',
    departmentId: 'beratung', teamId: 'geschaeftsleitung',
    role: 'employee', hireDate: new Date().toISOString().slice(0, 10),
    reportsTo: null,
};

export default function EmployeeDirectory() {
    const { user } = useAuth();
    const { employees, addEmployee, updateEmployee } = useEmployees();
    const canEdit = user?.role === 'hr' || user?.role === 'manager';

    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('all');
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const filtered = employees.filter(e => {
        const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.position.toLowerCase().includes(search.toLowerCase()) ||
            e.email.toLowerCase().includes(search.toLowerCase());
        const matchDept = deptFilter === 'all' || e.departmentId === deptFilter;
        return matchSearch && matchDept;
    });

    const openEdit = (emp) => {
        setIsAdding(false);
        setEditingEmployee({ ...emp });
    };

    const openAdd = () => {
        setIsAdding(true);
        setEditingEmployee({ ...emptyEmployee });
    };

    const closeEdit = () => {
        setEditingEmployee(null);
        setIsAdding(false);
    };

    const handleFieldChange = (field, value) => {
        setEditingEmployee(prev => {
            const updated = { ...prev, [field]: value };
            if (field === 'departmentId') {
                const firstTeam = teams.find(t => t.departmentId === value);
                updated.teamId = firstTeam ? firstTeam.id : '';
            }
            return updated;
        });
    };

    const showToast = (msg) => {
        setSuccessMsg(msg);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
    };

    const handleSave = () => {
        if (!editingEmployee.name.trim() || !editingEmployee.email.trim()) return;

        if (isAdding) {
            addEmployee(editingEmployee);
            showToast('Mitarbeiter hinzugefügt');
        } else {
            updateEmployee(editingEmployee.id, editingEmployee);
            showToast('Änderungen gespeichert');
        }
        closeEdit();
    };

    const filteredTeams = editingEmployee
        ? teams.filter(t => t.departmentId === editingEmployee.departmentId)
        : [];

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1>Mitarbeiterverzeichnis</h1>
                    <p>{employees.length} Mitarbeiter in der Organisation</p>
                </div>
                {canEdit && (
                    <button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <UserPlus size={18} />
                        Neuer Mitarbeiter
                    </button>
                )}
            </div>

            {/* Success toast */}
            {showSuccess && (
                <div style={{
                    position: 'fixed', top: 24, right: 24, zIndex: 2000,
                    background: '#0D8A34', color: 'white', padding: '12px 20px',
                    borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 8px 24px rgba(0,0,0,.15)', animation: 'slideUp .3s ease',
                    fontSize: '.9375rem', fontWeight: 600
                }}>
                    <Check size={18} /> {successMsg}
                </div>
            )}

            <div className="card">
                <div className="card-header" style={{ gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, background: '#f5f5f5', borderRadius: 8, padding: '8px 12px' }}>
                        <Search size={18} color="#9e9e9e" />
                        <input className="form-input" style={{ border: 'none', background: 'transparent', padding: 0 }}
                            placeholder="Mitarbeiter suchen..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <select className="form-select" style={{ width: 200 }}
                        value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
                        <option value="all">Alle Abteilungen</option>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Mitarbeiter</th>
                                <th>Position</th>
                                <th>Berichtet an</th>
                                <th>Abteilung</th>
                                <th>Team</th>
                                <th>Eintritt</th>
                                <th>Bewertung</th>
                                {canEdit && <th style={{ width: 80, textAlign: 'center' }}>Aktionen</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(emp => {
                                const dept = departments.find(d => d.id === emp.departmentId);
                                const team = teams.find(t => t.id === emp.teamId);
                                const manager = emp.reportsTo ? employees.find(e => e.id === emp.reportsTo) : null;
                                const eval_ = evaluations.find(e => e.employeeId === emp.id && e.status === 'completed');
                                return (
                                    <tr key={emp.id} style={emp.isActive === false ? { opacity: 0.5 } : {}}>
                                        <td>
                                            <div className="table-user">
                                                <div className="table-avatar">{emp.avatar}</div>
                                                <div>
                                                    <div className="table-user-name">
                                                        {emp.name}
                                                        {emp.isActive === false && <span className="badge badge-gray" style={{ marginLeft: 8, fontSize: '.7rem' }}>Inaktiv</span>}
                                                    </div>
                                                    <div className="table-user-email">{emp.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{emp.position}</td>
                                        <td style={{ fontSize: '.8125rem', color: manager ? '#212121' : '#bdbdbd' }}>
                                            {manager ? manager.name : '–'}
                                        </td>
                                        <td><span className="badge badge-blue">{dept?.name}</span></td>
                                        <td>{team?.name || '–'}</td>
                                        <td>{new Date(emp.hireDate).toLocaleDateString('de-CH')}</td>
                                        <td>
                                            {eval_ ? (
                                                <span className={`badge ${eval_.overallRating === 'A' ? 'badge-green' : eval_.overallRating === 'B' ? 'badge-blue' : 'badge-orange'}`}>
                                                    {eval_.overallRating}
                                                </span>
                                            ) : <span className="badge badge-gray">Ausstehend</span>}
                                        </td>
                                        {canEdit && (
                                            <td style={{ textAlign: 'center' }}>
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => openEdit(emp)}
                                                    title="Bearbeiten"
                                                    style={{ padding: '6px 8px' }}
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / Edit Modal */}
            {editingEmployee && (
                <div className="modal-overlay" onClick={closeEdit}>
                    <div className="modal" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{isAdding ? 'Neuer Mitarbeiter' : 'Mitarbeiter bearbeiten'}</h2>
                            <button className="modal-close" onClick={closeEdit}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            {!isAdding && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: 16, background: 'var(--gray-50)', borderRadius: 10 }}>
                                    <div className="table-avatar" style={{ width: 48, height: 48, fontSize: '1rem' }}>{editingEmployee.avatar}</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '1.0625rem' }}>{editingEmployee.name}</div>
                                        <div style={{ fontSize: '.8125rem', color: 'var(--gray-500)' }}>ID: {editingEmployee.id}</div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-2" style={{ gap: 16 }}>
                                <div className="form-group">
                                    <label className="form-label">Name *</label>
                                    <input className="form-input" value={editingEmployee.name}
                                        placeholder="Vor- und Nachname"
                                        onChange={e => handleFieldChange('name', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">E-Mail *</label>
                                    <input className="form-input" type="email" value={editingEmployee.email}
                                        placeholder="vorname.nachname@axa.ch"
                                        onChange={e => handleFieldChange('email', e.target.value)} />
                                </div>
                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label className="form-label">Position</label>
                                    <input className="form-input" value={editingEmployee.position}
                                        placeholder="z.B. Kundenberater"
                                        onChange={e => handleFieldChange('position', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Abteilung</label>
                                    <select className="form-select" value={editingEmployee.departmentId}
                                        onChange={e => handleFieldChange('departmentId', e.target.value)}>
                                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Team</label>
                                    <select className="form-select" value={editingEmployee.teamId}
                                        onChange={e => handleFieldChange('teamId', e.target.value)}>
                                        {filteredTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Rolle</label>
                                    <select className="form-select" value={editingEmployee.role}
                                        onChange={e => handleFieldChange('role', e.target.value)}>
                                        <option value="employee">Mitarbeiter</option>
                                        <option value="manager">Führungskraft</option>
                                        <option value="hr">Generalagent</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Berichtet an</label>
                                    <select className="form-select" value={editingEmployee.reportsTo || ''}
                                        onChange={e => handleFieldChange('reportsTo', e.target.value || null)}>
                                        <option value="">– Keine/r –</option>
                                        {employees.filter(e => e.id !== editingEmployee.id).map(e => (
                                            <option key={e.id} value={e.id}>{e.name} ({e.position})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Eintrittsdatum</label>
                                    <input className="form-input" type="date" value={editingEmployee.hireDate}
                                        onChange={e => handleFieldChange('hireDate', e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={closeEdit}>Abbrechen</button>
                            <button className="btn btn-primary" onClick={handleSave}
                                disabled={!editingEmployee.name.trim() || !editingEmployee.email.trim()}>
                                {isAdding ? (<><UserPlus size={18} /> Hinzufügen</>) : (<><Check size={18} /> Speichern</>)}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
