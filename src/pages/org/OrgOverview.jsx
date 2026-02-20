import { departments, teams, employees } from '../../data/mockData';
import { Building2, Users, TrendingUp } from 'lucide-react';

export default function OrgOverview() {
    return (
        <div>
            <div className="page-header">
                <h1>Organisation</h1>
                <p>Abteilungsstruktur und Teams der AXA Schweiz</p>
            </div>

            <div className="grid grid-3">
                {departments.map(dept => {
                    const deptTeams = teams.filter(t => t.departmentId === dept.id);
                    const deptEmployees = employees.filter(e => e.departmentId === dept.id);
                    const head = employees.find(e => e.id === dept.head);

                    return (
                        <div className="card" key={dept.id}>
                            <div className="card-header">
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ width: 12, height: 12, borderRadius: 3, background: dept.color, display: 'inline-block' }} />
                                    {dept.name}
                                </h3>
                            </div>
                            <div className="card-body">
                                {head && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: '10px 12px', background: '#f5f5f5', borderRadius: 8 }}>
                                        <div className="table-avatar">{head.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '.875rem' }}>{head.name}</div>
                                            <div style={{ fontSize: '.75rem', color: '#9e9e9e' }}>{head.position}</div>
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Users size={16} color="#9e9e9e" />
                                        <span style={{ fontSize: '.875rem', fontWeight: 500 }}>{deptEmployees.length} Mitarbeiter</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Building2 size={16} color="#9e9e9e" />
                                        <span style={{ fontSize: '.875rem', fontWeight: 500 }}>{deptTeams.length} Teams</span>
                                    </div>
                                </div>

                                {deptTeams.length > 0 && (
                                    <div style={{ borderTop: '1px solid #eee', paddingTop: 12 }}>
                                        <div style={{ fontSize: '.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#9e9e9e', marginBottom: 8 }}>Teams</div>
                                        {deptTeams.map(team => {
                                            const teamCount = employees.filter(e => e.teamId === team.id).length;
                                            return (
                                                <div key={team.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '.875rem' }}>
                                                    <span>{team.name}</span>
                                                    <span className="badge badge-gray">{teamCount}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
