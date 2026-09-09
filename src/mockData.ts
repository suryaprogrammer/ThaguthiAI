export interface Scheme {
  id: string;
  name: string;
  department: string;
  category: string;
  description: string;
  benefit: string;
  benefitAmount: number;
  matchPercent: number;
  eligibilityStatus: 'eligible' | 'partial' | 'ineligible';
  criteria: { label: string; met: boolean }[];
  documents: string[];
  applicationProcess: string[];
  conditions: string[];
  officialSource: string;
  lastVerified: string;
  conflictsWith?: string[];
  incompatibleNote?: string;
}

export const mockSchemes: Scheme[] = [
  {
    id: 'sc001',
    name: 'Post-Matric Scholarship for SC/ST Students',
    department: 'Dept. of Adi Dravidar Welfare',
    category: 'Scholarship',
    description:
      'Provides financial assistance to Scheduled Caste and Scheduled Tribe students pursuing post-matric education in recognized institutions.',
    benefit: '₹12,000 / year',
    benefitAmount: 12000,
    matchPercent: 92,
    eligibilityStatus: 'eligible',
    criteria: [
      { label: 'Community: SC/ST', met: true },
      { label: 'Annual Family Income below ₹2.5 Lakhs', met: true },
      { label: 'Enrolled in recognized institution', met: true },
      { label: 'Studying post-matric course', met: true },
    ],
    documents: [
      'Community Certificate',
      'Income Certificate',
      'College Admission Letter',
      'Bank Account Details',
      'Academic Certificates (last qualifying exam)',
    ],
    applicationProcess: [
      'Obtain community certificate from Tahsildar',
      'Apply through the Tamil Nadu scholarship portal',
      'Submit application with supporting documents',
      'Verification by institution',
      'Approval and disbursement',
    ],
    conditions: [
      'Cannot be combined with other state government scholarships',
      'Renewal required each academic year',
      'Minimum 60% attendance required',
    ],
    officialSource: 'www.tnscholars.nic.in',
    lastVerified: 'June 2025',
    conflictsWith: ['sc003'],
    incompatibleNote:
      'Cannot be combined with the Higher Education Support Scheme as both cover tuition fee assistance.',
  },
  {
    id: 'sc002',
    name: "Chief Minister's Special Scholarship",
    department: 'Higher Education Dept., Govt. of Tamil Nadu',
    category: 'Merit Scholarship',
    description:
      'Merit-based scholarship for students from economically weaker sections who have secured high marks in qualifying examinations.',
    benefit: '₹18,000 / year',
    benefitAmount: 18000,
    matchPercent: 87,
    eligibilityStatus: 'eligible',
    criteria: [
      { label: 'Annual Family Income below ₹3 Lakhs', met: true },
      { label: 'Minimum 80% in qualifying exam', met: true },
      { label: 'Government or Government-aided institution', met: true },
      { label: 'First graduate in family', met: true },
    ],
    documents: [
      'Income Certificate',
      'Mark Sheets (HSC)',
      'College ID Card',
      'Bank Account Details',
      'First Graduate Declaration',
    ],
    applicationProcess: [
      'Apply online through the Higher Education Department portal',
      'Upload required documents',
      'Verification by institution principal',
      'District-level verification',
      'Award and disbursement',
    ],
    conditions: [
      'Scholarship is merit-based; renewal depends on academic performance',
      'Minimum CGPA of 7.0 required for renewal',
    ],
    officialSource: 'www.tnahec.org',
    lastVerified: 'May 2025',
  },
  {
    id: 'sc003',
    name: 'Higher Education Support Scheme',
    department: 'Social Welfare & Women Empowerment Dept.',
    category: 'Welfare Scheme',
    description:
      'Provides tuition fee waiver and maintenance allowance for students from backward communities pursuing higher education.',
    benefit: '₹10,000 / year',
    benefitAmount: 10000,
    matchPercent: 81,
    eligibilityStatus: 'eligible',
    criteria: [
      { label: 'BC/MBC Community', met: true },
      { label: 'Annual Family Income below ₹2 Lakhs', met: true },
      { label: 'Enrolled in UG or PG course', met: true },
      { label: 'Government institution', met: false },
    ],
    documents: [
      'Community Certificate',
      'Income Certificate',
      'Bonafide Certificate',
      'Bank Account Details',
    ],
    applicationProcess: [
      'Apply through district social welfare office',
      'Submit application and documents',
      'Field verification',
      'Sanction by district authority',
    ],
    conditions: [
      'Not combinable with Post-Matric Scholarship (SC/ST)',
      'Annual renewal required',
    ],
    officialSource: 'www.tnsocialwelfare.tn.gov.in',
    lastVerified: 'April 2025',
    conflictsWith: ['sc001'],
    incompatibleNote:
      'This scheme and the Post-Matric Scholarship for SC/ST Students both cover tuition assistance and cannot be drawn simultaneously.',
  },
  {
    id: 'sc004',
    name: 'Student Welfare Scheme – Hosteller Allowance',
    department: 'Adi Dravidar Welfare Dept.',
    category: 'Welfare',
    description:
      'Provides hostel maintenance allowance to outstation students living in government-recognized hostels.',
    benefit: '₹6,000 / year',
    benefitAmount: 6000,
    matchPercent: 74,
    eligibilityStatus: 'eligible',
    criteria: [
      { label: 'Student from SC/ST community', met: true },
      { label: 'Residing in government hostel', met: false },
      { label: 'Enrolled in recognized course', met: true },
      { label: 'Annual Family Income below ₹2.5 Lakhs', met: true },
    ],
    documents: [
      'Community Certificate',
      'Hostel Admission Proof',
      'Income Certificate',
      'College Bonafide Certificate',
    ],
    applicationProcess: [
      'Apply through hostel warden',
      'Submit application to district ADW office',
      'Verification and approval',
    ],
    conditions: [
      'Only applicable for students residing in approved government hostels',
    ],
    officialSource: 'www.adidravidarwelfare.tn.gov.in',
    lastVerified: 'March 2025',
  },
  {
    id: 'sc005',
    name: 'Tamil Nadu Minorities Scholarship',
    department: 'Dept. of Minorities Welfare',
    category: 'Minority Scholarship',
    description:
      'Financial assistance for students belonging to minority communities to support their higher education.',
    benefit: '₹9,000 / year',
    benefitAmount: 9000,
    matchPercent: 68,
    eligibilityStatus: 'partial',
    criteria: [
      { label: 'Belongs to recognized minority community', met: false },
      { label: 'Annual Family Income below ₹2 Lakhs', met: true },
      { label: 'Enrolled in recognized institution', met: true },
      { label: 'Minimum 50% marks in qualifying exam', met: true },
    ],
    documents: [
      'Religion/Minority Certificate',
      'Income Certificate',
      'Mark Sheets',
      'College Bonafide Certificate',
      'Bank Account Details',
    ],
    applicationProcess: [
      'Apply through Minorities Welfare Department portal',
      'Submit documents to district office',
      'Approval and disbursement',
    ],
    conditions: [
      'Cannot be combined with NEC scholarship',
    ],
    officialSource: 'www.minorities.tn.gov.in',
    lastVerified: 'February 2025',
  },
  {
    id: 'sc006',
    name: 'National Merit Scholarship (State Level)',
    department: 'School Education Dept. / Central',
    category: 'Merit Scholarship',
    description:
      'National-level merit scholarship for students who qualify in the National Means-cum-Merit Scholarship examination.',
    benefit: '₹12,000 / year',
    benefitAmount: 12000,
    matchPercent: 79,
    eligibilityStatus: 'eligible',
    criteria: [
      { label: 'NMMSS qualified student', met: true },
      { label: 'Annual Family Income below ₹1.5 Lakhs', met: true },
      { label: 'Government or Government-aided school background', met: true },
      { label: 'Minimum 55% in Class 8', met: true },
    ],
    documents: [
      'NMMSS Award Letter',
      'Income Certificate',
      'Class 8 Mark Sheet',
      'Bonafide Certificate',
      'Bank Account Details',
    ],
    applicationProcess: [
      'Apply through school education portal',
      'Upload documents',
      'State level verification',
      'Central disbursement',
    ],
    conditions: [
      'Renewable up to Class 12 with satisfactory academic performance',
    ],
    officialSource: 'www.scholarships.gov.in',
    lastVerified: 'January 2025',
  },
  {
    id: 'sc007',
    name: 'Dr. Ambedkar Post-Matric Scholarship',
    department: 'Ministry of Social Justice & Empowerment',
    category: 'Central Scholarship',
    description:
      'Central government scholarship for OBC students pursuing post-matric education to improve their educational prospects.',
    benefit: '₹8,500 / year',
    benefitAmount: 8500,
    matchPercent: 71,
    eligibilityStatus: 'eligible',
    criteria: [
      { label: 'OBC Community', met: true },
      { label: 'Annual Family Income below ₹1 Lakh', met: true },
      { label: 'Post-matric course enrollment', met: true },
      { label: 'Not employed', met: true },
    ],
    documents: [
      'OBC Certificate',
      'Income Certificate',
      'Admission Letter',
      'Marksheets',
      'Bank Account Details',
    ],
    applicationProcess: [
      'Apply on National Scholarship Portal',
      'Institute verification',
      'State channeling agency approval',
      'Disbursement via DBT',
    ],
    conditions: [
      'Annual renewal required with attendance record',
    ],
    officialSource: 'www.scholarships.gov.in',
    lastVerified: 'December 2024',
  },
];

export const mockConflicts = [
  {
    scheme1: mockSchemes[0],
    scheme2: mockSchemes[2],
    note: 'You may qualify for both schemes individually, but they cannot be drawn simultaneously as both cover tuition fee assistance under Tamil Nadu state rules.',
  },
];

export const mockSummary = {
  eligible: 7,
  potentialBenefit: 56500,
  conflicts: 2,
  bestMatchPercent: 92,
  bestScheme: mockSchemes[0],
};

export const districts = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul',
  'Thanjavur', 'Ranipet', 'Sivaganga', 'Virudhunagar', 'Namakkal',
  'Kanyakumari', 'Dharmapuri', 'Tiruvannamalai', 'Krishnagiri', 'Nagapattinam',
  'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Theni', 'Nilgiris',
  'Cuddalore', 'Villupuram', 'Tiruvallur', 'Ariyalur', 'Chengalpattu',
  'Kallakurichi', 'Tenkasi', 'Tirupattur', 'Tiruppur', 'Mayiladuthurai',
];

export const courses = [
  'B.E. / B.Tech', 'B.Sc', 'B.Com', 'B.A.', 'B.B.A.', 'B.C.A.',
  'M.E. / M.Tech', 'M.Sc', 'M.Com', 'M.A.', 'MBA', 'MCA',
  'MBBS', 'BDS', 'B.Pharm', 'M.Pharm', 'B.Nursing', 'M.Nursing',
  'B.Ed', 'Diploma', 'ITI', 'Polytechnic', 'B.L. / LLB', 'Other',
];
