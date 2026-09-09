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
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import { courses } from '../mockData';
import { tnDistricts } from '../data/districts';
import { tnColleges } from '../data/colleges';
import { useEligibility } from '../context/EligibilityContext';
import { useLanguage } from '../context/LanguageContext';
import type { StudentProfile } from '../services/api';

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
  const { t } = useLanguage();
  const stepLabels = [t('stepPersonal'), t('stepEducation'), t('stepFinancial'), t('stepReview')];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, overflowX: 'auto', pb: 0.5 }}>
      {stepLabels.map((label, i) => (
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
          {i < stepLabels.length - 1 && (
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
  const { t } = useLanguage();
  const [districtInput, setDistrictInput] = useState('');
  return (
    <Box>
      <SectionHeading>{t('stepPersonal')}</SectionHeading>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={t('labelFullName')}
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder={t('placeholderFullName')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            label={t('labelAge')}
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            inputProps={{ min: 14, max: 40 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Autocomplete
            fullWidth
            options={tnDistricts}
            value={form.district || null}
            onChange={(_, newValue) => setForm({ ...form, district: newValue || '' })}
            inputValue={districtInput}
            onInputChange={(_, value) => setDistrictInput(value)}
            noOptionsText={districtInput.trim() ? t('noResultsFound') : ' '}
            filterOptions={(options, state) => {
              const q = state.inputValue.trim().toLowerCase();
              if (!q) return options;
              return options.filter((opt) => opt.toLowerCase().includes(q));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('labelDistrict')}
                placeholder={t('placeholderDistrict')}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControl>
            <FormLabel sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>{t('labelGender')}</FormLabel>
            <RadioGroup row value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <FormControlLabel value="male" control={<Radio />} label={t('genderMale')} />
              <FormControlLabel value="female" control={<Radio />} label={t('genderFemale')} />
              <FormControlLabel value="transgender" control={<Radio />} label={t('genderTransgender')} />
              <FormControlLabel value="prefer-not" control={<Radio />} label={t('genderPreferNot')} />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

function CollegeAutocomplete({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  const { t } = useLanguage();
  const [collegeInput, setCollegeInput] = useState(form.collegeName || '');

  return (
    <Autocomplete
      freeSolo
      fullWidth
      options={tnColleges}
      value={form.collegeName || ''}
      onChange={(_, newValue) => {
        const val = typeof newValue === 'string' ? newValue : newValue || '';
        setForm({ ...form, collegeName: val });
        setCollegeInput(val);
      }}
      inputValue={collegeInput}
      onInputChange={(_, value) => {
        setCollegeInput(value);
        setForm({ ...form, collegeName: value });
      }}
      noOptionsText={collegeInput.trim() ? t('noResultsFound') : ' '}
      filterOptions={(options, state) => {
        const q = state.inputValue.trim().toLowerCase();
        if (!q) return options;
        return options.filter((opt) => opt.toLowerCase().includes(q));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('labelCollegeName')}
          placeholder={t('placeholderCollegeName')}
        />
      )}
    />
  );
}

function EducationStep({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  const { t } = useLanguage();
  return (
    <Box>
      <SectionHeading>{t('stepEducation')}</SectionHeading>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>{t('labelEducationLevel')}</InputLabel>
            <Select value={form.educationLevel} label={t('labelEducationLevel')} onChange={(e) => setForm({ ...form, educationLevel: e.target.value })}>
              <MenuItem value="diploma">{t('eduDiploma')}</MenuItem>
              <MenuItem value="ug">{t('eduUg')}</MenuItem>
              <MenuItem value="pg">{t('eduPg')}</MenuItem>
              <MenuItem value="phd">{t('eduPhd')}</MenuItem>
              <MenuItem value="professional">{t('eduProfessional')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>{t('labelCourse')}</InputLabel>
            <Select value={form.course} label={t('labelCourse')} onChange={(e) => setForm({ ...form, course: e.target.value })}>
              {courses.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>{t('labelYearOfStudy')}</InputLabel>
            <Select value={form.yearOfStudy} label={t('labelYearOfStudy')} onChange={(e) => setForm({ ...form, yearOfStudy: e.target.value })}>
              <MenuItem value="1">{t('year1')}</MenuItem>
              <MenuItem value="2">{t('year2')}</MenuItem>
              <MenuItem value="3">{t('year3')}</MenuItem>
              <MenuItem value="4">{t('year4')}</MenuItem>
              <MenuItem value="5">{t('year5')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>{t('labelCollegeType')}</InputLabel>
            <Select value={form.collegeType} label={t('labelCollegeType')} onChange={(e) => setForm({ ...form, collegeType: e.target.value })}>
              <MenuItem value="govt">{t('collegeTypeGovt')}</MenuItem>
              <MenuItem value="govt-aided">{t('collegeTypeAided')}</MenuItem>
              <MenuItem value="private">{t('collegeTypePrivate')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>{t('labelSchoolBg')}</InputLabel>
            <Select value={form.schoolBackground} label={t('labelSchoolBg')} onChange={(e) => setForm({ ...form, schoolBackground: e.target.value })}>
              <MenuItem value="govt-school">{t('schoolBgGovt')}</MenuItem>
              <MenuItem value="govt-aided-school">{t('schoolBgAided')}</MenuItem>
              <MenuItem value="private-school">{t('schoolBgPrivate')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CollegeAutocomplete form={form} setForm={setForm} />
        </Grid>
      </Grid>
    </Box>
  );
}

function FinancialStep({ form, setForm }: { form: FormData; setForm: (f: FormData) => void }) {
  const { t } = useLanguage();
  return (
    <Box>
      <SectionHeading>{t('stepFinancial')}</SectionHeading>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={t('labelIncome')}
            type="number"
            value={form.annualIncome}
            onChange={(e) => setForm({ ...form, annualIncome: e.target.value })}
            helperText={t('incomeHelpText')}
            inputProps={{ min: 0 }}
            placeholder={t('placeholderIncome')}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>{t('labelCommunity')}</InputLabel>
            <Select value={form.community} label={t('labelCommunity')} onChange={(e) => setForm({ ...form, community: e.target.value })}>
              <MenuItem value="sc">{t('commSC')}</MenuItem>
              <MenuItem value="st">{t('commST')}</MenuItem>
              <MenuItem value="mbc">{t('commMBC')}</MenuItem>
              <MenuItem value="bc">{t('commBC')}</MenuItem>
              <MenuItem value="bcm">{t('commBCM')}</MenuItem>
              <MenuItem value="dnc">{t('commDNC')}</MenuItem>
              <MenuItem value="obc">{t('commOBC')}</MenuItem>
              <MenuItem value="minority">{t('commMinority')}</MenuItem>
              <MenuItem value="general">{t('commGeneral')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>{t('labelDisability')}</InputLabel>
            <Select value={form.disabilityStatus} label={t('labelDisability')} onChange={(e) => setForm({ ...form, disabilityStatus: e.target.value })}>
              <MenuItem value="none">{t('disabilityNone')}</MenuItem>
              <MenuItem value="physical">{t('disabilityPhysical')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.firstGraduate}
                onChange={(e) => setForm({ ...form, firstGraduate: e.target.checked })}
                color="primary"
              />
            }
            label={t('labelFirstGraduate')}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function ReviewStep({ form, onEdit }: { form: FormData; onEdit: (step: number) => void }) {
  const { t } = useLanguage();
  const personalItems = [
    { key: t('labelFullName'), value: form.fullName || t('notProvided') },
    { key: t('labelAge'), value: form.age || t('notProvided') },
    { key: t('labelDistrict'), value: form.district || t('notProvided') },
    { key: t('labelGender'), value: form.gender || t('notProvided') },
  ];
  const eduItems = [
    { key: t('labelEducationLevel'), value: form.educationLevel || t('notProvided') },
    { key: t('labelCourse'), value: form.course || t('notProvided') },
    { key: t('labelYearOfStudy'), value: form.yearOfStudy || t('notProvided') },
    { key: t('labelCollegeType'), value: form.collegeType || t('notProvided') },
    { key: t('labelCollegeName'), value: form.collegeName || t('notProvided') },
  ];
  const financialItems = [
    { key: t('labelIncome'), value: form.annualIncome ? `₹${parseFloat(form.annualIncome).toLocaleString()}` : t('notProvided') },
    { key: t('labelCommunity'), value: form.community || t('notProvided') },
    { key: t('labelFirstGraduate'), value: form.firstGraduate ? t('boolYes') : t('boolNo') },
  ];

  return (
    <Box>
      <SectionHeading>{t('stepReview')}</SectionHeading>
      <Grid container spacing={3}>
        {[
          { title: t('stepPersonal'), items: personalItems, stepIndex: 0 },
          { title: t('stepEducation'), items: eduItems, stepIndex: 1 },
          { title: t('stepFinancial'), items: financialItems, stepIndex: 2 },
        ].map((sec) => (
          <Grid size={{ xs: 12 }} key={sec.title}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {sec.title}
                </Typography>
                <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => onEdit(sec.stepIndex)}>
                  {t('editBtn')}
                </Button>
              </Box>
              <Grid container spacing={1}>
                {sec.items.map((it) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={it.key}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                      {it.key}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {it.value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function EligibilityFormPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setProfile, fetchRecommendations } = useEligibility();
  const { t } = useLanguage();

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    const genderMap: Record<string, 'male' | 'female' | 'other'> = {
      male: 'male',
      female: 'female',
    };
    const categoryMap: Record<string, 'SC' | 'ST' | 'MBC' | 'BC' | 'OBC' | 'OC'> = {
      sc: 'SC', st: 'ST', mbc: 'MBC', bc: 'BC', obc: 'OBC', minority: 'BC', general: 'OC'
    };
    const courseLevelMap: Record<string, 'UG' | 'PG' | 'DIPLOMA' | 'PHD'> = {
      ug: 'UG', pg: 'PG', diploma: 'DIPLOMA', phd: 'PHD', professional: 'UG'
    };
    const collegeTypeMap: Record<string, 'government' | 'aided' | 'private'> = {
      govt: 'government', 'govt-aided': 'aided', private: 'private'
    };

    const isDisability = form.disabilityStatus !== 'none' && form.disabilityStatus !== '';

    const studentProfile: StudentProfile = {
      name: form.fullName || 'Student',
      age: parseInt(form.age) || 20,
      gender: genderMap[form.gender] || 'other',
      category: categoryMap[form.community] || 'OC',
      annual_family_income: parseFloat(form.annualIncome) || 0,
      marks_percentage: 85,
      year_of_study: parseInt(form.yearOfStudy) || 1,
      course: form.course || 'B.E',
      course_level: courseLevelMap[form.educationLevel] || 'UG',
      college_type: collegeTypeMap[form.collegeType] || 'private',
      government_school_background: form.schoolBackground === 'govt-school',
      disability: isDisability,
      disability_percentage: isDisability ? 50 : 0,
      minority: form.community === 'minority',
      first_graduate: form.firstGraduate,
      district: form.district || 'Chennai',
      state: 'Tamil Nadu'
    };

    try {
      setProfile(studentProfile);
      await fetchRecommendations(studentProfile);
      navigate('/results');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '80vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
          {t('formTitle')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
          {t('formSubtitle')}
        </Typography>

        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
          <StepIndicator current={step} />

          {step === 0 && <PersonalStep form={form} setForm={setForm} />}
          {step === 1 && <EducationStep form={form} setForm={setForm} />}
          {step === 2 && <FinancialStep form={form} setForm={setForm} />}
          {step === 3 && <ReviewStep form={form} onEdit={setStep} />}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              disabled={step === 0}
              onClick={back}
              startIcon={<ArrowBackIcon />}
              sx={{ fontWeight: 600 }}
            >
              {t('back')}
            </Button>

            {step < 3 ? (
              <Button
                variant="contained"
                onClick={next}
                endIcon={<ArrowForwardIcon />}
                sx={{ fontWeight: 700, px: 3 }}
              >
                {t('next')}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={<LockOutlinedIcon />}
                sx={{ fontWeight: 700, px: 3, py: 1.25 }}
              >
                {loading ? t('loading') : t('btnCheckNow')}
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
