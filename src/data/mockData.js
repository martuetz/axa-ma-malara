// Mock data for AXA Mitarbeiter Evaluation Tool

export const departments = [
  { id: 'vorstand', name: 'Vorstand', head: 'emp-01', color: '#00008F' },
  { id: 'vertrieb', name: 'Vertrieb', head: 'emp-02', color: '#4976BA' },
  { id: 'it', name: 'IT & Digital', head: 'emp-06', color: '#1CC54E' },
  { id: 'hr', name: 'Human Resources', head: 'emp-10', color: '#F5A623' },
  { id: 'finanzen', name: 'Finanzen', head: 'emp-14', color: '#E30613' },
  { id: 'claims', name: 'Schadenmanagement', head: 'emp-18', color: '#9E9E9E' },
];

export const teams = [
  { id: 'privatkunden', name: 'Privatkunden', departmentId: 'vertrieb', leadId: 'emp-03' },
  { id: 'unternehmenskunden', name: 'Unternehmenskunden', departmentId: 'vertrieb', leadId: 'emp-04' },
  { id: 'entwicklung', name: 'Softwareentwicklung', departmentId: 'it', leadId: 'emp-07' },
  { id: 'infrastruktur', name: 'Infrastruktur', departmentId: 'it', leadId: 'emp-08' },
  { id: 'data', name: 'Data Analytics', departmentId: 'it', leadId: 'emp-09' },
  { id: 'recruiting', name: 'Recruiting', departmentId: 'hr', leadId: 'emp-11' },
  { id: 'pe', name: 'Personalentwicklung', departmentId: 'hr', leadId: 'emp-12' },
  { id: 'controlling', name: 'Controlling', departmentId: 'finanzen', leadId: 'emp-15' },
  { id: 'buchhaltung', name: 'Buchhaltung', departmentId: 'finanzen', leadId: 'emp-16' },
  { id: 'schaden-privat', name: 'Schaden Privat', departmentId: 'claims', leadId: 'emp-19' },
  { id: 'schaden-unternehmen', name: 'Schaden Unternehmen', departmentId: 'claims', leadId: 'emp-20' },
];

export const employees = [
  { id: 'emp-01', name: 'Thomas Müller', email: 'thomas.mueller@axa.ch', position: 'CEO', departmentId: 'vorstand', teamId: null, role: 'hr', hireDate: '2015-03-01', avatar: 'TM' },
  { id: 'emp-02', name: 'Sandra Weber', email: 'sandra.weber@axa.ch', position: 'Head of Sales', departmentId: 'vertrieb', teamId: null, role: 'manager', hireDate: '2016-06-15', avatar: 'SW' },
  { id: 'emp-03', name: 'Marco Bernasconi', email: 'marco.bernasconi@axa.ch', position: 'Teamleiter Privatkunden', departmentId: 'vertrieb', teamId: 'privatkunden', role: 'manager', hireDate: '2017-01-10', avatar: 'MB' },
  { id: 'emp-04', name: 'Lisa Schneider', email: 'lisa.schneider@axa.ch', position: 'Teamleiterin UK', departmentId: 'vertrieb', teamId: 'unternehmenskunden', role: 'manager', hireDate: '2018-04-01', avatar: 'LS' },
  { id: 'emp-05', name: 'Peter Hofmann', email: 'peter.hofmann@axa.ch', position: 'Sales Consultant', departmentId: 'vertrieb', teamId: 'privatkunden', role: 'employee', hireDate: '2019-09-01', avatar: 'PH' },
  { id: 'emp-06', name: 'Anna Keller', email: 'anna.keller@axa.ch', position: 'CTO', departmentId: 'it', teamId: null, role: 'manager', hireDate: '2016-02-01', avatar: 'AK' },
  { id: 'emp-07', name: 'David Brunner', email: 'david.brunner@axa.ch', position: 'Lead Developer', departmentId: 'it', teamId: 'entwicklung', role: 'manager', hireDate: '2017-08-15', avatar: 'DB' },
  { id: 'emp-08', name: 'Sarah Fischer', email: 'sarah.fischer@axa.ch', position: 'Infra Manager', departmentId: 'it', teamId: 'infrastruktur', role: 'manager', hireDate: '2018-01-10', avatar: 'SF' },
  { id: 'emp-09', name: 'Michael Zimmermann', email: 'michael.zimmermann@axa.ch', position: 'Data Lead', departmentId: 'it', teamId: 'data', role: 'manager', hireDate: '2019-03-01', avatar: 'MZ' },
  { id: 'emp-10', name: 'Julia Meier', email: 'julia.meier@axa.ch', position: 'HR Director', departmentId: 'hr', teamId: null, role: 'hr', hireDate: '2015-11-01', avatar: 'JM' },
  { id: 'emp-11', name: 'Christian Bauer', email: 'christian.bauer@axa.ch', position: 'Recruiting Lead', departmentId: 'hr', teamId: 'recruiting', role: 'manager', hireDate: '2018-07-01', avatar: 'CB' },
  { id: 'emp-12', name: 'Monika Steiner', email: 'monika.steiner@axa.ch', position: 'PE Leiterin', departmentId: 'hr', teamId: 'pe', role: 'manager', hireDate: '2017-05-15', avatar: 'MS' },
  { id: 'emp-13', name: 'Reto Huber', email: 'reto.huber@axa.ch', position: 'HR Specialist', departmentId: 'hr', teamId: 'recruiting', role: 'employee', hireDate: '2020-02-01', avatar: 'RH' },
  { id: 'emp-14', name: 'Claudia Schmid', email: 'claudia.schmid@axa.ch', position: 'CFO', departmentId: 'finanzen', teamId: null, role: 'manager', hireDate: '2016-09-01', avatar: 'CS' },
  { id: 'emp-15', name: 'Markus Wagner', email: 'markus.wagner@axa.ch', position: 'Controller', departmentId: 'finanzen', teamId: 'controlling', role: 'manager', hireDate: '2018-11-01', avatar: 'MW' },
  { id: 'emp-16', name: 'Petra Baumann', email: 'petra.baumann@axa.ch', position: 'Buchhaltungsleiterin', departmentId: 'finanzen', teamId: 'buchhaltung', role: 'manager', hireDate: '2019-01-15', avatar: 'PB' },
  { id: 'emp-17', name: 'Stefan Lang', email: 'stefan.lang@axa.ch', position: 'Junior Controller', departmentId: 'finanzen', teamId: 'controlling', role: 'employee', hireDate: '2021-06-01', avatar: 'SL' },
  { id: 'emp-18', name: 'Andrea Frei', email: 'andrea.frei@axa.ch', position: 'Claims Director', departmentId: 'claims', teamId: null, role: 'manager', hireDate: '2016-04-01', avatar: 'AF' },
  { id: 'emp-19', name: 'Daniel Gerber', email: 'daniel.gerber@axa.ch', position: 'Schadenleiter Privat', departmentId: 'claims', teamId: 'schaden-privat', role: 'manager', hireDate: '2018-08-01', avatar: 'DG' },
  { id: 'emp-20', name: 'Katrin Wolf', email: 'katrin.wolf@axa.ch', position: 'Schadenl. Unternehmen', departmentId: 'claims', teamId: 'schaden-unternehmen', role: 'manager', hireDate: '2019-02-01', avatar: 'KW' },
  { id: 'emp-21', name: 'Lukas Brunner', email: 'lukas.brunner@axa.ch', position: 'Frontend Developer', departmentId: 'it', teamId: 'entwicklung', role: 'employee', hireDate: '2020-04-01', avatar: 'LB' },
  { id: 'emp-22', name: 'Nina Hartmann', email: 'nina.hartmann@axa.ch', position: 'Backend Developer', departmentId: 'it', teamId: 'entwicklung', role: 'employee', hireDate: '2020-07-15', avatar: 'NH' },
  { id: 'emp-23', name: 'Fabio Rossi', email: 'fabio.rossi@axa.ch', position: 'DevOps Engineer', departmentId: 'it', teamId: 'infrastruktur', role: 'employee', hireDate: '2021-01-10', avatar: 'FR' },
  { id: 'emp-24', name: 'Sophie Blanc', email: 'sophie.blanc@axa.ch', position: 'Data Analyst', departmentId: 'it', teamId: 'data', role: 'employee', hireDate: '2021-03-01', avatar: 'SB' },
  { id: 'emp-25', name: 'Yannick Dubois', email: 'yannick.dubois@axa.ch', position: 'Sales Associate', departmentId: 'vertrieb', teamId: 'privatkunden', role: 'employee', hireDate: '2021-09-01', avatar: 'YD' },
  { id: 'emp-26', name: 'Elena Russo', email: 'elena.russo@axa.ch', position: 'Account Manager', departmentId: 'vertrieb', teamId: 'unternehmenskunden', role: 'employee', hireDate: '2020-11-01', avatar: 'ER' },
  { id: 'emp-27', name: 'Jan Kowalski', email: 'jan.kowalski@axa.ch', position: 'Schadensachbearbeiter', departmentId: 'claims', teamId: 'schaden-privat', role: 'employee', hireDate: '2021-05-01', avatar: 'JK' },
  { id: 'emp-28', name: 'Marie Dupont', email: 'marie.dupont@axa.ch', position: 'Trainee HR', departmentId: 'hr', teamId: 'pe', role: 'employee', hireDate: '2022-01-15', avatar: 'MD' },
  { id: 'emp-29', name: 'Alexander Schmidt', email: 'alexander.schmidt@axa.ch', position: 'Financial Analyst', departmentId: 'finanzen', teamId: 'controlling', role: 'employee', hireDate: '2022-03-01', avatar: 'AS' },
  { id: 'emp-30', name: 'Laura Bianchi', email: 'laura.bianchi@axa.ch', position: 'UX Designer', departmentId: 'it', teamId: 'entwicklung', role: 'employee', hireDate: '2021-11-01', avatar: 'LBi' },
];

export const evaluations = [
  { id: 'eval-01', employeeId: 'emp-21', evaluatorId: 'emp-07', year: 2025, status: 'completed', date: '2025-11-15',
    competencies: { fachkompetenz: 4, teamarbeit: 5, kommunikation: 4, initiative: 3, fuehrungspotenzial: 3 },
    goalAchievement: 'teilweise', overallRating: 'B', strengths: 'Sehr gute technische Fähigkeiten, exzellenter Teamplayer', development: 'Eigeninitiative bei Projekten stärken', actions: [{ text: 'Agile Workshop besuchen', deadline: '2026-03-01' }] },
  { id: 'eval-02', employeeId: 'emp-22', evaluatorId: 'emp-07', year: 2025, status: 'completed', date: '2025-11-20',
    competencies: { fachkompetenz: 5, teamarbeit: 4, kommunikation: 3, initiative: 5, fuehrungspotenzial: 4 },
    goalAchievement: 'erreicht', overallRating: 'A', strengths: 'Herausragende Problemlöserin, hohe Eigenverantwortung', development: 'Präsentationskompetenz ausbauen', actions: [{ text: 'Präsentationstraining', deadline: '2026-02-15' }] },
  { id: 'eval-03', employeeId: 'emp-25', evaluatorId: 'emp-03', year: 2025, status: 'in_progress', date: null,
    competencies: { fachkompetenz: 3, teamarbeit: 4, kommunikation: 4, initiative: 3, fuehrungspotenzial: 2 },
    goalAchievement: 'teilweise', overallRating: null, strengths: '', development: '', actions: [] },
  { id: 'eval-04', employeeId: 'emp-23', evaluatorId: 'emp-08', year: 2025, status: 'completed', date: '2025-12-01',
    competencies: { fachkompetenz: 4, teamarbeit: 3, kommunikation: 3, initiative: 4, fuehrungspotenzial: 3 },
    goalAchievement: 'erreicht', overallRating: 'B', strengths: 'Tiefes Cloud-Know-how, zuverlässig', development: 'Teamkommunikation verbessern', actions: [{ text: 'Team-Retrospektiven leiten', deadline: '2026-04-01' }] },
  { id: 'eval-05', employeeId: 'emp-24', evaluatorId: 'emp-09', year: 2025, status: 'pending', date: null,
    competencies: {}, goalAchievement: null, overallRating: null, strengths: '', development: '', actions: [] },
  { id: 'eval-06', employeeId: 'emp-05', evaluatorId: 'emp-03', year: 2025, status: 'completed', date: '2025-10-20',
    competencies: { fachkompetenz: 4, teamarbeit: 4, kommunikation: 5, initiative: 4, fuehrungspotenzial: 3 },
    goalAchievement: 'erreicht', overallRating: 'A', strengths: 'Hervorragende Kundenbeziehungen', development: 'Strategisches Denken fördern', actions: [] },
];

export const annualReviews = [
  { id: 'rev-01', employeeId: 'emp-21', managerId: 'emp-07', year: 2025, status: 'completed', scheduledDate: '2025-12-10', completedDate: '2025-12-10',
    retrospective: 'Lukas hat sich im Jahr 2025 stark weiterentwickelt. Seine React-Kenntnisse sind mittlerweile auf Senior-Niveau.',
    goals: [
      { text: 'React Performance-Optimierung meistern', status: 'erreicht', progress: 100 },
      { text: 'Mindestens 2 Junior-Entwickler mentoren', status: 'teilweise', progress: 60 },
      { text: 'AWS-Zertifikation erlangen', status: 'nicht_erreicht', progress: 20 },
    ],
    newGoals: [
      { text: 'Tech Lead Rolle übernehmen', deadline: '2026-06-30' },
      { text: 'Vortrag auf Konferenz halten', deadline: '2026-09-30' },
    ],
    developmentWishes: 'Möchte in Richtung Technical Leadership wachsen',
    feedback: 'Sehr gute Zusammenarbeit, offen für Feedback',
    signedByEmployee: true, signedByManager: true },
  { id: 'rev-02', employeeId: 'emp-22', managerId: 'emp-07', year: 2025, status: 'scheduled', scheduledDate: '2026-01-15', completedDate: null,
    retrospective: '', goals: [], newGoals: [], developmentWishes: '', feedback: '', signedByEmployee: false, signedByManager: false },
  { id: 'rev-03', employeeId: 'emp-05', managerId: 'emp-03', year: 2025, status: 'completed', scheduledDate: '2025-11-28', completedDate: '2025-11-28',
    retrospective: 'Peter hat seine Verkaufsziele übertroffen und pflegt exzellente Kundenbeziehungen.',
    goals: [
      { text: 'Umsatzziel CHF 500K', status: 'erreicht', progress: 100 },
      { text: 'NPS Score > 80', status: 'erreicht', progress: 100 },
      { text: 'Cross-Selling Quote erhöhen', status: 'teilweise', progress: 70 },
    ],
    newGoals: [
      { text: 'Umsatz auf CHF 650K steigern', deadline: '2026-12-31' },
      { text: 'Key Account Management aufbauen', deadline: '2026-06-30' },
    ],
    developmentWishes: 'Interesse an Key Account Management', feedback: 'Motiviert und zuverlässig',
    signedByEmployee: true, signedByManager: true },
  { id: 'rev-04', employeeId: 'emp-23', managerId: 'emp-08', year: 2025, status: 'scheduled', scheduledDate: '2026-02-05', completedDate: null,
    retrospective: '', goals: [], newGoals: [], developmentWishes: '', feedback: '', signedByEmployee: false, signedByManager: false },
];

export const programs = [
  { id: 'prog-01', name: 'Leadership Academy', description: 'Intensives Führungskräfteentwicklungsprogramm mit Coaching, 360°-Feedback und Praxisprojekten.', duration: '12 Monate', target: 'Führungskräfte-Nachwuchs', category: 'Führung', maxParticipants: 15, currentParticipants: 8,
    modules: ['Selbstführung', 'Teamführung', 'Change Management', 'Strategisches Denken', 'Coaching-Methoden'],
    status: 'active', startDate: '2025-09-01', endDate: '2026-08-31' },
  { id: 'prog-02', name: 'Digital Skills Bootcamp', description: 'Grundlagen der digitalen Transformation: Cloud, AI, Datenanalyse und agile Methoden.', duration: '3 Monate', target: 'Alle Mitarbeiter', category: 'Digital', maxParticipants: 30, currentParticipants: 22,
    modules: ['Cloud Basics', 'AI & Machine Learning', 'Datenvisualisierung', 'Agile Methoden'],
    status: 'active', startDate: '2026-01-15', endDate: '2026-04-15' },
  { id: 'prog-03', name: 'Fachexperten-Programm', description: 'Vertiefung fachlicher Expertise mit Zertifizierungen und Knowledge-Sharing.', duration: '6 Monate', target: 'Senior Fachkräfte', category: 'Fachlich', maxParticipants: 20, currentParticipants: 12,
    modules: ['Fachvertiefung', 'Zertifizierung', 'Wissenstransfer', 'Innovation Labs'],
    status: 'active', startDate: '2025-10-01', endDate: '2026-03-31' },
  { id: 'prog-04', name: 'Mentoring@AXA', description: 'Strukturiertes Mentoring-Programm für High Potentials mit erfahrenen Führungskräften.', duration: '12 Monate', target: 'Talente', category: 'Karriere', maxParticipants: 10, currentParticipants: 6,
    modules: ['Kick-off & Matching', 'Regelmässige Sessions', 'Netzwerk-Events', 'Abschluss & Reflexion'],
    status: 'active', startDate: '2025-07-01', endDate: '2026-06-30' },
  { id: 'prog-05', name: 'Agile Coach Certification', description: 'Umfassende Ausbildung zum zertifizierten Agile Coach mit Praxisprojekt.', duration: '4 Monate', target: 'Projektleiter', category: 'Methodik', maxParticipants: 12, currentParticipants: 9,
    modules: ['Scrum & Kanban', 'Facilitation', 'Coaching Skills', 'Praxisprojekt'],
    status: 'active', startDate: '2026-02-01', endDate: '2026-05-31' },
];

export const enrollments = [
  { id: 'enr-01', employeeId: 'emp-21', programId: 'prog-02', status: 'active', progress: 45, enrollDate: '2026-01-15', completedModules: ['Cloud Basics', 'AI & Machine Learning'] },
  { id: 'enr-02', employeeId: 'emp-22', programId: 'prog-01', status: 'active', progress: 65, enrollDate: '2025-09-01', completedModules: ['Selbstführung', 'Teamführung', 'Change Management'] },
  { id: 'enr-03', employeeId: 'emp-05', programId: 'prog-04', status: 'active', progress: 80, enrollDate: '2025-07-01', completedModules: ['Kick-off & Matching', 'Regelmässige Sessions', 'Netzwerk-Events'] },
  { id: 'enr-04', employeeId: 'emp-23', programId: 'prog-05', status: 'active', progress: 25, enrollDate: '2026-02-01', completedModules: ['Scrum & Kanban'] },
  { id: 'enr-05', employeeId: 'emp-24', programId: 'prog-02', status: 'active', progress: 45, enrollDate: '2026-01-15', completedModules: ['Cloud Basics', 'AI & Machine Learning'] },
  { id: 'enr-06', employeeId: 'emp-30', programId: 'prog-03', status: 'active', progress: 50, enrollDate: '2025-10-01', completedModules: ['Fachvertiefung', 'Zertifizierung'] },
];

export const loginUsers = {
  employee: { ...employees.find(e => e.id === 'emp-21'), role: 'employee' },
  manager: { ...employees.find(e => e.id === 'emp-07'), role: 'manager' },
  hr: { ...employees.find(e => e.id === 'emp-10'), role: 'hr' },
};

export const competencyLabels = {
  fachkompetenz: 'Fachkompetenz',
  teamarbeit: 'Teamarbeit',
  kommunikation: 'Kommunikation',
  initiative: 'Eigeninitiative',
  fuehrungspotenzial: 'Führungspotenzial',
};

export const ratingLabels = {
  A: 'Herausragend',
  B: 'Übertrifft Erwartungen',
  C: 'Entspricht Erwartungen',
  D: 'Unter Erwartungen',
  E: 'Ungenügend',
};

export const goalStatusLabels = {
  erreicht: 'Erreicht',
  teilweise: 'Teilweise erreicht',
  nicht_erreicht: 'Nicht erreicht',
};
