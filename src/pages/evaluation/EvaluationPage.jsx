import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { employees, evaluations, competencyLabels, ratingLabels } from '../../data/mockData';
import { Star, Save, ChevronDown } from 'lucide-react';

function StarRating({ value, onChange, readOnly }) {
    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map(n => (
                <Star key={n} size={22} className={`star ${n <= value ? 'filled' : ''}`}
                    fill={n <= value ? '#F5A623' : 'none'}
                    onClick={() => !readOnly && onChange?.(n)} />
            ))}
        </div>
    );
}

export default function EvaluationForm() {
    const { user } = useAuth();
    const isManager = user.role === 'manager' || user.role === 'hr';
    const teamEmployees = isManager
        ? employees.filter(e => e.role === 'employee' && (e.teamId === 'entwicklung' || user.role === 'hr'))
        : [employees.find(e => e.id === user.id)];

    const [selectedEmp, setSelectedEmp] = useState(teamEmployees[0]?.id || '');
    const existing = evaluations.find(e => e.employeeId === selectedEmp && e.status === 'completed');

    const [competencies, setCompetencies] = useState(
        existing?.competencies || { fachkompetenz: 0, teamarbeit: 0, kommunikation: 0, initiative: 0, fuehrungspotenzial: 0 }
    );
    const [goalAchievement, setGoalAchievement] = useState(existing?.goalAchievement || '');
    const [overallRating, setOverallRating] = useState(existing?.overallRating || '');
    const [strengths, setStrengths] = useState(existing?.strengths || '');
    const [development, setDevelopment] = useState(existing?.development || '');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleEmpChange = (empId) => {
        setSelectedEmp(empId);
        const ex = evaluations.find(e => e.employeeId === empId && e.status === 'completed');
        if (ex) {
            setCompetencies(ex.competencies);
            setGoalAchievement(ex.goalAchievement);
            setOverallRating(ex.overallRating);
            setStrengths(ex.strengths);
            setDevelopment(ex.development);
        } else {
            setCompetencies({ fachkompetenz: 0, teamarbeit: 0, kommunikation: 0, initiative: 0, fuehrungspotenzial: 0 });
            setGoalAchievement(''); setOverallRating(''); setStrengths(''); setDevelopment('');
        }
    };

    return (
        <div>
            <div className="page-header">
                <div className="page-header-actions">
                    <div>
                        <h1>{isManager ? 'Mitarbeiterbewertung' : 'Selbstbewertung'}</h1>
                        <p>{isManager ? 'Bewerten Sie Ihre Teammitglieder' : 'Schätzen Sie Ihre eigenen Kompetenzen ein'}</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} /> {saved ? 'Gespeichert ✓' : 'Speichern'}
                    </button>
                </div>
            </div>

            {isManager && teamEmployees.length > 1 && (
                <div className="form-group">
                    <label className="form-label">Mitarbeiter auswählen</label>
                    <select className="form-select" value={selectedEmp} onChange={e => handleEmpChange(e.target.value)}>
                        {teamEmployees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.name} – {emp.position}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="card" style={{ marginBottom: 24 }}>
                <div className="card-header"><h3>1. Kompetenzbewertung</h3></div>
                <div className="card-body">
                    {Object.keys(competencyLabels).map(key => (
                        <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                            <span style={{ fontWeight: 500, fontSize: '.9375rem' }}>{competencyLabels[key]}</span>
                            <StarRating value={competencies[key] || 0} onChange={v => setCompetencies({ ...competencies, [key]: v })} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-2" style={{ marginBottom: 24 }}>
                <div className="card">
                    <div className="card-header"><h3>2. Zielerreichung</h3></div>
                    <div className="card-body">
                        <select className="form-select" value={goalAchievement} onChange={e => setGoalAchievement(e.target.value)}>
                            <option value="">Bitte auswählen...</option>
                            <option value="erreicht">Vollständig erreicht</option>
                            <option value="teilweise">Teilweise erreicht</option>
                            <option value="nicht_erreicht">Nicht erreicht</option>
                        </select>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"><h3>3. Gesamtbewertung</h3></div>
                    <div className="card-body">
                        <select className="form-select" value={overallRating} onChange={e => setOverallRating(e.target.value)}>
                            <option value="">Bitte auswählen...</option>
                            {Object.entries(ratingLabels).map(([k, v]) => (
                                <option key={k} value={k}>{k} – {v}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-2">
                <div className="card">
                    <div className="card-header"><h3>4. Stärken</h3></div>
                    <div className="card-body">
                        <textarea className="form-textarea" placeholder="Stärken des Mitarbeiters..."
                            value={strengths} onChange={e => setStrengths(e.target.value)} />
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"><h3>5. Entwicklungsfelder</h3></div>
                    <div className="card-body">
                        <textarea className="form-textarea" placeholder="Entwicklungspotenziale..."
                            value={development} onChange={e => setDevelopment(e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
