import { useState } from 'react';
import { departments, teams } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useEmployees } from '../../context/EmployeeContext';
import { Search, Shield, UserCog, Power, Check, Filter } from 'lucide-react';

const roleLabels = {
    employee: 'Mitarbeiter',
    manager: 'Führungskraft',
    hr: 'HR-Admin',
};

const roleBadgeClass = {
    employee: 'badge-blue',
    manager: 'badge-green',
    hr: 'badge-red',
};

export default function UserManagement() {
    const { user } = useAuth();
    const { employees, updateEmployeeRole, toggleEmployeeActive } = useEmployees();

    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [deptFilter, setDeptFilter] = useState('all');
    const [editingRole, setEditingRole] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const showToast = (msg) => {
        setSuccessMsg(msg);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
    };

    const filtered = employees.filter(e => {
        const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === 'all' || e.role === roleFilter;
        const matchStatus = statusFilter === 'all' ||
            (statusFilter === 'active' && e.isActive !== false) ||
            (statusFilter === 'inactive' && e.isActive === false);
        const matchDept = deptFilter === 'all' || e.departmentId === deptFilter;
        return matchSearch && matchRole && matchStatus && matchDept;
    });

    const activeCount = employees.filter(e => e.isActive !== false).length;
    const inactiveCount = employees.filter(e => e.isActive === false).length;

    const handleRoleChange = (empId, newRole) => {
        updateEmployeeRole(empId, newRole);
        setEditingRole(null);
        showToast('Rolle aktualisiert');
    };

    const handleToggleActive = (emp) => {
        toggleEmployeeActive(emp.id);
        showToast(emp.isActive !== false ? 'Benutzer deaktiviert' : 'Benutzer aktiviert');
    };

    return (
        <div>
            <div className="page-header">
                <h1>Benutzerverwaltung</h1>
                <p>Plattform-Rollen und Zugriffsrechte verwalten</p>
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

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
                <div className="card" style={{ padding: '20px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{employees.length}</div>
                    <div style={{ fontSize: '.8125rem', color: 'var(--gray-500)', marginTop: 4 }}>Benutzer gesamt</div>
                </div>
                <div className="card" style={{ padding: '20px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0D8A34' }}>{activeCount}</div>
                    <div style={{ fontSize: '.8125rem', color: 'var(--gray-500)', marginTop: 4 }}>Aktiv</div>
                </div>
                <div className="card" style={{ padding: '20px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#e53935' }}>{inactiveCount}</div>
                    <div style={{ fontSize: '.8125rem', color: 'var(--gray-500)', marginTop: 4 }}>Inaktiv</div>
                </div>
                <div className="card" style={{ padding: '20px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FF6D00' }}>
                        {employees.filter(e => e.role === 'hr' || e.role === 'manager').length}
                    </div>
                    <div style={{ fontSize: '.8125rem', color: 'var(--gray-500)', marginTop: 4 }}>Admins & Führungskräfte</div>
                </div>
            </div>

            {/* Filter bar */}
            <div className="card">
                <div className="card-header" style={{ gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200, background: '#f5f5f5', borderRadius: 8, padding: '8px 12px' }}>
                        <Search size={18} color="#9e9e9e" />
                        <input className="form-input" style={{ border: 'none', background: 'transparent', padding: 0 }}
                            placeholder="Benutzer suchen..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Filter size={16} color="#9e9e9e" />
                        <select className="form-select" style={{ width: 160 }}
                            value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                            <option value="all">Alle Rollen</option>
                            <option value="employee">Mitarbeiter</option>
                            <option value="manager">Führungskraft</option>
                            <option value="hr">HR-Admin</option>
                        </select>
                        <select className="form-select" style={{ width: 140 }}
                            value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="all">Alle Status</option>
                            <option value="active">Aktiv</option>
                            <option value="inactive">Inaktiv</option>
                        </select>
                        <select className="form-select" style={{ width: 160 }}
                            value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
                            <option value="all">Alle Abteilungen</option>
                            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Benutzer</th>
                                <th>Position</th>
                                <th>Abteilung</th>
                                <th>Rolle</th>
                                <th>Status</th>
                                <th style={{ width: 120, textAlign: 'center' }}>Aktionen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(emp => {
                                const dept = departments.find(d => d.id === emp.departmentId);
                                const team = teams.find(t => t.id === emp.teamId);
                                const isSelf = emp.id === user?.id;

                                return (
                                    <tr key={emp.id} style={emp.isActive === false ? { opacity: 0.5 } : {}}>
                                        <td>
                                            <div className="table-user">
                                                <div className="table-avatar">{emp.avatar}</div>
                                                <div>
                                                    <div className="table-user-name">
                                                        {emp.name}
                                                        {isSelf && <span className="badge badge-blue" style={{ marginLeft: 8, fontSize: '.65rem' }}>Sie</span>}
                                                    </div>
                                                    <div className="table-user-email">{emp.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{emp.position}</td>
                                        <td><span className="badge badge-blue">{dept?.name}</span></td>
                                        <td>
                                            {editingRole === emp.id ? (
                                                <select
                                                    className="form-select"
                                                    style={{ width: 140, fontSize: '.8125rem' }}
                                                    value={emp.role}
                                                    onChange={e => handleRoleChange(emp.id, e.target.value)}
                                                    onBlur={() => setEditingRole(null)}
                                                    autoFocus
                                                >
                                                    <option value="employee">Mitarbeiter</option>
                                                    <option value="manager">Führungskraft</option>
                                                    <option value="hr">HR-Admin</option>
                                                </select>
                                            ) : (
                                                <span className={`badge ${roleBadgeClass[emp.role] || 'badge-gray'}`}>
                                                    {emp.role === 'hr' && <Shield size={12} style={{ marginRight: 4 }} />}
                                                    {roleLabels[emp.role]}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`badge ${emp.isActive !== false ? 'badge-green' : 'badge-gray'}`}
                                                style={{ cursor: 'default' }}>
                                                {emp.isActive !== false ? 'Aktiv' : 'Inaktiv'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => setEditingRole(emp.id)}
                                                    title="Rolle ändern"
                                                    style={{ padding: '6px 8px' }}
                                                    disabled={isSelf}
                                                >
                                                    <UserCog size={16} />
                                                </button>
                                                <button
                                                    className={`btn btn-ghost btn-sm`}
                                                    onClick={() => handleToggleActive(emp)}
                                                    title={emp.isActive !== false ? 'Deaktivieren' : 'Aktivieren'}
                                                    style={{
                                                        padding: '6px 8px',
                                                        color: emp.isActive !== false ? '#e53935' : '#0D8A34',
                                                    }}
                                                    disabled={isSelf}
                                                >
                                                    <Power size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--gray-400)' }}>
                                        Keine Benutzer gefunden
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
