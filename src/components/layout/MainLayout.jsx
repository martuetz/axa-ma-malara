import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, ClipboardCheck, Calendar, GraduationCap, Building2, LogOut, Bell, ChevronRight } from 'lucide-react';

const navItems = {
    employee: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/evaluations', icon: ClipboardCheck, label: 'Meine Bewertungen' },
        { to: '/reviews', icon: Calendar, label: 'Jahresgespräche' },
        { to: '/programs', icon: GraduationCap, label: 'Förderprogramme' },
    ],
    manager: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/organization', icon: Building2, label: 'Organisation' },
        { to: '/employees', icon: Users, label: 'Mitarbeiter' },
        { to: '/evaluations', icon: ClipboardCheck, label: 'Bewertungen' },
        { to: '/reviews', icon: Calendar, label: 'Jahresgespräche' },
        { to: '/programs', icon: GraduationCap, label: 'Förderprogramme' },
    ],
    hr: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/organization', icon: Building2, label: 'Organisation' },
        { to: '/employees', icon: Users, label: 'Mitarbeiter' },
        { to: '/evaluations', icon: ClipboardCheck, label: 'Bewertungen' },
        { to: '/reviews', icon: Calendar, label: 'Jahresgespräche' },
        { to: '/programs', icon: GraduationCap, label: 'Förderprogramme' },
    ],
};

const roleLabels = {
    employee: 'Mitarbeiter',
    manager: 'Führungskraft',
    hr: 'HR-Admin',
};

export default function MainLayout({ children }) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const items = navItems[user?.role] || navItems.employee;

    const getPageTitle = () => {
        const path = location.pathname;
        const item = items.find(i => path.startsWith(i.to));
        return item?.label || 'Dashboard';
    };

    return (
        <div className="app-layout">
            <aside className="app-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">AXA</div>
                    <div>
                        <div className="sidebar-title">AXA People</div>
                        <div className="sidebar-subtitle">Mitarbeiter-Management</div>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <div className="nav-section-label">Navigation</div>
                    {items.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-user-avatar">{user?.avatar}</div>
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">{user?.name}</div>
                            <div className="sidebar-user-role">{roleLabels[user?.role]}</div>
                        </div>
                    </div>
                    <button className="nav-item" onClick={logout} style={{ marginTop: 8 }}>
                        <LogOut size={18} />
                        <span>Abmelden</span>
                    </button>
                </div>
            </aside>
            <main className="app-main">
                <header className="app-header">
                    <div className="header-left">
                        <div className="header-breadcrumb">
                            <span>AXA People</span>
                            <ChevronRight size={14} />
                            <span>{getPageTitle()}</span>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="header-notification">
                            <Bell size={20} />
                            <span className="header-notification-badge">3</span>
                        </div>
                    </div>
                </header>
                <div className="app-content animate-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
