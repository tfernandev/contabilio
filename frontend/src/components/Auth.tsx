import React, { useState } from 'react';
import { LogIn, UserPlus, ShieldCheck, Mail, Lock, User } from 'lucide-react';

interface AuthProps {
    onSuccess: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Auth Logic
        onSuccess(email);
    };

    return (
        <div className="auth-card animate-fade-in glass-panel" style={{ maxWidth: '450px', margin: '100px auto', padding: '48px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
                </div>
                <h2 className="brand-font" style={{ fontSize: '32px', marginBottom: '8px' }}>
                    {isLogin ? 'Bienvenido de nuevo' : 'Crear tu cuenta'}
                </h2>
                <p style={{ color: 'var(--text-muted)' }}>
                    {isLogin ? 'Accedé a tu dashboard fiscal.' : 'Empezá a ahorrar legalmente ahora.'}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
                            <input 
                                type="text" 
                                placeholder="Nombre Completo" 
                                className="glass-panel" 
                                style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }}
                                required
                            />
                        </div>
                    </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="glass-panel" 
                            style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className="glass-panel" 
                            style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', outline: 'none' }}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </button>
            </form>

            <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    {isLogin ? '¿No tenés cuenta?' : '¿Ya tenés cuenta?'}
                    <span 
                        onClick={() => setIsLogin(!isLogin)} 
                        style={{ color: 'var(--primary)', cursor: 'pointer', marginLeft: '8px', fontWeight: '600' }}
                    >
                        {isLogin ? 'Regístrate' : 'Iniciá Sesión'}
                    </span>
                </p>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', opacity: 0.6 }}>
                <ShieldCheck size={16} color="var(--accent)" />
                <span style={{ fontSize: '12px' }}>Encriptación AES-256 de nivel bancario</span>
            </div>
        </div>
    );
};

export default Auth;
