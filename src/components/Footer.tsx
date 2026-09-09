import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0f2347',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'rgba(255,255,255,0.15)',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VerifiedOutlinedIcon sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>
                {t('appTitle')}<span style={{ color: '#e74c3c' }}>AI</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, maxWidth: 360, lineHeight: 1.7 }}>
              "{t('appTagline')}"
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', lineHeight: 1.8 }}>
              {t('footerAboutDesc')}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1.5, display: 'block' }}>
              {t('footerQuickLinks')}
            </Typography>
            <Box sx={{ mb: 0.75 }}>
              <Link onClick={() => navigate('/')} underline="hover" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', cursor: 'pointer' }}>
                {t('navHome')}
              </Link>
            </Box>
            <Box sx={{ mb: 0.75 }}>
              <Link onClick={() => navigate('/check-eligibility')} underline="hover" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', cursor: 'pointer' }}>
                {t('navCheckEligibility')}
              </Link>
            </Box>
            <Box sx={{ mb: 0.75 }}>
              <Link onClick={() => navigate('/schemes')} underline="hover" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', cursor: 'pointer' }}>
                {t('navDirectory')}
              </Link>
            </Box>
            <Box sx={{ mb: 0.75 }}>
              <Link onClick={() => navigate('/schemes/compare')} underline="hover" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', cursor: 'pointer' }}>
                {t('navCompare')}
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1.5, display: 'block' }}>
              {t('footerHelplineTitle')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', mb: 0.75 }}>
              {t('footerHelpline1')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', mb: 0.75 }}>
              {t('footerHelpline2')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', mb: 0.75 }}>
              {t('footerHelpline3')}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            {t('footerDisclaimer')}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            {t('footerCopyright')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
