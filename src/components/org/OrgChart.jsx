import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Pencil, X, ChevronDown } from 'lucide-react';

export default function OrgChart({ employees: initialEmployees, departments, teams }) {
    const { user } = useAuth();
    const isHR = user?.role === 'hr';
    const [editMode, setEditMode] = useState(false);
    const [employeeList, setEmployeeList] = useState(initialEmployees);
    const [modalEmployee, setModalEmployee] = useState(null);
    const [collapsedDepts, setCollapsedDepts] = useState({});
    const [collapsedTeams, setCollapsedTeams] = useState({});

    // Find the top-level person (Generalagent)
    const generalagent = employeeList.find(e => e.position === 'Generalagent');

    const toggleDept = (deptId) => {
        setCollapsedDepts(prev => ({ ...prev, [deptId]: !prev[deptId] }));
    };

    const toggleTeam = (teamId) => {
        setCollapsedTeams(prev => ({ ...prev, [teamId]: !prev[teamId] }));
    };

    const handleReassign = (employeeId, newTeamId, newDeptId) => {
        setEmployeeList(prev => prev.map(emp =>
            emp.id === employeeId
                ? { ...emp, teamId: newTeamId, departmentId: newDeptId }
                : emp
        ));
        setModalEmployee(null);
    };

    const renderEditButton = (emp) => {
        if (!editMode) return null;
        return (
            <button className="org-node-edit-btn" onClick={(e) => { e.stopPropagation(); setModalEmployee(emp); }}
                title="Team zuweisen">
                <Pencil size={12} />
            </button>
        );
    };

    return (
        <div>
            {/* Toolbar */}
            <div className="org-chart-toolbar">
                <div className="org-chart-legend">
                    {departments.map(d => (
                        <div key={d.id} className="org-chart-legend-item">
                            <div className="org-chart-legend-dot" style={{ background: d.color }} />
                            <span>{d.name}</span>
                        </div>
                    ))}
                    <div className="org-chart-legend-item">
                        <span style={{ color: '#757575' }}>{employeeList.length} Mitarbeiter</span>
                    </div>
                </div>
                {isHR && (
                    <button className={`edit-toggle ${editMode ? 'active' : ''}`}
                        onClick={() => setEditMode(!editMode)}>
                        <Pencil size={15} />
                        {editMode ? 'Bearbeitung beenden' : 'Organigramm bearbeiten'}
                    </button>
                )}
            </div>

            {/* Chart */}
            <div className="org-chart-container">
                <div className="org-tree">
                    {/* Root node */}
                    {generalagent && (
                        <div className="org-node root">
                            <div className="org-node-avatar">{generalagent.avatar}</div>
                            <div className="org-node-name">{generalagent.name}</div>
                            <div className="org-node-title">{generalagent.position}</div>
                        </div>
                    )}

                    <div className="org-connector" />

                    {/* Departments row */}
                    <div className="org-dept-row">
                        {departments.map(dept => {
                            const deptHead = employeeList.find(e => e.id === dept.head);
                            const deptTeams = teams.filter(t => t.departmentId === dept.id);
                            const isDeptCollapsed = collapsedDepts[dept.id];

                            // Don't show the generalagent again as department head
                            const showDeptHead = deptHead && deptHead.id !== generalagent?.id;

                            return (
                                <div className="org-branch" key={dept.id}>
                                    {/* Department head */}
                                    <div className={`org-node dept-head ${editMode ? 'editable' : ''}`}>
                                        <div className="org-node-badge" style={{ background: dept.color + '15', color: dept.color }}>
                                            {dept.name}
                                        </div>
                                        {showDeptHead ? (
                                            <>
                                                <div className="org-node-avatar" style={{ background: dept.color }}>
                                                    {deptHead.avatar}
                                                </div>
                                                <div className="org-node-name">{deptHead.name}</div>
                                                <div className="org-node-title">{deptHead.position}</div>
                                                {renderEditButton(deptHead)}
                                            </>
                                        ) : (
                                            <div className="org-node-title" style={{ marginTop: 4 }}>
                                                {employeeList.filter(e => e.departmentId === dept.id).length} Mitarbeiter
                                            </div>
                                        )}
                                    </div>

                                    {/* Collapse toggle */}
                                    <button
                                        className={`org-collapse-btn ${isDeptCollapsed ? 'collapsed' : ''}`}
                                        onClick={() => toggleDept(dept.id)}
                                        title={isDeptCollapsed ? 'Aufklappen' : 'Zuklappen'}
                                    >
                                        <ChevronDown size={12} />
                                    </button>

                                    {/* Teams */}
                                    <div className={`org-branch-children ${isDeptCollapsed ? 'collapsed' : 'expanded'}`}>
                                        <div className="org-connector" />
                                        <div className="org-teams-row">
                                            {deptTeams.map(team => {
                                                const teamLead = employeeList.find(e => e.id === team.leadId);
                                                const teamMembers = employeeList.filter(e =>
                                                    e.teamId === team.id &&
                                                    e.id !== team.leadId &&
                                                    e.id !== dept.head &&
                                                    e.id !== generalagent?.id
                                                );
                                                const isTeamCollapsed = collapsedTeams[team.id];

                                                // Don't show team lead again if same as dept head
                                                const showTeamLead = teamLead && teamLead.id !== dept.head && teamLead.id !== generalagent?.id;

                                                return (
                                                    <div className="org-team-branch" key={team.id}>
                                                        {/* Team header */}
                                                        <div className={`org-node team-head ${editMode ? 'editable' : ''}`}>
                                                            <div className="org-node-badge">{team.name}</div>
                                                            {showTeamLead && (
                                                                <>
                                                                    <div className="org-node-name">{teamLead.name}</div>
                                                                    <div className="org-node-title">{teamLead.position}</div>
                                                                    {renderEditButton(teamLead)}
                                                                </>
                                                            )}
                                                            {!showTeamLead && (
                                                                <div className="org-node-title" style={{ marginTop: 2 }}>
                                                                    {teamMembers.length} Mitarbeiter
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Collapse toggle for teams */}
                                                        {teamMembers.length > 0 && (
                                                            <button
                                                                className={`org-collapse-btn ${isTeamCollapsed ? 'collapsed' : ''}`}
                                                                onClick={() => toggleTeam(team.id)}
                                                                title={isTeamCollapsed ? 'Aufklappen' : 'Zuklappen'}
                                                            >
                                                                <ChevronDown size={10} />
                                                            </button>
                                                        )}

                                                        {/* Members */}
                                                        {teamMembers.length > 0 && (
                                                            <div className={`org-branch-children ${isTeamCollapsed ? 'collapsed' : 'expanded'}`}>
                                                                <div className="org-members">
                                                                    {teamMembers.map(member => (
                                                                        <div className={`org-node member ${editMode ? 'editable' : ''}`}
                                                                            key={member.id}
                                                                            onClick={() => editMode && setModalEmployee(member)}
                                                                        >
                                                                            <div className="org-node-avatar" style={{ background: dept.color }}>
                                                                                {member.avatar}
                                                                            </div>
                                                                            <div>
                                                                                <div className="org-node-name">{member.name}</div>
                                                                                <div className="org-node-title">{member.position}</div>
                                                                            </div>
                                                                            {renderEditButton(member)}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Reassign Modal */}
            {modalEmployee && (
                <ReassignModal
                    employee={modalEmployee}
                    teams={teams}
                    departments={departments}
                    currentTeamId={modalEmployee.teamId}
                    onClose={() => setModalEmployee(null)}
                    onSave={handleReassign}
                />
            )}
        </div>
    );
}

function ReassignModal({ employee, teams, departments, currentTeamId, onClose, onSave }) {
    const [selectedTeam, setSelectedTeam] = useState(currentTeamId);

    const selectedTeamObj = teams.find(t => t.id === selectedTeam);
    const newDeptId = selectedTeamObj?.departmentId || employee.departmentId;
    const hasChanged = selectedTeam !== currentTeamId;

    return (
        <div className="org-modal-overlay" onClick={onClose}>
            <div className="org-modal" onClick={e => e.stopPropagation()}>
                <div className="org-modal-header">
                    <h3>Mitarbeiter zuweisen</h3>
                    <button className="org-modal-close" onClick={onClose}>
                        <X size={16} />
                    </button>
                </div>
                <div className="org-modal-body">
                    <div className="org-modal-employee">
                        <div className="org-node-avatar">{employee.avatar}</div>
                        <div>
                            <div className="org-modal-employee-name">{employee.name}</div>
                            <div className="org-modal-employee-pos">{employee.position}</div>
                        </div>
                    </div>

                    <div className="org-modal-label">Neues Team zuweisen</div>
                    <select
                        className="org-modal-select"
                        value={selectedTeam}
                        onChange={e => setSelectedTeam(e.target.value)}
                    >
                        {departments.map(dept => (
                            <optgroup key={dept.id} label={dept.name}>
                                {teams.filter(t => t.departmentId === dept.id).map(team => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div className="org-modal-footer">
                    <button className="org-modal-btn cancel" onClick={onClose}>Abbrechen</button>
                    <button
                        className="org-modal-btn primary"
                        disabled={!hasChanged}
                        onClick={() => onSave(employee.id, selectedTeam, newDeptId)}
                    >
                        Speichern
                    </button>
                </div>
            </div>
        </div>
    );
}
