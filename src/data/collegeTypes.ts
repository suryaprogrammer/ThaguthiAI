export interface College {
  id: string;
  name: string;
  district: string;
  city: string;
  type: 'Engineering' | 'Arts & Science' | 'Medical' | 'Dental' | 'Nursing' | 'Pharmacy' | 'Law' | 'Agriculture' | 'Architecture' | 'Polytechnic' | 'Education' | 'Management' | 'Veterinary' | 'University';
  institutionType: 'Government' | 'Government-Aided' | 'Private' | 'Deemed University' | 'Central Government';
  university: string;
  tneaCode: string | null;
  autonomous: boolean;
}
