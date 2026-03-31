import React, { useState } from 'react';
import { Bell, RefreshCcw, Calendar, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { syncWithAFIP } from '../services/afipService';
import type { AfipStatus } from '../services/afipService';

interface NotificationCenterProps {
  taxId: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ taxId }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AfipStatus | null>(null);

  const handleSync = async () => {
    setLoading(true);
    try {
      const result = await syncWithAFIP(taxId);
      setData(result);
    } catch (error) {
      console.error("AFIP Sync failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-center animate-fade-in" style={{ marginTop: '40px' }}>
      <div className="glass-panel" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={20} />
            </div>
            <div>
              <h3 className="brand-font" style={{ fontSize: '20px' }}>Centro de Notificaciones</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sincronizado con ARCA (ex-AFIP)</p>
            </div>
          </div>
          <button 
            onClick={handleSync} 
            disabled={loading}
            className="btn-primary" 
            style={{ padding: '10px 20px', fontSize: '14px', background: 'transparent', border: '1px solid var(--glass-border)' }}
          >
            <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} style={{ marginRight: data ? '8px' : '0' }} />
            {loading ? 'Sincronizando...' : data ? 'Actualizar' : 'Sincronizar ahora'}
          </button>
        </div>

        {!data && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', border: '2px dashed var(--glass-border)', borderRadius: '16px' }}>
            <Calendar size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', opacity: 0.3 }} />
            <p style={{ color: 'var(--text-muted)' }}>Conecta tu cuenta para recibir alertas de vencimiento.</p>
          </div>
        )}

        {data && (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {data.nextDeadlines.map((deadline, idx) => (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ 
                  padding: '20px', 
                  background: deadline.isUrgent ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255,255,255,0.02)',
                  borderColor: deadline.isUrgent ? 'rgba(239, 68, 68, 0.2)' : 'var(--glass-border)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', background: deadline.isUrgent ? '#ef4444' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                    {deadline.isUrgent ? 'URGENTE' : 'PRÓXIMO'}
                  </div>
                  {deadline.isUrgent && <AlertTriangle size={16} color="#ef4444" />}
                </div>
                <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{deadline.label}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Vence el: <strong>{new Date(deadline.date).toLocaleDateString('es-AR')}</strong></p>
                
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                   <a href={data.constanciaUrl} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                     Pagar en AFIP <ExternalLink size={12} />
                   </a>
                </div>
              </div>
            ))}
            
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(34, 197, 94, 0.05)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estado Tributario</p>
                <p style={{ fontWeight: 'bold', color: '#22c55e' }}>ACTIVO / SIN DEUDA</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
