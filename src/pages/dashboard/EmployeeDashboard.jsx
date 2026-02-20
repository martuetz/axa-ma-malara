import { useAuth } from '../../context/AuthContext';
import { evaluations, annualReviews, enrollments, programs, competencyLabels } from '../../data/mockData';
import { Star, Calendar, GraduationCap, Target, TrendingUp } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler);

export default function EmployeeDashboard() {
    const { user } = useAuth();
    const myEvals = evaluations.filter(e => e.employeeId === user.id);
    const latestEval = myEvals.find(e => e.status === 'completed');
    const myReviews = annualReviews.filter(r => r.employeeId === user.id);
    const latestReview = myReviews[0];
    const myEnrollments = enrollments.filter(en => en.employeeId === user.id);
    const myProgram = myEnrollments[0];
    const program = myProgram ? programs.find(p => p.id === myProgram.programId) : null;

    const radarData = latestEval ? {
        labels: Object.keys(latestEval.competencies).map(k => competencyLabels[k]),
        datasets: [{
            label: 'Meine Bewertung',
            data: Object.values(latestEval.competencies),
            backgroundColor: 'rgba(0, 0, 143, 0.15)',
            borderColor: '#00008F',
            borderWidth: 2,
            pointBackgroundColor: '#00008F',
        }],
    } : null;

    return (
        <div>
            <div className="page-header">
                <h1>Willkommen, {user.name.split(' ')[0]}!</h1>
                <p>Ihre persönliche Übersicht</p>
            </div>

            <div className="grid grid-4" style={{ marginBottom: 24 }}>
                <div className="stat-card">
                    <div className="stat-card-icon blue"><Star size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{latestEval?.overallRating || '–'}</h3>
                        <p>Letzte Bewertung</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon green"><Target size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{latestReview?.goals?.filter(g => g.status === 'erreicht').length || 0}/{latestReview?.goals?.length || 0}</h3>
                        <p>Ziele erreicht</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon orange"><Calendar size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{latestReview?.scheduledDate ? new Date(latestReview.scheduledDate).toLocaleDateString('de-CH') : '–'}</h3>
                        <p>Nächstes Gespräch</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon red"><GraduationCap size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{myProgram?.progress || 0}%</h3>
                        <p>Programm-Fortschritt</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-2">
                {radarData && (
                    <div className="card">
                        <div className="card-header"><h3>Kompetenzprofil</h3></div>
                        <div className="card-body">
                            <div style={{ height: 280, display: 'flex', justifyContent: 'center' }}>
                                <Radar data={radarData} options={{
                                    responsive: true, maintainAspectRatio: false,
                                    scales: { r: { min: 0, max: 5, ticks: { stepSize: 1 } } },
                                    plugins: { legend: { display: false } },
                                }} />
                            </div>
                        </div>
                    </div>
                )}

                <div className="card">
                    <div className="card-header"><h3>Meine Ziele</h3></div>
                    <div className="card-body">
                        {latestReview?.goals?.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {latestReview.goals.map((goal, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                            <span style={{ fontSize: '.875rem', fontWeight: 500 }}>{goal.text}</span>
                                            <span className={`badge ${goal.status === 'erreicht' ? 'badge-green' : goal.status === 'teilweise' ? 'badge-orange' : 'badge-red'}`}>
                                                {goal.status === 'erreicht' ? 'Erreicht' : goal.status === 'teilweise' ? 'Teilweise' : 'Offen'}
                                            </span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className={`progress-bar-fill ${goal.progress >= 80 ? 'green' : goal.progress >= 40 ? 'orange' : 'red'}`} style={{ width: `${goal.progress}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted text-center">Keine Ziele definiert</p>
                        )}
                    </div>
                </div>
            </div>

            {program && (
                <div className="card" style={{ marginTop: 24 }}>
                    <div className="card-header">
                        <h3>Aktuelles Förderprogramm</h3>
                        <span className="badge badge-blue">{program.category}</span>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div>
                                <h4 style={{ fontFamily: 'var(--font-body)' }}>{program.name}</h4>
                                <p className="text-sm text-muted" style={{ marginTop: 4 }}>{program.description}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--axa-blue)' }}>{myProgram.progress}%</div>
                                <div className="text-sm text-muted">abgeschlossen</div>
                            </div>
                        </div>
                        <div className="progress-bar" style={{ height: 12 }}>
                            <div className="progress-bar-fill" style={{ width: `${myProgram.progress}%` }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                            {program.modules.map((m, i) => (
                                <span key={i} className={`badge ${myProgram.completedModules.includes(m) ? 'badge-green' : 'badge-gray'}`}>
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
