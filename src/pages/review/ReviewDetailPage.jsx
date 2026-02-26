import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { employees, annualReviews } from '../../data/mockData';
import { Save, ArrowLeft, CheckCircle, Smile, Meh, Frown } from 'lucide-react';

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

const smilies = [
    { value: 'good', icon: Smile, color: '#4CAF50' },
    { value: 'neutral', icon: Meh, color: '#FFC107' },
    { value: 'bad', icon: Frown, color: '#F44336' }
];

export default function ReviewDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [review, setReview] = useState(null);
    const [empDetails, setEmpDetails] = useState(null);
    const [mgrDetails, setMgrDetails] = useState(null);
    const [saved, setSaved] = useState(false);

    // Form State
    const [empEval, setEmpEval] = useState({
        zielerreichungsgrad: { rating: '', text: '' },
        wissen: { rating: '', text: '' },
        vorgesetzter: { rating: '', text: '' },
        beruf: { rating: '', text: '' },
        strategie: { rating: '', text: '' }
    });
    const [mgrEval, setMgrEval] = useState({
        ziele: '',
        ergaenzungen: '',
        arbeitsergebnis: {},
        verhalten: {}
    });

    useEffect(() => {
        const foundReview = annualReviews.find(r => r.id === id);
        if (foundReview) {
            setReview(foundReview);
            setEmpDetails(employees.find(e => e.id === foundReview.employeeId));
            setMgrDetails(employees.find(e => e.id === foundReview.managerId));

            if (foundReview.empEval) setEmpEval(foundReview.empEval);
            if (foundReview.mgrEval) setMgrEval(foundReview.mgrEval);
        }
    }, [id]);

    if (!review || !empDetails) return <div style={{ padding: 24 }}>Lade...</div>;

    const isManager = user.id === review.managerId;
    const isEmployee = user.id === review.employeeId;
    const canEditEmp = isEmployee || user.role === 'hr';
    const canEditMgr = isManager || user.role === 'hr';

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        // In a real app, you would save it to backend here.
        // For mock, we can just update the object reference inline (not strictly react-safe but works for mock).
        review.empEval = empEval;
        review.mgrEval = mgrEval;
    };

    const handleEmpEvalChange = (field, key, value) => {
        setEmpEval(prev => ({
            ...prev,
            [field]: { ...prev[field], [key]: value }
        }));
    };

    const renderEmployeeQuestion = (field, label) => (
        <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #f5f5f5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{label}</span>
                <div style={{ display: 'flex', gap: 12 }}>
                    {smilies.map(s => {
                        const Icon = s.icon;
                        const isSelected = empEval[field]?.rating === s.value;
                        return (
                            <button key={s.value} type="button"
                                disabled={!canEditEmp}
                                onClick={() => handleEmpEvalChange(field, 'rating', s.value)}
                                style={{
                                    background: 'none', border: 'none', cursor: canEditEmp ? 'pointer' : 'default',
                                    color: isSelected ? s.color : '#e0e0e0',
                                    transform: isSelected ? 'scale(1.2)' : 'none',
                                    transition: 'all 0.2s'
                                }}>
                                <Icon size={24} />
                            </button>
                        );
                    })}
                </div>
            </div>
            <textarea className="form-textarea" placeholder="Bitte erläutern / zusätzliche Bemerkungen"
                disabled={!canEditEmp}
                value={empEval[field]?.text} onChange={e => handleEmpEvalChange(field, 'text', e.target.value)}
                style={{ height: '80px', background: !canEditEmp ? '#f9fafb' : '#fff' }} />
        </div>
    );

    const renderRatingGridRow = (item, type) => (
        <tr key={item.id}>
            <td style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.label}</td>
            {['++', '+', '+/-', '-', '--'].map(val => (
                <td key={val} style={{ textAlign: 'center' }}>
                    <input type="radio" name={`${type}_${item.id}`} value={val}
                        disabled={!canEditMgr}
                        checked={mgrEval[type]?.[item.id] === val}
                        onChange={() => setMgrEval(prev => ({ ...prev, [type]: { ...prev[type], [item.id]: val } }))}
                    />
                </td>
            ))}
        </tr>
    );

    return (
        <div>
            <div className="page-header">
                <div className="page-header-actions">
                    <button className="btn btn-ghost" onClick={() => navigate('/reviews')} style={{ paddingLeft: 0 }}>
                        <ArrowLeft size={18} /> Zurück
                    </button>
                    <div>
                        <h1>Halb- & Ganzjahresgespräch</h1>
                        <p>{empDetails.name} – {empDetails.position}</p>
                    </div>
                </div>
                <div className="page-header-actions">
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} /> {saved ? 'Gespeichert ✓' : 'Speichern'}
                    </button>
                </div>
            </div>

            <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid #DFDD13' }}>
                <div className="card-header"><h3>Durch Mitarbeiter auszufüllen (Sichtweise von)</h3></div>
                <div className="card-body">
                    {renderEmployeeQuestion('zielerreichungsgrad', 'Mit meinem Zielerreichungsgrad bin ich wie folgt zufrieden:')}
                    {renderEmployeeQuestion('wissen', 'Mit meinem Wissen bin ich wie folgt zufrieden:')}
                    {renderEmployeeQuestion('vorgesetzter', 'Mein Vorgesetzter kommuniziert seine Erwartungen, fördert und fordert mich:')}
                    {renderEmployeeQuestion('beruf', 'Mit meinem Beruf als Versicherungsberater bin ich wie folgt zufrieden:')}
                    {renderEmployeeQuestion('strategie', 'Ich kenne die GA Strategie / Vision:')}
                </div>
            </div>

            <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid #DFDD13' }}>
                <div className="card-header"><h3>Mit Vorgesetztem ausfüllen</h3></div>
                <div className="card-body">
                    <div className="form-group">
                        <label className="form-label">Definierte Ziele & Massnahmen für die folgende Beurteilungsperiode</label>
                        <textarea className="form-textarea" placeholder="Ziele und Massnahmen..."
                            disabled={!canEditMgr}
                            value={mgrEval.ziele} onChange={e => setMgrEval(prev => ({ ...prev, ziele: e.target.value }))}
                            style={{ height: '100px', background: !canEditMgr ? '#f9fafb' : '#fff' }} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Ergänzungen und Kommentare der Beteiligten</label>
                        <textarea className="form-textarea" placeholder="Allgemeine Kommentare..."
                            disabled={!canEditMgr}
                            value={mgrEval.ergaenzungen} onChange={e => setMgrEval(prev => ({ ...prev, ergaenzungen: e.target.value }))}
                            style={{ height: '100px', background: !canEditMgr ? '#f9fafb' : '#fff' }} />
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: 24 }}>
                <div className="card-header" style={{ background: '#FFEC00', borderBottom: '1px solid #e0e0e0' }}>
                    <h3 style={{ color: '#000' }}>Arbeitsergebnis</h3>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <table className="data-table">
                        <thead style={{ background: '#FFEC00' }}>
                            <tr>
                                <th style={{ color: '#000' }}>Kriterium</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>++</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>+</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>+/-</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>-</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>--</th>
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
                    <h3 style={{ color: '#000' }}>Wirkung & Verhalten als Mitarbeiter</h3>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <table className="data-table">
                        <thead style={{ background: '#FFEC00' }}>
                            <tr>
                                <th style={{ color: '#000' }}>Kriterium</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>++</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>+</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>+/-</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>-</th>
                                <th style={{ textAlign: 'center', width: 60, color: '#000' }}>--</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criteriaVerhalten.map(c => renderRatingGridRow(c, 'verhalten'))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
