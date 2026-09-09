import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
import { mockSchemes, mockSummary, mockConflicts } from '../mockData';

function SummaryCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: React.ReactNode }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: '1px solid',
        borderColor: 'divider',
        borderTop: '3px solid',
        borderTopColor: color,
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color, lineHeight: 1 }}>{value}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75, fontWeight: 500 }}>{label}</Typography>
        </Box>
        <Box sx={{ color, opacity: 0.6, '& svg': { fontSize: 28 } }}>{icon}</Box>
      </Box>
    </Paper>
  );
}

function RecommendationPanel() {
  const navigate = useNavigate();
  const scheme = mockSummary.bestScheme;
  return (
    <Paper
      elevation={0}
      sx={{
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: 1,
        overflow: 'hidden',
        mb: 3,
      }}
    >
      <Box sx={{ bgcolor: 'primary.main', px: 3, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiEventsOutlinedIcon sx={{ color: '#ffd700', fontSize: 20 }} />
          <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, letterSpacing: '0.04em' }}>
            RECOMMENDED BENEFIT PLAN
          </Typography>
        </Box>
        <Chip
          label="BEST FIT"
          size="small"
          sx={{ bgcolor: '#c0392b', color: 'white', fontWeight: 700, fontSize: '0.7rem', borderRadius: 1 }}
        />
      </Box>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h5" sx={{ mb: 0.5 }}>{scheme.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
              {scheme.department}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, lineHeight: 1.75 }}>
              {scheme.description}
            </Typography>
            <Typography variant="overline" sx={{ color: 'primary.main', display: 'block', mb: 1.5 }}>
              Eligibility Criteria Met
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {scheme.criteria.map((c, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: c.met ? 'success.main' : 'error.main', fontSize: 16, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: c.met ? 'text.primary' : 'text.disabled' }}>{c.label}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{ p: 2.5, bgcolor: '#f8f9fa', border: '1px solid', borderColor: 'divider', height: '100%' }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Estimated Benefit</Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'success.main' }}>{scheme.benefit}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Match Score</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>{scheme.matchPercent}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={scheme.matchPercent}
                  sx={{ height: 8, borderRadius: 1, bgcolor: '#e8eef7', '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' } }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Category</Typography>
                <Chip label={scheme.category} size="small" variant="outlined" sx={{ borderColor: 'primary.main', color: 'primary.main' }} />
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate(`/schemes/${scheme.id}`)}
                sx={{ fontWeight: 700, mt: 1 }}
              >
                View Scheme Details
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

function ConflictPanel() {
  const conflict = mockConflicts[0];
  return (
    <Paper
      elevation={0}
      sx={{ border: '1px solid', borderColor: 'warning.main', borderLeft: '4px solid', borderLeftColor: 'warning.main', mb: 3 }}
    >
      <Box sx={{ px: 3, py: 1.5, bgcolor: '#fff8e1', borderBottom: '1px solid', borderColor: 'warning.light', display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberIcon sx={{ color: 'warning.dark', fontSize: 20 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'warning.dark' }}>
          Important: Scheme Compatibility
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 5 }}>
            <Paper elevation={0} sx={{ p: 1.5, border: '1px solid', borderColor: 'success.light', bgcolor: '#f0f7f0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.dark' }}>Eligible individually</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{conflict.scheme1.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{conflict.scheme1.department}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }} sx={{ textAlign: 'center' }}>
            <Box>
              <CompareArrowsIcon sx={{ color: 'warning.main', fontSize: 28 }} />
              <Typography variant="caption" sx={{ display: 'block', color: 'warning.dark', fontWeight: 700 }}>CONFLICT</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Paper elevation={0} sx={{ p: 1.5, border: '1px solid', borderColor: 'success.light', bgcolor: '#f0f7f0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.dark' }}>Eligible individually</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{conflict.scheme2.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{conflict.scheme2.department}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Alert severity="warning" icon={<WarningAmberIcon />} sx={{ mt: 2 }}>
          <AlertTitle sx={{ fontWeight: 700 }}>Cannot be combined</AlertTitle>
          {conflict.note}
        </Alert>
      </Box>
    </Paper>
  );
}

function SchemeCard({ scheme }: { scheme: (typeof mockSchemes)[0] }) {
  const navigate = useNavigate();
  const statusColor = scheme.eligibilityStatus === 'eligible' ? 'success' : scheme.eligibilityStatus === 'partial' ? 'warning' : 'error';
  const statusLabel = scheme.eligibilityStatus === 'eligible' ? 'Eligible' : scheme.eligibilityStatus === 'partial' ? 'Partially Eligible' : 'Not Eligible';

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderLeft: '4px solid',
        borderLeftColor: `${statusColor}.main`,
        p: 2.5,
        '&:hover': { boxShadow: '0 4px 12px rgba(26,58,107,0.1)', borderColor: 'primary.light' },
        transition: 'box-shadow 0.2s',
        cursor: 'pointer',
      }}
    >
      <Grid container spacing={2} alignItems="flex-start">
        <Grid size={{ xs: 12, sm: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>{scheme.name}</Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, display: 'block', mb: 0.75 }}>
            {scheme.department}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65, mb: 1.5 }}>
            {scheme.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={statusLabel}
              size="small"
              color={statusColor}
              variant={scheme.eligibilityStatus !== 'eligible' ? 'outlined' : 'filled'}
              sx={{ fontWeight: 600, fontSize: '0.7rem' }}
            />
            <Chip label={scheme.category} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'success.main', mb: 0.5 }}>
              {scheme.benefit}
            </Typography>
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 0.75, mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Match</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>{scheme.matchPercent}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={scheme.matchPercent}
                sx={{
                  height: 6,
                  bgcolor: '#e8eef7',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: scheme.matchPercent >= 80 ? 'success.main' : scheme.matchPercent >= 60 ? 'warning.main' : 'error.main',
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => navigate(`/schemes/${scheme.id}`)}
                sx={{ fontWeight: 600, fontSize: '0.75rem' }}
              >
                View Details
              </Button>
              <Button
                size="small"
                variant="text"
                startIcon={<HelpOutlineIcon />}
                sx={{ fontWeight: 600, fontSize: '0.75rem', color: 'text.secondary' }}
              >
                Why eligible?
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

function AIExplanationPanel() {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', bgcolor: '#f8f9fa', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <InfoOutlinedIcon sx={{ color: 'primary.main', fontSize: 18 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Why this recommendation?</Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75, mb: 2 }}>
        Your profile matches the Post-Matric Scholarship based on your SC/ST community status,
        annual family income below the eligibility threshold, current enrollment in a post-matric programme, and your institution type.
      </Typography>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block', mb: 1 }}>
          Matched Criteria
        </Typography>
        {['Education level (post-matric)', 'Community eligibility (SC/ST)', 'Income within limits', 'Recognised institution'].map((c) => (
          <Box key={c} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: 14 }} />
            <Typography variant="body2" sx={{ color: 'text.primary' }}>{c}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <ArticleOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Source: Official scheme eligibility guidelines. Always verify through the official portal.
        </Typography>
      </Box>
    </Paper>
  );
}

function DocumentChecklist() {
  const docs = [
    { name: 'Community Certificate', reason: 'Required for community-based schemes' },
    { name: 'Income Certificate', reason: 'To verify annual family income' },
    { name: 'College Admission / Bonafide Certificate', reason: 'Proof of current enrollment' },
    { name: 'Bank Account Details (Passbook / Statement)', reason: 'For direct benefit transfer' },
    { name: 'Academic Certificates (last qualifying exam)', reason: 'To verify education level and marks' },
    { name: 'College ID Card', reason: 'Identity proof as student' },
  ];
  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
      <Box sx={{ px: 2.5, py: 1.5, bgcolor: '#f1f3f5', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Documents You May Need</Typography>
      </Box>
      <Box sx={{ p: 2.5 }}>
        {docs.map((doc, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: i < docs.length - 1 ? 1.5 : 0 }}>
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18, mt: 0.25, flexShrink: 0 }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{doc.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{doc.reason}</Typography>
            </Box>
          </Box>
        ))}
        <Alert severity="info" sx={{ mt: 2 }}>
          Document requirements may vary per scheme. Review individual scheme details before applying.
        </Alert>
      </Box>
    </Paper>
  );
}

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: 'success.main', display: 'block', mb: 0.5 }}>
            Eligibility Results
          </Typography>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Your Eligibility Results</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            We found schemes that match your profile. Review the details below and verify through official sources.
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <SummaryCard
              label="Eligible Schemes"
              value={String(mockSummary.eligible)}
              color="#1a3a6b"
              icon={<CheckCircleIcon />}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <SummaryCard
              label="Potential Benefit"
              value={`₹${(mockSummary.potentialBenefit / 1000).toFixed(0)}K/yr`}
              color="#2e7d32"
              icon={<ArticleOutlinedIcon />}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <SummaryCard
              label="Possible Conflicts"
              value={String(mockSummary.conflicts)}
              color="#b7770d"
              icon={<WarningAmberIcon />}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <SummaryCard
              label="Best Match"
              value={`${mockSummary.bestMatchPercent}%`}
              color="#c0392b"
              icon={<EmojiEventsOutlinedIcon />}
            />
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3, overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem' },
            }}
          >
            <Tab label="Recommendation" />
            <Tab label="All Eligible Schemes" />
            <Tab label="Conflicts" />
            <Tab label="Documents" />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {activeTab === 0 && (
              <Box>
                <RecommendationPanel />
                <AIExplanationPanel />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button variant="outlined" onClick={() => navigate('/schemes/compare')} sx={{ fontWeight: 600 }}>
                    Compare Schemes
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => navigate('/schemes')} sx={{ fontWeight: 700 }}>
                    Browse All Schemes
                  </Button>
                </Box>
              </Box>
            )}
            {activeTab === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mockSchemes.map((s) => (
                  <SchemeCard key={s.id} scheme={s} />
                ))}
              </Box>
            )}
            {activeTab === 2 && (
              <Box>
                <Alert severity="warning" sx={{ mb: 3 }}>
                  <AlertTitle sx={{ fontWeight: 700 }}>Review Before Applying</AlertTitle>
                  Some schemes you are eligible for individually cannot be combined. Read the conflict details carefully.
                </Alert>
                <ConflictPanel />
              </Box>
            )}
            {activeTab === 3 && <DocumentChecklist />}
          </Box>
        </Paper>

        <Alert severity="info" icon={<InfoOutlinedIcon />}>
          ThaguthiAI provides eligibility guidance only. Confirm all scheme conditions through the official government portal before submitting any application.
        </Alert>
      </Container>
    </Box>
  );
}
