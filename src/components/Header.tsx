import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t('navHome'), path: '/' },
    { label: t('navCheckEligibility'), path: '/check-eligibility' },
    { label: t('navDirectory'), path: '/schemes' },
    { label: t('navCompare'), path: '/schemes/compare' },
    { label: t('navAnalytics'), path: '/analysis' },
  ];

  const handleNav = (path: string) => {
    setDrawerOpen(false);
    if (path.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = path.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {/* Government notice strip */}
      <Box
        sx={{
          bgcolor: '#1a3a6b',
          color: 'white',
          py: 0.5,
          px: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" sx={{ letterSpacing: '0.03em', opacity: 0.9 }}>
          {language === 'ta'
            ? 'தமிழ்நாடு மாணவர்கள் கல்வி உதவித்தொகை தகுதி வழிகாட்டி  |  தகவல் நோக்கங்களுக்காக மட்டுமே'
            : 'Student Scholarship & Government Scheme Eligibility Assistant  |  For guidance only — verify through official portals before applying'}
        </Typography>
      </Box>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '2px solid',
          borderBottomColor: 'primary.main',
          color: 'text.primary',
          top: 0,
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%', px: { xs: 2, md: 3 }, minHeight: '64px !important' }}>
          {/* Logo / Wordmark */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexShrink: 0 }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <VerifiedOutlinedIcon sx={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.1, letterSpacing: '-0.01em', fontSize: '1.125rem' }}
              >
                {t('appTitle').replace(/AI$/, '')}<span style={{ color: '#c0392b' }}>AI</span>
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', display: 'block', lineHeight: 1 }}>
                {t('appTagline')}
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 4 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  sx={{
                    color: location.pathname === link.path ? 'primary.main' : 'text.secondary',
                    fontWeight: location.pathname === link.path ? 600 : 400,
                    fontSize: '0.875rem',
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.75,
                    '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flex: 1 }} />

          {/* Language toggle */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 2 }}>
              <LanguageIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Button
                size="small"
                onClick={() => setLanguage('ta')}
                sx={{
                  fontSize: '0.8rem',
                  color: language === 'ta' ? 'primary.main' : 'text.secondary',
                  fontWeight: language === 'ta' ? 700 : 400,
                  minWidth: 'auto', px: 0.75, py: 0.25
                }}
              >
                தமிழ்
              </Button>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>|</Typography>
              <Button
                size="small"
                onClick={() => setLanguage('en')}
                sx={{
                  fontSize: '0.8rem',
                  color: language === 'en' ? 'primary.main' : 'text.secondary',
                  fontWeight: language === 'en' ? 700 : 400,
                  minWidth: 'auto', px: 0.75, py: 0.25
                }}
              >
                English
              </Button>
            </Box>
          )}

          {/* CTA */}
          {!isMobile && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/check-eligibility')}
              sx={{ fontWeight: 700, px: 2.5, py: 1, fontSize: '0.875rem' }}
            >
              {t('btnCheckNow')}
            </Button>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
              {t('appTitle').replace(/AI$/, '')}<span style={{ color: '#c0392b' }}>AI</span>
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton onClick={() => handleNav(link.path)}>
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => { setDrawerOpen(false); navigate('/check-eligibility'); }}
              sx={{ fontWeight: 700, py: 1.25 }}
            >
              {t('btnCheckNow')}
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1.5 }}>
              <Button
                size="small"
                onClick={() => setLanguage('ta')}
                sx={{
                  fontSize: '0.8rem',
                  color: language === 'ta' ? 'primary.main' : 'text.secondary',
                  fontWeight: language === 'ta' ? 700 : 400
                }}
              >
                தமிழ்
              </Button>
              <Typography variant="caption" sx={{ color: 'text.disabled', alignSelf: 'center' }}>|</Typography>
              <Button
                size="small"
                onClick={() => setLanguage('en')}
                sx={{
                  fontSize: '0.8rem',
                  color: language === 'en' ? 'primary.main' : 'text.secondary',
                  fontWeight: language === 'en' ? 700 : 400
                }}
              >
                English
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
