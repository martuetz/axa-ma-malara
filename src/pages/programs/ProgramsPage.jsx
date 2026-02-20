import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { programs, enrollments, employees } from '../../data/mockData';
import { GraduationCap, Clock, Users, CheckCircle, BookOpen, Award } from 'lucide-react';

export default function ProgramsPage() {
    const { user } = useAuth();
    const isManager = user.role === 'manager' || user.role === 'hr';
    const [activeTab, setActiveTab] = useState('catalog');
    const [selectedProgram, setSelectedProgram] = useState(null);
    const myEnrollments = enrollments.filter(en => en.employeeId === user.id);

    const categoryColors = {
        'Führung': 'blue', 'Digital': 'green', 'Fachlich': 'orange', 'Karriere': 'red', 'Methodik': 'blue',
    };

    return (
        <div>
            <div className="page-header">
                <h1>Förderprogramme</h1>
                <p>Entwicklungsprogramme für Ihre berufliche Weiterbildung</p>
            </div>

            <div className="tabs">
                <button className={`tab ${activeTab === 'catalog' ? 'active' : ''}`} onClick={() => setActiveTab('catalog')}>Programmkatalog</button>
                <button className={`tab ${activeTab === 'my' ? 'active' : ''}`} onClick={() => setActiveTab('my')}>
                    {isManager ? 'Einschreibungen' : 'Meine Programme'}
                </button>
            </div>

            {activeTab === 'catalog' && (
                <div className="grid grid-2">
                    {programs.map(prog => (
                        <div className="card" key={prog.id} style={{ cursor: 'pointer' }}
                            onClick={() => setSelectedProgram(prog)}>
                            <div className="card-header">
                                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '.9375rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <GraduationCap size={20} color="#00008F" />
                                    {prog.name}
                                </h3>
                                <span className={`badge badge-${categoryColors[prog.category]}`}>{prog.category}</span>
                            </div>
                            <div className="card-body">
                                <p style={{ fontSize: '.875rem', color: '#616161', lineHeight: 1.6, marginBottom: 16 }}>{prog.description}</p>
                                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Clock size={16} color="#9e9e9e" />
                                        <span className="text-sm">{prog.duration}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Users size={16} color="#9e9e9e" />
                                        <span className="text-sm">{prog.currentParticipants}/{prog.maxParticipants}</span>
                                    </div>
                                </div>
                                <div className="progress-bar" style={{ marginBottom: 8 }}>
                                    <div className="progress-bar-fill" style={{ width: `${(prog.currentParticipants / prog.maxParticipants) * 100}%` }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-sm text-muted">Zielgruppe: {prog.target}</span>
                                    <span className="badge badge-green">{prog.status === 'active' ? 'Aktiv' : 'Geplant'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'my' && (
                <>
                    {isManager ? (
                        <div className="card">
                            <div className="card-header"><h3>Alle Einschreibungen</h3></div>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Mitarbeiter</th>
                                            <th>Programm</th>
                                            <th>Fortschritt</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enrollments.map(en => {
                                            const emp = employees.find(e => e.id === en.employeeId);
                                            const prog = programs.find(p => p.id === en.programId);
                                            return (
                                                <tr key={en.id}>
                                                    <td>
                                                        <div className="table-user">
                                                            <div className="table-avatar">{emp?.avatar}</div>
                                                            <div>
                                                                <div className="table-user-name">{emp?.name}</div>
                                                                <div className="table-user-email">{emp?.position}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span style={{ fontWeight: 500 }}>{prog?.name}</span>
                                                    </td>
                                                    <td style={{ width: 180 }}>
                                                        <div className="progress-bar" style={{ marginBottom: 4 }}>
                                                            <div className={`progress-bar-fill ${en.progress >= 80 ? 'green' : en.progress >= 40 ? '' : 'orange'}`}
                                                                style={{ width: `${en.progress}%` }} />
                                                        </div>
                                                        <span className="text-sm text-muted">{en.progress}%</span>
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${en.status === 'completed' ? 'badge-green' : 'badge-blue'}`}>
                                                            {en.status === 'completed' ? 'Abgeschlossen' : 'Aktiv'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-2">
                            {myEnrollments.length > 0 ? myEnrollments.map(en => {
                                const prog = programs.find(p => p.id === en.programId);
                                return (
                                    <div className="card" key={en.id}>
                                        <div className="card-header">
                                            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '.9375rem' }}>{prog?.name}</h3>
                                            <span className="badge badge-blue">Aktiv</span>
                                        </div>
                                        <div className="card-body">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                                <span className="text-sm text-muted">Fortschritt</span>
                                                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--axa-blue)' }}>{en.progress}%</span>
                                            </div>
                                            <div className="progress-bar" style={{ height: 12, marginBottom: 16 }}>
                                                <div className="progress-bar-fill" style={{ width: `${en.progress}%` }} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                {prog?.modules.map((m, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.875rem' }}>
                                                        {en.completedModules.includes(m)
                                                            ? <CheckCircle size={16} color="#1CC54E" />
                                                            : <BookOpen size={16} color="#bdbdbd" />}
                                                        <span style={{ color: en.completedModules.includes(m) ? '#212121' : '#9e9e9e' }}>{m}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="card" style={{ gridColumn: '1 / -1' }}>
                                    <div className="empty-state">
                                        <GraduationCap size={48} />
                                        <h3>Keine Programme</h3>
                                        <p>Sie sind aktuell in keinem Förderprogramm eingeschrieben.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {selectedProgram && (
                <div className="modal-overlay" onClick={() => setSelectedProgram(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedProgram.name}</h2>
                            <button className="modal-close" onClick={() => setSelectedProgram(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p style={{ marginBottom: 16, lineHeight: 1.6 }}>{selectedProgram.description}</p>
                            <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
                                <div><span className="text-sm text-muted">Dauer</span><div style={{ fontWeight: 600 }}>{selectedProgram.duration}</div></div>
                                <div><span className="text-sm text-muted">Zielgruppe</span><div style={{ fontWeight: 600 }}>{selectedProgram.target}</div></div>
                                <div><span className="text-sm text-muted">Plätze</span><div style={{ fontWeight: 600 }}>{selectedProgram.currentParticipants}/{selectedProgram.maxParticipants}</div></div>
                            </div>
                            <div className="form-label">Module</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {selectedProgram.modules.map((m, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f5f5f5', borderRadius: 8 }}>
                                        <Award size={16} color="#00008F" />
                                        <span style={{ fontSize: '.875rem', fontWeight: 500 }}>{m}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={() => setSelectedProgram(null)}>Schliessen</button>
                            <button className="btn btn-primary">Einschreiben</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
