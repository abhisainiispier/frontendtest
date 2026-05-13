import React, { useState, useEffect } from 'react';
import { getStatus, getHealthStatus, getDBHealth } from './api/apiClient';
import StatusCard from './components/StatusCard';
import UserList from './components/UserList';
import SystemInfo from './components/SystemInfo';
import './App.css';

function App() {
  const [statusData, setStatusData] = useState(null);
  const [apiStatus, setApiStatus] = useState({ loading: true, data: null, error: null });
  const [dbStatus, setDbStatus] = useState({ loading: true, data: null, error: null });
  const [darkMode, setDarkMode] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  useEffect(() => {
    // Check for dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const applyDarkMode = () => {
      if (darkMode) {
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.style.colorScheme = 'light';
      }
    };

    applyDarkMode();
  }, [darkMode]);

  useEffect(() => {
    const fetchAllStatus = async () => {
      // Fetch API health
      try {
        const response = await getHealthStatus();
        setApiStatus({ loading: false, data: response.data, error: null });
      } catch (error) {
        setApiStatus({ loading: false, data: null, error: error.message });
      }

      // Fetch DB health
      try {
        const response = await getDBHealth();
        setDbStatus({ loading: false, data: response.data, error: null });
      } catch (error) {
        setDbStatus({ loading: false, data: null, error: error.message });
      }

      // Fetch combined status
      try {
        const response = await getStatus();
        setStatusData(response.data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }

      setLastUpdateTime(new Date());
    };

    fetchAllStatus();

    // Refresh every 5 seconds
    const interval = setInterval(fetchAllStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🚀 Full-Stack Application Dashboard</h1>
            <p>Real-time system and API status monitoring</p>
          </div>
          <button onClick={toggleDarkMode} className="theme-toggle" title="Toggle dark mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="status-container">
          <div className="status-grid">
            <StatusCard
              icon="🔌"
              title="API Status"
              status={apiStatus.error ? 'error' : 'working'}
              message={apiStatus.error ? 'API Connection Failed' : 'API is Working'}
              details={apiStatus.data ? [`Response Time: ${new Date().toLocaleTimeString()}`] : null}
              isLoading={apiStatus.loading}
              error={apiStatus.error}
            />

            <StatusCard
              icon="🗄️"
              title="Database Status"
              status={dbStatus.error ? 'error' : 'connected'}
              message={dbStatus.error ? 'Database Connection Failed' : 'Database Connected Successfully'}
              details={
                dbStatus.data && !dbStatus.error
                  ? [
                      `Database: ${dbStatus.data.database}`,
                      `Host: ${process.env.REACT_APP_API_URL}`,
                    ]
                  : null
              }
              isLoading={dbStatus.loading}
              error={dbStatus.error}
            />

            <StatusCard
              icon="🖥️"
              title="Backend Server"
              status={statusData?.backend?.status || 'online'}
              message={statusData?.backend?.server || 'Backend Server Running'}
              details={
                statusData?.backend
                  ? [
                      `Uptime: ${statusData.backend.uptime} seconds`,
                      `Start Time: ${new Date(statusData.backend.startTime).toLocaleTimeString()}`,
                    ]
                  : null
              }
              isLoading={apiStatus.loading}
              error={statusData?.status === 'error' ? 'Server error' : null}
            />
          </div>

          <div className="info-box">
            <span className="last-update">Last Updated: {lastUpdateTime.toLocaleTimeString()}</span>
            <span className="status-indicator-dot"></span>
            <span className="status-text">Live Status</span>
          </div>
        </div>

        <SystemInfo />
        <UserList />
      </main>

      <footer className="app-footer">
        <p>© 2026 Full-Stack Application. Built with Node.js, React, and MySQL.</p>
      </footer>
    </div>
  );
}

export default App;
