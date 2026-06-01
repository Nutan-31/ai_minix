import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SohChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-muted" style={{ display: 'flex', height: '100%', minHeight: '300px', alignItems: 'center', justifyContent: 'center' }}>Waiting for simulation history...</div>;
  }

  return (
    <div style={{ height: '100%', minHeight: '300px', width: '100%' }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="cycleCount" stroke="#8b95a5" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={['auto', 'auto']} stroke="#8b95a5" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 21, 35, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(8px)' }}
            itemStyle={{ fontWeight: 'bold' }}
          />
          
          <Line 
            type="monotone" 
            dataKey="rawSoh" 
            stroke="var(--amber-yellow)" 
            strokeDasharray="4 4" 
            name="Raw ML SOH %" 
            dot={false} 
            strokeWidth={2}
          />
          
          <Line 
            type="monotone" 
            dataKey="filteredSoh" 
            stroke="var(--neon-green)" 
            name="Kalman Filtered SOH %" 
            dot={false} 
            strokeWidth={3}
            activeDot={{ r: 6, fill: 'var(--bg-dark)', stroke: 'var(--neon-green)', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}