import { useEffect } from 'react';
import './App.css';
import FiscalCalculator from './components/FiscalCalculator';
import AnalizadorIA from './components/AnalizadorIA';
import TaxHealthDashboard from './components/TaxHealthDashboard';
import { Calculator, ShieldCheck, Zap, Share2, TrendingUp, Cpu, Activity } from 'lucide-react';

function App() {
  const handleShare = async () => {
    // ... code
  };

  useEffect(() => {
    console.log("Contabilio Pro — Premium SaaS Experience");
  }, []);

  return (
    <div className="app-container">
      {/* Modern Translucent Navbar */}
      <header className="navbar" style={{ 
        background: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: 'var(--text-primary)', 
        padding: '20px 40px', 
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary-gradient)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Cpu size={20} />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>Contabilio<span style={{ color: 'var(--accent)' }}>.</span></h1>
        </div>
        
        <div className="nav-links" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
           <a href="#calc" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Simulador</a>
           <a href="#health" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><Activity size={14} /> Salud Fiscal</a>
           <a href="#analyzer" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Analizador IA</a>
           <button 
             onClick={handleShare}
             style={{ 
               background: '#f1f5f9', 
               border: 'none', 
               color: 'var(--text-primary)', 
               padding: '10px 18px',
               borderRadius: '50px',
               cursor: 'pointer', 
               display: 'flex', 
               alignItems: 'center', 
               gap: '8px', 
               fontSize: '13px', 
               fontWeight: 700,
               transition: 'all 0.2s ease'
             }}
           >
             <Share2 size={16} /> Compartir
           </button>
        </div>
      </header>

      <main style={{ padding: '0 40px 100px' }}>
        {/* Hero Segment */}
        {/* ... hero code ... */}
        <section className="hero" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          alignItems: 'center', 
          gap: '60px',
          padding: '100px 0',
          textAlign: 'left'
        }}>
          <div className="hero-content">
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 14px', 
              background: 'rgba(99, 102, 241, 0.1)', 
              color: 'var(--primary)', 
              fontSize: '13px', 
              fontWeight: 700, 
              borderRadius: '50px', 
              marginBottom: '24px' 
            }}>
                <TrendingUp size={16} /> NUEVA VERSIÓN PRO 2026
            </div>
            <h1 className="hero-title" style={{ fontSize: '64px', marginBottom: '24px', lineHeight: '1.1', fontWeight: 800, letterSpacing: '-2px' }}>
              Tu ahorro inteligente, <span style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>automatizado.</span>
            </h1>
            <p className="hero-description" style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '540px', lineHeight: '1.5' }}>
              Dejá que nuestra IA analice tus impuestos en segundos. Sin servidores, sin esperas, con máxima privacidad legal en Argentina.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn-primary" onClick={() => document.getElementById('calc')?.scrollIntoView({behavior: 'smooth'})}>
                  Probar Simulador 2026
                </button>
                <button className="btn-secondary" onClick={() => document.getElementById('health')?.scrollIntoView({behavior: 'smooth'})}>
                   Salud Fiscal 360°
                </button>
            </div>
          </div>
          <div className="hero-image animate-float" style={{ textAlign: 'right' }}>
             <img 
               src="./hero.png" 
               alt="Contabilio Hero Illustration" 
               style={{ width: '100%', maxWidth: '500px', borderRadius: '40px', boxShadow: 'var(--shadow-lg)' }} 
             />
          </div>
        </section>

        {/* AI Analyzer Segment */}
        <section id="analyzer" style={{ marginBottom: '120px', scrollMarginTop: '100px' }}>
           <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '38px', fontWeight: 800 }}>Analizador Fiscal IA Premium</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Optimiza tu estrategia fiscal con nuestra inteligencia artificial de vanguardia.</p>
           </div>
           <AnalizadorIA />
        </section>

        {/* Health Dashboard Segment */}
        <section id="health" style={{ marginBottom: '120px', scrollMarginTop: '100px' }}>
           <TaxHealthDashboard />
        </section>

        {/* Simulation Segment */}
        <section id="calc" style={{ padding: '80px 0', scrollMarginTop: '100px' }}>
          <div className="section-head" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ fontSize: '38px', fontWeight: 800 }}>Simulador Fiscal 2026</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Ingresá tus ingresos y descubrí cuánto podrías estar ahorrando hoy mismo.</p>
          </div>
          <FiscalCalculator />
        </section>

        {/* Feature Cards Modern */}
        <section className="features-grid" style={{ marginTop: '120px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <div className="feature-card glass-panel">
                <div style={{ width: '56px', height: '56px', background: '#f1f5f9', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                   <Zap size={30} />
                </div>
                <h3 className="feature-title" style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>Local-First</h3>
                <p className="feature-text" style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Tus datos financieros son sagrados. El procesamiento de los PDF ocurre exclusivamente en tu navegador.</p>
            </div>
            <div className="feature-card glass-panel">
                <div style={{ width: '56px', height: '56px', background: '#f1f5f9', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                   <Calculator size={30} />
                </div>
                <h3 className="feature-title" style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>Leyes al Día</h3>
                <p className="feature-text" style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Actualizado a la Ley 27.743 y sus reglamentaciones más recientes para el periodo fiscal 2026.</p>
            </div>
            <div className="feature-card glass-panel">
                <div style={{ width: '56px', height: '56px', background: '#f1f5f9', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                   <ShieldCheck size={30} />
                </div>
                <h3 className="feature-title" style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>Reportes Pro</h3>
                <p className="feature-text" style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Generá reportes ejecutivos listos para presentar, optimizando cada centavo de tus retenciones.</p>
            </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '100px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px' }}>Llevá tu ahorro al siguiente nivel.</h2>
          <p style={{ opacity: 0.6, fontSize: '16px', marginBottom: '60px' }}>Contabilio es la herramienta definitiva para freelancers y empleados bajo relación de dependencia en Argentina.</p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '14px', opacity: 0.5 }}>© 2026 Contabilio. Todos los derechos reservados.</p>
              <div style={{ display: 'flex', gap: '32px' }}>
                <a href="#" style={{ color: 'white', opacity: 0.5, textDecoration: 'none', fontSize: '13px' }}>Términos</a>
                <a href="#" style={{ color: 'white', opacity: 0.5, textDecoration: 'none', fontSize: '13px' }}>Privacidad</a>
              </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
