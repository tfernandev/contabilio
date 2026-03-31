import React, { useState, useEffect } from 'react';
import { ShieldAlert, DollarSign, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Landmark } from 'lucide-react';
import { calculateFiscalHealth } from '../utils/fiscalRules';
import type { FiscalHealthProfile } from '../utils/fiscalRules';
import { ARCAService } from '../services/arcaService';

const TaxHealthDashboard: React.FC = () => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [profile, setProfile] = useState<FiscalHealthProfile>({
        annualRevenue: Number(localStorage.getItem('contabilio_revenue')) || 0,
        annualExpenses: 0,
        domicileJurisdiction: 'CABA',
        billingJurisdiction: 'CABA',
        observedRetentionRate: 0,
        expectedRetentionRate: 1.5
    });

    const [healthResult, setHealthResult] = useState(calculateFiscalHealth(profile));

    useEffect(() => {
        setHealthResult(calculateFiscalHealth(profile));
    }, [profile]);

    const handleSyncARCA = async () => {
        setIsSyncing(true);
        try {
            const data = await ARCAService.getTaxpayerProfile('20-12345678-9');
            setProfile(prev => ({
                ...prev,
                annualRevenue: data.annualRevenue || prev.annualRevenue,
                domicileJurisdiction: (data.province as any) || prev.domicileJurisdiction,
            }));
            // Trigger a small animation or toast if available
        } catch (e) {
            console.error("Fallo de conexión con ARCA");
        } finally {
            setIsSyncing(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return '#10b981'; // Green
        if (score >= 50) return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    return (
        <div style={{ padding: '40px 0' }} className="animate-fade-in" id="health">
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '38px', fontWeight: 900, letterSpacing: '-1.5px' }}>
                    Salud Fiscal <span style={{ color: 'var(--primary)' }}>360°</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '8px' }}>
                    Prevención de riesgos e Inteligencia Financiera basada en normativas ARCA/AGIP 2026.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px' }}>
                {/* Column 1: Financial Profile */}
                <div className="glass-panel" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <Landmark size={20} color="var(--primary)" /> Perfil Económico
                        </h3>
                        <button 
                            onClick={handleSyncARCA}
                            disabled={isSyncing}
                            className="btn-primary"
                            style={{ 
                                padding: '8px 16px', fontSize: '12px', gap: '6px', 
                                background: 'var(--primary-gradient)', 
                                opacity: isSyncing ? 0.7 : 1,
                                height: 'auto', borderRadius: '50px'
                            }}
                        >
                            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                            {isSyncing ? 'Sincronizando...' : 'Conectar ARCA'}
                        </button>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Ingresos Brutos (Anuales)</label>
                        <input 
                            type="number" 
                            className="glass-panel"
                            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border)' }}
                            value={profile.annualRevenue || ''}
                            onChange={(e) => setProfile({...profile, annualRevenue: Number(e.target.value)})}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Gastos Estimados (Tarjetas/Alquiler)</label>
                        <input 
                            type="number" 
                            className="glass-panel"
                            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border)' }}
                            placeholder="Ej: 15.000.000"
                            onChange={(e) => setProfile({...profile, annualExpenses: Number(e.target.value)})}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Vives en:</label>
                            <select 
                                className="glass-panel"
                                style={{ width: '100%', padding: '12px', background: 'white', border: '1px solid var(--border)' }}
                                onChange={(e) => setProfile({...profile, domicileJurisdiction: e.target.value as any})} 
                                value={profile.domicileJurisdiction}
                            >
                                <option value="CABA">CABA</option>
                                <option value="PBA">PBA</option>
                                <option value="OTRO">Interior</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Facturas en:</label>
                            <select 
                                className="glass-panel"
                                style={{ width: '100%', padding: '12px', background: 'white', border: '1px solid var(--border)' }}
                                onChange={(e) => setProfile({...profile, billingJurisdiction: e.target.value as any})} 
                                value={profile.billingJurisdiction}
                            >
                                <option value="CABA">CABA</option>
                                <option value="PBA">PBA</option>
                                <option value="OTRO">Interior</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '8px' }}>
                       <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>SIRCREB (Tasa Retención %)</label>
                       <input 
                            type="number" 
                            className="glass-panel"
                            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border)' }}
                            placeholder="Ej: 2.5"
                            step="0.1"
                            onChange={(e) => setProfile({...profile, observedRetentionRate: Number(e.target.value)})}
                        />
                    </div>
                </div>

                {/* Column 2: Health Analysis */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-panel" style={{ padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: `6px solid ${getScoreColor(healthResult.score)}` }}>
                        <div>
                            <p style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '4px', letterSpacing: '1px' }}>HEALTH SCORE FISCAL</p>
                            <h2 style={{ fontSize: '56px', fontWeight: 900, color: getScoreColor(healthResult.score), lineHeight: 1 }}>{healthResult.score}/100</h2>
                            <div style={{ marginTop: '12px' }}>
                                <span style={{ padding: '4px 12px', borderRadius: '20px', background: `${getScoreColor(healthResult.score)}15`, color: getScoreColor(healthResult.score), fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>
                                    {healthResult.status}
                                </span>
                            </div>
                        </div>
                        <div style={{ opacity: 0.1 }}>
                           <ShieldAlert size={80} />
                        </div>
                    </div>

                    <div className="alerts-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {healthResult.alerts.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px dashed #10b981' }}>
                                <CheckCircle2 size={48} color="#10b981" style={{ marginBottom: '16px', margin: '0 auto' }} />
                                <h4 style={{ fontWeight: 800, fontSize: '18px' }}>Perfil Saludable</h4>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>No hay riesgos detectados en el padrón ARCA actual.</p>
                            </div>
                        ) : (
                            healthResult.alerts.map((alert, i) => (
                                <div key={i} className="animate-fade-in glass-panel" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'white' }}>
                                    {alert.level === 'error' ? <XCircle color="#ef4444" size={24} /> : <AlertTriangle color="#f59e0b" size={24} />}
                                    <div style={{ flex: 1 }}>
                                        <h5 style={{ fontWeight: 800, fontSize: '15px', marginBottom: '4px' }}>{alert.title}</h5>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{alert.message}</p>
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: 900, color: alert.level === 'error' ? '#ef4444' : '#f59e0b', whiteSpace: 'nowrap' }}>
                                        {alert.scoreImpact.toLocaleString()} pts
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxHealthDashboard;
