import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useParams, useNavigate } from 'react-router-dom';
import { getSchemeById } from '../services/api';
import type { BackendScheme } from '../services/api';
import { useEligibility } from '../context/EligibilityContext';

export default function SchemeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allSchemes, recommendation } = useEligibility();

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
        <Typography variant="h6">Scheme not found</Typography>
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
  let criteria = [];
  
  const recScheme = recommendation?.eligible_schemes?.find(s => s.scheme_id === scheme.id);
  if (recScheme) {
    isEligible = true;
    recMatched = recScheme.matched_conditions.length;
    recTotal = recScheme.matched_conditions.length + recScheme.failed_conditions.length;
    criteria = [
      { label: 'Meets eligibility requirements based on profile', met: true }
    ];
  } else {
    criteria = Object.entries(scheme.eligibility).map(([key, val]) => ({
      label: `${key}: ${JSON.stringify(val)}`,
      met: !recommendation // if no rec yet, assume met or neutral
    }));
  }

  const eligibilityStatus = isEligible ? 'eligible' : (recommendation ? 'error' : 'partial');
  const matchPercent = isEligible ? Math.round((recMatched / Math.max(recTotal, 1)) * 100) : 50;

  const documents = ['Community Certificate', 'Income Certificate', 'College Bonafide Certificate', 'Bank Account Details', 'Academic Certificates'];
  const applicationProcess = ['Check eligibility on the official portal', 'Register and fill application form', 'Upload required documents', 'Submit and track application status'];
  
  const conditions = [];
  if ((scheme.eligibility as any).max_income) {
    conditions.push('Annual family income must be within the scheme limit');
  }
  if (scheme.demo) {
    conditions.push('This is demo data - verify against current government notification');
  }

  const officialSource = scheme.official_source || 'Official government portal';
  const lastVerified = scheme.last_verified || 'Verify with official source';
  
  const conflictsWith = scheme.conflicts_with;
  const conflictingScheme = conflictsWith && conflictsWith.length > 0 && allSchemes 
    ? allSchemes.find(s => s.id === conflictsWith[0]) 
    : null;

  const statusColor = eligibilityStatus === 'eligible' ? 'success' : eligibilityStatus === 'partial' ? 'warning' : 'error';
  const statusLabel = eligibilityStatus === 'eligible' ? 'Eligible' : eligibilityStatus === 'partial' ? 'Partially Eligible' : 'Not Eligible';

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component="button" underline="hover" onClick={() => navigate('/')} sx={{ cursor: 'pointer', color: 'text.secondary', fontSize: '0.875rem' }}>
            Home
          </Link>
          <Link component="button" underline="hover" onClick={() => navigate('/schemes')} sx={{ cursor: 'pointer', color: 'text.secondary', fontSize: '0.875rem' }}>
            Schemes
          </Link>
          <Typography variant="body2" color="text.primary">{name}</Typography>
        </Breadcrumbs>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary', mb: 2.5, fontWeight: 500 }}
        >
          Back
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
                {/* Overview */}
                <Typography variant="h6" sx={{ mb: 1, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  Scheme Overview
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.75, mb: 3, mt: 1.5 }}>
                  {description} This scheme is administered by the {department} and aims to support students from eligible backgrounds in pursuing higher education without financial barriers.
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Who Can Apply */}
                <Typography variant="h6" sx={{ mb: 1, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  Who Can Apply
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75, mt: 1.5, mb: 3 }}>
                  Students currently enrolled in a recognised post-matric educational programme who meet all the stated eligibility conditions may apply.
                  Applications are submitted through the official portal during the designated application window each academic year.
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Eligibility Criteria */}
                <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  Eligibility Criteria
                </Typography>
                <Box sx={{ mt: 1.5, mb: 3 }}>
                  {criteria.map((c, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.25 }}>
                      {c.met
                        ? <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18, flexShrink: 0 }} />
                        : <CancelIcon sx={{ color: 'error.main', fontSize: 18, flexShrink: 0 }} />
                      }
                      <Typography variant="body2" sx={{ color: c.met ? 'text.primary' : 'text.disabled' }}>{c.label}</Typography>
                      <Chip
                        label={c.met ? 'Met' : 'Not Met'}
                        size="small"
                        color={c.met ? 'success' : 'error'}
                        variant="outlined"
                        sx={{ ml: 'auto', fontSize: '0.65rem', fontWeight: 700, height: 20 }}
                      />
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Benefits */}
                <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  Benefits
                </Typography>
                <Paper elevation={0} sx={{ mt: 1.5, mb: 3, p: 2.5, bgcolor: '#f0f7f0', border: '1px solid', borderColor: 'success.light' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'success.main', mb: 0.5 }}>{benefit}</Typography>
                  <Typography variant="body2" sx={{ color: 'success.dark' }}>
                    Estimated annual benefit. Actual amount may vary based on course and institution. Disbursed via Direct Benefit Transfer (DBT) to student's bank account.
                  </Typography>
                </Paper>

                <Divider sx={{ my: 3 }} />

                {/* Required Documents */}
                <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  Required Documents
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

                {/* Application Process */}
                <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.75, display: 'inline-block' }}>
                  Application Process
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

                <Divider sx={{ my: 3 }} />

                {/* Important Conditions */}
                <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'warning.main', pb: 0.75, display: 'inline-block' }}>
                  Important Conditions
                </Typography>
                <Box sx={{ mt: 1.5, mb: 3 }}>
                  {conditions.map((cond, i) => (
                    <Alert key={i} severity="warning" icon={<WarningAmberIcon />} sx={{ mb: 1 }}>
                      {cond}
                    </Alert>
                  ))}
                </Box>

                {/* Compatibility */}
                {conflictingScheme && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'error.main', pb: 0.75, display: 'inline-block' }}>
                      Compatibility
                    </Typography>
                    <Alert severity="error" sx={{ mt: 1.5 }}>
                      <strong>Conflicts with: {conflictingScheme.name}</strong>
                      <br />
                      This scheme may not be claimed alongside the conflicting scheme.
                    </Alert>
                  </>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', position: 'sticky', top: 80 }}>
              <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8f9fa' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Scheme Summary</Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Your Eligibility</Typography>
                  <Chip label={statusLabel} color={statusColor as any} sx={{ fontWeight: 700 }} />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Estimated Benefit</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'success.main' }}>{benefit}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Match Score</Typography>
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
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Documents Required</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>{documents.length} documents</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2.5 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.25 }}>Compatibility</Typography>
                  {conflictingScheme ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <WarningAmberIcon sx={{ color: 'warning.main', fontSize: 14 }} />
                      <Typography variant="body2" sx={{ color: 'warning.dark', fontWeight: 500 }}>1 conflict identified</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CheckCircleIcon sx={{ color: 'success.main', fontSize: 14 }} />
                      <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 500 }}>No conflicts</Typography>
                    </Box>
                  )}
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  endIcon={<OpenInNewIcon />}
                  sx={{ fontWeight: 700, mb: 1.5 }}
                >
                  Apply / Visit Official Portal
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <VerifiedOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Official Source: {officialSource}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.5 }}>
                  Last verified: {lastVerified}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
