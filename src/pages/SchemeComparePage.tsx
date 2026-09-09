import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { mockSchemes } from '../mockData';
import { useLanguage } from '../context/LanguageContext';

const compareSchemes = mockSchemes.slice(0, 3);

export default function SchemeComparePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const rows = [
    { label: t('rowDepartment'), key: 'department' },
    { label: t('filterCategory'), key: 'category' },
    { label: t('rowBenefitAmount'), key: 'benefit' },
    { label: t('badgeScore'), key: 'match' },
    { label: t('tabEligible'), key: 'eligibility' },
    { label: t('rowConflicts'), key: 'compatibility' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary', mb: 2, fontWeight: 500 }}
        >
          {t('back')}
        </Button>
        <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 0.5 }}>
          {t('compareTitle')}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
          {t('compareTitle')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          {t('compareSubtitle')}
        </Typography>

        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1a3a6b' }}>
                <TableCell sx={{ color: 'white', fontWeight: 700, minWidth: 140, borderBottom: 'none' }}>Criteria</TableCell>
                {compareSchemes.map((s) => (
                  <TableCell key={s.id} align="center" sx={{ color: 'white', fontWeight: 700, minWidth: 200, borderBottom: 'none' }}>
                    {s.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, ri) => (
                <TableRow
                  key={row.key}
                  sx={{ bgcolor: ri % 2 === 0 ? 'background.paper' : '#f8f9fa', '&:last-child td': { borderBottom: 0 } }}
                >
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', verticalAlign: 'top' }}>
                    {row.label}
                  </TableCell>
                  {compareSchemes.map((s) => {
                    let content: React.ReactNode;
                    if (row.key === 'department') {
                      content = <Typography variant="body2" sx={{ color: 'text.secondary' }}>{s.department}</Typography>;
                    } else if (row.key === 'category') {
                      content = <Chip label={s.category} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />;
                    } else if (row.key === 'benefit') {
                      content = <Typography variant="body1" sx={{ fontWeight: 800, color: 'success.main' }}>{s.benefit}</Typography>;
                    } else if (row.key === 'match') {
                      content = (
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>{s.matchPercent}%</Typography>
                          <LinearProgress
                            variant="determinate"
                            value={s.matchPercent}
                            sx={{ height: 6, bgcolor: '#e8eef7', '& .MuiLinearProgress-bar': { bgcolor: 'success.main' } }}
                          />
                        </Box>
                      );
                    } else if (row.key === 'eligibility') {
                      content = <Chip label={t('badgeEligible')} color="success" size="small" sx={{ fontWeight: 700 }} />;
                    } else if (row.key === 'compatibility') {
                      content = s.conflictsWith ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                          <WarningAmberIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                          <Typography variant="body2" sx={{ color: 'warning.dark', fontWeight: 500 }}>Conflict</Typography>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                          <CheckCircleIcon sx={{ color: 'success.main', fontSize: 16 }} />
                          <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 500 }}>Compatible</Typography>
                        </Box>
                      );
                    }
                    return (
                      <TableCell key={s.id} align="center" sx={{ verticalAlign: 'top' }}>
                        {content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: '#f1f3f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                {compareSchemes.map((s) => (
                  <TableCell key={s.id} align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      endIcon={<OpenInNewIcon />}
                      onClick={() => navigate(`/schemes/${s.id}`)}
                      sx={{ fontWeight: 700 }}
                    >
                      {t('viewDetails')}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {t('footerDisclaimer')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
