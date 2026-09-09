import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useParams, useNavigate } from 'react-router-dom';
import { getSchemeById } from '../services/api';
import type { BackendScheme } from '../services/api';
import { useEligibility } from '../context/EligibilityContext';
import { useLanguage } from '../context/LanguageContext';

export default function SchemeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allSchemes, recommendation } = useEligibility();
  const { t } = useLanguage();

  const [scheme, setScheme] = useState<BackendScheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScheme = async () => {
      setLoading(true);
      try {
        if (id) {
          const cached = allSchemes.find(s => s.id === id);
          if (cached) {
            setScheme(cached);
          } else {
            const data = await getSchemeById(id);
            setScheme(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch scheme details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchScheme();
  }, [id, allSchemes]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!scheme) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h6">{t('noResultsFound')}</Typography>
      </Box>
    );
  }

  const name = scheme.name;
  const department = scheme.department;
  const description = scheme.description;
  const category = scheme.department.includes('Welfare') ? 'Welfare Scheme' : 'Scholarship';
  const benefit = `₹${scheme.benefit_amount.toLocaleString('en-IN')} / year`;

  let isEligible = false;
  let recMatched = 0;
  let recTotal = 0;
  
  const recScheme = recommendation?.eligible_schemes?.find(s => s.scheme_id === scheme.id);
  if (recScheme) {
    isEligible = true;
    recMatched = recScheme.matched_conditions.length;
    recTotal = recScheme.matched_conditions.length + recScheme.failed_conditions.length;
  }

  const eligibilityStatus = isEligible ? 'eligible' : (recommendation ? 'error' : 'partial');
  const matchPercent = isEligible ? Math.round((recMatched / Math.max(recTotal, 1)) * 100) : 75;

  const documents = ['Community Certificate', 'Income Certificate', 'College Bonafide Certificate', 'Bank Account Details', 'Academic Certificates'];
  const applicationProcess = ['Check eligibility on official portal', 'Register and fill application form', 'Upload required documents', 'Submit and track application status'];

  const officialSource = scheme.official_source || 'Official government portal';

  const statusColor = eligibilityStatus === 'eligible' ? 'success' : eligibilityStatus === 'partial' ? 'warning' : 'error';
  const statusLabel = eligibilityStatus === 'eligible' ? t('badgeEligible') : eligibilityStatus === 'partial' ? t('badgeEligible') : t('badgeIneligible');

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component="button" underline="hover" onClick={() => navigate('/')} sx={{ cursor: 'pointer', color: 'text.secondary', fontSize: '0.875rem' }}>
            {t('navHome')}
          </Link>
          <Link component="button" underline="hover" onClick={() => navigate('/schemes')} sx={{ cursor: 'pointer', color: 'text.secondary', fontSize: '0.875rem' }}>
            {t('navDirectory')}
          </Link>
          <Typography variant="body2" color="text.primary">{name}</Typography>
        </Breadcrumbs>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary', mb: 2.5, fontWeight: 500 }}
        >
          {t('back')}
        </Button>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden', mb: 3 }}>
              <Box sx={{ bgcolor: '#1a3a6b', p: 3, color: 'white' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>{name}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>{department}</Typography>
                    <Chip
                      label={category}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, fontSize: '0.7rem', borderRadius: 1 }}
                    />
                  </Box>
                  <Chip
                    label={statusLabel}
                    color={statusColor as any}
                    sx={{ fontWeight: 700, flexShrink: 0 }}
                  />
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  Overview
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.75, mb: 3, mt: 1.5 }}>
                  {description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  {t('detailsBenefit')}
                </Typography>
                <Paper elevation={0} sx={{ mt: 1.5, mb: 3, p: 2.5, bgcolor: '#f0f7f0', border: '1px solid', borderColor: 'success.light' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'success.main', mb: 0.5 }}>{benefit}</Typography>
                  <Typography variant="body2" sx={{ color: 'success.dark' }}>
                    Disbursed directly via DBT to student's bank account.
                  </Typography>
                </Paper>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  {t('detailsRequiredDocs')}
                </Typography>
                <Box sx={{ mt: 1.5, mb: 3 }}>
                  {documents.map((doc, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                      <AssignmentOutlinedIcon sx={{ color: 'primary.main', fontSize: 16, flexShrink: 0 }} />
                      <Typography variant="body2">{doc}</Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  {t('detailsAppProcess')}
                </Typography>
                <Box sx={{ mt: 1.5, mb: 3 }}>
                  {applicationProcess.map((step, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          flexShrink: 0,
                          mt: 0.25,
                        }}
                      >
                        {i + 1}
                      </Box>
                      <Typography variant="body2" sx={{ lineHeight: 1.7, pt: 0.25 }}>{step}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', position: 'sticky', top: 80 }}>
              <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8f9fa' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Summary</Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>{t('detailsBenefit')}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'success.main' }}>{benefit}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>{t('badgeScore')}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{matchPercent}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={matchPercent}
                    sx={{ height: 8, bgcolor: '#e8eef7', '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' } }}
                  />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  endIcon={<OpenInNewIcon />}
                  component="a"
                  href={officialSource}
                  target="_blank"
                  sx={{ fontWeight: 700, mb: 1.5 }}
                >
                  {t('applyNow')}
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <VerifiedOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Source: {officialSource}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
