import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, ClipboardCheck, Calendar, GraduationCap, LogOut, Bell, ChevronRight, Menu, X, Check, UserCog } from 'lucide-react';

const navItems = {
    employee: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/evaluations', icon: ClipboardCheck, label: 'Meine Bewertungen' },
        { to: '/reviews', icon: Calendar, label: 'Jahresgespräche' },
        { to: '/programs', icon: GraduationCap, label: 'Förderprogramme' },
    ],
    manager: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/employees', icon: Users, label: 'Mitarbeiter' },
        { to: '/evaluations', icon: ClipboardCheck, label: 'Bewertungen' },
        { to: '/reviews', icon: Calendar, label: 'Jahresgespräche' },
        { to: '/programs', icon: GraduationCap, label: 'Förderprogramme' },
        { to: '/user-management', icon: UserCog, label: 'Benutzerverwaltung' },
    ],
    hr: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/employees', icon: Users, label: 'Mitarbeiter' },
        { to: '/evaluations', icon: ClipboardCheck, label: 'Bewertungen' },
        { to: '/reviews', icon: Calendar, label: 'Jahresgespräche' },
        { to: '/programs', icon: GraduationCap, label: 'Förderprogramme' },
        { to: '/user-management', icon: UserCog, label: 'Benutzerverwaltung' },
    ],
};

const roleLabels = {
    employee: 'Mitarbeiter',
    manager: 'Führungskraft',
    hr: 'Generalagent',
};

const initialNotifications = [
    { id: 1, title: 'Jahresgespräch geplant', message: 'Ihr Jahresgespräch wurde für den 15. März 2026 geplant.', time: 'Vor 2 Std.', read: false },
    { id: 2, title: 'Neue Bewertung erhalten', message: 'Sie haben eine neue Leistungsbewertung von Ihrem Vorgesetzten erhalten.', time: 'Vor 5 Std.', read: false },
    { id: 3, title: 'Förderprogramm verfügbar', message: 'Ein neues Förderprogramm "Leadership 2026" ist ab sofort verfügbar.', time: 'Gestern', read: false },
];

export default function MainLayout({ children }) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const items = navItems[user?.role] || navItems.employee;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);
    const notifRef = useRef(null);
    const mobileNotifRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setNotifOpen(false);
    }, [location.pathname]);

    // Close notification dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                notifRef.current && !notifRef.current.contains(e.target) &&
                mobileNotifRef.current && !mobileNotifRef.current.contains(e.target)
            ) {
                setNotifOpen(false);
            }
            if (
                notifRef.current && !notifRef.current.contains(e.target) &&
                !mobileNotifRef.current
            ) {
                setNotifOpen(false);
            }
            if (
                mobileNotifRef.current && !mobileNotifRef.current.contains(e.target) &&
                !notifRef.current
            ) {
                setNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getPageTitle = () => {
        const path = location.pathname;
        const item = items.find(i => path.startsWith(i.to));
        return item?.label || 'Dashboard';
    };

    const NotificationDropdown = () => (
        <div className="notification-dropdown">
            <div className="notification-dropdown-header">
                <span className="notification-dropdown-title">Benachrichtigungen</span>
                {unreadCount > 0 && (
                    <button className="notification-mark-all" onClick={markAllAsRead}>
                        <Check size={14} />
                        Alle gelesen
                    </button>
                )}
            </div>
            <div className="notification-dropdown-list">
                {notifications.length === 0 ? (
                    <div className="notification-empty">Keine Benachrichtigungen</div>
                ) : (
                    notifications.map(n => (
                        <div
                            key={n.id}
                            className={`notification-item ${n.read ? 'read' : 'unread'}`}
                            onClick={() => markAsRead(n.id)}
                        >
                            <div className="notification-item-dot" />
                            <div className="notification-item-content">
                                <div className="notification-item-title">{n.title}</div>
                                <div className="notification-item-message">{n.message}</div>
                                <div className="notification-item-time">{n.time}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="app-layout">
            {/* Mobile Top Bar */}
            <div className="mobile-topbar">
                <div className="mobile-topbar-left">
                    <img className="mobile-topbar-logo" src="/axa-logo.svg" alt="AXA" />
                    <span className="mobile-topbar-title">{getPageTitle()}</span>
                </div>
                <div className="mobile-topbar-right">
                    <div className="header-notification" ref={mobileNotifRef} onClick={() => setNotifOpen(!notifOpen)}>
                        <Bell size={20} />
                        {unreadCount > 0 && <span className="header-notification-badge">{unreadCount}</span>}
                        {notifOpen && <NotificationDropdown />}
                    </div>
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile overlay */}
            {mobileMenuOpen && (
                <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
            )}

            <aside className={`app-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <img className="sidebar-logo" src="/axa-logo.svg" alt="AXA" />
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
                        <div className="header-notification" ref={notifRef} onClick={() => setNotifOpen(!notifOpen)}>
                            <Bell size={20} />
                            {unreadCount > 0 && <span className="header-notification-badge">{unreadCount}</span>}
                            {notifOpen && <NotificationDropdown />}
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
