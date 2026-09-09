import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import { districts, courses } from '../mockData';
import { useEligibility } from '../context/EligibilityContext';
import type { StudentProfile } from '../services/api';

const steps = ['Personal', 'Education', 'Financial', 'Additional', 'Review'];

interface FormData {
  fullName: string;
  age: string;
  gender: string;
  district: string;
  course: string;
  educationLevel: string;
  yearOfStudy: string;
  collegeType: string;
  collegeName: string;
  schoolBackground: string;
  community: string;
  disabilityStatus: string;
  firstGraduate: boolean;
  annualIncome: string;
  specialCategory: string[];
}

const initialForm: FormData = {
  fullName: '',
  age: '',
  gender: '',
  district: '',
  course: '',
  educationLevel: '',
  yearOfStudy: '',
  collegeType: '',
  collegeName: '',
  schoolBackground: '',
  community: '',
  disabilityStatus: '',
  firstGraduate: false,
  annualIncome: '',
  specialCategory: [],
};

function StepIndicator({ current }: { current: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, overflowX: 'auto', pb: 0.5 }}>
      {steps.map((label, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: i < current ? 'success.main' : i === current ? 'primary.main' : '#e9ecef',
                color: i <= current ? 'white' : 'text.disabled',
                fontWeight: 700,
                fontSize: '0.75rem',
                flexShrink: 0,
              }}
            >
              {i < current ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : String(i + 1).padStart(2, '0')}
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: i === current ? 700 : 400,
                color: i === current ? 'primary.main' : i < current ? 'success.main' : 'text.disabled',
                whiteSpace: 'nowrap',
                display: { xs: i === current ? 'block' : 'none', sm: 'block' },
              }}
            >
              {label}
            </Typography>
          </Box>
          {i < steps.length - 1 && (
            <Box
              sx={{
                flex: 1,
                height: 2,
                mx: 1,
                minWidth: 24,
                bgcolor: i < current ? 'success.main' : 'divider',
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="overline"
      sx={{
        display: 'block',
        color: 'primary.main',
        fontWeight: 700,
        mb: 2,
        pb: 1,
        borderBottom: '2px solid',
        borderBottomColor: 'primary.main',
      }}
    >
      {children}
    </Typography>
  );
}

function PersonalStep({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  return (
    <Box>
      <SectionHeading>Personal Information</SectionHeading>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth label="Full Name" value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="As per government documents"
            helperText="Enter name as it appears on official certificates"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth label="Age" type="number" value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            inputProps={{ min: 14, max: 40 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>District</InputLabel>
            <Select value={form.district} label="District" onChange={(e) => setForm({ ...form, district: e.target.value })}>
              {districts.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControl>
            <FormLabel sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>Gender</FormLabel>
            <RadioGroup row value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="transgender" control={<Radio />} label="Transgender" />
              <FormControlLabel value="prefer-not" control={<Radio />} label="Prefer not to say" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

function EducationStep({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  return (
    <Box>
      <SectionHeading>Education Details</SectionHeading>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Education Level</InputLabel>
            <Select value={form.educationLevel} label="Education Level" onChange={(e) => setForm({ ...form, educationLevel: e.target.value })}>
              <MenuItem value="diploma">Diploma / Polytechnic</MenuItem>
              <MenuItem value="ug">Undergraduate (UG)</MenuItem>
              <MenuItem value="pg">Postgraduate (PG)</MenuItem>
              <MenuItem value="phd">Ph.D. / Research</MenuItem>
              <MenuItem value="professional">Professional (MBBS, BL, etc.)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Course / Programme</InputLabel>
            <Select value={form.course} label="Course / Programme" onChange={(e) => setForm({ ...form, course: e.target.value })}>
              {courses.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Year of Study</InputLabel>
            <Select value={form.yearOfStudy} label="Year of Study" onChange={(e) => setForm({ ...form, yearOfStudy: e.target.value })}>
              <MenuItem value="1">1st Year</MenuItem>
              <MenuItem value="2">2nd Year</MenuItem>
              <MenuItem value="3">3rd Year</MenuItem>
              <MenuItem value="4">4th Year</MenuItem>
              <MenuItem value="5">5th Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>College / Institution Type</InputLabel>
            <Select value={form.collegeType} label="College / Institution Type" onChange={(e) => setForm({ ...form, collegeType: e.target.value })}>
              <MenuItem value="govt">Government College</MenuItem>
              <MenuItem value="govt-aided">Government-Aided College</MenuItem>
              <MenuItem value="private">Private (Self-Financing)</MenuItem>
              <MenuItem value="deemed">Deemed University</MenuItem>
              <MenuItem value="central">Central University / IIT / NIT</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>School Background</InputLabel>
            <Select value={form.schoolBackground} label="School Background" onChange={(e) => setForm({ ...form, schoolBackground: e.target.value })}>
              <MenuItem value="govt-school">Government School</MenuItem>
              <MenuItem value="govt-aided-school">Government-Aided School</MenuItem>
              <MenuItem value="private-school">Private School</MenuItem>
              <MenuItem value="cbse">CBSE / Matriculation</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="College / Institution Name"
            value={form.collegeName}
            onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
            placeholder="Full name of your college or institution"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function FinancialStep({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  return (
    <Box>
      <SectionHeading>Financial Information</SectionHeading>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Annual Family Income (₹)"
            type="number"
            value={form.annualIncome}
            onChange={(e) => setForm({ ...form, annualIncome: e.target.value })}
            helperText="Total annual income of all family members. Refer to your Income Certificate."
            inputProps={{ min: 0 }}
            placeholder="e.g. 150000"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Alert severity="info" sx={{ mt: 1 }}>
            Income as stated in your official Income Certificate issued by the Tahsildar or Revenue Officer will be considered.
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
}

function AdditionalStep({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  const specialCats = [
    'Ex-Serviceman Ward', 'Widow / Single Parent Ward', 'Visually Impaired',
    'Hearing Impaired', 'Physically Challenged', 'Destitute',
  ];
  const toggleSpecial = (val: string) => {
    const existing = form.specialCategory;
    setForm({
      ...form,
      specialCategory: existing.includes(val) ? existing.filter((x) => x !== val) : [...existing, val],
    });
  };

  return (
    <Box>
      <SectionHeading>Social &amp; Eligibility Details</SectionHeading>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Community</InputLabel>
            <Select value={form.community} label="Community" onChange={(e) => setForm({ ...form, community: e.target.value })}>
              <MenuItem value="sc">Scheduled Caste (SC)</MenuItem>
              <MenuItem value="st">Scheduled Tribe (ST)</MenuItem>
              <MenuItem value="mbc">Most Backward Class (MBC)</MenuItem>
              <MenuItem value="bc">Backward Class (BC)</MenuItem>
              <MenuItem value="obc">Other Backward Class (OBC)</MenuItem>
              <MenuItem value="minority">Minority Community</MenuItem>
              <MenuItem value="general">General / Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Disability Status</InputLabel>
            <Select value={form.disabilityStatus} label="Disability Status" onChange={(e) => setForm({ ...form, disabilityStatus: e.target.value })}>
              <MenuItem value="none">No Disability</MenuItem>
              <MenuItem value="visual">Visual Impairment</MenuItem>
              <MenuItem value="hearing">Hearing Impairment</MenuItem>
              <MenuItem value="physical">Physical Disability</MenuItem>
              <MenuItem value="multiple">Multiple Disabilities</MenuItem>
              <MenuItem value="other">Other Certified Disability</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.firstGraduate}
                onChange={(e) => setForm({ ...form, firstGraduate: e.target.checked })}
                color="primary"
              />
            }
            label={
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>First Graduate in Family</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Check if no parent or sibling has previously completed a degree-level qualification.
                </Typography>
              </Box>
            }
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormLabel sx={{ fontWeight: 600, color: 'text.primary', display: 'block', mb: 1.5 }}>
            Special Category (if applicable)
          </FormLabel>
          <FormGroup>
            <Grid container spacing={1}>
              {specialCats.map((cat) => (
                <Grid key={cat} size={{ xs: 12, sm: 6 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.specialCategory.includes(cat)}
                        onChange={() => toggleSpecial(cat)}
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">{cat}</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
}

function ReviewSection({ label, items, onEdit }: { label: string; items: { key: string; value: string }[]; onEdit: () => void }) {
  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2.5, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8f9fa' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>{label}</Typography>
        <Button size="small" startIcon={<EditOutlinedIcon />} onClick={onEdit} sx={{ color: 'primary.main', fontWeight: 600 }}>Edit</Button>
      </Box>
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={1.5}>
          {items.map(({ key, value }) => (
            <Grid key={key} size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{key}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: value ? 'text.primary' : 'text.disabled' }}>
                {value || '—'}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

function ReviewStep({ form, goToStep }: { form: FormData; goToStep: (n: number) => void }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 0.5 }}>Review Your Details</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Please confirm all information before starting your eligibility check.
      </Typography>
      <ReviewSection
        label="Personal Details"
        onEdit={() => goToStep(0)}
        items={[
          { key: 'Full Name', value: form.fullName },
          { key: 'Age', value: form.age },
          { key: 'Gender', value: form.gender },
          { key: 'District', value: form.district },
        ]}
      />
      <ReviewSection
        label="Education Details"
        onEdit={() => goToStep(1)}
        items={[
          { key: 'Education Level', value: form.educationLevel },
          { key: 'Course', value: form.course },
          { key: 'Year of Study', value: form.yearOfStudy ? `Year ${form.yearOfStudy}` : '' },
          { key: 'College Type', value: form.collegeType },
          { key: 'College Name', value: form.collegeName },
          { key: 'School Background', value: form.schoolBackground },
        ]}
      />
      <ReviewSection
        label="Financial Details"
        onEdit={() => goToStep(2)}
        items={[
          { key: 'Annual Family Income', value: form.annualIncome ? `₹${Number(form.annualIncome).toLocaleString('en-IN')}` : '' },
        ]}
      />
      <ReviewSection
        label="Additional Eligibility Details"
        onEdit={() => goToStep(3)}
        items={[
          { key: 'Community', value: form.community.toUpperCase() },
          { key: 'Disability Status', value: form.disabilityStatus },
          { key: 'First Graduate', value: form.firstGraduate ? 'Yes' : 'No' },
          { key: 'Special Category', value: form.specialCategory.join(', ') || 'None' },
        ]}
      />
    </Box>
  );
}

export default function EligibilityFormPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const navigate = useNavigate();
  const { setProfile } = useEligibility();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleStart = () => {
    const genderMap: Record<string, 'male'|'female'|'other'> = {
      male: 'male',
      female: 'female'
    };
    const categoryMap: Record<string, 'SC'|'ST'|'MBC'|'BC'|'OBC'|'OC'> = {
      sc: 'SC', st: 'ST', mbc: 'MBC', bc: 'BC', obc: 'OBC', minority: 'BC', general: 'OC'
    };
    const courseLevelMap: Record<string, 'UG'|'PG'|'DIPLOMA'|'PHD'> = {
      ug: 'UG', pg: 'PG', diploma: 'DIPLOMA', phd: 'PHD', professional: 'UG'
    };
    const collegeTypeMap: Record<string, 'government'|'aided'|'private'> = {
      govt: 'government', 'govt-aided': 'aided', private: 'private', deemed: 'private', central: 'government'
    };

    const isDisability = form.disabilityStatus !== 'none' && form.disabilityStatus !== '';

    const studentProfile: StudentProfile = {
      name: form.fullName,
      age: parseInt(form.age) || 20,
      gender: genderMap[form.gender] || 'other',
      category: categoryMap[form.community] || 'OC',
      annual_family_income: parseFloat(form.annualIncome) || 0,
      marks_percentage: 75,
      year_of_study: parseInt(form.yearOfStudy) || 1,
      course: form.course || 'B.E',
      course_level: courseLevelMap[form.educationLevel] || 'UG',
      college_type: collegeTypeMap[form.collegeType] || 'private',
      government_school_background: form.schoolBackground === 'govt-school' || form.schoolBackground === 'govt-aided-school',
      disability: isDisability,
      disability_percentage: isDisability ? 40 : 0,
      minority: form.community === 'minority',
      first_graduate: form.firstGraduate,
      district: form.district || 'Chennai',
      state: 'Tamil Nadu'
    };
    
    setProfile(studentProfile);
    navigate('/analysis');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 3 }}>
          <Chip
            label="ELIGIBILITY CHECK"
            size="small"
            sx={{ bgcolor: '#e8eef7', color: 'primary.main', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.06em', borderRadius: 1, mb: 1.5 }}
          />
          <Typography variant="h4" sx={{ mb: 0.5 }}>Check Your Eligibility</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Complete the form below to find eligible schemes and scholarships.
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, border: '1px solid', borderColor: 'divider' }}>
          <StepIndicator current={step} />

          {step === 0 && <PersonalStep form={form} setForm={setForm} />}
          {step === 1 && <EducationStep form={form} setForm={setForm} />}
          {step === 2 && <FinancialStep form={form} setForm={setForm} />}
          {step === 3 && <AdditionalStep form={form} setForm={setForm} />}
          {step === 4 && <ReviewStep form={form} goToStep={setStep} />}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={back}
              disabled={step === 0}
              sx={{ fontWeight: 600 }}
            >
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                onClick={next}
                sx={{ fontWeight: 700, px: 3 }}
              >
                Save &amp; Continue
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={handleStart}
                sx={{ fontWeight: 700, px: 3 }}
              >
                Start Eligibility Check
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 2.5 }}>
            <LockOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Your information is used only to determine relevant scheme eligibility.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
