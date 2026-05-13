import React, { useState, useEffect } from 'react';
import { getSystemInfo } from '../api/apiClient';
import './SystemInfo.css';

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemInfo();
  }, []);

  const fetchSystemInfo = async () => {
    try {
      const response = await getSystemInfo();
      setSystemInfo(response.data);
    } catch (error) {
      console.error('Error fetching system info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="system-info-loading">Loading system info...</div>;
  }

  if (!systemInfo) {
    return <div className="system-info-error">Unable to load system information</div>;
  }

  return (
    <div className="system-info-container">
      <h2>⚙️ System Information</h2>
      
      <div className="system-info-grid">
        <div className="system-info-section">
          <h3>Server</h3>
          <div className="info-item">
            <span className="label">Environment:</span>
            <span className="value">{systemInfo.environment}</span>
          </div>
          <div className="info-item">
            <span className="label">Uptime:</span>
            <span className="value">{systemInfo.server?.uptime} seconds</span>
          </div>
          <div className="info-item">
            <span className="label">Start Time:</span>
            <span className="value">{new Date(systemInfo.server?.startTime).toLocaleString()}</span>
          </div>
        </div>

        <div className="system-info-section">
          <h3>System</h3>
          <div className="info-item">
            <span className="label">Platform:</span>
            <span className="value">{systemInfo.system?.platform}</span>
          </div>
          <div className="info-item">
            <span className="label">Architecture:</span>
            <span className="value">{systemInfo.system?.arch}</span>
          </div>
          <div className="info-item">
            <span className="label">CPU Cores:</span>
            <span className="value">{systemInfo.system?.cpus}</span>
          </div>
          <div className="info-item">
            <span className="label">Total Memory:</span>
            <span className="value">{systemInfo.system?.totalMemory}</span>
          </div>
          <div className="info-item">
            <span className="label">Free Memory:</span>
            <span className="value">{systemInfo.system?.freeMemory}</span>
          </div>
          <div className="info-item">
            <span className="label">System Uptime:</span>
            <span className="value">{systemInfo.system?.uptime}</span>
          </div>
        </div>
      </div>

      <button onClick={fetchSystemInfo} className="refresh-system-btn">
        Refresh System Info
      </button>
    </div>
  );
};

export default SystemInfo;
