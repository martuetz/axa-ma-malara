import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Shield, Settings } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuth();
    const [selected, setSelected] = useState(null);

    const roles = [
        { key: 'employee', icon: User, color: 'blue', title: 'Mitarbeiter', desc: 'Lukas Brunner – Frontend Developer' },
        { key: 'manager', icon: Shield, color: 'green', title: 'Führungskraft', desc: 'David Brunner – Lead Developer' },
        { key: 'hr', icon: Settings, color: 'red', title: 'HR-Admin', desc: 'Julia Meier – HR Director' },
    ];

    const handleLogin = () => {
        if (selected) login(selected);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-logo">
                    <div className="login-logo-icon">AXA</div>
                    <h1>AXA People</h1>
                    <p>Mitarbeiter-Evaluation & Entwicklung</p>
                </div>
                <div className="login-card">
                    <h2>Anmelden</h2>
                    <div className="login-roles">
                        {roles.map(r => (
                            <button
                                key={r.key}
                                className={`login-role-btn ${selected === r.key ? 'selected' : ''}`}
                                onClick={() => setSelected(r.key)}
                            >
                                <div className={`login-role-icon ${r.color}`}>
                                    <r.icon size={22} />
                                </div>
                                <div>
                                    <div className="login-role-title">{r.title}</div>
                                    <div className="login-role-desc">{r.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                    <button
                        className="btn btn-primary btn-lg w-full"
                        onClick={handleLogin}
                        disabled={!selected}
                    >
                        Anmelden
                    </button>
                </div>
            </div>
        </div>
    );
}
