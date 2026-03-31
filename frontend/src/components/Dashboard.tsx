import React, { useState, useMemo } from 'react';
import type { UserProfile } from '../types';
import { calculateMonotributoCategory, calculateGananciasEstimate } from '../utils/taxCalculations';
import { TrendingUp, ShieldCheck, AlertCircle, Info, ArrowUpRight, CheckCircle2, Printer } from 'lucide-react';
import OptimizationEngine from './OptimizationEngine';
import NotificationCenter from './NotificationCenter';
import AIAnalyzer from './AIAnalyzer';

interface DashboardProps {
    user: UserProfile;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user: initialUser, onLogout }) => {
    const [user, setUser] = useState<UserProfile>(initialUser);
    
    const handleDataExtracted = (newData: Partial<UserProfile>) => {
        setUser(prev => ({ ...prev, ...newData }));
    };

    const monoResult = useMemo(() => {
        const res = calculateMonotributoCategory(user.monthlyRevenue * 12);
        return res;
    }, [user.monthlyRevenue]);

    const ganResult = useMemo(() => {
        return calculateGananciasEstimate(user.monthlyRevenue, user.hasConyuge, user.childrenCount, user.isEmployee);
    }, [user.monthlyRevenue, user.hasConyuge, user.childrenCount, user.isEmployee]);

    const totalCuota = (monoResult as any).total_monthly || (monoResult as any).monthly_fee;

    return (
        <div className="dashboard-container animate-fade-in" style={{ padding: '40px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
                <div>
                    <h1 className="brand-font" style={{ fontSize: '40px', marginBottom: '8px' }}>Hola, {user.fullName || 'Contribuyente'} 👋</h1>
                    <p style={{ color: 'var(--text-muted)' }}>CUIT: {user.cuit} | Régimen: {user.regime.toUpperCase()}</p>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <button onClick={() => window.print()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '14px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)' }}>
                        <Printer size={16} /> Imprimir Reporte
                    </button>
                    <button onClick={onLogout} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)', fontSize: '14px', padding: '8px 16px' }}>Cerrar Sesión</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
                
                {/* 1. Main Tax Summary */}
                <div className="glass-panel" style={{ padding: '32px', borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--text-muted)' }}>
                        <TrendingUp size={20} />
                        <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>RESUMEN DE IMPUESTOS (MENSUAL)</span>
                    </div>
                    {user.regime === 'monotributo' ? (
                        <>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Cuota Unificada (AFIP+AGIP) Cat {(monoResult as any).category}</p>
                            <h2 style={{ fontSize: '48px', margin: '16px 0' }}>${totalCuota?.toLocaleString()}</h2>
                            <div style={{ display: 'flex', gap: '8px', color: 'var(--accent)', fontSize: '13px' }}>
                                <CheckCircle2 size={16} /> Vencimiento: Próximo 20
                            </div>
                        </>
                    ) : (
                        <>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Ganancias Estimadas Mensuales</p>
                            <h2 style={{ fontSize: '48px', margin: '16px 0' }}>${ganResult.monthlyTax?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
                            <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
                                <Info size={16} /> Basado en ingresos del período actual.
                            </div>
                        </>
                    )}
                </div>

                {/* 2. Optimization Alerts */}
                <div className="glass-panel" style={{ padding: '32px', background: 'rgba(34, 211, 238, 0.05)', borderLeft: '4px solid var(--accent)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--accent)' }}>
                        <ArrowUpRight size={20} />
                        <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>OPORTUNIDADES DE AHORRO</span>
                    </div>
                    
                    <div style={{ display: 'grid', gap: '16px' }}>
                        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
                            <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Deducción por Educación 🎓</div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Podés deducir cursos realizados. Ahorro pot: $4.500</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
                            <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Gastos Médicos 🩺</div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cargá tus facturas de prepaga/médicos para bajar base.</p>
                        </div>
                    </div>
                </div>

                {/* 3. Status & Alarms */}
                <div className="glass-panel" style={{ padding: '32px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--text-muted)' }}>
                        <ShieldCheck size={20} />
                        <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>ESTADO FISCAL</span>
                    </div>
                    
                    <div style={{ padding: '20px', background: (monoResult as any).isClose ? 'rgba(234, 179, 8, 0.1)' : 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {(monoResult as any).isClose ? <AlertCircle color="#eab308" /> : <CheckCircle2 color="#22c55e" />}
                            <span style={{ fontWeight: '600', color: (monoResult as any).isClose ? '#eab308' : '#22c55e' }}>{(monoResult as any).isClose ? 'Atención: Recategorización' : 'Categoría Estable'}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                           {(monoResult as any).isClose 
                            ? `Te quedan poco margen antes de subir de categoría (IPC proyectado).` 
                            : 'Estás lejos del límite de facturación semestral.'}
                        </p>
                    </div>

                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        📅 <strong>Próximo evento:</strong> Recategorización semestral Julio 2026.<br/>
                        🏦 <strong>Dato:</strong> Tus deducciones bajaron el impuesto un 8% este mes.
                    </div>
                </div>

            </div>

            {/* Notification Center */}
            <NotificationCenter taxId={user.cuit} />

            {/* Optimization Engine */}
            <div style={{ marginTop: '64px' }}>
                <OptimizationEngine user={user} />
            </div>

            {/* AI Document Analyzer */}
            <AIAnalyzer user={user} onDataExtracted={handleDataExtracted} />
        </div>
    );
};

export default Dashboard;
