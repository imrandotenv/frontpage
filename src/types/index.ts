export type TemplateId = 'classic' | 'modern' | 'lab' | 'executive';

export interface CustomField {
  id: string;
  label: string;
  value: string;
  enabled: boolean;
}

export interface StudentFormData {
  templateId: TemplateId;
  studentName: string;
  universityRollNo: string;
  course: string;
  stream: string;
  semester: string;
  year: string;
  paperName: string;
  paperCode: string;
  session: string;
  submittedTo?: string;
  topic?: string;
  registrationNo?: string;
  submissionDate?: string;
  customFields: CustomField[];
  autoUppercase: boolean;
  fontFamily: 'chakra' | 'rajdhani' | 'sans';
  fontSize: 'compact' | 'normal' | 'relaxed';
}

export interface TemplateOption {
  id: TemplateId;
  name: string;
  description: string;
  badge: string;
  icon: string;
}

export const TEMPLATES: TemplateOption[] = [
  {
    id: 'classic',
    name: 'Classic Campus',
    description: 'Academic letterhead with campus building photo & athletic block typography',
    badge: 'Standard',
    icon: '🏛️',
  },
  {
    id: 'modern',
    name: 'Modern Academic',
    description: 'Clean minimalist layout with high-res golden crest, elegant dividers & report badges',
    badge: 'Popular',
    icon: '✨',
  },
  {
    id: 'lab',
    name: 'Lab & Practical Report',
    description: 'Engineering format with framed border & teacher signature/grade boxes',
    badge: 'Engineering',
    icon: '🔬',
  },
  {
    id: 'executive',
    name: 'Executive Navy Project',
    description: 'Deep navy & gold design for major/minor projects, seminar reports & term papers',
    badge: 'Formal',
    icon: '🎓',
  },
];

export const DEFAULT_FORM_DATA: StudentFormData = {
  templateId: 'classic',
  studentName: 'MD IMRAN AHMAD',
  universityRollNo: 'XXXXXXXXXXX',
  course: 'B.TECH',
  stream: 'COMPUTER SCIENCE AND ENGINEERING (CSE)',
  semester: '3RD SEMESTER',
  year: '2ND YEAR',
  paperName: 'DATA STRUCTURES AND ALGORITHMS (DSA)',
  paperCode: 'PCC CS 301',
  session: '2025-2026',
  submittedTo: 'DEPARTMENT FACULTY',
  topic: 'ASSIGNMENT / LAB WORK',
  registrationNo: '',
  submissionDate: '',
  customFields: [
    {
      id: 'reg-no',
      label: 'REGISTRATION NO.',
      value: '',
      enabled: false,
    },
    {
      id: 'topic',
      label: 'TOPIC / ASSIGNMENT',
      value: '',
      enabled: false,
    },
    {
      id: 'submitted-to',
      label: 'SUBMITTED TO',
      value: '',
      enabled: false,
    },
    {
      id: 'date',
      label: 'SUBMISSION DATE',
      value: '',
      enabled: false,
    },
  ],
  autoUppercase: true,
  fontFamily: 'chakra',
  fontSize: 'normal',
};

export interface DepartmentPreset {
  name: string;
  course: string;
  stream: string;
  semester: string;
  year: string;
  paperName: string;
  paperCode: string;
  session: string;
}

export const PRESETS: DepartmentPreset[] = [
  {
    name: 'CSE - DSA (3rd Sem)',
    course: 'B.TECH',
    stream: 'COMPUTER SCIENCE AND ENGINEERING (CSE)',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'DATA STRUCTURES AND ALGORITHMS (DSA)',
    paperCode: 'PCC CS 301',
    session: '2025-2026',
  },
  {
    name: 'CSE - OS (4th Sem)',
    course: 'B.TECH',
    stream: 'COMPUTER SCIENCE AND ENGINEERING (CSE)',
    semester: '4TH SEMESTER',
    year: '2ND YEAR',
    paperName: 'OPERATING SYSTEMS (OS)',
    paperCode: 'PCC CS 402',
    session: '2025-2026',
  },
  {
    name: 'CSE - DBMS (5th Sem)',
    course: 'B.TECH',
    stream: 'COMPUTER SCIENCE AND ENGINEERING (CSE)',
    semester: '5TH SEMESTER',
    year: '3RD YEAR',
    paperName: 'DATABASE MANAGEMENT SYSTEMS (DBMS)',
    paperCode: 'PCC CS 501',
    session: '2025-2026',
  },
  {
    name: 'CSE - AI & ML (6th Sem)',
    course: 'B.TECH',
    stream: 'COMPUTER SCIENCE AND ENGINEERING (CSE)',
    semester: '6TH SEMESTER',
    year: '3RD YEAR',
    paperName: 'ARTIFICIAL INTELLIGENCE & MACHINE LEARNING',
    paperCode: 'PEC CS 601',
    session: '2025-2026',
  },
  {
    name: 'ME - Thermodynamics',
    course: 'B.TECH',
    stream: 'MECHANICAL ENGINEERING (ME)',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'ENGINEERING THERMODYNAMICS',
    paperCode: 'PC ME 301',
    session: '2025-2026',
  },
  {
    name: 'EE - Electric Circuits',
    course: 'B.TECH',
    stream: 'ELECTRICAL ENGINEERING (EE)',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'ELECTRIC CIRCUIT THEORY',
    paperCode: 'PC EE 301',
    session: '2025-2026',
  },
  {
    name: 'ECE - Digital Systems',
    course: 'B.TECH',
    stream: 'ELECTRONICS & COMMUNICATION ENGINEERING (ECE)',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'DIGITAL SYSTEM DESIGN',
    paperCode: 'PC EC 301',
    session: '2025-2026',
  },
  {
    name: 'Civil - Solid Mechanics',
    course: 'B.TECH',
    stream: 'CIVIL ENGINEERING (CE)',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'SOLID MECHANICS',
    paperCode: 'PC CE 301',
    session: '2025-2026',
  },
  {
    name: 'B.Pharm - Pharmaceutics',
    course: 'B.PHARM',
    stream: 'PHARMACEUTICAL SCIENCES',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'PHARMACEUTICS - I',
    paperCode: 'BP 301T',
    session: '2025-2026',
  },
];
