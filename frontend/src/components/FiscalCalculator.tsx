import React, { useState, useEffect } from 'react';
import { calculateMonotributoCategory, calculateGananciasEstimate } from '../utils/taxCalculations';
import { Info, HelpCircle, TrendingDown, Layers, Landmark } from 'lucide-react';

const FiscalCalculator: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'mono' | 'gan'>('gan');
    
    // Monotributo State
    const [revenue, setRevenue] = useState<number>(() => Number(localStorage.getItem('contabilio_revenue')) || 0);
    const [monoResult, setMonoResult] = useState<any>(null);

    // Ganancias State
    const [grossSalary, setGrossSalary] = useState<number>(() => Number(localStorage.getItem('contabilio_gross_salary')) || 0);
    const [hasConyuge, setHasConyuge] = useState<boolean>(() => localStorage.getItem('contabilio_has_conyuge') === 'true');
    const [children, setChildren] = useState<number>(() => Number(localStorage.getItem('contabilio_children')) || 0);
    const [rent, setRent] = useState<number>(() => Number(localStorage.getItem('contabilio_rent')) || 0);
    const [education, setEducation] = useState<number>(() => Number(localStorage.getItem('contabilio_education')) || 0);
    const [bonus, setBonus] = useState<number>(() => Number(localStorage.getItem('contabilio_bonus')) || 0);
    const [ganResult, setGanResult] = useState<any>(null);

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('contabilio_revenue', revenue.toString());
        localStorage.setItem('contabilio_gross_salary', grossSalary.toString());
        localStorage.setItem('contabilio_has_conyuge', hasConyuge.toString());
        localStorage.setItem('contabilio_children', children.toString());
        localStorage.setItem('contabilio_rent', rent.toString());
        localStorage.setItem('contabilio_education', education.toString());
        localStorage.setItem('contabilio_bonus', bonus.toString());
    }, [revenue, grossSalary, hasConyuge, children, rent, education, bonus]);

    // Calc Monotributo
    useEffect(() => {
        if (revenue > 0) setMonoResult(calculateMonotributoCategory(revenue));
        else setMonoResult(null);
    }, [revenue]);

    useEffect(() => {
        if (grossSalary > 0) {
            setGanResult(calculateGananciasEstimate(grossSalary + (bonus/12), hasConyuge, children, true, { rent: rent * 12, education: education * 12 }));
        } else {
            setGanResult(null);
        }
    }, [grossSalary, hasConyuge, children, rent, education, bonus]);

    return (
        <div className="fiscal-dashboard glass-panel animate-fade-in" style={{ padding: '0', overflow: 'hidden' }}>
            {/* Tab Header */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: '#fcfcfc' }}>
                <button 
                    onClick={() => setActiveTab('gan')}
                    style={{ 
                        flex: 1, padding: '20px', border: 'none', background: activeTab === 'gan' ? 'white' : 'transparent',
                        color: activeTab === 'gan' ? 'var(--primary)' : 'var(--text-secondary)',
                        fontWeight: 700, cursor: 'pointer', fontSize: '15px', borderBottom: activeTab === 'gan' ? '3px solid var(--primary)' : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                >
                    <Landmark size={18} /> IMPUESTO A LAS GANANCIAS
                </button>
                <button 
                    onClick={() => setActiveTab('mono')}
                    style={{ 
                        flex: 1, padding: '20px', border: 'none', background: activeTab === 'mono' ? 'white' : 'transparent',
                        color: activeTab === 'mono' ? 'var(--primary)' : 'var(--text-secondary)',
                        fontWeight: 700, cursor: 'pointer', fontSize: '15px', borderBottom: activeTab === 'mono' ? '3px solid var(--primary)' : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                >
                    <Layers size={18} /> MONOTRIBUTO 2026
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '600px' }}>
                {/* Form Section */}
                <div style={{ padding: '40px', borderRight: '1px solid var(--border)' }}>
                    {activeTab === 'gan' ? (
                        <div className="animate-fade-in">
                            <h3 style={{ fontSize: '20px', marginBottom: '24px', fontWeight: 700 }}>Parámetros de Simulación</h3>
                            
                            <div style={{ marginBottom: '24px' }}>
                                <label>Salario Bruto Mensual (ARS)</label>
                                <input 
                                    type="number" 
                                    value={grossSalary || ''}
                                    placeholder="Ej: 3.500.000" 
                                    onChange={(e) => setGrossSalary(Number(e.target.value))} 
                                />
                                <div style={{ fontSize: '12px', color: 'var(--primary)', marginTop: '6px', fontWeight: 600 }}>
                                    Entrada: ${grossSalary.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                <div>
                                    <label>Bonos/Extras (Anual)</label>
                                    <input 
                                        type="number" 
                                        value={bonus || ''}
                                        placeholder="Ej: 1.000.000" 
                                        onChange={(e) => setBonus(Number(e.target.value))} 
                                    />
                                </div>
                                <div>
                                    <label>Hijos a Cargo</label>
                                    <select onChange={(e) => setChildren(Number(e.target.value))} value={children}>
                                        {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n} hijos</option>)}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                                <div 
                                    onClick={() => setHasConyuge(!hasConyuge)}
                                    style={{ 
                                        flex: 1, padding: '12px', borderRadius: '10px', border: `2px solid ${hasConyuge ? 'var(--primary)' : 'var(--border)'}`,
                                        background: hasConyuge ? 'rgba(99, 102, 241, 0.05)' : 'white', cursor: 'pointer', textAlign: 'center', fontSize: '13px', fontWeight: 600
                                    }}
                                >
                                    Cónyuge a cargo
                                </div>
                            </div>

                            <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Deducciones Adicionales (Mensual)</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label>Alquiler Casa Hab.</label>
                                    <input 
                                        type="number" 
                                        value={rent || ''}
                                        placeholder="0" 
                                        onChange={(e) => setRent(Number(e.target.value))} 
                                    />
                                </div>
                                <div>
                                    <label>Gastos Educación</label>
                                    <input 
                                        type="number" 
                                        value={education || ''}
                                        placeholder="0" 
                                        onChange={(e) => setEducation(Number(e.target.value))} 
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <h3 style={{ fontSize: '20px', marginBottom: '24px', fontWeight: 700 }}>Proyección de Facturación</h3>
                            <div style={{ marginBottom: '24px' }}>
                                <label>Ventas anuales estimadas</label>
                                <input 
                                    type="number" 
                                    value={revenue || ''}
                                    placeholder="Ej: 20.000.000" 
                                    onChange={(e) => setRevenue(Number(e.target.value))} 
                                />
                                <p style={{ fontSize: '12px', color: 'var(--primary)', marginTop: '8px', fontWeight: 600 }}>
                                    Mensual Promedio: ${(revenue/12).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <h4 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Info size={16} /> Nota sobre Escalas</h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    A partir de Enero 2026, los topes se actualizan semestralmente por IPC. Nuestra calculadora utiliza los valores oficiales de la <strong>actualización de Enero 2026</strong>.
                                </p>
                            </div>

                            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(99, 102, 241, 0.03)', borderRadius: '12px', border: '1px dashed var(--primary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '13px' }}>
                                    <Info size={14} />
                                    <span>Transparencia Fiscal (Explicabilidad)</span>
                                </div>
                                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    Este cálculo se basa en el <strong>Sistema Único Tributario (SUT)</strong> vigente en CABA desde enero 2026. 
                                    Incluye el componente nacional (AFIP) y el local (AGIP) en un solo valor. 
                                    Las escalas están ajustadas por el <strong>IPC proyectado</strong> a marzo 2026.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div style={{ padding: '40px', background: '#fcfcfc' }}>
                    {activeTab === 'gan' && ganResult ? (
                        <div className="animate-fade-in">
                            <div style={{ marginBottom: '32px' }}>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>IMPACTO EN BOLSILLO (NETO)</p>
                                <h2 style={{ fontSize: '48px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1px' }}>
                                    ${(grossSalary - ganResult.monthlyTax).toLocaleString('es-AR', { minimumFractionDigits: 0 })}
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '50px', width: 'fit-content', marginTop: '10px' }}>
                                    <TrendingDown size={14} /> <span style={{ fontSize: '13px', fontWeight: 700 }}>Retención: ${ganResult.monthlyTax.toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
                                </div>
                            </div>

                            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>DESGLOSE DEL CÁLCULO</h4>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Mínimo No Imponible</span>
                                    <span style={{ fontWeight: 600 }}>Anual</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '18px', fontWeight: 700, color: 'var(--primary)' }}>
                                    <span>Total Deducciones</span>
                                    <span>${ganResult.totalDeductions.toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
                                        <div style={{ width: `${Math.min(100, (ganResult.taxableIncome / 10000000) * 100)}%`, background: 'var(--primary-gradient)' }}></div>
                                    </div>
                                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'right' }}>BASE IMPONIBLE: ${ganResult.taxableIncome.toLocaleString('es-AR')}</p>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                        <strong>Recibo vs Realidad:</strong> Esta cifra es una estimación. Depende de si informaste tu SIRADIG antes del cierre de liquidación de tu empresa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'mono' && revenue > 0 && monoResult ? (
                        <div className="animate-fade-in">
                            {monoResult.error ? (
                                <div style={{ padding: '32px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid #ef4444', borderRadius: '16px', textAlign: 'center' }}>
                                    <HelpCircle size={48} color="#ef4444" style={{ margin: '0 auto 16px' }} />
                                    <h3 style={{ color: '#ef4444', fontWeight: 800 }}>Límite Excedido</h3>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>{monoResult.error}</p>
                                </div>
                            ) : (
                                <>
                                    <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>PAGO MENSUAL UNIFICADO (AFIP + AGIP)</p>
                                        <h2 style={{ fontSize: '72px', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-4px', lineHeight: 1 }}>
                                            ${monoResult.total_monthly?.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                                        </h2>
                                        <p style={{ fontSize: '18px', fontWeight: 600, marginTop: '8px' }}>Categoría {monoResult.category}</p>
                                    </div>

                                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
                                        <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase' }}>Desglose de Cuota (SUT 2026)</h4>
                                        
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Componente AFIP (Nacional)</span>
                                            <span style={{ fontWeight: 600 }}>${monoResult.monthly_fee?.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Componente AGIP (CABA)</span>
                                            <span style={{ fontWeight: 600 }}>${monoResult.monthly_iibb_caba?.toLocaleString()}</span>
                                        </div>

                                        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                                                <span>Límite de Categoría: ${monoResult.limit?.toLocaleString()}</span>
                                                <span style={{ fontWeight: 700 }}>Proyectado</span>
                                            </div>
                                            <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                                <div style={{ width: `${(revenue / (monoResult.limit || 1)) * 100}%`, background: (revenue / (monoResult.limit || 1)) > 0.9 ? 'var(--accent)' : 'var(--primary-gradient)' }}></div>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '12px', color: (revenue / (monoResult.limit || 1)) > 0.9 ? 'var(--accent)' : '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {(revenue / (monoResult.limit || 1)) > 0.9 ? '⚠️ CUIDADO: Estás por pasarte de categoría.' : '✅ Cumpliendo parámetros de categoría.'}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#cbd5e1' }}>
                            <HelpCircle size={80} style={{ marginBottom: '24px', opacity: 0.3 }} />
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#94a3b8' }}>Esperando datos de entrada</h3>
                            <p style={{ maxWidth: '280px', fontSize: '14px', marginTop: '10px' }}>Completá los campos de la izquierda para generar tu reporte fiscal 2026.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FiscalCalculator;
