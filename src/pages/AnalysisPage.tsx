import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';

const analysisSteps = [
  'Reading student profile',
  'Checking scheme requirements',
  'Comparing eligible schemes',
  'Checking benefit conflicts',
  'Preparing recommendation',
];

export default function AnalysisPage() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    analysisSteps.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setCurrent(i + 1);
          setCompleted((prev) => [...prev, i]);
        }, (i + 1) * 1000)
      );
    });
    timers.push(
      setTimeout(() => {
        navigate('/results');
      }, (analysisSteps.length + 1) * 1000 + 400)
    );
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{ p: { xs: 3, md: 5 }, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: '#e8eef7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              position: 'relative',
            }}
          >
            <CircularProgress
              size={64}
              thickness={2.5}
              sx={{ position: 'absolute', color: 'primary.main', opacity: 0.25 }}
              variant="determinate"
              value={100}
            />
            <CircularProgress
              size={64}
              thickness={2.5}
              sx={{ position: 'absolute', color: 'primary.main' }}
              variant="determinate"
              value={(completed.length / analysisSteps.length) * 100}
            />
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '0.875rem' }}>
              {Math.round((completed.length / analysisSteps.length) * 100)}%
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 0.75, fontWeight: 700 }}>
            Checking your eligibility...
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            Comparing your profile against scheme requirements. This takes only a moment.
          </Typography>

          <Box sx={{ textAlign: 'left', maxWidth: 360, mx: 'auto' }}>
            {analysisSteps.map((step, i) => {
              const isDone = completed.includes(i);
              const isActive = current === i;
              return (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 1.25,
                    px: 1.5,
                    mb: 0.5,
                    borderRadius: 1,
                    bgcolor: isActive ? 'rgba(26,58,107,0.06)' : 'transparent',
                    transition: 'background 0.3s',
                  }}
                >
                  {isDone ? (
                    <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20, flexShrink: 0 }} />
                  ) : isActive ? (
                    <CircularProgress size={18} thickness={3} sx={{ color: 'primary.main', flexShrink: 0 }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ color: 'action.disabled', fontSize: 20, flexShrink: 0 }} />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isDone || isActive ? 600 : 400,
                      color: isDone ? 'success.dark' : isActive ? 'primary.main' : 'text.disabled',
                      transition: 'color 0.3s',
                    }}
                  >
                    {step}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Scheme data is for guidance only. Always verify eligibility through official government portals.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
