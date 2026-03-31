import React, { useState, useMemo } from 'react';
import type { UserProfile } from '../types';
import { calculateGananciasEstimate } from '../utils/taxCalculations';
import { Sparkles, Home, GraduationCap, Users, Calculator, CheckCircle } from 'lucide-react';

interface OptimizationEngineProps {
    user: UserProfile;
}

const OptimizationEngine: React.FC<OptimizationEngineProps> = ({ user }) => {
    const [rent, setRent] = useState(0);
    const [edu, setEdu] = useState(0);
    const [household, setHousehold] = useState(0);

    // Calculate baseline (current)
    const baseline = useMemo(() => 
        calculateGananciasEstimate(user.monthlyRevenue, user.hasConyuge, user.childrenCount, user.isEmployee),
    [user]);

    // Calculate optimized
    const optimized = useMemo(() => 
        calculateGananciasEstimate(user.monthlyRevenue, user.hasConyuge, user.childrenCount, user.isEmployee, {
            rent: rent * 12,
            education: edu * 12,
            household: household * 12
        }),
    [user, rent, edu, household]);

    const monthlySaving = Math.max(0, baseline.monthlyTax - optimized.monthlyTax);
    const annualSaving = monthlySaving * 12;

    return (
        <div className="optimization-engine animate-fade-in" style={{ padding: '40px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', background: 'rgba(34, 211, 238, 0.1)', color: 'var(--accent)', fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>
                    <Sparkles size={16} /> MOTOR DE OPTIMIZACIÓN V1
                </div>
                <h2 className="brand-font" style={{ fontSize: '36px' }}>Encontrá tu ahorro máximo</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Ingresá tus gastos mensuales para calcular la devolución de impuestos.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
                
                {/* Inputs */}
                <div className="glass-panel" style={{ padding: '32px' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--text-muted)' }}>
                            <Home size={18} /> Alquiler Mensual (ARS)
                        </label>
                        <input 
                            type="number" 
                            className="glass-panel" 
                            style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }}
                            placeholder="Ej: 500000"
                            onChange={(e) => setRent(Number(e.target.value))}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--text-muted)' }}>
                            <GraduationCap size={18} /> Educación / Capacitación (ARS/mes)
                        </label>
                        <input 
                            type="number" 
                            className="glass-panel" 
                            style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }}
                            placeholder="Ej: 100000"
                            onChange={(e) => setEdu(Number(e.target.value))}
                        />
                    </div>

                    <div style={{ marginBottom: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--text-muted)' }}>
                            <Users size={18} /> Servicio Doméstico (ARS/mes)
                        </label>
                        <input 
                            type="number" 
                            className="glass-panel" 
                            style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }}
                            placeholder="Ej: 150000"
                            onChange={(e) => setHousehold(Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* Results Card */}
                <div className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }}></div>
                    
                    <h3 style={{ marginBottom: '32px', fontSize: '20px' }}>Impacto de Optimización</h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                        <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Impuesto Original</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '4px' }}>${baseline.monthlyTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(34, 211, 238, 0.05)', border: '1px solid var(--accent)' }}>
                            <p style={{ fontSize: '12px', color: 'var(--accent)' }}>Impuesto Optimizado</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '4px', color: 'var(--accent)' }}>${optimized.monthlyTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', padding: '32px', borderRadius: '24px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}>
                        <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'rgba(255,255,255,0.8)' }}>Ahorras mensualmente</p>
                        <h2 style={{ fontSize: '56px', margin: '8px 0', color: 'white' }}>${monthlySaving.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                            <CheckCircle size={14} /> ${annualSaving.toLocaleString(undefined, { maximumFractionDigits: 0 })} al año
                        </div>
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calculator size={14} /> Los cálculos incluyen el componente impositivo de 2025.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OptimizationEngine;
