import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useNavigate } from 'react-router-dom';

const quickLinks = ['How It Works', 'Schemes', 'Help', 'About'];
const legalLinks = ['Privacy', 'Accessibility', 'Disclaimer', 'Contact'];

export default function Footer() {
  const navigate = useNavigate();
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
                THAGUTHI<span style={{ color: '#e74c3c' }}>AI</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, maxWidth: 360, lineHeight: 1.7 }}>
              "Know what you're eligible for."
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', lineHeight: 1.8 }}>
              ThaguthiAI is a student-focused eligibility assistance interface.
              Always verify scheme conditions through the official government
              source before applying.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1.5, display: 'block' }}>
              Quick Links
            </Typography>
            {quickLinks.map((l) => (
              <Box key={l} sx={{ mb: 0.75 }}>
                <Link
                  component="button"
                  onClick={() => { if (l === 'Schemes') navigate('/schemes'); }}
                  underline="hover"
                  sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', cursor: 'pointer', background: 'none', border: 'none', p: 0 }}
                >
                  {l}
                </Link>
              </Box>
            ))}
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1.5, display: 'block' }}>
              Information
            </Typography>
            {legalLinks.map((l) => (
              <Box key={l} sx={{ mb: 0.75 }}>
                <Link
                  underline="hover"
                  sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', cursor: 'pointer' }}
                >
                  {l}
                </Link>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2025 ThaguthiAI. For guidance purposes only. All scheme information must be verified through official sources.
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            Tamil Nadu Student Benefit Discovery
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
