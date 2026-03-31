import React, { useState } from 'react';
import { UploadCloud, Download, BrainCircuit, AlertTriangle } from 'lucide-react';
import type { UserProfile } from '../types';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { calculateGananciasEstimate, calculateMonotributoCategory } from '../utils/taxCalculations';

// Configuración robusta del worker de PDF.js local para Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface AIAnalyzerProps {
  user?: UserProfile;
  onDataExtracted?: (data: Partial<UserProfile>) => void;
}

const AIAnalyzer: React.FC<AIAnalyzerProps> = ({ user, onDataExtracted }) => {
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [results, setResults] = useState<{ label: string; value: string; type: 'success' | 'info' | 'warning' | 'error' }[] | null>(null);
  const [verdict, setVerdict] = useState<{ monthlySaving: number; status: 'safe' | 'saving' | 'alert'; message: string } | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
    }
    return fullText;
  };

  const regexExtract = (text: string, patterns: RegExp[]): string | null => {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) return match[1].trim();
    }
    return null;
  };

  const processRealAnalysis = async (uploadedFiles: File[]) => {
    const file = uploadedFiles[0];
    if (!file) return;

    setAnalyzing(true);
    setErrorMsg(null);
    setResults(null);
    setVerdict(null);

    try {
      if (file.type !== 'application/pdf') throw new Error("Solo se permiten archivos PDF.");
      const text = await extractTextFromPDF(file);
      
      const amountPattern = `([0-9]{1,3}(?:\\.[0-9]{3})*,[0-9]{2})`;
      const isInvoice = text.toUpperCase().includes('FACTURA') || text.toUpperCase().includes('CAE');
      
      const extractedItems: any[] = [];
      let rawSueldo = 0;
      let rawOS = 0;
      let rawTotalFac = 0;

      if (isInvoice) {
        const totalFac = regexExtract(text, [new RegExp(`TOTAL.*?${amountPattern}$`, 'im'), new RegExp(`Total.*?${amountPattern}`, 'i')]);
        if (totalFac) {
          rawTotalFac = parseFloat(totalFac.replace(/\./g, '').replace(',', '.'));
          extractedItems.push({ label: 'Monto Facturado', value: `$${totalFac}`, type: 'success' });
        }
      } else {
        const sueldo = regexExtract(text, [new RegExp(`SUELDO.*?${amountPattern}`, 'i')]);
        const os = regexExtract(text, [new RegExp(`OBRA\\s+SOCIAL.*?${amountPattern}`, 'i')]);
        if (sueldo) {
          rawSueldo = parseFloat(sueldo.replace(/\./g, '').replace(',', '.'));
          extractedItems.push({ label: 'Sueldo Básico', value: `$${sueldo}`, type: 'info' });
        }
        if (os) {
          rawOS = parseFloat(os.replace(/\./g, '').replace(',', '.'));
          extractedItems.push({ label: 'Obra Social', value: `$${os}`, type: 'success' });
        }
      }

      setResults(extractedItems);

      // Verdict Logic 2026
      if (isInvoice && rawTotalFac > 0) {
        const cat = calculateMonotributoCategory(rawTotalFac * 12);
        setVerdict({ monthlySaving: 0, status: 'alert', message: `Analizando Venta. Esta factura proyectada anualmente te ubica en CATEGORÍA ${cat.category}.` });
      } else if (rawSueldo > 0) {
        const current = calculateGananciasEstimate(rawSueldo, false, 0, true);
        const opt = calculateGananciasEstimate(rawSueldo, false, 0, true, { medical: rawOS * 12 });
        setVerdict({ monthlySaving: Math.max(0, current.monthlyTax - opt.monthlyTax), status: 'saving', message: "Deduciendo Obra Social detectada podrías reducir tu retención." });
      }

      if (onDataExtracted && rawSueldo > 0) onDataExtracted({ monthlyRevenue: rawSueldo, isEmployee: true });
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragActive(false);
    if (e.dataTransfer.files?.[0]) processRealAnalysis(Array.from(e.dataTransfer.files));
  };

  return (
    <div className="ai-analyzer glass-panel" style={{ padding: '40px', background: 'white', borderRadius: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
         <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Analizador Inteligente v2026</h2>
         <p style={{ color: 'var(--text-secondary)' }}>Subí tu documentación para detección automática.</p>
      </div>

      {!analyzing && !results && !errorMsg && (
        <div onDragEnter={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} style={{ border: '2px dashed #ddd', borderRadius: '16px', padding: '60px', textAlign: 'center', background: '#fcfcfc' }}>
            <input type="file" id="file-up" style={{ display: 'none' }} accept=".pdf" onChange={(e) => e.target.files?.[0] && processRealAnalysis(Array.from(e.target.files))} />
            <UploadCloud size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
            <p style={{ fontWeight: 600 }}>Arrastrá tu PDF aquí</p>
            <button onClick={() => document.getElementById('file-up')?.click()} className="btn-primary" style={{ marginTop: '20px' }}>Seleccionar Archivo</button>
        </div>
      )}

      {analyzing && <div style={{ padding: '60px', textAlign: 'center' }}><div className="loader"></div><p>Procesando con IA local...</p></div>}

      {results && (
        <div className="results-view animate-fade-in">
             {verdict && (
                 <div style={{ padding: '24px', background: '#f1f5f9', borderRadius: '16px', marginBottom: '24px', textAlign: 'center' }}>
                     <p style={{ fontSize: '13px', fontWeight: 600 }}>RESULTADO DEL ANÁLISIS</p>
                     <h2 style={{ fontSize: '32px', fontWeight: 800 }}>${verdict.monthlySaving.toLocaleString()}</h2>
                     <p style={{ fontSize: '14px', marginTop: '4px' }}>{verdict.message}</p>
                 </div>
             )}
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                {results.map((r, i) => (
                    <div key={i} style={{ padding: '16px', border: '1px solid #eee', borderRadius: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700 }}>{r.label}</span>
                        <p style={{ fontSize: '20px', fontWeight: 600 }}>{r.value}</p>
                    </div>
                ))}
             </div>
             <button onClick={() => setResults(null)} className="btn-secondary" style={{ width: '100%' }}>Validar otro documento</button>
        </div>
      )}

      {errorMsg && <div style={{ padding: '24px', background: '#fee2e2', color: '#b91c1c', borderRadius: '12px' }}>{errorMsg} <button onClick={() => setErrorMsg(null)}>X</button></div>}
    </div>
  );
};

export default AIAnalyzer;
