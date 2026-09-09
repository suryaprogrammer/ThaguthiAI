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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useEligibility } from '../context/EligibilityContext';
import { useLanguage } from '../context/LanguageContext';

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
          <Typography variant="h4" sx={{ fontWeight: 800, color, lineHeight: 1 }}>{value}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75, fontWeight: 500 }}>{label}</Typography>
        </Box>
        <Box sx={{ color, opacity: 0.6, '& svg': { fontSize: 28 } }}>{icon}</Box>
      </Box>
    </Paper>
  );
}

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { recommendation, explanation } = useEligibility();
  const { t } = useLanguage();

  const eligibleSchemes = (recommendation?.eligible_schemes || []).filter(
    (s) => s.eligible && s.scheme_id !== 'merit_scholarship'
  );
  const ineligibleSchemes = (recommendation?.not_eligible_schemes || []).filter(
    (s) => !s.eligible
  );
  const recommendedCombo = recommendation?.recommended_schemes || [];
  const conflicts = recommendation?.conflicts || [];
  const totalBenefit =
    recommendation?.total_benefit && recommendation.total_benefit > 0
      ? recommendation.total_benefit
      : recommendedCombo.reduce((sum, item) => sum + (item.benefit_amount || 0), 0);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Chip
            icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
            label={t('badgeEligible')}
            size="small"
            color="success"
            sx={{ mb: 1, fontWeight: 700 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
            {t('resultsTitle')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('resultsSubtitle')}
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, md: 4 }}>
            <SummaryCard
              label={t('totalEligibleCount')}
              value={String(eligibleSchemes.length)}
              color="#1a3a6b"
              icon={<CheckCircleIcon />}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <SummaryCard
              label={t('totalIneligibleCount')}
              value={String(ineligibleSchemes.length)}
              color="#c0392b"
              icon={<CancelOutlinedIcon />}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SummaryCard
              label={t('totalEstimatedBenefit')}
              value={`₹${totalBenefit.toLocaleString()}/yr`}
              color="#2e7d32"
              icon={<ArticleOutlinedIcon />}
            />
          </Grid>
        </Grid>

        {/* Recommended Combo Banner */}
        {recommendedCombo.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
              overflow: 'hidden',
              mb: 3,
            }}
          >
            <Box sx={{ bgcolor: 'primary.main', px: 3, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmojiEventsOutlinedIcon sx={{ color: '#ffd700', fontSize: 22 }} />
                <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 700 }}>
                  {t('recommendedCombinationTitle')}
                </Typography>
              </Box>
              <Chip
                label={t('badgeRecommended')}
                size="small"
                sx={{ bgcolor: '#c0392b', color: 'white', fontWeight: 700 }}
              />
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                {recommendation?.recommendation_reason || t('recommendedComboSub')}
              </Typography>
              <Grid container spacing={2}>
                {recommendedCombo.map((rec) => (
                  <Grid size={{ xs: 12, md: 6 }} key={rec.scheme_id}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5, borderColor: 'primary.light', bgcolor: 'rgba(26,58,107,0.03)' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {rec.scheme_name}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'success.main' }}>
                          ₹{rec.benefit_amount.toLocaleString()}/yr
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                        {rec.benefit}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        )}

        {/* AI Explanation Panel */}
        {explanation && (
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', bgcolor: '#f8f9fa', mb: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <InfoOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {t('aiExplanationTitle')}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.8, whitespace: 'pre-line' }}>
              {explanation.explanation}
            </Typography>
          </Paper>
        )}

        {/* Main Schemes Tabs */}
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3, borderRadius: 2, overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem' },
            }}
          >
            <Tab label={`${t('tabEligible')} (${eligibleSchemes.length})`} />
            <Tab label={`${t('tabIneligible')} (${ineligibleSchemes.length})`} />
            {conflicts.length > 0 && <Tab label={`Conflicts (${conflicts.length})`} />}
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Tab 0: Eligible Schemes */}
            {activeTab === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {eligibleSchemes.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    No eligible schemes found for the given profile criteria.
                  </Typography>
                ) : (
                  eligibleSchemes.map((scheme) => (
                    <Paper
                      key={scheme.scheme_id}
                      variant="outlined"
                      sx={{ p: 2.5, borderRadius: 1.5, borderLeft: '4px solid', borderLeftColor: 'success.main' }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {scheme.scheme_name}
                          </Typography>
                          <Chip label={t('badgeEligible')} size="small" color="success" sx={{ mt: 0.5, fontWeight: 600 }} />
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1.5 }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 1 }}>
                        {t('reasonsHeader')}
                      </Typography>
                      {scheme.matched_conditions.map((cond, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <CheckCircleIcon sx={{ color: 'success.main', fontSize: 16 }} />
                          <Typography variant="body2">{cond}</Typography>
                        </Box>
                      ))}
                    </Paper>
                  ))
                )}
              </Box>
            )}

            {/* Tab 1: Ineligible Schemes */}
            {activeTab === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {ineligibleSchemes.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Great! You meet eligibility requirements for all evaluated schemes.
                  </Typography>
                ) : (
                  ineligibleSchemes.map((scheme) => (
                    <Paper
                      key={scheme.scheme_id}
                      variant="outlined"
                      sx={{ p: 2.5, borderRadius: 1.5, borderLeft: '4px solid', borderLeftColor: 'error.main', bgcolor: '#fff9f9' }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            {scheme.scheme_name}
                          </Typography>
                          <Chip label={t('badgeIneligible')} size="small" color="error" variant="outlined" sx={{ mt: 0.5, fontWeight: 600 }} />
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1.5 }} />
                      <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 700, display: 'block', mb: 1 }}>
                        {t('ineligibleReasonsHeader')}
                      </Typography>
                      {scheme.reasons.map((reason, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
                          <CancelOutlinedIcon sx={{ color: 'error.main', fontSize: 16, mt: 0.25 }} />
                          <Typography variant="body2" sx={{ color: 'text.primary' }}>{reason}</Typography>
                        </Box>
                      ))}
                    </Paper>
                  ))
                )}
              </Box>
            )}

            {/* Tab 2: Conflicts */}
            {conflicts.length > 0 && activeTab === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="warning" icon={<WarningAmberIcon />} sx={{ mb: 2 }}>
                  <AlertTitle sx={{ fontWeight: 700 }}>{t('conflictWarningHeader')}</AlertTitle>
                  {t('conflictWarningText')}
                </Alert>
                {conflicts.map((c, idx) => (
                  <Paper key={idx} variant="outlined" sx={{ p: 2, borderRadius: 1.5, borderColor: 'warning.light', bgcolor: '#fffcf5' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CompareArrowsIcon sx={{ color: 'warning.dark' }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'warning.dark' }}>
                        {c.scheme_a} ↔ {c.scheme_b}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {c.reason}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={() => navigate('/check-eligibility')} startIcon={<ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />}>
            {t('formTitle')}
          </Button>
          <Button variant="contained" onClick={() => navigate('/schemes')} endIcon={<ArrowForwardIcon />}>
            {t('directoryTitle')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
