export type Language = 'en' | 'ta';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // App & Header
    appTitle: 'ThaguthiAI',
    appTagline: 'Know what you\'re eligible for.',
    navHome: 'Home',
    navCheckEligibility: 'Check Eligibility',
    navDirectory: 'Schemes Directory',
    navCompare: 'Compare Schemes',
    navAnalytics: 'Analytics',
    btnCheckNow: 'Check Eligibility Now',
    btnLanguageEn: 'English',
    btnLanguageTa: 'தமிழ்',

    // Common / UI
    noResultsFound: 'No results found',
    loading: 'Loading...',
    errorOccurred: 'An error occurred. Please try again.',
    close: 'Close',
    back: 'Back',
    next: 'Next Step',
    submit: 'Submit',
    reset: 'Reset',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    clearAll: 'Clear All',
    viewDetails: 'View Details',
    applyNow: 'Apply Now',

    // Landing Page
    heroBadge: 'Tamil Nadu Government Schemes Guidance',
    heroTitle: 'Find & Claim Government Schemes You Deserve',
    heroSubtitle: 'Instant eligibility verification powered by deterministic rules. Simple, transparent, and completely free for Tamil Nadu students.',
    heroCtaPrimary: 'Start Eligibility Check',
    heroCtaSecondary: 'Explore Schemes',
    statStudentsCount: '10,000+',
    statStudentsLabel: 'Students Guided',
    statSchemesCount: '₹50,000+',
    statSchemesLabel: 'Max Annual Benefit',
    statAccuracyCount: '100%',
    statAccuracyLabel: 'Rule Precision',

    featuresTitle: 'Why Use ThaguthiAI?',
    feature1Title: 'Deterministic Rule Engine',
    feature1Desc: 'Source-of-truth Python engine guarantees accurate evaluation against state welfare rules.',
    feature2Title: 'Conflict Detection',
    feature2Desc: 'Automatically identifies incompatible scheme combinations so you maximize annual financial benefits.',
    feature3Title: 'AI-Powered Guidance',
    feature3Desc: 'Clear, plain-language explanations of eligibility requirements without complex legal jargon.',

    step1Title: '1. Enter Profile Details',
    step1Desc: 'Fill in academic, community, and income information.',
    step2Title: '2. Deterministic Verification',
    step2Desc: 'Rule engine instantly matches criteria against database.',
    step3Title: '3. Optimal Recommendations',
    step3Desc: 'Receive non-conflicting, high-value scheme combinations.',

    // Eligibility Form Page
    formTitle: 'Student Profile & Eligibility Check',
    formSubtitle: 'Fill in your academic, social, and financial details to discover all Tamil Nadu government schemes you qualify for.',
    stepPersonal: 'Personal Details',
    stepEducation: 'Education Details',
    stepFinancial: 'Financial & Social',
    stepReview: 'Review & Verify',

    // Form Labels
    labelFullName: 'Full Name',
    placeholderFullName: 'Enter your full name as per documents',
    labelAge: 'Age',
    labelGender: 'Gender',
    genderMale: 'Male',
    genderFemale: 'Female',
    genderTransgender: 'Transgender',
    genderPreferNot: 'Prefer not to say',

    labelDistrict: 'District',
    placeholderDistrict: 'Select or type district...',
    labelCollegeName: 'College / Institution Name',
    placeholderCollegeName: 'Type or search your college name...',
    labelCollegeType: 'College / Institution Type',
    collegeTypeGovt: 'Government College',
    collegeTypeAided: 'Government-Aided College',
    collegeTypePrivate: 'Private College',

    labelEducationLevel: 'Education Level',
    eduDiploma: 'Diploma / Polytechnic',
    eduUg: 'Undergraduate (UG)',
    eduPg: 'Postgraduate (PG)',
    eduPhd: 'Ph.D. / Research',
    eduProfessional: 'Professional Course',

    labelCourse: 'Course / Programme',
    labelYearOfStudy: 'Year of Study',
    labelMarks: 'Marks / CGPA Percentage (%)',
    labelIncome: 'Annual Family Income (₹)',
    placeholderIncome: 'e.g. 150000',
    incomeHelpText: 'As stated in Tahsildar Income Certificate',

    labelCommunity: 'Community / Category',
    commSC: 'Scheduled Caste (SC)',
    commST: 'Scheduled Tribe (ST)',
    commMBC: 'Most Backward Class (MBC)',
    commBC: 'Backward Class (BC)',
    commBCM: 'Backward Class Muslim (BCM)',
    commDNC: 'Denotified Community (DNC)',
    commOBC: 'Other Backward Class (OBC)',
    commMinority: 'Minority Community',
    commGeneral: 'General / Open Competition (OC)',

    labelGovtSchool: 'Studied 6th to 12th in Tamil Nadu Government School',
    labelFirstGraduate: 'First Graduate in Family',
    labelDisability: 'Differently Abled (Disability)',
    labelDisabilityPct: 'Disability Percentage (%)',
    labelMinority: 'Belong to Religious / Linguistic Minority',

    // School Background
    labelSchoolBg: 'School Background',
    schoolBgGovt: 'Government School (6th to 12th)',
    schoolBgAided: 'Government-Aided School',
    schoolBgPrivate: 'Private School',

    // Year of Study Options
    year1: '1st Year',
    year2: '2nd Year',
    year3: '3rd Year',
    year4: '4th Year',
    year5: '5th Year',

    // Disability Options
    disabilityNone: 'No Disability',
    disabilityPhysical: 'Physical / Certified Disability',

    // Review Step Strings
    notProvided: 'Not provided',
    editBtn: 'Edit',
    boolYes: 'Yes',
    boolNo: 'No',

    // Results Page
    resultsTitle: 'Eligibility Results & Recommendations',
    resultsSubtitle: 'Evaluated against official Tamil Nadu Government scheme criteria.',
    tabEligible: 'Eligible Schemes',
    tabIneligible: 'Ineligible Schemes',
    totalEligibleCount: 'Eligible Schemes',
    totalIneligibleCount: 'Ineligible Schemes',
    totalEstimatedBenefit: 'Estimated Total Annual Benefit',
    recommendedCombinationTitle: 'Top Recommended Combination',
    recommendedComboSub: 'Compatible scheme combination giving maximum annual support.',
    
    badgeEligible: 'Eligible',
    badgeIneligible: 'Not Eligible',
    badgeRecommended: 'Recommended',
    badgeScore: 'Match Score',

    reasonsHeader: 'Matched Criteria:',
    ineligibleReasonsHeader: 'Ineligibility Reasons:',
    conflictWarningHeader: 'Incompatible Combination Alert',
    conflictWarningText: 'These schemes cannot be claimed simultaneously under Tamil Nadu welfare guidelines.',
    aiExplanationTitle: 'AI Assistance Explanation',

    // Schemes Directory
    directoryTitle: 'Tamil Nadu Government Schemes Directory',
    directorySubtitle: 'Explore all available government scholarships, tuition fee waivers, and student welfare schemes.',
    searchPlaceholder: 'Search scheme by name, department, or keywords...',
    filterCategory: 'Department / Category',
    filterEducation: 'Education Level',
    filterCommunity: 'Community',
    noSchemesFound: 'No schemes match your selected search criteria.',

    // Scheme Details
    detailsBack: 'Back to Schemes Directory',
    detailsOfficialSource: 'Official Portal',
    detailsLastVerified: 'Last Verified',
    detailsDepartment: 'Department',
    detailsBenefit: 'Annual Benefit',
    detailsEligibilityCriteria: 'Eligibility Criteria Checklist',
    detailsRequiredDocs: 'Required Documents',
    detailsAppProcess: 'Application Process',
    detailsConditions: 'Conditions & Notes',
    detailsConflictsWith: 'Incompatible Schemes',

    // Scheme Compare
    compareTitle: 'Compare Government Schemes Side-by-Side',
    compareSubtitle: 'Select two schemes to compare eligibility requirements, benefits, and compatibility.',
    selectScheme1: 'Select First Scheme',
    selectScheme2: 'Select Second Scheme',
    rowDepartment: 'Department',
    rowBenefitAmount: 'Annual Benefit Amount',
    rowCategory: 'Allowed Community / Category',
    rowIncomeLimit: 'Max Income Limit',
    rowEduLevel: 'Allowed Education Level',
    rowConflicts: 'Conflict Rules',

    // Analytics
    analyticsTitle: 'Tamil Nadu Student Scholarship Analytics',
    analyticsSubtitle: 'Statistical distribution and scheme performance metrics.',

    // Footer
    footerAboutTitle: 'About ThaguthiAI',
    footerAboutDesc: 'Tamil Nadu\'s AI-guided scholarship eligibility assistant designed to help students discover and claim all welfare benefits they qualify for.',
    footerQuickLinks: 'Quick Links',
    footerHelplineTitle: 'Government Helplines',
    footerHelpline1: 'TNSCHOLARSHIP Helpline: 1800-425-4567',
    footerHelpline2: 'BC/MBC Welfare Dept: 044-28551462',
    footerHelpline3: 'Adi Dravidar Welfare: 044-28592300',
    footerDisclaimer: 'Disclaimer: ThaguthiAI provides guidance based on public government scheme criteria. Always confirm with official department notifications before applying.',
    footerCopyright: '© 2026 ThaguthiAI. Tamil Nadu Student Welfare Guidance Initiative.'
  },
  ta: {
    // App & Header
    appTitle: 'தகுதிAI',
    appTagline: 'உங்கள் தகுதியை அறிந்து கொள்ளுங்கள்.',
    navHome: 'முகப்பு',
    navCheckEligibility: 'தகுதி சரிபார்ப்பு',
    navDirectory: 'திட்டங்களின் விபரம்',
    navCompare: 'திட்டங்களை ஒப்பிடுக',
    navAnalytics: 'பகுப்பாய்வு',
    btnCheckNow: 'தகுதியை இப்போது சரிபார்',
    btnLanguageEn: 'English',
    btnLanguageTa: 'தமிழ்',

    // Common / UI
    noResultsFound: 'முடிவுகள் எதுவும் கிடைக்கவில்லை',
    loading: 'ஏற்றப்படுகிறது...',
    errorOccurred: 'பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.',
    close: 'மூடு',
    back: 'பின்செல்',
    next: 'அடுத்த படி',
    submit: 'சமர்ப்பி',
    reset: 'மீட்டமை',
    search: 'தேடுக',
    filter: 'வடிகட்டு',
    all: 'அனைத்தும்',
    clearAll: 'அனைத்தையும் நீக்கு',
    viewDetails: 'விவரங்களை காண்க',
    applyNow: 'விண்ணப்பிக்க',

    // Landing Page
    heroBadge: 'தமிழ்நாடு அரசு கல்வி திட்ட வழிகாட்டி',
    heroTitle: 'உங்களுக்கு உரிய அரசு கல்வி உதவித்தொகையை கண்டறியுங்கள்',
    heroSubtitle: 'துல்லியமான கணக்கீட்டு முறையில் உடனடி தகுதி சரிபார்ப்பு. தமிழ்நாடு மாணவர்களுக்கு முற்றிலும் இலவசம் மற்றும் வெளிப்படையானது.',
    heroCtaPrimary: 'தகுதி சரிபார்ப்பை தொடங்கு',
    heroCtaSecondary: 'திட்டங்களை காண்க',
    statStudentsCount: '10,000+',
    statStudentsLabel: 'பயனடைந்த மாணவர்கள்',
    statSchemesCount: '₹50,000+',
    statSchemesLabel: 'அதிகபட்ச ஆண்டு உதவி',
    statAccuracyCount: '100%',
    statAccuracyLabel: 'விதி துல்லியம்',

    featuresTitle: 'ஏன் தகுதிAI பயன்படுத்த வேண்டும்?',
    feature1Title: 'துல்லியமான விதி கணக்கீட்டு முறை',
    feature1Desc: 'அரசு நலத்திட்ட விதிகளுக்கு ஏற்பPython இன்ஜின் மூலம் துல்லியமான தகுதி மதிப்பீடு.',
    feature2Title: 'ஒன்றாக பெறமுடியாத திட்டங்களின் கண்டறிதல்',
    feature2Desc: 'ஒன்றாக பெற முடியாத திட்டங்களை கண்டறிந்து அதிகபட்ச நிதி உதவியை பெற உதவுகிறது.',
    feature3Title: 'AI-வழிகாட்டல் விளக்கம்',
    feature3Desc: 'கடினமான சட்ட விதிகளின்றி எளிய தமிழில் தகுதி நிபந்தனைகளின் விளக்கம்.',

    step1Title: '1. சுயவிவர விவரங்களை உள்ளிடவும்',
    step1Desc: 'கல்வி, சமூகம் மற்றும் வருமான விவரங்களை உள்ளிடவும்.',
    step2Title: '2. துல்லியமான சரிபார்ப்பு',
    step2Desc: 'விதி கணக்கீடு உடனடியாக தகுதியை சரிபார்க்கும்.',
    step3Title: '3. சிறந்த பரிந்துரைகள்',
    step3Desc: 'ஒன்றாக பெறக்கூடிய அதிக பலன் தரும் திட்ட பரிந்துரைகளை பெறுங்கள்.',

    // Eligibility Form Page
    formTitle: 'மாணவர் சுயவிவரம் & தகுதி சரிபார்ப்பு',
    formSubtitle: 'நீங்கள் தகுதிபெறும் அனைத்து தமிழ்நாடு அரசு திட்டங்களையும் கண்டறிய உங்கள் கல்வி, சமூக மற்றும் நிதி விவரங்களை உள்ளிடவும்.',
    stepPersonal: 'தனிப்பட்ட விவரங்கள்',
    stepEducation: 'கல்வி விவரங்கள்',
    stepFinancial: 'நிதி & சமூக விவரங்கள்',
    stepReview: 'சரிபார்த்து சமர்ப்பிக்கவும்',

    // Form Labels
    labelFullName: 'முழு பெயர்',
    placeholderFullName: 'சான்றிதழ்களில் உள்ளவாறு முழு பெயரை உள்ளிடவும்',
    labelAge: 'வயது',
    labelGender: 'பாலினம்',
    genderMale: 'ஆண்',
    genderFemale: 'பெண்',
    genderTransgender: 'திருநங்கை / திருநம்பி',
    genderPreferNot: 'கூற விரும்பவில்லை',

    labelDistrict: 'மாவட்டம்',
    placeholderDistrict: 'மாவட்டம் தேர்ந்தெடுக்கவும் அல்லது தேடவும்...',
    labelCollegeName: 'கல்லூரி / நிறுவனத்தின் பெயர்',
    placeholderCollegeName: 'கல்லூரி பெயரை தட்டச்சு செய்யவும் அல்லது தேடவும்...',
    labelCollegeType: 'கல்லூரி / நிறுவன வகை',
    collegeTypeGovt: 'அரசு கல்லூரி',
    collegeTypeAided: 'அரசு உதவிபெறும் கல்லூரி',
    collegeTypePrivate: 'தனியார் கல்லூரி',

    labelEducationLevel: 'கல்வித் தகுதி',
    eduDiploma: 'டிப்ளமோ / பாலிடெக்னிக்',
    eduUg: 'இளங்கலை (UG)',
    eduPg: 'முதுகலை (PG)',
    eduPhd: 'முனைவர் பட்டம் (Ph.D.)',
    eduProfessional: 'தொழில்முறை படிப்பு (MBBS, BL போன்றவை)',

    labelCourse: 'பாடநெறி / படிப்பு',
    labelYearOfStudy: 'படிக்கும் ஆண்டு',
    labelMarks: 'மதிப்பெண் சதவீதம் (%)',
    labelIncome: 'ஆண்டு குடும்ப வருமானம் (₹)',
    placeholderIncome: 'எ.கா. 150000',
    incomeHelpText: 'தாசில்தார் வழங்கிய வருமான சான்றிதழின்படி',

    labelCommunity: 'சமூகம் / பிரிவு',
    commSC: 'ஆதிதிராவிடர் (SC)',
    commST: 'பழங்குடியினர் (ST)',
    commMBC: 'மிகவும் பிற்படுத்தப்பட்டோர் (MBC)',
    commBC: 'பிற்படுத்தப்பட்டோர் (BC)',
    commBCM: 'பிற்படுத்தப்பட்டோர் முஸ்லிம் (BCM)',
    commDNC: 'சீர்மரபினர் (DNC)',
    commOBC: 'இதர பிற்படுத்தப்பட்டோர் (OBC)',
    commMinority: 'சிறுபான்மையினர்',
    commGeneral: 'பொதுப்பிரிவு (OC)',

    labelGovtSchool: 'தமிழ்நாடு அரசுப் பள்ளியில் 6 முதல் 12 ஆம் வகுப்பு வரை படித்தவர்',
    labelFirstGraduate: 'குடும்பத்தின் முதல் பட்டதாரி',
    labelDisability: 'மாற்றுத்திறனாளி',
    labelDisabilityPct: 'மாற்றுத்திறன் சதவீதம் (%)',
    labelMinority: 'மத / மொழி சிறுபான்மையினர் பிரிவு',

    // School Background
    labelSchoolBg: 'பள்ளிப் பின்னணி',
    schoolBgGovt: 'அரசுப் பள்ளி (6 முதல் 12 ஆம் வகுப்பு)',
    schoolBgAided: 'அரசு உதவிபெறும் பள்ளி',
    schoolBgPrivate: 'தனியார் பள்ளி',

    // Year of Study Options
    year1: '1-ஆம் ஆண்டு',
    year2: '2-ஆம் ஆண்டு',
    year3: '3-ஆம் ஆண்டு',
    year4: '4-ஆம் ஆண்டு',
    year5: '5-ஆம் ஆண்டு',

    // Disability Options
    disabilityNone: 'மாற்றுத்திறன் இல்லை',
    disabilityPhysical: 'உடல் / சான்றளிக்கப்பட்ட மாற்றுத்திறன்',

    // Review Step Strings
    notProvided: 'வழங்கப்படவில்லை',
    editBtn: 'திருத்து',
    boolYes: 'ஆம்',
    boolNo: 'இல்லை',

    // Results Page
    resultsTitle: 'தகுதி மதிப்பீடு & பரிந்துரைகள்',
    resultsSubtitle: 'தமிழ்நாடு அரசின் அதிகாரப்பூர்வ திட்ட அளவுகோல்களின்படி மதிப்பீடு செய்யப்பட்டது.',
    tabEligible: 'தகுதியான திட்டங்கள்',
    tabIneligible: 'தகுதியற்ற திட்டங்கள்',
    totalEligibleCount: 'தகுதியான திட்டங்கள்',
    totalIneligibleCount: 'தகுதியற்ற திட்டங்கள்',
    totalEstimatedBenefit: 'மதிப்பிடப்பட்ட ஆண்டு நிதி பலன்',
    recommendedCombinationTitle: 'சிறந்த பரிந்துரைக்கப்பட்ட கூட்டுத் திட்டம்',
    recommendedComboSub: 'ஒன்றாகப் பெறக்கூடிய அதிகபட்ச நிதி உதவி தரும் திட்டங்கள்.',

    badgeEligible: 'தகுதியானது',
    badgeIneligible: 'தகுதியற்றது',
    badgeRecommended: 'பரிந்துரைக்கப்பட்டது',
    badgeScore: 'பொருந்தும் அளவு',

    reasonsHeader: 'நிறைவேற்றப்பட்ட நிபந்தனைகள்:',
    ineligibleReasonsHeader: 'தகுதியின்மைக்கான காரணங்கள்:',
    conflictWarningHeader: 'ஒன்றாகப் பெற முடியாத திட்டங்கள் எச்சரிக்கை',
    conflictWarningText: 'தமிழ்நாடு அரசு விதிகளின்படி இத்திட்டங்களை ஒரே நேரத்தில் பெற முடியாது.',
    aiExplanationTitle: 'AI உதவி விளக்கம்',

    // Schemes Directory
    directoryTitle: 'தமிழ்நாடு அரசு திட்டங்கள் விபரம்',
    directorySubtitle: 'அனைத்து அரசு கல்வி உதவித்தொகைகள் மற்றும் நலத்திட்டங்களை கண்டறியுங்கள்.',
    searchPlaceholder: 'திட்டத்தின் பெயர் அல்லது துறையைத் தேடுக...',
    filterCategory: 'துறை / பிரிவு',
    filterEducation: 'கல்வித் தகுதி',
    filterCommunity: 'சமூகம்',
    noSchemesFound: 'நீங்கள் தேடிய நிபந்தனைகளுக்கு எந்த திட்டமும் கிடைக்கவில்லை.',

    // Scheme Details
    detailsBack: 'திட்டங்கள் பட்டியலுக்கு திரும்பு',
    detailsOfficialSource: 'அதிகாரப்பூர்வ இணையதளம்',
    detailsLastVerified: 'கடைசியாக சரிபார்க்கப்பட்ட நாள்',
    detailsDepartment: 'துறை',
    detailsBenefit: 'ஆண்டு பலன்',
    detailsEligibilityCriteria: 'தகுதி அளவுகோல்கள்',
    detailsRequiredDocs: 'தேவையான ஆவணங்கள்',
    detailsAppProcess: 'விண்ணப்பிக்கும் முறை',
    detailsConditions: 'நிபந்தனைகள் & குறிப்புகள்',
    detailsConflictsWith: 'ஒன்றாகப் பெற முடியாத திட்டங்கள்',

    // Scheme Compare
    compareTitle: 'அரசு திட்டங்களை ஒப்பீடு செய்க',
    compareSubtitle: 'இரண்டு திட்டங்களின் தகுதிகள், பலன்கள் மற்றும் பொருந்தக்கூடிய தன்மையை ஒப்பிடுங்கள்.',
    selectScheme1: 'முதல் திட்டத்தை தேர்ந்தெடுக்கவும்',
    selectScheme2: 'இரண்டாம் திட்டத்தை தேர்ந்தெடுக்கவும்',
    rowDepartment: 'துறை',
    rowBenefitAmount: 'ஆண்டு உதவித்தொகை தொகை',
    rowCategory: 'தகுதியான சமூகம் / பிரிவு',
    rowIncomeLimit: 'அதிகபட்ச வருமான வரம்பு',
    rowEduLevel: 'தகுதியான கல்வித் தகுதி',
    rowConflicts: 'முரண்பாட்டு விதிகள்',

    // Analytics
    analyticsTitle: 'தமிழ்நாடு மாணவர் உதவித்தொகை பகுப்பாய்வு',
    analyticsSubtitle: 'புள்ளிவிவர பரவல் மற்றும் திட்டங்களின் செயல்திறன் அளவீடுகள்.',

    // Footer
    footerAboutTitle: 'தகுதிAI பற்றி',
    footerAboutDesc: 'தமிழ்நாடு மாணவர்கள் தங்களுக்கு உரிய அனைத்து அரசு நலத்திட்ட உதவிகளையும் கண்டறிய உதவும் AI வழிகாட்டி.',
    footerQuickLinks: 'விரைவு இணைப்புகள்',
    footerHelplineTitle: 'அரசு உதவி எண்கள்',
    footerHelpline1: 'கல்வி உதவித்தொகை உதவி எண்: 1800-425-4567',
    footerHelpline2: 'பிற்படுத்தப்பட்டோர் நலத்துறை: 044-28551462',
    footerHelpline3: 'ஆதிதிராவிடர் நலத்துறை: 044-28592300',
    footerDisclaimer: 'மறுப்புரை: தகுதிAI பொதுத்துறை தகவல்களின் அடிப்படையில் வழிகாட்டுகிறது. விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ அரசு அறிவிப்புகளை சரிபார்க்கவும்.',
    footerCopyright: '© 2026 தகுதிAI. தமிழ்நாடு மாணவர் நல வழிகாட்டுதல் முயற்சி.'
  }
};

export type TranslationKey = keyof typeof translations.en;
