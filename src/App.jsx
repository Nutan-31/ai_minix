import { Activity, AlertTriangle, Zap, Play, Square, Battery, Thermometer, Zap as CurrentIcon, Repeat } from 'lucide-react';
import { useDashboard } from './hooks/useDashboard';
import SohChart from './components/SohChart';
import './index.css';

export default function App() {
  const { stats, history, alerts, toggleSimulation } = useDashboard();

  const telemetry = stats?.latestTelemetry || {};
  const soh = stats?.currentSoh || {};
  const sim = stats?.simulation || { isRunning: false };

  const getSohColor = (status) => {
    if (status === 'critical') return 'var(--ruby-red)';
    if (status === 'warning') return 'var(--amber-yellow)';
    return 'var(--neon-green)';
  };

  const getSohGlow = (status) => {
    if (status === 'critical') return 'text-glow-red';
    if (status === 'warning') return 'text-glow-yellow';
    return 'text-glow-green';
  };

  return (
    <>
      {/* Animated Ambient Background (Vibrant 4-Color Setup) */}
      <div className="bg-effects">
        <div className="glow-blob blob-1"></div>
        <div className="glow-blob blob-2"></div>
        <div className="glow-blob blob-3"></div>
        <div className="glow-blob blob-4"></div>
      </div>

      <div className="dashboard-grid">
        
        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflow: 'hidden' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 0 0.25rem 0', fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
              <Zap className="text-glow-green" size={28} /> VoltGuard <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>AI</span>
            </h1>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Battery Diagnostics Node
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', margin: 0, fontWeight: '600' }}>Simulation Engine</h2>
              <div style={{ 
                height: '8px', width: '8px', borderRadius: '50%', 
                background: sim.isRunning ? 'var(--neon-green)' : 'var(--ruby-red)',
                boxShadow: sim.isRunning ? '0 0 10px var(--neon-green)' : 'none'
              }} />
            </div>
            
            <button 
              onClick={() => toggleSimulation(sim.isRunning)}
              style={{
                width: '100%', padding: '1rem', borderRadius: '12px',
                background: sim.isRunning ? 'rgba(255, 51, 102, 0.1)' : 'rgba(0, 112, 243, 0.1)', 
                color: sim.isRunning ? 'var(--ruby-red)' : 'var(--accent-blue)', 
                border: `1px solid ${sim.isRunning ? 'rgba(255, 51, 102, 0.3)' : 'rgba(0, 112, 243, 0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s',
                textTransform: 'uppercase', letterSpacing: '1px'
              }}>
              {sim.isRunning ? <><Square size={18} /> Halt Stream</> : <><Play size={18} /> Initialize Stream</>}
            </button>
          </div>

          <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '1rem', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
              <AlertTriangle style={{ color: 'var(--amber-yellow)' }} size={20} /> System Alerts
            </h2>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {alerts && alerts.length > 0 ? (
                alerts.map((alert, i) => (
                  <div key={i} style={{ 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    borderLeft: `4px solid ${alert.severity === 'critical' ? 'var(--ruby-red)' : 'var(--amber-yellow)'}`,
                    background: 'rgba(0,0,0,0.4)',
                    fontSize: '0.85rem',
                    lineHeight: '1.5'
                  }}>
                    <strong style={{ color: alert.severity === 'critical' ? 'var(--ruby-red)' : 'var(--amber-yellow)', display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {alert.type}
                    </strong>
                    <span style={{ color: 'var(--text-main)' }}>{alert.message}</span>
                  </div>
                ))
              ) : (
                <div className="text-muted" style={{ fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>
                  All systems nominal.
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Dashboard Area */}
        <main className="main-content">
          
          {/* Premium Telemetry Cards */}
          <div className="widget-grid">
            {[
              { label: 'Voltage', value: telemetry.voltage?.toFixed(2) || '--', unit: 'V', icon: Battery, color: 'var(--neon-green)' },
              { label: 'Current', value: telemetry.current?.toFixed(2) || '--', unit: 'A', icon: CurrentIcon, color: 'var(--accent-blue)' },
              { label: 'Temperature', value: telemetry.temperature?.toFixed(1) || '--', unit: '°C', icon: Thermometer, color: 'var(--amber-yellow)' },
              { label: 'Cycle Count', value: telemetry.cycleCount || '--', unit: 'Cycles', icon: Repeat, color: 'var(--text-main)' }
            ].map((metric) => (
              <div key={metric.label} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: `3px solid ${metric.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 className="text-muted" style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {metric.label}
                  </h3>
                  <metric.icon size={18} style={{ color: metric.color, opacity: 0.7 }} />
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px' }}>{metric.value}</span>
                  <span className="text-muted" style={{ fontSize: '1rem', fontWeight: '600' }}>{metric.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', flex: 1, minHeight: 0 }}>
            
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', background: getSohColor(soh.status), filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%' }} />
              
              <Activity size={56} style={{ color: getSohColor(soh.status), marginBottom: '1.5rem', filter: `drop-shadow(0 0 12px ${getSohColor(soh.status)}40)` }} />
              
              <h2 className={getSohGlow(soh.status)} style={{ margin: 0, fontSize: '4.5rem', fontWeight: '800', letterSpacing: '-2px', lineHeight: '1' }}>
                {soh.filtered ? `${soh.filtered.toFixed(1)}` : '--'}
                <span style={{ fontSize: '2rem', fontWeight: '600', marginLeft: '4px' }}>%</span>
              </h2>
              
              <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                State of Health
              </p>

              {soh.status && (
                <div style={{ 
                  marginTop: '2rem', background: 'rgba(0,0,0,0.5)', border: `1px solid ${getSohColor(soh.status)}40`,
                  padding: '8px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getSohColor(soh.status), boxShadow: `0 0 8px ${getSohColor(soh.status)}` }} />
                  <span style={{ color: getSohColor(soh.status), fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {soh.status}
                  </span>
                </div>
              )}
            </div>

            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Degradation Analysis</h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                    <div style={{ width: '12px', height: '2px', background: 'var(--neon-green)' }} /> Kalman Filter
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <div style={{ width: '12px', height: '2px', background: 'var(--amber-yellow)', borderBottom: '2px dashed var(--bg-dark)' }} /> Raw ML
                  </span>
                </div>
              </div>
              <div style={{ flex: 1, width: '100%', minHeight: '300px' }}>
                <SohChart data={history} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}