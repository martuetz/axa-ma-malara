import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { employees, annualReviews, goalStatusLabels } from '../../data/mockData';
import { Calendar, CheckCircle, Clock, FileText, Save, Plus, Target } from 'lucide-react';
import NewReviewModal from './NewReviewModal';

export default function ReviewPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isManager = user.role === 'manager' || user.role === 'hr';
    const relevantReviews = isManager
        ? annualReviews
        : annualReviews.filter(r => r.employeeId === user.id);

    const [activeTab, setActiveTab] = useState('overview');
    const [selectedReview, setSelectedReview] = useState(null);
    const [isNewReviewModalOpen, setIsNewReviewModalOpen] = useState(false);

    const handleNewReviewSubmit = (newReview) => {
        annualReviews.unshift(newReview);
        setIsNewReviewModalOpen(false);
    };

    return (
        <div>
            <div className="page-header">
                <div className="page-header-actions">
                    <div>
                        <h1>Jahresgespräche</h1>
                        <p>{isManager ? 'Verwalten Sie die Jahresgespräche Ihres Teams' : 'Ihre Jahresgespräche im Überblick'}</p>
                    </div>
                    {isManager && (
                        <button className="btn btn-primary" onClick={() => setIsNewReviewModalOpen(true)}>
                            <Plus size={18} /> Neues Gespräch planen
                        </button>
                    )}
                </div>
            </div>

            <div className="tabs">
                <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Übersicht</button>
                <button className={`tab ${activeTab === 'goals' ? 'active' : ''}`} onClick={() => setActiveTab('goals')}>Zielvereinbarungen</button>
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-2">
                    {relevantReviews.map(review => {
                        const emp = employees.find(e => e.id === review.employeeId);
                        const mgr = employees.find(e => e.id === review.managerId);
                        return (
                            <div className="card" key={review.id} onClick={() => navigate(`/reviews/${review.id}`)}
                                style={{ cursor: 'pointer' }}>
                                <div className="card-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div className="table-avatar">{emp?.avatar}</div>
                                        <div>
                                            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '.9375rem' }}>{emp?.name}</h3>
                                            <span className="text-sm text-muted">{emp?.position}</span>
                                        </div>
                                    </div>
                                    <span className={`badge ${review.status === 'completed' ? 'badge-green' : 'badge-orange'}`}>
                                        {review.status === 'completed' ? 'Abgeschlossen' : 'Geplant'}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <Calendar size={16} color="#9e9e9e" />
                                            <span className="text-sm">{review.scheduledDate ? new Date(review.scheduledDate).toLocaleDateString('de-CH') : '–'}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <FileText size={16} color="#9e9e9e" />
                                            <span className="text-sm">{review.goals?.length || 0} Ziele</span>
                                        </div>
                                    </div>
                                    {review.status === 'completed' && review.goals?.length > 0 && (
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            {review.goals.map((g, i) => (
                                                <span key={i} className={`badge ${g.status === 'erreicht' ? 'badge-green' : g.status === 'teilweise' ? 'badge-orange' : 'badge-red'}`}>
                                                    {g.text.substring(0, 25)}...
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {review.status === 'completed' && (
                                        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                                            {review.signedByEmployee && <span className="badge badge-green"><CheckCircle size={12} /> Mitarbeiter</span>}
                                            {review.signedByManager && <span className="badge badge-green"><CheckCircle size={12} /> Vorgesetzter</span>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {activeTab === 'goals' && (
                <div className="card">
                    <div className="card-header"><h3>Zielvereinbarungen 2025</h3></div>
                    <div className="card-body" style={{ padding: 0 }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Mitarbeiter</th>
                                    <th>Ziel</th>
                                    <th>Status</th>
                                    <th>Fortschritt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relevantReviews.filter(r => r.goals?.length > 0).flatMap(r =>
                                    r.goals.map((g, i) => {
                                        const emp = employees.find(e => e.id === r.employeeId);
                                        return (
                                            <tr key={`${r.id}-${i}`}>
                                                <td>
                                                    <div className="table-user">
                                                        <div className="table-avatar">{emp?.avatar}</div>
                                                        <span className="table-user-name">{emp?.name}</span>
                                                    </div>
                                                </td>
                                                <td>{g.text}</td>
                                                <td>
                                                    <span className={`badge ${g.status === 'erreicht' ? 'badge-green' : g.status === 'teilweise' ? 'badge-orange' : 'badge-red'}`}>
                                                        {goalStatusLabels[g.status]}
                                                    </span>
                                                </td>
                                                <td style={{ width: 150 }}>
                                                    <div className="progress-bar">
                                                        <div className={`progress-bar-fill ${g.progress >= 80 ? 'green' : g.progress >= 40 ? 'orange' : 'red'}`}
                                                            style={{ width: `${g.progress}%` }} />
                                                    </div>
                                                    <span className="text-sm text-muted">{g.progress}%</span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Review Detail Modal */}
            {selectedReview && selectedReview.status === 'completed' && (
                <div className="modal-overlay" onClick={() => setSelectedReview(null)}>
                    <div className="modal" style={{ maxWidth: 700 }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Jahresgespräch – {employees.find(e => e.id === selectedReview.employeeId)?.name}</h2>
                            <button className="modal-close" onClick={() => setSelectedReview(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Rückblick</label>
                                <p style={{ fontSize: '.9375rem', lineHeight: 1.6 }}>{selectedReview.retrospective}</p>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Zielbewertung</label>
                                {selectedReview.goals?.map((g, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                                        <span style={{ fontSize: '.875rem' }}>{g.text}</span>
                                        <span className={`badge ${g.status === 'erreicht' ? 'badge-green' : g.status === 'teilweise' ? 'badge-orange' : 'badge-red'}`}>
                                            {goalStatusLabels[g.status]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {selectedReview.newGoals?.length > 0 && (
                                <div className="form-group">
                                    <label className="form-label">Neue Ziele 2026</label>
                                    {selectedReview.newGoals.map((g, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                                            <span style={{ fontSize: '.875rem' }}>{g.text}</span>
                                            <span className="text-sm text-muted">bis {new Date(g.deadline).toLocaleDateString('de-CH')}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="form-group">
                                <label className="form-label">Entwicklungswünsche</label>
                                <p style={{ fontSize: '.9375rem' }}>{selectedReview.developmentWishes}</p>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Feedback</label>
                                <p style={{ fontSize: '.9375rem' }}>{selectedReview.feedback}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={() => setSelectedReview(null)}>Schliessen</button>
                        </div>
                    </div>
                </div>
            )}

            <NewReviewModal
                isOpen={isNewReviewModalOpen}
                onClose={() => setIsNewReviewModalOpen(false)}
                onSubmit={handleNewReviewSubmit}
                user={user}
            />
        </div>
    );
}
