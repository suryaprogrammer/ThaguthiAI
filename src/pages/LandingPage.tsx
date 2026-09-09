import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useNavigate } from 'react-router-dom';

const trustItems = [
  { icon: <SchoolOutlinedIcon />, label: '15+ Scheme Categories' },
  { icon: <VerifiedOutlinedIcon />, label: 'Eligibility Matching' },
  { icon: <BalanceOutlinedIcon />, label: 'Conflict Awareness' },
  { icon: <SearchOutlinedIcon />, label: 'Official Source References' },
];

const steps = [
  {
    num: '01',
    title: 'Your Profile',
    desc: 'Tell us about your education, community background, and financial details.',
    icon: <PersonOutlineIcon sx={{ fontSize: 28 }} />,
  },
  {
    num: '02',
    title: 'Eligibility Check',
    desc: 'Your profile is compared against each scheme\'s stated eligibility requirements.',
    icon: <AssignmentOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    num: '03',
    title: 'Conflict Check',
    desc: 'Potentially incompatible benefits are identified so you are clearly informed.',
    icon: <BalanceOutlinedIcon sx={{ fontSize: 28 }} />,
  },
  {
    num: '04',
    title: 'Best Recommendation',
    desc: 'See the most suitable valid combination of schemes for your situation.',
    icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 28 }} />,
  },
];

function HeroIllustration() {
  const steps = [
    { icon: <PersonOutlineIcon />, label: 'Student Profile', sub: 'Personal · Education · Income' },
    { icon: <SearchOutlinedIcon />, label: 'Eligibility Check', sub: 'Matching against 15+ categories' },
    { icon: <AssignmentOutlinedIcon />, label: 'Matched Schemes', sub: '7 schemes found' },
    { icon: <EmojiEventsOutlinedIcon />, label: 'Best Benefit Plan', sub: 'Recommended combination' },
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
            ThaguthiAI · Eligibility Report
          </Typography>
        </Box>
        <Box sx={{ p: 2.5 }}>
          {steps.map((step, i) => (
            <Box key={i}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: i === 2 ? 'rgba(26,58,107,0.06)' : 'transparent',
                  border: '1px solid',
                  borderColor: i === 2 ? 'primary.main' : 'transparent',
                  mb: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1,
                    bgcolor: i === 2 ? 'primary.main' : '#f1f3f5',
                    color: i === 2 ? 'white' : 'primary.main',
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
                {i < 3 && (
                  <Box sx={{ ml: 'auto' }}>
                    <CheckCircleOutlineIcon sx={{ color: i <= 2 ? 'success.main' : 'action.disabled', fontSize: 18 }} />
                  </Box>
                )}
              </Box>
              {i < steps.length - 1 && (
                <Box sx={{ ml: 3.5, my: 0.25, width: 1, height: 16, borderLeft: '2px dashed', borderColor: 'divider' }} />
              )}
            </Box>
          ))}

          <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f0f7f0', borderRadius: 1, border: '1px solid #c8e6c9' }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.dark', display: 'block' }}>
              Recommended Benefit Plan
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Post-Matric Scholarship
              </Typography>
              <Chip label="92% Match" size="small" sx={{ bgcolor: 'success.main', color: 'white', fontWeight: 700, fontSize: '0.7rem', height: 20 }} />
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Estimated Benefit: ₹12,000 / year
            </Typography>
          </Box>

          <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
            <Paper elevation={0} sx={{ flex: 1, p: 1, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>7</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Eligible</Typography>
            </Paper>
            <Paper elevation={0} sx={{ flex: 1, p: 1, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'success.main' }}>₹56,500</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Potential / yr</Typography>
            </Paper>
            <Paper elevation={0} sx={{ flex: 1, p: 1, border: '1px solid', borderColor: 'warning.main', textAlign: 'center', bgcolor: '#fff8e1' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'warning.dark' }}>2</Typography>
              <Typography variant="caption" sx={{ color: 'warning.dark' }}>Conflicts</Typography>
            </Paper>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ position: 'absolute', top: -12, right: -12, bgcolor: '#c0392b', color: 'white', px: 1.5, py: 0.5, borderRadius: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem' }}>LIVE PREVIEW</Typography>
      </Box>
    </Box>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip
                label="STUDENT BENEFIT DISCOVERY"
                size="small"
                sx={{
                  bgcolor: '#e8eef7',
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.06em',
                  border: '1px solid',
                  borderColor: 'primary.light',
                  borderRadius: 1,
                  mb: 2.5,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  color: 'text.primary',
                  mb: 2.5,
                  fontSize: { xs: '1.875rem', md: '2.375rem' },
                  lineHeight: 1.15,
                  fontWeight: 800,
                }}
              >
                Find the government schemes{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  you're eligible for.
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3.5, lineHeight: 1.75, maxWidth: 480 }}>
                Enter your student profile and ThaguthiAI will help identify eligible scholarships and welfare schemes,
                check possible conflicts, and highlight the most suitable benefits.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/check-eligibility')}
                  sx={{ px: 3, py: 1.375, fontWeight: 700, fontSize: '1rem' }}
                >
                  Check My Eligibility
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/schemes')}
                  sx={{ px: 3, py: 1.375, fontWeight: 600 }}
                >
                  Explore Schemes
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <HeroIllustration />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trust Bar */}
      <Box sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: 2.5 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'flex-start', md: 'center' },
              gap: { xs: 2, md: 0 },
              flexWrap: 'wrap',
              overflowX: 'auto',
            }}
          >
            {trustItems.map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: { xs: 0, md: 3 } }}>
                  <Box sx={{ color: 'primary.main', '& svg': { fontSize: 20 } }}>{item.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', whiteSpace: 'nowrap' }}>
                    {item.label}
                  </Typography>
                </Box>
                {i < trustItems.length - 1 && (
                  <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, height: 20, alignSelf: 'center' }} />
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* How It Works */}
      <Box id="how-it-works" sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 5 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 1 }}>
              Process
            </Typography>
            <Typography variant="h2" sx={{ color: 'text.primary', mb: 1.5 }}>
              How ThaguthiAI works
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 540 }}>
              A structured, transparent process to identify schemes relevant to your profile.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {steps.map((step, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderTop: '3px solid',
                    borderTopColor: i === 0 ? 'primary.main' : i === 1 ? 'info.main' : i === 2 ? 'warning.main' : 'success.main',
                    '&:hover': { borderColor: 'primary.light', boxShadow: '0 4px 12px rgba(26,58,107,0.1)' },
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 800, color: 'divider', fontSize: '2.25rem', lineHeight: 1, mb: 1.5 }}
                  >
                    {step.num}
                  </Typography>
                  <Box sx={{ color: 'primary.main', mb: 1.5 }}>{step.icon}</Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>{step.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {step.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Scheme Preview Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 1 }}>
                Featured Schemes
              </Typography>
              <Typography variant="h2" sx={{ mb: 1.5 }}>Explore scholarship and welfare categories</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.75 }}>
                ThaguthiAI covers state and central government schemes including post-matric scholarships,
                merit awards, community welfare schemes, and more.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/schemes')}
                sx={{ px: 3, py: 1.25 }}
              >
                Browse All Schemes
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { name: 'Post-Matric Scholarship (SC/ST)', dept: 'Adi Dravidar Welfare', benefit: '₹12,000/yr', color: 'primary.main' },
                  { name: 'Chief Minister\'s Special Scholarship', dept: 'Higher Education Dept.', benefit: '₹18,000/yr', color: 'success.main' },
                  { name: 'Higher Education Support Scheme', dept: 'Social Welfare Dept.', benefit: '₹10,000/yr', color: 'info.main' },
                ].map((s, i) => (
                  <Paper
                    key={i}
                    elevation={0}
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderLeft: '4px solid',
                      borderLeftColor: s.color,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      '&:hover': { bgcolor: 'action.hover' },
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onClick={() => navigate('/schemes')}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>{s.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{s.dept}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right', flexShrink: 0, ml: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: s.color }}>{s.benefit}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end', mt: 0.25 }}>
                        <ArticleOutlinedIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>View</Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Banner */}
      <Box id="about" sx={{ bgcolor: '#1a3a6b', py: { xs: 5, md: 7 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: 'white', mb: 2 }}>
            Ready to discover your eligible schemes?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', mb: 4, lineHeight: 1.75 }}>
            Fill in your student profile — it takes about 3 minutes — and ThaguthiAI will identify matching government scholarships and welfare benefits.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/check-eligibility')}
            sx={{ px: 4, py: 1.5, fontWeight: 700, fontSize: '1rem' }}
          >
            Check My Eligibility
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
