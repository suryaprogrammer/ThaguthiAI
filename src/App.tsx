import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import EligibilityFormPage from './pages/EligibilityFormPage';
import AnalysisPage from './pages/AnalysisPage';
import ResultsPage from './pages/ResultsPage';
import SchemeDetailsPage from './pages/SchemeDetailsPage';
import SchemesDirectoryPage from './pages/SchemesDirectoryPage';
import SchemeComparePage from './pages/SchemeComparePage';
import { EligibilityProvider } from './context/EligibilityContext';

function Layout({ children, hideFooter }: { children: React.ReactNode; hideFooter?: boolean }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      {!hideFooter && <Footer />}
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <EligibilityProvider>
          <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/check-eligibility" element={<Layout><EligibilityFormPage /></Layout>} />
            <Route path="/analysis" element={<Layout hideFooter><AnalysisPage /></Layout>} />
            <Route path="/results" element={<Layout><ResultsPage /></Layout>} />
            <Route path="/schemes" element={<Layout><SchemesDirectoryPage /></Layout>} />
            <Route path="/schemes/compare" element={<Layout><SchemeComparePage /></Layout>} />
            <Route path="/schemes/:id" element={<Layout><SchemeDetailsPage /></Layout>} />
          </Routes>
        </EligibilityProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

