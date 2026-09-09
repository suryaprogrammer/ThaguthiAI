import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useEligibility } from '../context/EligibilityContext';
import type { BackendScheme } from '../services/api';

const categories = ['All', 'Scholarship', 'Merit Scholarship', 'Welfare Scheme', 'Minority Scholarship', 'Central Scholarship', 'Welfare'];
const communities = ['All', 'SC', 'ST', 'MBC', 'BC', 'OBC', 'Minority', 'General'];
const educationLevels = ['All', 'Diploma', 'Undergraduate', 'Postgraduate', 'Professional'];
const sortOptions = ['Most Relevant', 'Highest Benefit', 'Best Match'];

function SchemeCard({ scheme }: { scheme: BackendScheme }) {
  const navigate = useNavigate();
  
  const name = scheme.name;
  const department = scheme.department;
  const description = scheme.description;
  const benefit = `₹${scheme.benefit_amount.toLocaleString('en-IN')} / year`;
  const matchPercent = 80;
  const eligibilityStatus = 'eligible';
  const category = scheme.department.includes('Welfare') ? 'Welfare Scheme' : 'Scholarship';
  const id = scheme.id;

  const statusColor = eligibilityStatus === 'eligible' ? 'success' : eligibilityStatus === 'partial' ? 'warning' : 'error';
  const statusLabel = eligibilityStatus === 'eligible' ? 'Eligible' : eligibilityStatus === 'partial' ? 'Partially Eligible' : 'Not Eligible';

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: 2.5,
        '&:hover': { boxShadow: '0 4px 12px rgba(26,58,107,0.1)', borderColor: 'primary.light' },
        transition: 'box-shadow 0.2s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
          <Typography variant="body1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>{name}</Typography>
          <Chip
            label={statusLabel}
            color={statusColor as any}
            size="small"
            sx={{ fontWeight: 700, fontSize: '0.65rem', flexShrink: 0 }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, display: 'block', mb: 0.75 }}>
          {department}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65, mb: 2 }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
          <Chip label={category} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
          {eligibilityStatus === 'eligible' && (
            <Chip
              label="You qualify"
              size="small"
              icon={<CheckCircleIcon sx={{ fontSize: '14px !important' }} />}
              sx={{ bgcolor: '#f0f7f0', color: 'success.dark', border: '1px solid', borderColor: 'success.light', fontSize: '0.7rem' }}
            />
          )}
        </Box>
      </Box>

      <Box>
        <Divider sx={{ mb: 1.5 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 1 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Estimated Benefit</Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'success.main', lineHeight: 1.2 }}>{benefit}</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5, justifyContent: 'flex-end' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Match</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>{matchPercent}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={matchPercent}
              sx={{
                width: 80,
                height: 6,
                bgcolor: '#e8eef7',
                '& .MuiLinearProgress-bar': {
                  bgcolor: matchPercent >= 80 ? 'success.main' : 'warning.main',
                },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => navigate(`/schemes/${id}`)}
            endIcon={<ArrowForwardIcon />}
            sx={{ fontWeight: 600 }}
          >
            View Details
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default function SchemesDirectoryPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [community, setCommunity] = useState('All');
  const [educationLevel, setEducationLevel] = useState('All');
  const [sortBy, setSortBy] = useState('Most Relevant');
  const navigate = useNavigate();

  const { allSchemes, fetchSchemes, loadingSchemes } = useEligibility();

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  const schemes = allSchemes.length > 0 ? allSchemes : [];

  const filtered = useMemo(() => {
    let result = [...schemes];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q) || s.department.toLowerCase().includes(q) || (s.department.includes('Welfare') ? 'Welfare Scheme' : 'Scholarship').toLowerCase().includes(q));
    }
    if (category !== 'All') result = result.filter((s) => (s.department.includes('Welfare') ? 'Welfare Scheme' : 'Scholarship') === category);

    if (sortBy === 'Highest Benefit') result.sort((a, b) => b.benefit_amount - a.benefit_amount);
    else if (sortBy === 'Best Match') result.sort(() => 0);

    return result;
  }, [search, category, community, educationLevel, sortBy, schemes]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', display: 'block', mb: 0.5 }}>
            Scheme Directory
          </Typography>
          <Typography variant="h4" sx={{ mb: 0.5 }}>Browse Schemes &amp; Scholarships</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Explore available government scholarships and welfare schemes. Use filters to narrow results by community, education level, or category.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/check-eligibility')}
            sx={{ fontWeight: 700 }}
          >
            Check Your Eligibility
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', position: 'sticky', top: 80 }}>
              <Box sx={{ px: 2.5, py: 1.75, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8f9fa', display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterListIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Filter Schemes</Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Community</InputLabel>
                  <Select value={community} label="Community" onChange={(e) => setCommunity(e.target.value)}>
                    {communities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Education Level</InputLabel>
                  <Select value={educationLevel} label="Education Level" onChange={(e) => setEducationLevel(e.target.value)}>
                    {educationLevels.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                  </Select>
                </FormControl>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1.5 }}>
                  {['SC/ST', 'First Graduate', 'Disability', 'Merit-Based', 'Income-Based'].map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" clickable sx={{ fontSize: '0.7rem' }} />
                  ))}
                </Box>
                <Button
                  variant="text"
                  fullWidth
                  size="small"
                  sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}
                  onClick={() => { setCategory('All'); setCommunity('All'); setEducationLevel('All'); setSearch(''); }}
                >
                  Clear All Filters
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Main Results */}
          <Grid size={{ xs: 12, md: 9 }}>
            {/* Search + Sort */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <TextField
                size="small"
                placeholder="Search scholarships or schemes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ flex: 1, minWidth: 220 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={<SortIcon sx={{ mr: 0.5, color: 'text.secondary', fontSize: 18 }} />}
                >
                  {sortOptions.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Showing <strong>{filtered.length}</strong> scheme{filtered.length !== 1 ? 's' : ''}
              </Typography>
              {filtered.length < allSchemes.length && (
                <Chip
                  label={`${allSchemes.length - filtered.length} filtered out`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              )}
            </Box>

            {loadingSchemes ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
              </Box>
            ) : allSchemes.length === 0 ? (
              <Paper elevation={0} sx={{ p: 5, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                <WarningAmberIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h6" sx={{ mb: 0.5 }}>Backend might not be running</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Ensure the backend API is running and accessible.
                </Typography>
              </Paper>
            ) : filtered.length === 0 ? (
              <Paper elevation={0} sx={{ p: 5, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                <SearchIcon sx={{ fontSize: 40, color: 'action.disabled', mb: 1 }} />
                <Typography variant="h6" sx={{ mb: 0.5 }}>No schemes found</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Try adjusting your search or filters.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {filtered.map((scheme) => (
                  <Grid key={scheme.id} size={{ xs: 12, sm: 6 }}>
                    <SchemeCard scheme={scheme} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
