// Employee data for AXA Generalagentur Stefan Malara, Bülach
// Source: https://www.axa.ch/de/ueber-axa/standorte/agenturen/buelach_50002616.html

export const departments = [
  { id: 'beratung', name: 'Beratung', head: 'emp-01', color: '#00008F' },
  { id: 'innendienst', name: 'Innendienst', head: 'emp-13', color: '#4976BA' },
];

export const teams = [
  { id: 'verkaufsleitung', name: 'Verkaufsleitung', departmentId: 'beratung', leadId: 'emp-02' },
  { id: 'kundenberatung', name: 'Kundenberatung', departmentId: 'beratung', leadId: 'emp-02' },
  { id: 'verkaufssupport', name: 'Verkaufssupport', departmentId: 'innendienst', leadId: 'emp-13' },
  { id: 'administration', name: 'Administration', departmentId: 'innendienst', leadId: 'emp-13' },
];

export const employees = [
  // --- Beratung (Advisors) ---
  { id: 'emp-01', name: 'Stefan Malara', email: 'stefan.malara@axa.ch', position: 'Generalagent', departmentId: 'beratung', teamId: null, role: 'hr', hireDate: '2015-03-01', avatar: 'SM' },
  { id: 'emp-02', name: 'Dario Cavaliere', email: 'dario.cavaliere@axa.ch', position: 'Verkaufsleiter', departmentId: 'beratung', teamId: 'verkaufsleitung', role: 'manager', hireDate: '2016-06-15', avatar: 'DC' },
  { id: 'emp-03', name: 'Lirim Asipi', email: 'lirim.asipi@axa.ch', position: 'Kundenberater Privat- und KMU-Kunden', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2018-04-01', avatar: 'LA' },
  { id: 'emp-04', name: 'Cyrill Ivo Besson', email: 'cyrillivo.besson@axa.ch', position: 'Kundenberater Privat- und KMU-Kunden', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2019-01-10', avatar: 'CB' },
  { id: 'emp-05', name: 'Ellen Burg', email: 'ellen.burg@axa.ch', position: 'Kundenberaterin', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2019-09-01', avatar: 'EB' },
  { id: 'emp-06', name: 'Stephan Bürgin', email: 'stephan.buergin@axa.ch', position: 'Kundenberater Privat- und KMU-Kunden', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2017-08-15', avatar: 'SB' },
  { id: 'emp-07', name: 'Luca Cavaliere', email: 'luca.cavaliere@axa.ch', position: 'Kundenberater', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2020-02-01', avatar: 'LC' },
  { id: 'emp-08', name: 'Loris Del Grosso', email: 'loris.delgrosso@axa.ch', position: 'Kundenberater Privat- und KMU-Kunden', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2018-11-01', avatar: 'LDG' },
  { id: 'emp-09', name: 'Roger Lienhard', email: 'roger.lienhard@axa.ch', position: 'Kundenberater Privat- und KMU-Kunden', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2017-05-15', avatar: 'RL' },
  { id: 'emp-10', name: 'Michael Löber-Einsele', email: 'michael.loeber@axa.ch', position: 'Kundenberater', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2019-03-01', avatar: 'ML' },
  { id: 'emp-11', name: 'Laura Ottoni', email: 'laura.ottoni@axa.ch', position: 'Kundenberaterin Privat- und KMU-Kunden', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2020-07-15', avatar: 'LO' },
  { id: 'emp-12', name: 'Mirza Ramcilovic', email: 'mirza.ramcilovic@axa.ch', position: 'Kundenberater', departmentId: 'beratung', teamId: 'kundenberatung', role: 'employee', hireDate: '2021-01-10', avatar: 'MR' },

  // --- Innendienst (Back Office) ---
  { id: 'emp-13', name: 'Sara Cheira Leminhos', email: 'sara.leminhos@axa.ch', position: 'Leiterin Innendienst', departmentId: 'innendienst', teamId: null, role: 'manager', hireDate: '2016-09-01', avatar: 'SCL' },
  { id: 'emp-14', name: 'Luis Filipe Couto Pereira', email: 'filipe.pereira@axa.ch', position: 'Verkaufssupport Privatkunden', departmentId: 'innendienst', teamId: 'verkaufssupport', role: 'employee', hireDate: '2018-01-15', avatar: 'LP' },
  { id: 'emp-15', name: 'Giovanni Grado', email: 'giovanni.grado@axa.ch', position: 'Verkaufssupport Privatkunden', departmentId: 'innendienst', teamId: 'verkaufssupport', role: 'employee', hireDate: '2019-06-01', avatar: 'GG' },
  { id: 'emp-16', name: 'Dennis Haakman', email: 'dennis.haakman@axa.ch', position: 'Verkaufssupport Privatkunden', departmentId: 'innendienst', teamId: 'verkaufssupport', role: 'employee', hireDate: '2020-04-01', avatar: 'DH' },
  { id: 'emp-17', name: 'Marisa Niedermann', email: 'marisa.niedermann@axa.ch', position: 'Innendienstmitarbeiterin', departmentId: 'innendienst', teamId: 'administration', role: 'employee', hireDate: '2018-08-01', avatar: 'MN' },
  { id: 'emp-18', name: 'Chiara Haakman', email: 'chiara.haakman@axa.ch', position: 'Lernende', departmentId: 'innendienst', teamId: 'administration', role: 'employee', hireDate: '2024-08-01', avatar: 'CH' },
  { id: 'emp-19', name: 'Jana Heidi Roos', email: 'jana.roos@axa.ch', position: 'Lernende', departmentId: 'innendienst', teamId: 'administration', role: 'employee', hireDate: '2024-08-01', avatar: 'JR' },
];

export const evaluations = [
  {
    id: 'eval-01', employeeId: 'emp-03', evaluatorId: 'emp-02', year: 2025, status: 'completed', date: '2025-11-15',
    competencies: { fachkompetenz: 4, teamarbeit: 5, kommunikation: 4, initiative: 3, fuehrungspotenzial: 3 },
    goalAchievement: 'teilweise', overallRating: 'B', strengths: 'Sehr gute Kundenbeziehungen, zuverlässig', development: 'Eigeninitiative bei Projekten stärken', actions: [{ text: 'Verkaufstraining besuchen', deadline: '2026-03-01' }]
  },
  {
    id: 'eval-02', employeeId: 'emp-06', evaluatorId: 'emp-02', year: 2025, status: 'completed', date: '2025-11-20',
    competencies: { fachkompetenz: 5, teamarbeit: 4, kommunikation: 3, initiative: 5, fuehrungspotenzial: 4 },
    goalAchievement: 'erreicht', overallRating: 'A', strengths: 'Herausragende Beratungskompetenz, hohe Eigenverantwortung', development: 'Präsentationskompetenz ausbauen', actions: [{ text: 'Präsentationstraining', deadline: '2026-02-15' }]
  },
  {
    id: 'eval-03', employeeId: 'emp-09', evaluatorId: 'emp-02', year: 2025, status: 'in_progress', date: null,
    competencies: { fachkompetenz: 3, teamarbeit: 4, kommunikation: 4, initiative: 3, fuehrungspotenzial: 2 },
    goalAchievement: 'teilweise', overallRating: null, strengths: '', development: '', actions: []
  },
  {
    id: 'eval-04', employeeId: 'emp-14', evaluatorId: 'emp-13', year: 2025, status: 'completed', date: '2025-12-01',
    competencies: { fachkompetenz: 4, teamarbeit: 3, kommunikation: 3, initiative: 4, fuehrungspotenzial: 3 },
    goalAchievement: 'erreicht', overallRating: 'B', strengths: 'Zuverlässiger Support, gute Kundenkommunikation', development: 'Teamkommunikation verbessern', actions: [{ text: 'Kommunikationstraining besuchen', deadline: '2026-04-01' }]
  },
  {
    id: 'eval-05', employeeId: 'emp-15', evaluatorId: 'emp-13', year: 2025, status: 'pending', date: null,
    competencies: {}, goalAchievement: null, overallRating: null, strengths: '', development: '', actions: []
  },
  {
    id: 'eval-06', employeeId: 'emp-07', evaluatorId: 'emp-02', year: 2025, status: 'completed', date: '2025-10-20',
    competencies: { fachkompetenz: 4, teamarbeit: 4, kommunikation: 5, initiative: 4, fuehrungspotenzial: 3 },
    goalAchievement: 'erreicht', overallRating: 'A', strengths: 'Hervorragende Kundenbeziehungen', development: 'Strategisches Denken fördern', actions: []
  },
];

export const annualReviews = [
  {
    id: 'rev-01', employeeId: 'emp-03', managerId: 'emp-02', year: 2025, status: 'completed', scheduledDate: '2025-12-10', completedDate: '2025-12-10',
    retrospective: 'Lirim hat sich im Jahr 2025 stark weiterentwickelt. Seine Beratungskompetenz bei Privat- und KMU-Kunden ist hervorragend.',
    goals: [
      { text: 'Kundenstamm um 15% erweitern', status: 'erreicht', progress: 100 },
      { text: 'Cross-Selling Quote erhöhen', status: 'teilweise', progress: 60 },
      { text: 'Produktzertifizierung Vorsorge', status: 'nicht_erreicht', progress: 20 },
    ],
    newGoals: [
      { text: 'Senior Berater Rolle übernehmen', deadline: '2026-06-30' },
      { text: 'Mindestens 3 Neukunden pro Monat', deadline: '2026-12-31' },
    ],
    developmentWishes: 'Möchte in Richtung Key Account Management wachsen',
    feedback: 'Sehr gute Zusammenarbeit, offen für Feedback',
    signedByEmployee: true, signedByManager: true
  },
  {
    id: 'rev-02', employeeId: 'emp-06', managerId: 'emp-02', year: 2025, status: 'scheduled', scheduledDate: '2026-01-15', completedDate: null,
    retrospective: '', goals: [], newGoals: [], developmentWishes: '', feedback: '', signedByEmployee: false, signedByManager: false
  },
  {
    id: 'rev-03', employeeId: 'emp-07', managerId: 'emp-02', year: 2025, status: 'completed', scheduledDate: '2025-11-28', completedDate: '2025-11-28',
    retrospective: 'Luca hat seine Verkaufsziele übertroffen und pflegt exzellente Kundenbeziehungen.',
    goals: [
      { text: 'Umsatzziel CHF 500K', status: 'erreicht', progress: 100 },
      { text: 'NPS Score > 80', status: 'erreicht', progress: 100 },
      { text: 'Weiterbildung Versicherungsrecht', status: 'teilweise', progress: 70 },
    ],
    newGoals: [
      { text: 'Umsatz auf CHF 650K steigern', deadline: '2026-12-31' },
      { text: 'Mentoring für neue Berater', deadline: '2026-06-30' },
    ],
    developmentWishes: 'Interesse an Verkaufsleitung', feedback: 'Motiviert und zuverlässig',
    signedByEmployee: true, signedByManager: true
  },
  {
    id: 'rev-04', employeeId: 'emp-14', managerId: 'emp-13', year: 2025, status: 'scheduled', scheduledDate: '2026-02-05', completedDate: null,
    retrospective: '', goals: [], newGoals: [], developmentWishes: '', feedback: '', signedByEmployee: false, signedByManager: false
  },
];

export const programs = [
  {
    id: 'prog-01', name: 'Leadership Academy', description: 'Intensives Führungskräfteentwicklungsprogramm mit Coaching, 360°-Feedback und Praxisprojekten.', duration: '12 Monate', target: 'Führungskräfte-Nachwuchs', category: 'Führung', maxParticipants: 15, currentParticipants: 8,
    modules: ['Selbstführung', 'Teamführung', 'Change Management', 'Strategisches Denken', 'Coaching-Methoden'],
    status: 'active', startDate: '2025-09-01', endDate: '2026-08-31'
  },
  {
    id: 'prog-02', name: 'Digital Skills Bootcamp', description: 'Grundlagen der digitalen Transformation: Cloud, AI, Datenanalyse und agile Methoden.', duration: '3 Monate', target: 'Alle Mitarbeiter', category: 'Digital', maxParticipants: 30, currentParticipants: 22,
    modules: ['Cloud Basics', 'AI & Machine Learning', 'Datenvisualisierung', 'Agile Methoden'],
    status: 'active', startDate: '2026-01-15', endDate: '2026-04-15'
  },
  {
    id: 'prog-03', name: 'Fachexperten-Programm', description: 'Vertiefung fachlicher Expertise mit Zertifizierungen und Knowledge-Sharing.', duration: '6 Monate', target: 'Senior Fachkräfte', category: 'Fachlich', maxParticipants: 20, currentParticipants: 12,
    modules: ['Fachvertiefung', 'Zertifizierung', 'Wissenstransfer', 'Innovation Labs'],
    status: 'active', startDate: '2025-10-01', endDate: '2026-03-31'
  },
  {
    id: 'prog-04', name: 'Mentoring@AXA', description: 'Strukturiertes Mentoring-Programm für High Potentials mit erfahrenen Führungskräften.', duration: '12 Monate', target: 'Talente', category: 'Karriere', maxParticipants: 10, currentParticipants: 6,
    modules: ['Kick-off & Matching', 'Regelmässige Sessions', 'Netzwerk-Events', 'Abschluss & Reflexion'],
    status: 'active', startDate: '2025-07-01', endDate: '2026-06-30'
  },
  {
    id: 'prog-05', name: 'Agile Coach Certification', description: 'Umfassende Ausbildung zum zertifizierten Agile Coach mit Praxisprojekt.', duration: '4 Monate', target: 'Projektleiter', category: 'Methodik', maxParticipants: 12, currentParticipants: 9,
    modules: ['Scrum & Kanban', 'Facilitation', 'Coaching Skills', 'Praxisprojekt'],
    status: 'active', startDate: '2026-02-01', endDate: '2026-05-31'
  },
];

export const enrollments = [
  { id: 'enr-01', employeeId: 'emp-03', programId: 'prog-02', status: 'active', progress: 45, enrollDate: '2026-01-15', completedModules: ['Cloud Basics', 'AI & Machine Learning'] },
  { id: 'enr-02', employeeId: 'emp-09', programId: 'prog-01', status: 'active', progress: 65, enrollDate: '2025-09-01', completedModules: ['Selbstführung', 'Teamführung', 'Change Management'] },
  { id: 'enr-03', employeeId: 'emp-07', programId: 'prog-04', status: 'active', progress: 80, enrollDate: '2025-07-01', completedModules: ['Kick-off & Matching', 'Regelmässige Sessions', 'Netzwerk-Events'] },
  { id: 'enr-04', employeeId: 'emp-14', programId: 'prog-05', status: 'active', progress: 25, enrollDate: '2026-02-01', completedModules: ['Scrum & Kanban'] },
  { id: 'enr-05', employeeId: 'emp-15', programId: 'prog-02', status: 'active', progress: 45, enrollDate: '2026-01-15', completedModules: ['Cloud Basics', 'AI & Machine Learning'] },
  { id: 'enr-06', employeeId: 'emp-11', programId: 'prog-03', status: 'active', progress: 50, enrollDate: '2025-10-01', completedModules: ['Fachvertiefung', 'Zertifizierung'] },
];

export const loginUsers = {
  employee: { ...employees.find(e => e.id === 'emp-03'), role: 'employee' },
  manager: { ...employees.find(e => e.id === 'emp-02'), role: 'manager' },
  hr: { ...employees.find(e => e.id === 'emp-01'), role: 'hr' },
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
