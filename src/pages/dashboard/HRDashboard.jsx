import { useAuth } from '../../context/AuthContext';
import { employees, evaluations, annualReviews, enrollments, departments, programs } from '../../data/mockData';
import { Users, ClipboardCheck, Calendar, GraduationCap, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function HRDashboard() {
    const totalEmployees = employees.length;
    const completedEvals = evaluations.filter(e => e.status === 'completed').length;
    const totalEvals = evaluations.length;
    const completedReviews = annualReviews.filter(r => r.status === 'completed').length;
    const totalReviews = annualReviews.length;
    const totalEnrollments = enrollments.length;

    const ratingDist = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    evaluations.filter(e => e.overallRating).forEach(e => { ratingDist[e.overallRating]++; });

    const deptData = departments.map(d => ({
        name: d.name,
        count: employees.filter(e => e.departmentId === d.id).length,
    }));

    const barData = {
        labels: deptData.map(d => d.name),
        datasets: [{
            label: 'Mitarbeiter',
            data: deptData.map(d => d.count),
            backgroundColor: '#00008F',
            borderRadius: 6,
        }],
    };

    const doughnutData = {
        labels: ['A – Herausragend', 'B – Übertrifft', 'C – Entspricht', 'Ausstehend'],
        datasets: [{
            data: [ratingDist.A, ratingDist.B, ratingDist.C, totalEvals - completedEvals],
            backgroundColor: ['#1CC54E', '#4976BA', '#F5A623', '#E0E0E0'],
            borderWidth: 0,
        }],
    };

    const chartOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
    };

    return (
        <div>
            <div className="page-header">
                <h1>HR Dashboard</h1>
                <p>Unternehmensweite Übersicht aller Mitarbeiterprozesse</p>
            </div>

            <div className="grid grid-4" style={{ marginBottom: 24 }}>
                <div className="stat-card">
                    <div className="stat-card-icon blue"><Users size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{totalEmployees}</h3>
                        <p>Mitarbeiter gesamt</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon green"><ClipboardCheck size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{Math.round((completedEvals / totalEvals) * 100)}%</h3>
                        <p>Bewertungen abgeschlossen</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon orange"><Calendar size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{completedReviews}/{totalReviews}</h3>
                        <p>Jahresgespräche erledigt</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon red"><GraduationCap size={24} /></div>
                    <div className="stat-card-content">
                        <h3>{totalEnrollments}</h3>
                        <p>Programm-Einschreibungen</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-2">
                <div className="card">
                    <div className="card-header"><h3>Mitarbeiter pro Abteilung</h3></div>
                    <div className="card-body">
                        <div style={{ height: 260 }}>
                            <Bar data={barData} options={chartOpts} />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"><h3>Bewertungsverteilung</h3></div>
                    <div className="card-body">
                        <div style={{ height: 260, display: 'flex', justifyContent: 'center' }}>
                            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: 24 }}>
                <div className="card-header"><h3>Aktuelle Aktivitäten</h3></div>
                <div className="card-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { icon: CheckCircle, color: '#1CC54E', text: 'Nina Hartmanns Bewertung wurde abgeschlossen', time: 'vor 2 Stunden' },
                            { icon: Clock, color: '#F5A623', text: 'Jahresgespräch mit Fabio Rossi steht am 05.02. an', time: 'vor 1 Tag' },
                            { icon: AlertCircle, color: '#E30613', text: '2 Bewertungen sind noch ausstehend', time: 'vor 3 Tagen' },
                            { icon: TrendingUp, color: '#4976BA', text: 'Digital Skills Bootcamp: 22 von 30 Plätzen belegt', time: 'vor 5 Tagen' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < 3 ? '1px solid #f5f5f5' : 'none' }}>
                                <item.icon size={20} color={item.color} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '.875rem', fontWeight: 500 }}>{item.text}</div>
                                    <div style={{ fontSize: '.75rem', color: '#9e9e9e' }}>{item.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
