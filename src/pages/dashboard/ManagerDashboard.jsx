import { useAuth } from '../../context/AuthContext';
import { employees, evaluations, annualReviews, teams } from '../../data/mockData';
import { Users, ClipboardCheck, Calendar, AlertTriangle, ChevronRight } from 'lucide-react';

export default function ManagerDashboard() {
    const { user } = useAuth();
    // Get team members: employees who report to this manager
    const teamMembers = employees.filter(e => e.reportsTo === user.id);
    const teamEvals = evaluations.filter(e => teamMembers.some(m => m.id === e.employeeId));
    const pendingEvals = teamEvals.filter(e => e.status !== 'completed');
    const teamReviews = annualReviews.filter(r => teamMembers.some(m => m.id === r.employeeId));
    const upcomingReviews = teamReviews.filter(r => r.status === 'scheduled');
    const managerTeam = teams.find(t => t.leadId === user.id);

    return (
        <div>
            <div className="page-header">
                <h1>Team Dashboard</h1>
                <p>Übersicht – {managerTeam?.name || 'Mein Team'}</p>
            </div>

            <div className="grid grid-4" style={{ marginBottom: 24 }}>
                <div className="stat-card">
                    <div className="stat-card-icon blue"><Users size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{teamMembers.length}</h3>
                        <p>Teammitglieder</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon orange"><ClipboardCheck size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{pendingEvals.length}</h3>
                        <p>Bewertungen ausstehend</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon green"><Calendar size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{upcomingReviews.length}</h3>
                        <p>Gespräche geplant</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon red"><AlertTriangle size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{pendingEvals.length}</h3>
                        <p>Aktionen erforderlich</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-2">
                <div className="card">
                    <div className="card-header">
                        <h3>Mein Team</h3>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Mitarbeiter</th>
                                    <th>Position</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map(member => {
                                    const eval_ = evaluations.find(e => e.employeeId === member.id);
                                    return (
                                        <tr key={member.id}>
                                            <td>
                                                <div className="table-user">
                                                    <div className="table-avatar">{member.avatar}</div>
                                                    <div>
                                                        <div className="table-user-name">{member.name}</div>
                                                        <div className="table-user-email">{member.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{member.position}</td>
                                            <td>
                                                <span className={`badge ${eval_?.status === 'completed' ? 'badge-green' : eval_?.status === 'in_progress' ? 'badge-orange' : 'badge-gray'}`}>
                                                    {eval_?.status === 'completed' ? 'Bewertet' : eval_?.status === 'in_progress' ? 'In Arbeit' : 'Ausstehend'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3>Anstehende Aufgaben</h3>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[
                                { title: 'Bewertung für Sophie Blanc', desc: 'Halbjahresbewertung ausstehend', type: 'warning' },
                                { title: 'Jahresgespräch mit Nina Hartmann', desc: 'Geplant für 15. Januar 2026', type: 'info' },
                                { title: 'Jahresgespräch mit Fabio Rossi', desc: 'Geplant für 5. Februar 2026', type: 'info' },
                                { title: 'Förderprogramm-Empfehlung', desc: 'Laura Bianchi für Leadership Academy vorschlagen', type: 'success' },
                            ].map((task, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fafafa', borderRadius: 8, border: '1px solid #eee' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '.875rem' }}>{task.title}</div>
                                        <div style={{ fontSize: '.8125rem', color: '#9e9e9e', marginTop: 2 }}>{task.desc}</div>
                                    </div>
                                    <ChevronRight size={18} color="#bdbdbd" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
