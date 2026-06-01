import { useState, useEffect, useCallback, useRef } from 'react';

export function useDashboard() {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const cycleRef = useRef(1);

  const generateMockData = useCallback(() => {
    const cycle = cycleRef.current;
    
    const baseSoh = Math.max(45, 100 - (cycle * 0.5)); 
    const rawSoh = baseSoh + (Math.random() * 4 - 2);
    const filteredSoh = baseSoh + (Math.random() * 0.5 - 0.25);
    
    const status = filteredSoh < 50 ? 'critical' : filteredSoh < 70 ? 'warning' : 'healthy';

    const newHistoryPoint = {
      cycleCount: cycle,
      rawSoh: Number(rawSoh.toFixed(2)),
      filteredSoh: Number(filteredSoh.toFixed(2))
    };

    setHistory(prev => {
      const newHist = [...prev, newHistoryPoint];
      if (newHist.length > 20) return newHist.slice(newHist.length - 20);
      return newHist;
    });

    setStats({
      currentSoh: {
        raw: rawSoh,
        filtered: filteredSoh,
        status: status,
        trend: "degrading"
      },
      latestTelemetry: {
        voltage: 3.8 + (Math.random() * 0.4 - 0.2),
        current: -2.0 + (Math.random() * 0.5),
        temperature: 25 + (cycle * 0.5) + (Math.random() * 2),
        cycleCount: cycle
      },
      simulation: { isRunning: true }
    });

    if (status === 'critical' && alerts.length === 0) {
      setAlerts([{ type: 'critical_soh', severity: 'critical', message: 'Battery SOH below 50%. Immediate replacement required.' }]);
    } else if (status === 'warning' && alerts.length === 0) {
      setAlerts([{ type: 'degradation', severity: 'warning', message: 'Battery SOH below 70%. Schedule maintenance.' }]);
    }

    cycleRef.current += 1;
  }, [alerts.length]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      generateMockData();
      interval = setInterval(generateMockData, 3000);
    }
    return () => clearInterval(interval);
  }, [isRunning, generateMockData]);

  const toggleSimulation = () => {
    setIsRunning(prev => !prev);
    if (!isRunning) {
      setStats(prev => ({ ...prev, simulation: { isRunning: true } }));
    } else {
      setStats(prev => ({ ...prev, simulation: { isRunning: false } }));
    }
  };

  return { 
    stats: stats || { simulation: { isRunning } }, 
    history, 
    alerts, 
    toggleSimulation 
  };
}