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
import CancelIcon from '@mui/icons-material/Cancel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { mockSchemes } from '../mockData';

const compareSchemes = mockSchemes.slice(0, 3);

const rows = [
  { label: 'Department', key: 'department' },
  { label: 'Category', key: 'category' },
  { label: 'Estimated Benefit', key: 'benefit' },
  { label: 'Match Score', key: 'match' },
  { label: 'Eligibility', key: 'eligibility' },
  { label: 'Documents Required', key: 'documents' },
  { label: 'Compatibility', key: 'compatibility' },
  { label: 'Recommended', key: 'recommended' },
];

export default function SchemeComparePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary', mb: 2, fontWeight: 500 }}
        >
          Back
        </Button>
        <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 0.5 }}>
          Scheme Comparison
        </Typography>
        <Typography variant="h4" sx={{ mb: 0.5 }}>Compare Schemes</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Side-by-side comparison of your top matching schemes.
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
                            sx={{ height: 6, bgcolor: '#e8eef7', '& .MuiLinearProgress-bar': { bgcolor: s.matchPercent >= 80 ? 'success.main' : 'warning.main' } }}
                          />
                        </Box>
                      );
                    } else if (row.key === 'eligibility') {
                      const color = s.eligibilityStatus === 'eligible' ? 'success' : s.eligibilityStatus === 'partial' ? 'warning' : 'error';
                      const label = s.eligibilityStatus === 'eligible' ? 'Eligible' : s.eligibilityStatus === 'partial' ? 'Partial' : 'Not Eligible';
                      content = <Chip label={label} color={color} size="small" sx={{ fontWeight: 700 }} />;
                    } else if (row.key === 'documents') {
                      content = <Typography variant="body2">{s.documents.length} documents</Typography>;
                    } else if (row.key === 'compatibility') {
                      content = s.conflictsWith ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <WarningAmberIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                          <Typography variant="body2" sx={{ color: 'warning.dark', fontWeight: 500 }}>1 conflict</Typography>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CheckCircleIcon sx={{ color: 'success.main', fontSize: 16 }} />
                          <Typography variant="body2" sx={{ color: 'success.dark', fontWeight: 500 }}>No conflicts</Typography>
                        </Box>
                      );
                    } else if (row.key === 'recommended') {
                      content = s.id === 'sc001' ? (
                        <Chip label="Recommended" size="small" sx={{ bgcolor: '#1a3a6b', color: 'white', fontWeight: 700 }} />
                      ) : (
                        <CancelIcon sx={{ color: 'action.disabled', fontSize: 18 }} />
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
                      variant={s.id === 'sc001' ? 'contained' : 'outlined'}
                      color={s.id === 'sc001' ? 'secondary' : 'primary'}
                      size="small"
                      endIcon={<OpenInNewIcon />}
                      onClick={() => navigate(`/schemes/${s.id}`)}
                      sx={{ fontWeight: 700 }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            * All information is for guidance only. Verify eligibility and scheme conditions through official government portals.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
