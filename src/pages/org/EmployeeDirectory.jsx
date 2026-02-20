import { useState } from 'react';
import { employees, departments, teams, evaluations } from '../../data/mockData';
import { Search, Filter } from 'lucide-react';

export default function EmployeeDirectory() {
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('all');

    const filtered = employees.filter(e => {
        const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.position.toLowerCase().includes(search.toLowerCase()) ||
            e.email.toLowerCase().includes(search.toLowerCase());
        const matchDept = deptFilter === 'all' || e.departmentId === deptFilter;
        return matchSearch && matchDept;
    });

    return (
        <div>
            <div className="page-header">
                <h1>Mitarbeiterverzeichnis</h1>
                <p>{employees.length} Mitarbeiter in der Organisation</p>
            </div>

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
                                <th>Abteilung</th>
                                <th>Team</th>
                                <th>Eintritt</th>
                                <th>Bewertung</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(emp => {
                                const dept = departments.find(d => d.id === emp.departmentId);
                                const team = teams.find(t => t.id === emp.teamId);
                                const eval_ = evaluations.find(e => e.employeeId === emp.id && e.status === 'completed');
                                return (
                                    <tr key={emp.id}>
                                        <td>
                                            <div className="table-user">
                                                <div className="table-avatar">{emp.avatar}</div>
                                                <div>
                                                    <div className="table-user-name">{emp.name}</div>
                                                    <div className="table-user-email">{emp.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{emp.position}</td>
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
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
