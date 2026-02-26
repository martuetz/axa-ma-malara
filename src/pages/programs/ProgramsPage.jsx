import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePrograms } from '../../context/ProgramContext';
import { enrollments, employees } from '../../data/mockData';
import { GraduationCap, Clock, Users, CheckCircle, BookOpen, Award, Plus, Pencil, Trash2, X } from 'lucide-react';

export default function ProgramsPage() {
    const { user } = useAuth();
    const { programs, addProgram, updateProgram, deleteProgram } = usePrograms();
    const isManager = user.role === 'manager' || user.role === 'hr';
    const isHr = user.role === 'hr';
    const [activeTab, setActiveTab] = useState('catalog');
    const [selectedProgram, setSelectedProgram] = useState(null); // For viewing
    const [managingProgram, setManagingProgram] = useState(null); // For editing/adding
    const myEnrollments = enrollments.filter(en => en.employeeId === user.id);

    const categoryColors = {
        'Führung': 'blue', 'Digital': 'green', 'Fachlich': 'orange', 'Karriere': 'red', 'Methodik': 'blue',
    };

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>Förderprogramme</h1>
                    <p>Entwicklungsprogramme für Ihre berufliche Weiterbildung</p>
                </div>
                {isHr && activeTab === 'catalog' && (
                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                        onClick={() => setManagingProgram({
                            name: '', description: '', duration: '', target: '', category: 'Führung',
                            maxParticipants: 10, currentParticipants: 0, modules: [],
                            startDate: '', endDate: '', status: 'geplant'
                        })}>
                        <Plus size={18} />
                        Programm Hinzufügen
                    </button>
                )}
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
                            <div className="card-header" style={{ alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '.9375rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                        <GraduationCap size={20} color="#00008F" />
                                        {prog.name}
                                    </h3>
                                    <span className={`badge badge-${categoryColors[prog.category]}`}>{prog.category}</span>
                                </div>
                                {isHr && (
                                    <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                                        <button className="btn btn-ghost btn-sm" style={{ padding: 6 }} title="Bearbeiten" onClick={() => setManagingProgram(prog)}>
                                            <Pencil size={14} />
                                        </button>
                                        <button className="btn btn-ghost btn-sm" style={{ padding: 6, color: 'var(--red)' }} title="Löschen" onClick={() => {
                                            if (window.confirm('Möchten Sie dieses Programm wirklich löschen?')) {
                                                deleteProgram(prog.id);
                                            }
                                        }}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                )}
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

            {selectedProgram && (() => {
                const progFull = selectedProgram.currentParticipants >= selectedProgram.maxParticipants;
                return (
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
                                <button className="btn btn-primary" disabled={progFull}>
                                    {progFull ? 'Ausgebucht' : 'Einschreiben'}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {managingProgram && (
                <ManageProgramModal
                    program={managingProgram}
                    onClose={() => setManagingProgram(null)}
                    onSave={(data) => {
                        if (data.id) {
                            updateProgram(data.id, data);
                        } else {
                            addProgram(data);
                        }
                        setManagingProgram(null);
                    }}
                />
            )}
        </div>
    );
}

function ManageProgramModal({ program, onClose, onSave }) {
    const [formData, setFormData] = useState({ ...program });
    const [newModule, setNewModule] = useState('');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddModule = () => {
        if (!newModule.trim()) return;
        setFormData(prev => ({ ...prev, modules: [...prev.modules, newModule.trim()] }));
        setNewModule('');
    };

    const handleRemoveModule = (index) => {
        setFormData(prev => ({
            ...prev,
            modules: prev.modules.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ maxWidth: 640 }} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{formData.id ? 'Programm bearbeiten' : 'Neues Programm erstellen'}</h2>
                    <button className="modal-close" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <div className="grid grid-2" style={{ gap: 16 }}>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="form-label">Titel *</label>
                            <input className="form-input" value={formData.name} onChange={e => handleChange('name', e.target.value)} placeholder="z.B. Leadership Academy" required />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="form-label">Beschreibung *</label>
                            <textarea className="form-input" style={{ minHeight: 80, resize: 'vertical' }} value={formData.description} onChange={e => handleChange('description', e.target.value)} placeholder="Programmbeschreibung..." required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Kategorie *</label>
                            <select className="form-select" value={formData.category} onChange={e => handleChange('category', e.target.value)}>
                                <option value="Führung">Führung</option>
                                <option value="Digital">Digital</option>
                                <option value="Fachlich">Fachlich</option>
                                <option value="Karriere">Karriere</option>
                                <option value="Methodik">Methodik</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Status *</label>
                            <select className="form-select" value={formData.status} onChange={e => handleChange('status', e.target.value)}>
                                <option value="active">Aktiv</option>
                                <option value="geplant">Geplant</option>
                                <option value="abgeschlossen">Abgeschlossen</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Dauer (z.B. "6 Monate")</label>
                            <input className="form-input" value={formData.duration} onChange={e => handleChange('duration', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Zielgruppe (z.B. "Führungskräfte")</label>
                            <input className="form-input" value={formData.target} onChange={e => handleChange('target', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Maximale Teilnehmer</label>
                            <input className="form-input" type="number" min="1" value={formData.maxParticipants} onChange={e => handleChange('maxParticipants', parseInt(e.target.value) || 0)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Startdatum</label>
                            <input className="form-input" type="date" value={formData.startDate} onChange={e => handleChange('startDate', e.target.value)} />
                        </div>

                        <div className="form-group" style={{ gridColumn: '1 / -1', marginTop: 8 }}>
                            <label className="form-label">Module</label>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                <input className="form-input" value={newModule} onChange={e => setNewModule(e.target.value)} placeholder="Neues Modul eingeben" onKeyDown={e => { if (e.key === 'Enter') handleAddModule(); }} />
                                <button type="button" className="btn btn-secondary" onClick={handleAddModule}>Hinzufügen</button>
                            </div>
                            {formData.modules.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {formData.modules.map((m, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f5f5f5', borderRadius: 8 }}>
                                            <span style={{ fontSize: '.875rem' }}>{m}</span>
                                            <button type="button" className="btn btn-ghost btn-sm" style={{ padding: 4, color: 'var(--red)' }} onClick={() => handleRemoveModule(i)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Abbrechen</button>
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={!formData.name.trim() || !formData.description.trim()}>
                        {formData.id ? 'Speichern' : 'Programm erstellen'}
                    </button>
                </div>
            </div>
        </div>
    );
}
