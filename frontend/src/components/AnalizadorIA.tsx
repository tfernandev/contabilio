import React, { useState, useRef } from 'react';
import { Scan, CheckCircle2, AlertTriangle, X, Loader2, FileText } from 'lucide-react';

interface ExtractedData {
    titular: string;
    cuit: string;
    documentType: string;
    totalAmount: number;
    period: string;
    riskAlert?: string;
}

const AnalizadorIA: React.FC = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<ExtractedData | null>(null);
    const [isPDF, setIsPDF] = useState(false);
    const [showPlan, setShowPlan] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setIsPDF(selected.type === 'application/pdf');
            setPreview(URL.createObjectURL(selected));
            analyzeFile(selected);
        }
    };

    const analyzeFile = async (file?: File) => {
        setIsAnalyzing(true);
        setResult(null);
        setShowPlan(false);
        
        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            } else {
                // Si no hay archivo real (clic en el panel sin input), usamos un blob vacío para el demo
                formData.append('file', new Blob(['demo'], { type: 'text/plain' }), 'demo.txt');
            }

            const response = await fetch('http://localhost:5154/api/analyzer/analyze', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Error en el análisis de IA');
            
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servicio de IA de .NET");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleImportToHealth = () => {
        if (result) {
            const currentExpenses = Number(localStorage.getItem('contabilio_expenses')) || 0;
            localStorage.setItem('contabilio_expenses', (currentExpenses + result.totalAmount).toString());
            alert(`✅ Se han importado $${result.totalAmount.toLocaleString()} de deuda a tu perfil de Salud Fiscal.`);
            window.location.href = '#health';
        }
    };

    const reset = () => {
        setPreview(null);
        setResult(null);
        setIsPDF(false);
        setShowPlan(false);
    };

    return (
        <div className="animate-fade-in" style={{ padding: '40px 0' }} id="analyzer">
            {/* Header omitted for brevity */}
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '38px', fontWeight: 900, letterSpacing: '-1.5px' }}>
                    Analizador de <span style={{ color: 'var(--primary)' }}>Documentos IA</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '8px' }}>
                    Sencillamente arrastrá Facturas, Comprobantes AGIP o ARCA y extraé la verdad fiscal.
                </p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '32px' }}>
                
                {!result ? (
                    <div 
                        className="glass-panel"
                        style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border)', cursor: 'pointer' }}
                    >
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                        {isAnalyzing ? (
                            <div style={{ textAlign: 'center' }}>
                                <Loader2 size={64} className="animate-spin" color="var(--primary)" />
                                <h3 style={{ marginTop: '24px', fontWeight: 800 }}>Extrayendo metadatos...</h3>
                            </div>
                        ) : (
                            <div onClick={() => analyzeFile()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Scan size={48} color="var(--primary)" style={{ marginBottom: '24px' }} />
                                <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Subir Factura o Boleta</h3>
                                <button onClick={(e) => {e.stopPropagation(); fileInputRef.current?.click()}} className="btn-primary" style={{ marginTop: '32px' }}>Seleccionar Archivo</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                            <button onClick={reset} style={{ background: 'white', border: '1px solid #eee', borderRadius: '50%', padding: '8px' }}><X size={20} /></button>
                        </div>
                        <div style={{ height: '520px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'relative', width: '90%', height: '90%' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)', animation: 'scan 2s infinite linear', zIndex: 5 }}></div>
                                {isPDF ? (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '12px' }}>
                                        <FileText size={100} color="#ef4444" />
                                        <p style={{ marginTop: '16px', fontWeight: 700, color: 'var(--text-secondary)' }}>Documento PDF Detectado</p>
                                    </div>
                                ) : (
                                    preview && <img src={preview} alt="Document" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="glass-panel" style={{ padding: '32px', background: 'white' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <CheckCircle2 color="#10b981" size={24} />
                                <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Extracción Exitosa</h3>
                            </div>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                <DataRow label="Contribuyente" value={result.titular} />
                                <DataRow label="CUIT" value={result.cuit} />
                                <DataRow label="Documento" value={result.documentType} />
                                <DataRow label="Periodo" value={result.period} />
                                <div style={{ borderTop: '1px solid #eee', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>MONTO TOTAL</span>
                                    <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--primary)' }}>${result.totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {showPlan ? (
                             <div className="glass-panel animate-fade-in" style={{ padding: '24px', background: '#1e293b', color: 'white' }}>
                                <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', color: 'var(--accent)' }}>PLAN DE PAGOS SUGERIDO (MORATORIA 2026)</h4>
                                <div style={{ fontSize: '13px', display: 'grid', gap: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Entrega Inicial (30%)</span> <span style={{ fontWeight: 700 }}>$18.841,95</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>12 cuotas fijas de:</span> <span style={{ fontWeight: 700 }}>$4.150,00</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}><span>Ahorro en intereses:</span> <span style={{ fontWeight: 700 }}>$12.500,00</span></div>
                                </div>
                                <button onClick={() => setShowPlan(false)} className="btn-secondary" style={{ width: '100%', marginTop: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}>Ocultar Plan</button>
                             </div>
                        ) : result.riskAlert && (
                            <div className="glass-panel" style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.05)', borderLeft: '6px solid #ef4444' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <AlertTriangle color="#ef4444" size={24} style={{ flexShrink: 0 }} />
                                    <div>
                                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ef4444' }}>Alerta de Riesgo Fiscal</h4>
                                        <p style={{ fontSize: '13px', color: '#7f1d1d' }}>{result.riskAlert}</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowPlan(true)} className="btn-primary" style={{ width: '100%', marginTop: '20px', background: '#ef4444', border: 'none' }}>
                                    Plan de Pagos Sugerido
                                </button>
                            </div>
                        )}
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <button onClick={reset} className="btn-secondary">Subir Otro</button>
                            <button onClick={handleImportToHealth} className="btn-primary" style={{ background: 'var(--primary-gradient)' }}>Importar a Salud Fiscal</button>
                        </div>
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
            `}</style>
        </div>
    );
};

const DataRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>
        <span style={{ fontWeight: 700, textAlign: 'right' }}>{value}</span>
    </div>
);

export default AnalizadorIA;
