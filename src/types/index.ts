export type TemplateId =
  | 'classic'
  | 'modern'
  | 'lab'
  | 'minimal'
  | 'technical'
  | 'executive';

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
  fontFamily: 'chakra' | 'rajdhani' | 'sans' | 'mono' | 'serif';
  fontSize: 'compact' | 'normal' | 'relaxed';
  signatures?: 'show' | 'minimal';
  collegeName?: string;
  affiliation?: string;
  customCampusImage?: string;
}

export interface TemplateOption {
  id: TemplateId;
  name: string;
  description: string;
  badge: string;
}

export const TEMPLATES: TemplateOption[] = [
  {
    id: 'classic',
    name: 'Classic Campus',
    description: 'Letterhead with campus photo and watermark',
    badge: 'Official',
  },
  {
    id: 'modern',
    name: 'Modern Academic',
    description: 'Clean typographic layout with tabular grid',
    badge: 'Modern',
  },
  {
    id: 'lab',
    name: 'Lab & Practical Report',
    description: 'Lab submission with marks & signatures rubric',
    badge: 'Lab',
  },
  {
    id: 'minimal',
    name: 'Formal Seal',
    description: 'Centered formal insignia with double border',
    badge: 'Formal',
  },
  {
    id: 'technical',
    name: 'Technical Grid',
    description: 'Engineering technical matrix layout',
    badge: 'Technical',
  },
  {
    id: 'executive',
    name: 'Project Report',
    description: 'Project and seminar cover layout',
    badge: 'Project',
  },
];

export const DEFAULT_FORM_DATA: StudentFormData = {
  templateId: 'classic',
  studentName: '',
  universityRollNo: '',
  course: 'B.TECH',
  stream: 'COMPUTER SCIENCE & ENGINEERING',
  semester: '3RD SEMESTER',
  year: '2ND YEAR',
  paperName: '',
  paperCode: '',
  session: '2025-2026',
  submittedTo: '',
  topic: '',
  registrationNo: '',
  submissionDate: '',
  customFields: [],
  autoUppercase: true,
  fontFamily: 'chakra',
  fontSize: 'normal',
  signatures: 'show',
  collegeName: "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS",
  affiliation: "(FORMERLY KNOWN AS INSTITUTE OF ENGINEERING & INDUSTRIAL TECHNOLOGY) • AFFILIATED TO M.A.K.A.U.T",
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
    name: 'Computer Science (1st Sem)',
    course: 'B.TECH',
    stream: 'COMPUTER SCIENCE & ENGINEERING',
    semester: '1ST SEMESTER',
    year: '1ST YEAR',
    paperName: 'PROGRAMMING FOR PROBLEM SOLVING',
    paperCode: 'ES-CS 101',
    session: '2025-2026',
  },
  {
    name: 'Computer Science (3rd Sem)',
    course: 'B.TECH',
    stream: 'COMPUTER SCIENCE & ENGINEERING',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'OBJECT ORIENTED PROGRAMMING',
    paperCode: 'PCC-CS 302',
    session: '2025-2026',
  },
  {
    name: 'Information Technology (4th Sem)',
    course: 'B.TECH',
    stream: 'INFORMATION TECHNOLOGY',
    semester: '4TH SEMESTER',
    year: '2ND YEAR',
    paperName: 'OPERATING SYSTEMS',
    paperCode: 'PCC-IT 401',
    session: '2025-2026',
  },
  {
    name: 'Mechanical Engineering (3rd Sem)',
    course: 'B.TECH',
    stream: 'MECHANICAL ENGINEERING',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'ENGINEERING THERMODYNAMICS',
    paperCode: 'PC-ME 301',
    session: '2025-2026',
  },
  {
    name: 'Electrical Engineering (3rd Sem)',
    course: 'B.TECH',
    stream: 'ELECTRICAL ENGINEERING',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'ELECTRIC CIRCUIT THEORY',
    paperCode: 'PC-EE 301',
    session: '2025-2026',
  },
  {
    name: 'Electronics & Comm. (3rd Sem)',
    course: 'B.TECH',
    stream: 'ELECTRONICS & COMMUNICATION',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'DIGITAL SYSTEM DESIGN',
    paperCode: 'PC-EC 301',
    session: '2025-2026',
  },
  {
    name: 'Civil Engineering (3rd Sem)',
    course: 'B.TECH',
    stream: 'CIVIL ENGINEERING',
    semester: '3RD SEMESTER',
    year: '2ND YEAR',
    paperName: 'SOLID MECHANICS',
    paperCode: 'PC-CE 301',
    session: '2025-2026',
  },
  {
    name: 'Pharmacy (1st Sem)',
    course: 'B.PHARM',
    stream: 'PHARMACEUTICAL SCIENCES',
    semester: '1ST SEMESTER',
    year: '1ST YEAR',
    paperName: 'PHARMACEUTICS - I',
    paperCode: 'BP 101T',
    session: '2025-2026',
  },
];
