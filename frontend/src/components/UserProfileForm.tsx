import React, { useState } from 'react';
import type { UserProfile, FiscalRegime } from '../types';
import { Database, UserCheck, Calculator, Briefcase, MapPin, Smile } from 'lucide-react';

interface UserProfileFormProps {
    email: string;
    onComplete: (profile: UserProfile) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ email, onComplete }) => {
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<Partial<UserProfile>>({
        email: email,
        regime: 'monotributo',
        hasConyuge: false,
        childrenCount: 0,
        isEmployee: false,
        province: 'CABA'
    });

    const handleChange = (field: keyof UserProfile, value: any) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete(profile as UserProfile);
    };

    return (
        <div className="profile-container animate-fade-in" style={{ maxWidth: '600px', margin: '80px auto' }}>
            {/* Step Indicator */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                {[1, 2, 3].map(s => (
                    <div key={s} style={{ flex: 1, height: '4px', borderRadius: '2px', background: s <= step ? 'var(--primary)' : 'rgba(255,255,255,0.05)', transition: 'all 0.4s ease' }}></div>
                ))}
            </div>

            <div className="glass-panel" style={{ padding: '48px' }}>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h2 className="brand-font" style={{ fontSize: '28px', marginBottom: '12px' }}>Personalice su experiencia</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Primero, necesitamos algunos datos básicos impositivos.</p>
                            
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                    <Database size={16} /> CUIT / CUIL
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="20-12345678-9" 
                                    className="glass-panel" 
                                    style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', fontSize: '16px', outline: 'none' }}
                                    onChange={(e) => handleChange('cuit', e.target.value)}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                    <MapPin size={16} /> Provincia de Residencia
                                </label>
                                <select 
                                    className="glass-panel" 
                                    style={{ width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', fontSize: '16px', outline: 'none' }}
                                    onChange={(e) => handleChange('province', e.target.value)}
                                >
                                    {['CABA', 'Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza'].map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>

                            <button type="button" onClick={nextStep} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', marginTop: '16px' }}>Continuar</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in">
                            <h2 className="brand-font" style={{ fontSize: '28px', marginBottom: '12px' }}>Su Régimen Fiscal</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>¿Cómo factura sus ingresos actualmente?</p>
                            
                            <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                                {[
                                    { id: 'monotributo', label: 'Monotributista', desc: 'Simplificado para pequeños contribuyentes.' },
                                    { id: 'responsable_inscripto', label: 'Responsable Inscripto', desc: 'Régimen general con IVA y Ganancias.' }
                                ].map(r => (
                                    <label 
                                        key={r.id}
                                        style={{ 
                                            display: 'block', 
                                            padding: '20px', 
                                            borderRadius: '16px', 
                                            cursor: 'pointer', 
                                            transition: 'var(--transition)',
                                            background: profile.regime === r.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.05)',
                                            border: `1px solid ${profile.regime === r.id ? 'var(--primary)' : 'var(--glass-border)'}`
                                        }}
                                    >
                                        <input 
                                            type="radio" 
                                            name="regime" 
                                            style={{ display: 'none' }} 
                                            onChange={() => handleChange('regime', r.id)}
                                        />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ color: profile.regime === r.id ? 'var(--primary)' : 'var(--text-muted)' }}>
                                                {r.id === 'monotributo' ? <Calculator /> : <Briefcase />}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600', fontSize: '18px' }}>{r.label}</div>
                                                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{r.desc}</div>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                    Ingresos mensuales proyectados (Promedio)
                                </label>
                                <input 
                                    type="number" 
                                    placeholder="$ 0" 
                                    className="glass-panel" 
                                    style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', fontSize: '16px', outline: 'none' }}
                                    onChange={(e) => handleChange('monthlyRevenue', Number(e.target.value))}
                                    required
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="button" onClick={prevStep} className="btn-primary" style={{ flex: 1, background: 'transparent', border: '1px solid var(--glass-border)', justifyContent: 'center' }}>Volver</button>
                                <button type="button" onClick={nextStep} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Continuar</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in">
                            <h2 className="brand-font" style={{ fontSize: '28px', marginBottom: '12px' }}>Situación Familiar</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Esto nos permite calcular deducciones por Ganancias.</p>
                            
                            <label className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderRadius: '16px', cursor: 'pointer', marginBottom: '16px', background: profile.hasConyuge ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${profile.hasConyuge ? 'var(--primary)' : 'var(--glass-border)'}` }}>
                                <input type="checkbox" onChange={(e) => handleChange('hasConyuge', e.target.checked)} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <UserCheck size={20} color={profile.hasConyuge ? 'var(--primary)' : 'var(--text-muted)'} />
                                    <div>
                                        <div style={{ fontWeight: '600' }}>Cónyuge a cargo</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sin ingresos o inferiores al MNI.</div>
                                    </div>
                                </div>
                            </label>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>Hijos a cargo</label>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {[0, 1, 2, 3, 4].map(n => (
                                        <button 
                                            key={n}
                                            type="button"
                                            onClick={() => handleChange('childrenCount', n)}
                                            style={{ 
                                                flex: 1, 
                                                padding: '12px', 
                                                borderRadius: '12px', 
                                                border: `1px solid ${profile.childrenCount === n ? 'var(--primary)' : 'var(--glass-border)'}`,
                                                background: profile.childrenCount === n ? 'var(--primary)' : 'transparent',
                                                color: 'white',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <label className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderRadius: '16px', cursor: 'pointer', marginBottom: '32px', background: profile.isEmployee ? 'rgba(34, 211, 238, 0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${profile.isEmployee ? 'var(--accent)' : 'var(--glass-border)'}` }}>
                                <input type="checkbox" onChange={(e) => handleChange('isEmployee', e.target.checked)} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Smile size={20} color={profile.isEmployee ? 'var(--accent)' : 'var(--text-muted)'} />
                                    <div>
                                        <div style={{ fontWeight: '600' }}>Relación de Dependencia</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Para deducción especial por 4ta categoría.</div>
                                    </div>
                                </div>
                            </label>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="button" onClick={prevStep} className="btn-primary" style={{ flex: 1, background: 'transparent', border: '1px solid var(--glass-border)', justifyContent: 'center' }}>Volver</button>
                                <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Finalizar Perfil</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserProfileForm;
