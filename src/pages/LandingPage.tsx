import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function HeroIllustration() {
  const { t } = useLanguage();
  const illSteps = [
    { icon: <PersonOutlineIcon />, label: t('step1Title'), sub: t('step1Desc') },
    { icon: <SearchOutlinedIcon />, label: t('step2Title'), sub: t('step2Desc') },
    { icon: <AssignmentOutlinedIcon />, label: t('step3Title'), sub: t('step3Desc') },
  ];
  return (
    <Box sx={{ position: 'relative' }}>
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ bgcolor: '#1a3a6b', px: 2, py: 1.25, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.3)' }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', ml: 1, fontWeight: 500 }}>
            {t('appTitle')} · Eligibility Verification Report
          </Typography>
        </Box>
        <Box sx={{ p: 2.5 }}>
          {illSteps.map((step, i) => (
            <Box key={i}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: i === 1 ? 'rgba(26,58,107,0.06)' : 'transparent',
                  border: '1px solid',
                  borderColor: i === 1 ? 'primary.main' : 'transparent',
                  mb: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1,
                    bgcolor: i === 1 ? 'primary.main' : '#f1f3f5',
                    color: i === 1 ? 'white' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    '& svg': { fontSize: 20 },
                  }}
                >
                  {step.icon}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.3 }}>
                    {step.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {step.sub}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const trustItems = [
    { icon: <SchoolOutlinedIcon />, label: t('heroBadge') },
    { icon: <VerifiedOutlinedIcon />, label: t('feature1Title') },
    { icon: <BalanceOutlinedIcon />, label: t('feature2Title') },
    { icon: <SearchOutlinedIcon />, label: t('feature3Title') },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'background.default', pt: { xs: 4, md: 8 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Chip
                icon={<VerifiedOutlinedIcon sx={{ fontSize: 16 }} />}
                label={t('heroBadge')}
                size="small"
                sx={{
                  bgcolor: 'rgba(26,58,107,0.08)',
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  mb: 2,
                }}
              />
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                  lineHeight: 1.15,
                  mb: 2.5,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                {t('heroTitle')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.7,
                  maxWidth: 580,
                }}
              >
                {t('heroSubtitle')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/check-eligibility')}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ py: 1.5, px: 3.5, fontWeight: 700 }}
                >
                  {t('heroCtaPrimary')}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/schemes')}
                  sx={{ py: 1.5, px: 3, fontWeight: 600 }}
                >
                  {t('heroCtaSecondary')}
                </Button>
              </Box>

              {/* Stats Bar */}
              <Grid container spacing={3} sx={{ mt: 5, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {t('statStudentsCount')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('statStudentsLabel')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {t('statSchemesCount')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('statSchemesLabel')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {t('statAccuracyCount')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('statAccuracyLabel')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <HeroIllustration />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trust Items Bar */}
      <Box sx={{ bgcolor: '#1a3a6b', color: 'white', py: 2.5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            {trustItems.map((item, i) => (
              <Grid key={i} size={{ xs: 6, sm: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                  <Box sx={{ color: '#f39c12', display: 'flex' }}>{item.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: 'primary.main', mb: 5 }}>
            {t('featuresTitle')}
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%' }}>
                <VerifiedOutlinedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {t('feature1Title')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {t('feature1Desc')}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%' }}>
                <BalanceOutlinedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {t('feature2Title')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {t('feature2Desc')}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%' }}>
                <EmojiEventsOutlinedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {t('feature3Title')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {t('feature3Desc')}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 6, bgcolor: '#f8f9fa', borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
            Ready to discover your eligible scholarships?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            It takes less than 2 minutes to fill out your profile and get deterministic results.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/check-eligibility')}
            endIcon={<ArrowForwardIcon />}
            sx={{ py: 1.5, px: 4, fontWeight: 700 }}
          >
            {t('btnCheckNow')}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
