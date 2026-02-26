import { useState, useEffect } from 'react';
import { employees } from '../../data/mockData';
import { Save } from 'lucide-react';

const criteriaArbeitsergebnis = [
    { id: 'svp', label: 'SVP' },
    { id: 'ngAe', label: 'NG & AE' },
    { id: 'ablaufquote', label: 'Ablaufquote' },
    { id: 'annullationsquote', label: 'Annullationsquote' },
    { id: 'neugeschaefte', label: 'Neugeschäfte U' },
    { id: 'produktionLeben', label: 'Produktion Leben' },
    { id: 'produktionHealth', label: 'Produktion Health' },
    { id: 'provisionen', label: 'Provisionen' }
];

const criteriaVerhalten = [
    { id: 'eigenverantwortung', label: 'Eigenverantwortung' },
    { id: 'fachkompetenz', label: 'Fachkompetenz' },
    { id: 'belastbarkeit', label: 'Belastbarkeit' },
    { id: 'einsatz', label: 'Einsatz & Fleiss' },
    { id: 'kommunikation', label: 'Kommunikationsfähigkeit' },
    { id: 'konfliktfaehigkeit', label: 'Konfliktfähigkeit' },
    { id: 'teamfaehigkeit', label: 'Teamfähigkeit' },
    { id: 'integration', label: 'Integrationsfähigkeit' },
    { id: 'arbeitstechnik', label: 'Arbeitstechnik' },
    { id: 'zuverlaessigkeit', label: 'Zuverlässigkeit' },
    { id: 'organisation', label: 'Organisation' },
    { id: 'prioritaet', label: 'Prioritätensetzung' }
];

export default function NewReviewModal({ isOpen, onClose, onSubmit, user }) {
    if (!isOpen) return null;

    const teamEmployees = employees.filter(e => e.role === 'employee' && (e.departmentId === user.departmentId || user.role === 'hr'));

    const [selectedEmp, setSelectedEmp] = useState(teamEmployees[0]?.id || '');
    const [scheduledDate, setScheduledDate] = useState('');
    const [mgrEval, setMgrEval] = useState({
        ziele: '',
        ergaenzungen: '',
        arbeitsergebnis: {},
        verhalten: {}
    });

    // Reset when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedEmp(teamEmployees[0]?.id || '');
            setScheduledDate('');
            setMgrEval({ ziele: '', ergaenzungen: '', arbeitsergebnis: {}, verhalten: {} });
        }
    }, [isOpen]);

    const handleSave = () => {
        if (!selectedEmp || !scheduledDate) {
            alert('Bitte wählen Sie einen Mitarbeiter und ein Datum aus.');
            return;
        }

        const newReview = {
            id: `rev-${Date.now()}`,
            employeeId: selectedEmp,
            managerId: user.id,
            year: new Date(scheduledDate).getFullYear(),
            status: 'completed', // we consider it 'completed' meaning the manager has done their part, or maybe 'scheduled'. We will set to 'scheduled' and the UI can show the form as draft, or set to completed if they filled everything out. Let's make it 'scheduled'.
            scheduledDate: scheduledDate,
            completedDate: null,
            retrospective: '',
            goals: [],
            newGoals: [],
            developmentWishes: '',
            feedback: '',
            signedByEmployee: false,
            signedByManager: true, // Manager signed since they fill it now
            mgrEval: mgrEval,
            empEval: { // Start with empty emp Eval
                zielerreichungsgrad: { rating: '', text: '' },
                wissen: { rating: '', text: '' },
                vorgesetzter: { rating: '', text: '' },
                beruf: { rating: '', text: '' },
                strategie: { rating: '', text: '' }
            }
        };

        onSubmit(newReview);
    };

    const renderRatingGridRow = (item, type) => (
        <tr key={item.id}>
            <td style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.label}</td>
            {['++', '+', '+/-', '-', '--'].map(val => (
                <td key={val} style={{ textAlign: 'center', padding: '8px' }}>
                    <input type="radio" name={`modal_${type}_${item.id}`} value={val}
                        checked={mgrEval[type]?.[item.id] === val}
                        onChange={() => setMgrEval(prev => ({ ...prev, [type]: { ...prev[type], [item.id]: val } }))}
                    />
                </td>
            ))}
        </tr>
    );

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
            <div className="modal" style={{ maxWidth: 850, maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Neues Jahresgespräch planen</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body" style={{ padding: 24 }}>
                    <div className="grid grid-2" style={{ marginBottom: 24 }}>
                        <div className="form-group">
                            <label className="form-label">Mitarbeiter auswählen</label>
                            <select className="form-select" value={selectedEmp} onChange={e => setSelectedEmp(e.target.value)}>
                                {teamEmployees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name} – {emp.position}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Datum des Gesprächs</label>
                            <input type="date" className="form-input" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid #DFDD13' }}>
                        <div className="card-header"><h3>Fragebogen Führungskraft</h3></div>
                        <div className="card-body">
                            <div className="form-group">
                                <label className="form-label">Definierte Ziele & Massnahmen für die folgende Beurteilungsperiode</label>
                                <textarea className="form-textarea" placeholder="Ziele und Massnahmen..."
                                    value={mgrEval.ziele} onChange={e => setMgrEval(prev => ({ ...prev, ziele: e.target.value }))}
                                    style={{ height: '80px' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Ergänzungen und Kommentare der Beteiligten</label>
                                <textarea className="form-textarea" placeholder="Allgemeine Kommentare..."
                                    value={mgrEval.ergaenzungen} onChange={e => setMgrEval(prev => ({ ...prev, ergaenzungen: e.target.value }))}
                                    style={{ height: '80px' }} />
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ marginBottom: 24 }}>
                        <div className="card-header" style={{ background: '#FFEC00', borderBottom: '1px solid #e0e0e0' }}>
                            <h3 style={{ color: '#000', margin: 0 }}>Arbeitsergebnis</h3>
                        </div>
                        <div className="card-body" style={{ padding: 0 }}>
                            <table className="data-table">
                                <thead style={{ background: '#f5f5f5' }}>
                                    <tr>
                                        <th>Kriterium</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>++</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>+</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>+/-</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>-</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>--</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {criteriaArbeitsergebnis.map(c => renderRatingGridRow(c, 'arbeitsergebnis'))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card" style={{ marginBottom: 24 }}>
                        <div className="card-header" style={{ background: '#FFEC00', borderBottom: '1px solid #e0e0e0' }}>
                            <h3 style={{ color: '#000', margin: 0 }}>Wirkung & Verhalten als Mitarbeiter</h3>
                        </div>
                        <div className="card-body" style={{ padding: 0 }}>
                            <table className="data-table">
                                <thead style={{ background: '#f5f5f5' }}>
                                    <tr>
                                        <th>Kriterium</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>++</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>+</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>+/-</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>-</th>
                                        <th style={{ textAlign: 'center', width: 60 }}>--</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {criteriaVerhalten.map(c => renderRatingGridRow(c, 'verhalten'))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="modal-footer" style={{ borderTop: '1px solid #f5f5f5', padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <button className="btn btn-ghost" onClick={onClose}>Abbrechen</button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} /> Gespräch planen & speichern
                    </button>
                </div>
            </div>
        </div>
    );
}
