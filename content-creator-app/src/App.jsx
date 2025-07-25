import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Components
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Packages from './pages/Packages';
import Wallet from './pages/Wallet';
import Referrals from './pages/Referrals';
import Settings from './pages/Settings';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [packages, setPackages] = useState([]);
  const [wallet, setWallet] = useState({ balance: 0, earnings: [], transactions: [] });
  const [referrals, setReferrals] = useState([]);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('contentCreatorUser');
    const savedTasks = localStorage.getItem('contentCreatorTasks');
    const savedPackages = localStorage.getItem('contentCreatorPackages');
    const savedWallet = localStorage.getItem('contentCreatorWallet');
    const savedReferrals = localStorage.getItem('contentCreatorReferrals');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedPackages) setPackages(JSON.parse(savedPackages));
    if (savedWallet) setWallet(JSON.parse(savedWallet));
    if (savedReferrals) setReferrals(JSON.parse(savedReferrals));
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (user) localStorage.setItem('contentCreatorUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('contentCreatorTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('contentCreatorPackages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('contentCreatorWallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('contentCreatorReferrals', JSON.stringify(referrals));
  }, [referrals]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('contentCreatorUser');
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {user && <Navbar user={user} onLogout={handleLogout} />}
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                p: user ? 3 : 0, 
                mt: user ? 8 : 0,
                backgroundColor: 'background.default'
              }}
            >
              <Routes>
                {!user ? (
                  <>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register onLogin={handleLogin} />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Dashboard user={user} tasks={tasks} wallet={wallet} />} />
                    <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
                    <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks} user={user} setWallet={setWallet} />} />
                    <Route path="/packages" element={<Packages packages={packages} setPackages={setPackages} user={user} />} />
                    <Route path="/wallet" element={<Wallet wallet={wallet} setWallet={setWallet} />} />
                    <Route path="/referrals" element={<Referrals referrals={referrals} setReferrals={setReferrals} user={user} />} />
                    <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                )}
              </Routes>
            </Box>
          </Box>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
