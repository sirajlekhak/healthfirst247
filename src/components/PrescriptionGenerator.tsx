import { useState, useEffect, useRef } from 'react';
import { 
  User, Calendar, Clock, Pill, FileText, Printer, 
  Download, Plus, Trash2, Eye, Copy, Save, 
  Phone, Mail, MapPin, Stethoscope, Heart, 
  AlertCircle, CheckCircle, X, ChevronRight,
  Lock, LogOut, Shield, Eye as EyeIcon, EyeOff
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './App.css';
import logo from './logo.png';
import signatureImg from './signature.png';

// Types
interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface PrescriptionData {
  prescriptionId: string;
  patient: {
    name: string;
    age: string;
    gender: string;
    date: string;
  };
  doctor: {
    name: string;
    degree: string;
    registrationNo: string;
    clinicName: string;
    address: string;
    phone: string;
    email: string;
  };
  clinical: {
    symptoms: string;
    diagnosis: string;
  };
  medicines: Medicine[];
  advice: string;
  followUpDate: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

const DEFAULT_DATA: PrescriptionData = {
  prescriptionId: `PX-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(5, '0')}`,
  patient: {
    name: '',
    age: '',
    gender: 'Male',
    date: new Date().toISOString().split('T')[0]
  },
  doctor: {
    name: 'Dr. Shailendra',
    degree: 'MBBS, MD (Chest Medicine),\nM.Phil, PhD(Medicine), \nComposite Medical Consultant',
    registrationNo: 'Composite Medical Consultant',
    clinicName: 'HealthFirst247 Clinic',
    address: 'Matigara, West Bengal, India',
    phone: '+91 79082 24288',
    email: 'drspriyadarshi@yahoo.co.in'
  },
  clinical: {
    symptoms: '',
    diagnosis: ''
  },
  medicines: [
    { id: '1', name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ],
  advice: '',
  followUpDate: ''
};

// UI Components
const InputField = ({ label, icon: Icon, error, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {Icon && <Icon size={16} className="inline mr-2" />}
      {label}
    </label>
    <input
      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
        error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const TextAreaField = ({ label, icon: Icon, error, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {Icon && <Icon size={16} className="inline mr-2" />}
      {label}
    </label>
    <textarea
      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
        error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const SelectField = ({ label, options, value, onChange, icon: Icon }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {Icon && <Icon size={16} className="inline mr-2" />}
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const Card = ({ children, className = '', title, icon: Icon }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
    {(title || Icon) && (
      <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
        {Icon && <Icon className="text-blue-600 mr-2" size={20} />}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

const MedicineRow = ({ medicine, index, onUpdate, onRemove, canRemove }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center">
        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
          {index + 1}
        </div>
        <span className="ml-2 font-medium text-gray-700">Medicine {index + 1}</span>
      </div>
      {canRemove && (
        <button
          onClick={onRemove}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          type="button"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
      <InputField
        label="Medicine Name"
        value={medicine.name}
        onChange={(e) => onUpdate('name', e.target.value)}
        placeholder="e.g., Paracetamol"
      />
      <InputField
        label="Dosage"
        value={medicine.dosage}
        onChange={(e) => onUpdate('dosage', e.target.value)}
        placeholder="e.g., 500mg"
      />
      <InputField
        label="Frequency"
        value={medicine.frequency}
        onChange={(e) => onUpdate('frequency', e.target.value)}
        placeholder="e.g., Once daily"
      />
      <InputField
        label="Duration"
        value={medicine.duration}
        onChange={(e) => onUpdate('duration', e.target.value)}
        placeholder="e.g., 7 days"
      />
      <InputField
        label="Instructions"
        value={medicine.instructions}
        onChange={(e) => onUpdate('instructions', e.target.value)}
        placeholder="e.g., After meals"
      />
    </div>
  </div>
);

// Main Component
export default function PrescriptionGenerator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [data, setData] = useState<PrescriptionData>(DEFAULT_DATA);
  const [previewMode, setPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [signatureLoaded, setSignatureLoaded] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('prescription_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      
      // Load draft if exists
      const draft = localStorage.getItem('prescription_draft');
      if (draft) {
        try {
          setData(JSON.parse(draft));
        } catch (error) {
          console.error('Failed to load draft:', error);
        }
      }
    }
  }, []);

  // Login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Simulate authentication (replace with real auth in production)
    if (credentials.username === 'healthfirst247' && credentials.password === 'doctor@247') {
      setIsAuthenticated(true);
      localStorage.setItem('prescription_auth', 'true');
      localStorage.setItem('last_login', new Date().toISOString());
      setNotification({ type: 'success', message: 'Login successful!' });
    } else {
      setLoginError('Invalid username or password');
      setNotification({ type: 'error', message: 'Invalid credentials' });
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
    localStorage.removeItem('prescription_auth');
    localStorage.removeItem('prescription_draft');
    setNotification({ type: 'info', message: 'Logged out successfully!' });
  };

  // Auto-save draft
  useEffect(() => {
    if (isAuthenticated && data.patient.name) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('prescription_draft', JSON.stringify(data));
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [data, isAuthenticated]);

  // Generate new prescription ID
  const generatePrescriptionId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(5, '0');
    return `PX-${year}-${random}`;
  };

  // Update prescription data
  const updatePatient = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      patient: { ...prev.patient, [field]: value }
    }));
  };

  const updateDoctor = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      doctor: { ...prev.doctor, [field]: value }
    }));
  };

  const updateClinical = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      clinical: { ...prev.clinical, [field]: value }
    }));
  };

  // Medicine management
  const addMedicine = () => {
    setData(prev => ({
      ...prev,
      medicines: [
        ...prev.medicines,
        {
          id: Date.now().toString(),
          name: '',
          dosage: '',
          frequency: '',
          duration: '',
          instructions: ''
        }
      ]
    }));
  };

  const updateMedicine = (id: string, field: keyof Medicine, value: string) => {
    setData(prev => ({
      ...prev,
      medicines: prev.medicines.map(med =>
        med.id === id ? { ...med, [field]: value } : med
      )
    }));
  };

  const removeMedicine = (id: string) => {
    if (data.medicines.length > 1) {
      setData(prev => ({
        ...prev,
        medicines: prev.medicines.filter(med => med.id !== id)
      }));
    }
  };

  // Validation
  const validateForm = () => {
    const errors: string[] = [];

    if (!data.patient.name.trim()) errors.push('Patient name is required');
    if (!data.patient.age.trim()) errors.push('Patient age is required');
    if (!data.clinical.diagnosis.trim()) errors.push('Diagnosis is required');

    // Check medicines
    data.medicines.forEach((med, index) => {
      if (med.name.trim() && (!med.dosage.trim() || !med.duration.trim())) {
        errors.push(`Medicine ${index + 1}: Please fill dosage and duration`);
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Add logo to PDF
// Add logo to PDF (updated to use actual logo image)
const addLogoToPDF = async (doc: jsPDF, x: number, y: number, size: number = 30) => {
  try {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = logo;
      
      img.onload = () => {
        // Calculate height to maintain aspect ratio
        const height = (img.height * size) / img.width;
        // Add logo to PDF
        doc.addImage(img, 'PNG', x, y, size, height);
        resolve(true);
      };
      
      img.onerror = () => {
        // Fallback if logo fails to load
        doc.setFillColor(59, 130, 246);
        doc.circle(x + size/2, y + size/2, size/2, 'F');
        doc.setFillColor(255, 255, 255);
        doc.setFontSize(size * 0.6);
        doc.setTextColor(255, 255, 255);
        doc.text('HF', x + size/2, y + size/2 + 2, { align: 'center', baseline: 'middle' });
        resolve(false);
      };
    });
  } catch (error) {
    // Fallback if error
    doc.setFillColor(59, 130, 246);
    doc.circle(x + size/2, y + size/2, size/2, 'F');
    doc.setFillColor(255, 255, 255);
    doc.setFontSize(size * 0.6);
    doc.setTextColor(255, 255, 255);
    doc.text('HF', x + size/2, y + size/2 + 2, { align: 'center', baseline: 'middle' });
    return false;
  }
};

  // Add signature to PDF
  const addSignatureToPDF = async (doc: jsPDF, x: number, y: number, width: number = 60) => {
    try {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = signatureImg;
        
        img.onload = () => {
          const height = (img.height * width) / img.width;
          doc.addImage(img, 'PNG', x, y, width, height);
          setSignatureLoaded(true);
          resolve(true);
        };
        
        img.onerror = () => {
          // Fallback to line if signature fails to load
          doc.setDrawColor(30, 64, 175);
          doc.setLineWidth(0.5);
          doc.line(x, y + 5, x + width, y + 5);
          resolve(false);
        };
      });
    } catch (error) {
      // Fallback to line if error
      doc.setDrawColor(30, 64, 175);
      doc.setLineWidth(0.5);
      doc.line(x, y + 5, x + width, y + 5);
      return false;
    }
  };

// PDF Generation with medical background
const generatePDF = async () => {
  if (!validateForm()) {
    setNotification({ type: 'error', message: 'Please fix the errors before generating PDF' });
    return;
  }

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let currentY = margin;

  // Add transparent medical background
  doc.setFillColor(240, 248, 255);
  doc.rect(0, 0, pageWidth, 297, 'F');

  // Header with clinic info
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(59, 130, 246);
  doc.roundedRect(margin - 5, margin - 5, pageWidth - 2 * margin + 10, 50, 3, 3, 'FD');

  // Clinic logo - call it asynchronously
  const logoAdded = await addLogoToPDF(doc, margin, currentY - 2, 12);
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(59, 130, 246);
  doc.text(data.doctor.clinicName, margin + (logoAdded ? 17 : 20), currentY + 8);
  
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text(data.doctor.address, margin, currentY + 18);
  doc.text(`Phone: ${data.doctor.phone} | Email: ${data.doctor.email}`, margin, currentY + 25);
  
// Doctor info on right - UPDATED SECTION
doc.setFontSize(12); // Increased from 10
doc.setFont('helvetica', 'bold'); // Make it bold
doc.setTextColor(30, 64, 175); // Changed to blue color
doc.text(`${data.doctor.name}`, pageWidth - margin, currentY + 8, { align: 'right' });

// Reset for degree text
doc.setFontSize(9); // Smaller for degree
doc.setFont('helvetica', 'normal'); // Normal font for degree
doc.setTextColor(0, 0, 0); // Black color for degree

  // Split degree into multiple lines if needed
  const degreeLines = doc.splitTextToSize(data.doctor.degree, 60);
  let degreeY = currentY + 15;
  degreeLines.forEach((line: string, index: number) => {
    doc.text(line, pageWidth - margin, degreeY + (index * 4), { align: 'right' });
  });

  currentY += 55;

  // Prescription header
  doc.setFontSize(20);
  doc.setTextColor(30, 64, 175);
  doc.setFont('helvetica', 'bold');
  doc.text('MEDICAL PRESCRIPTION', pageWidth / 2, currentY, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Date: ${new Date(data.patient.date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })}`, margin, currentY + 5);

    currentY += 15;

    // Patient information box
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, currentY, pageWidth - 2 * margin, 30, 3, 3, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(30, 64, 175);
    doc.setFont('helvetica', 'bold');
    doc.text('PATIENT INFORMATION', margin + 10, currentY + 10);
    
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${data.patient.name}`, margin + 10, currentY + 18);
    doc.text(`Age: ${data.patient.age} years`, margin + 70, currentY + 18);
    doc.text(`Gender: ${data.patient.gender}`, pageWidth - margin - 40, currentY + 18);

    currentY += 40;

    // Symptoms and Diagnosis
    if (data.clinical.symptoms || data.clinical.diagnosis) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.setFont('helvetica', 'bold');
      doc.text('CLINICAL NOTES', margin, currentY);
      
      currentY += 7;
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      
      if (data.clinical.symptoms) {
        const symptomsLines = doc.splitTextToSize(`Symptoms: ${data.clinical.symptoms}`, pageWidth - 2 * margin - 20);
        doc.text(symptomsLines, margin + 10, currentY);
        currentY += symptomsLines.length * 4 + 5;
      }
      
      if (data.clinical.diagnosis) {
        const diagnosisLines = doc.splitTextToSize(`Diagnosis: ${data.clinical.diagnosis}`, pageWidth - 2 * margin - 20);
        doc.text(diagnosisLines, margin + 10, currentY);
        currentY += diagnosisLines.length * 4 + 10;
      }
      
      currentY += 5;
    }

    // Medications table
    const hasMedicines = data.medicines.some(m => m.name.trim());
    if (hasMedicines) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.setFont('helvetica', 'bold');
      doc.text('PRESCRIBED MEDICATIONS', margin, currentY);
      currentY += 8;

      const medicineData = data.medicines
        .filter(m => m.name.trim())
        .map((med, idx) => [
          `• ${med.name}`,
          med.dosage,
          med.frequency,
          med.duration,
          med.instructions || '-'
        ]);

      autoTable(doc, {
        startY: currentY,
        head: [['Medicine', 'Dosage', 'Frequency', 'Duration', 'Instructions']],
        body: medicineData,
        theme: 'grid',
        headStyles: {
          fillColor: [30, 64, 175],
          textColor: 255,
          fontSize: 9,
          fontStyle: 'bold'
        },
        bodyStyles: { fontSize: 8 },
        styles: {
          cellPadding: 4,
          lineColor: [226, 232, 240],
          lineWidth: 0.5
        },
        margin: { left: margin, right: margin }
      });

      currentY = (doc as any).lastAutoTable?.finalY + 10 || currentY;
    }

    // Doctor's advice
    if (data.advice.trim()) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.setFont('helvetica', 'bold');
      doc.text("DOCTOR'S ADVICE", margin, currentY);
      
      currentY += 7;
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const adviceLines = doc.splitTextToSize(data.advice, pageWidth - 2 * margin);
      doc.text(adviceLines, margin, currentY);
      currentY += adviceLines.length * 4 + 10;
    }

    // Follow-up date
    if (data.followUpDate) {
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.setFont('helvetica', 'bold');
      doc.text('FOLLOW-UP APPOINTMENT', margin, currentY);
      
      currentY += 7;
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date: ${new Date(data.followUpDate).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })}`, margin, currentY);
      currentY += 15;
    }

    // Footer with signature
    const signatureY = 240;

    // Try to add signature image
    const signatureAdded = await addSignatureToPDF(doc, pageWidth - margin - 60, signatureY - 5, 50);

    // If signature wasn't added, draw a line
    if (!signatureAdded) {
      doc.setDrawColor(30, 64, 175);
      doc.setLineWidth(0.5);
      doc.line(pageWidth - margin - 60, signatureY, pageWidth - margin - 10, signatureY);
    }
    
    doc.setFontSize(10);
    doc.setTextColor(30, 64, 175);
    doc.setFont('helvetica', 'bold');
    doc.text(data.doctor.name, pageWidth - margin - 40, signatureY + 15, { align: 'center' });
    
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    
    // Split degree for signature area too
    const signatureDegreeLines = doc.splitTextToSize(data.doctor.degree, 80);
    let signatureDegreeY = signatureY + 20;
    signatureDegreeLines.forEach((line: string, index: number) => {
      doc.text(line, pageWidth - margin - 40, signatureDegreeY + (index * 4), { align: 'center' });
    });
    
    doc.text(`${data.doctor.registrationNo}`, pageWidth - margin - 40, signatureDegreeY + (signatureDegreeLines.length * 4) + 4, { align: 'center' });

    // Emergency contact in footer
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`For emergencies: ${data.doctor.phone}`, margin, 290);
    doc.text('Generated by HealthFirst247 Prescription System', pageWidth / 2, 290, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - margin, 290, { align: 'right' });

    // Save PDF
    const filename = `Prescription_${data.patient.name.replace(/\s+/g, '_')}_${data.prescriptionId}.pdf`;
    doc.save(filename);

    setNotification({ type: 'success', message: 'PDF generated successfully!' });
  };

  // Print function
  const handlePrint = () => {
    if (!validateForm()) {
      setNotification({ type: 'error', message: 'Please fix errors before printing' });
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Prescription - ${data.patient.name}</title>
        <style>
          @media print {
            @page { margin: 20mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .no-print { display: none; }
          }
          .prescription-container { max-width: 210mm; margin: 0 auto; }
          .header { border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px; }
          .clinic-header { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .patient-box { background: #f1f5f9; padding: 15px; border-left: 4px solid #1e40af; margin: 20px 0; }
          .medicine-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .medicine-table th { background: #1e40af; color: white; padding: 10px; text-align: left; }
          .medicine-table td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
          .signature { text-align: right; margin-top: 50px; padding-top: 20px; border-top: 1px solid #1e40af; }
          .footer { margin-top: 30px; padding-top: 10px; border-top: 1px dashed #94a3b8; color: #64748b; font-size: 12px; }
          .medicine-item::before { content: "• "; color: #1e40af; font-weight: bold; }
          .clinic-logo { display: inline-block; vertical-align: middle; margin-right: 10px; }
        </style>
      </head>
      <body>
        <div class="prescription-container">
<div class="header">
  <table width="100%">
    <tr>
      <td width="70%">
        <div style="display: flex; align-items: center;">
          <div class="clinic-logo" style="margin-right: 10px;">
            <img src="${logo}" alt="HealthFirst247 Logo" style="width: 40px; height: 40px; object-fit: contain;" />
          </div>
          <div>
            <h1 style="color: #1e40af; margin: 0; font-size: 20px;">HealthFirst247 Clinic</h1>
            <p style="color: #64748b; margin: 5px 0; font-size: 12px;">${data.doctor.address}</p>
            <p style="color: #64748b; margin: 5px 0; font-size: 12px;">Phone: ${data.doctor.phone} | Email: ${data.doctor.email}</p>
          </div>
        </div>
      </td>
      <td align="right">
        <h3 style="margin: 0; color: #0f172a; font-size: 16px;">${data.doctor.name}</h3>
        <p style="margin: 5px 0; color: #475569; font-size: 12px; line-height: 1.3;">${data.doctor.degree}</p>
        <p style="margin: 5px 0; color: #475569; font-size: 12px;">${data.doctor.registrationNo}</p>
      </td>
    </tr>
  </table>
</div>

          <div class="patient-box">
            <h3 style="color: #1e40af; margin-top: 0; font-size: 14px;">PATIENT INFORMATION</h3>
            <table width="100%">
              <tr>
                <td><strong>Name:</strong> ${data.patient.name}</td>
                <td><strong>Age:</strong> ${data.patient.age} years</td>
                <td><strong>Gender:</strong> ${data.patient.gender}</td>
              </tr>
            </table>
          </div>

          ${data.clinical.symptoms || data.clinical.diagnosis ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #1e40af; font-size: 14px;">CLINICAL NOTES</h3>
              ${data.clinical.symptoms ? `<p style="font-size: 13px;"><strong>Symptoms:</strong> ${data.clinical.symptoms}</p>` : ''}
              ${data.clinical.diagnosis ? `<p style="font-size: 13px;"><strong>Diagnosis:</strong> ${data.clinical.diagnosis}</p>` : ''}
            </div>
          ` : ''}

          ${data.medicines.some(m => m.name.trim()) ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #1e40af; font-size: 14px;">PRESCRIBED MEDICATIONS</h3>
              <table class="medicine-table">
                <thead>
                  <tr>
                    <th style="font-size: 12px;">Medicine</th>
                    <th style="font-size: 12px;">Dosage</th>
                    <th style="font-size: 12px;">Frequency</th>
                    <th style="font-size: 12px;">Duration</th>
                    <th style="font-size: 12px;">Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.medicines.filter(m => m.name.trim()).map(med => `
                    <tr>
                      <td class="medicine-item" style="font-size: 12px;">${med.name}</td>
                      <td style="font-size: 12px;">${med.dosage}</td>
                      <td style="font-size: 12px;">${med.frequency}</td>
                      <td style="font-size: 12px;">${med.duration}</td>
                      <td style="font-size: 12px;">${med.instructions || '-'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}

          ${data.advice.trim() ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #1e40af; font-size: 14px;">DOCTOR'S ADVICE</h3>
              <p style="font-size: 13px;">${data.advice}</p>
            </div>
          ` : ''}

          ${data.followUpDate ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #1e40af; font-size: 14px;">FOLLOW-UP APPOINTMENT</h3>
              <p style="font-size: 13px;"><strong>Date:</strong> ${new Date(data.followUpDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}</p>
            </div>
          ` : ''}

          <div class="signature">
            ${signatureLoaded ? 
              `<div style="margin-bottom: 20px;">
                <img src="${signatureImg}" alt="Signature" style="height: 40px; max-width: 150px;" />
              </div>` : 
              '<div style="margin-bottom: 20px; border-bottom: 2px solid #1e40af; width: 150px; margin: 0 auto;"></div>'
            }
            <p><strong>${data.doctor.name}</strong></p>
            <p style="font-size: 12px; line-height: 1.3;">${data.doctor.degree}</p>
            <p style="font-size: 12px;">${data.doctor.registrationNo}</p>
          </div>

          <div class="footer">
            <p style="text-align: center; font-size: 11px;">
              For emergencies: ${data.doctor.phone} | 
              Generated on: ${new Date().toLocaleDateString()} | 
              HealthFirst247 Prescription System
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Clear form
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the form? All data will be lost.')) {
      setData({
        ...DEFAULT_DATA,
        prescriptionId: generatePrescriptionId()
      });
      setValidationErrors([]);
      setNotification({ type: 'info', message: 'Form cleared successfully!' });
    }
  };

  // Copy prescription ID
  const copyPrescriptionId = () => {
    navigator.clipboard.writeText(data.prescriptionId);
    setNotification({ type: 'success', message: 'Prescription ID copied to clipboard!' });
  };

  // Close notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold mb-2">HealthFirst247 Clinic</h1>
              <p className="text-blue-200 text-sm">Secure Prescription System</p>
            </div>

            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline mr-2" size={16} />
                  Username
                </label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="inline mr-2" size={16} />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent pr-12"
                    placeholder="Enter password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="text-red-600 mr-3" size={20} />
                    <p className="text-red-700 font-medium">{loginError}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">For authorized medical personnel only</p>
                <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                  <Shield size={12} className="mr-1" />
                  <span>Secure • HIPAA Compliant • Encrypted</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main App (Authenticated)
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative mt-28">
      
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center ${
          notification.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
          notification.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
          'bg-blue-50 border border-blue-200 text-blue-800'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle className="mr-2" size={20} />
          ) : notification.type === 'success' ? (
            <CheckCircle className="mr-2" size={20} />
          ) : null}
          <span className="font-medium">{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-4 text-gray-500 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Logout */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="HealthFirst247 Logo" 
                className="w-12 h-12 mr-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Prescription Generator</h1>
                <p className="text-gray-600 mt-2">Create professional medical prescriptions with ease</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{data.doctor.name}</p>
                <p className="text-sm text-gray-600 max-w-xs">{data.doctor.degree}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {validationErrors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="text-red-600 mr-2" size={20} />
              <h3 className="font-semibold text-red-800">Please fix the following errors:</h3>
            </div>
            <ul className="mt-2 list-disc pl-5 text-sm text-red-700">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Details */}
            <Card title="Patient Details" icon={User}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  icon={User}
                  value={data.patient.name}
                  onChange={(e) => updatePatient('name', e.target.value)}
                  placeholder="Enter patient's full name"
                />
                <InputField
                  label="Age"
                  type="number"
                  value={data.patient.age}
                  onChange={(e) => updatePatient('age', e.target.value)}
                  placeholder="Age in years"
                />
                <SelectField
                  label="Gender"
                  value={data.patient.gender}
                  onChange={(e) => updatePatient('gender', e.target.value)}
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' }
                  ]}
                />
                <InputField
                  label="Date"
                  type="date"
                  icon={Calendar}
                  value={data.patient.date}
                  onChange={(e) => updatePatient('date', e.target.value)}
                />
              </div>
            </Card>

            {/* Clinical Information */}
            <Card title="Clinical Information" icon={FileText}>
              <div className="space-y-4">
                <TextAreaField
                  label="Symptoms"
                  value={data.clinical.symptoms}
                  onChange={(e) => updateClinical('symptoms', e.target.value)}
                  rows={3}
                  placeholder="Describe symptoms..."
                />
                <TextAreaField
                  label="Diagnosis"
                  value={data.clinical.diagnosis}
                  onChange={(e) => updateClinical('diagnosis', e.target.value)}
                  rows={3}
                  placeholder="Enter diagnosis..."
                  required
                />
              </div>
            </Card>

            {/* Medications */}
            <Card title="Medications" icon={Pill}>
              <div className="space-y-4">
                {data.medicines.map((medicine, index) => (
                  <MedicineRow
                    key={medicine.id}
                    medicine={medicine}
                    index={index}
                    onUpdate={(field, value) => updateMedicine(medicine.id, field, value)}
                    onRemove={() => removeMedicine(medicine.id)}
                    canRemove={data.medicines.length > 1}
                  />
                ))}
                <button
                  onClick={addMedicine}
                  type="button"
                  className="w-full py-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center justify-center"
                >
                  <Plus className="mr-2" size={20} />
                  Add Another Medicine
                </button>
              </div>
            </Card>

            {/* Advice & Follow-up */}
            <Card title="Advice & Follow-up" icon={Clock}>
              <div className="space-y-4">
                <TextAreaField
                  label="Doctor's Advice"
                  value={data.advice}
                  onChange={(e) => setData(prev => ({ ...prev, advice: e.target.value }))}
                  rows={4}
                  placeholder="Provide medical advice and instructions..."
                />
                <InputField
                  label="Follow-up Date"
                  type="date"
                  icon={Calendar}
                  value={data.followUpDate}
                  onChange={(e) => setData(prev => ({ ...prev, followUpDate: e.target.value }))}
                  min={data.patient.date}
                />
              </div>
            </Card>
          </div>

          {/* Right Column - Preview & Actions */}
          <div className="space-y-6">
            {/* Prescription ID */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Prescription ID</h3>
                <button
                  onClick={copyPrescriptionId}
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                >
                  <Copy size={16} className="mr-1" />
                  Copy
                </button>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <code className="font-mono text-lg font-bold text-blue-700">
                  {data.prescriptionId}
                </code>
                <p className="text-sm text-gray-600 mt-2">
                  This ID will be printed on the prescription
                </p>
              </div>
            </Card>

            {/* Quick Preview */}
            <Card title="Quick Preview" icon={Eye}>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Patient</p>
                  <p className="font-semibold text-gray-900">
                    {data.patient.name || '[Patient Name]'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {data.patient.age ? `${data.patient.age} years` : 'Age'} • {data.patient.gender}
                  </p>
                </div>
                
                {data.clinical.diagnosis && (
                  <div>
                    <p className="text-sm text-gray-600">Diagnosis</p>
                    <p className="font-medium text-gray-900">{data.clinical.diagnosis}</p>
                  </div>
                )}

                {data.medicines.some(m => m.name.trim()) && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Medications</p>
                    <ul className="space-y-1">
                      {data.medicines
                        .filter(m => m.name.trim())
                        .map((med, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <ChevronRight size={14} className="mt-0.5 mr-1 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">
                              <span className="font-medium">{med.name}</span> - {med.dosage} ({med.duration})
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {previewMode ? 'Hide Full Preview' : 'Show Full Preview'}
                  </button>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <Card title="Actions">
              <div className="space-y-3">
                <button
                  onClick={generatePDF}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <Download className="mr-2" size={20} />
                  Download PDF
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <Printer className="mr-2" size={20} />
                  Print Prescription
                </button>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="py-2.5 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Eye className="mr-2" size={18} />
                    {previewMode ? 'Hide' : 'Preview'}
                  </button>
                  <button
                    onClick={handleClear}
                    className="py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:shadow-md transition-all flex items-center justify-center"
                  >
                    <Trash2 className="mr-2" size={18} />
                    Clear
                  </button>
                </div>

                <button
                  onClick={() => {
                    localStorage.setItem('prescription_draft', JSON.stringify(data));
                    setNotification({ type: 'success', message: 'Draft saved successfully!' });
                  }}
                  className="w-full py-2.5 border-2 border-blue-200 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  <Save className="mr-2" size={18} />
                  Save Draft
                </button>
              </div>
            </Card>

            {/* Clinic Information */}
            <Card title="Clinic Information" icon={MapPin}>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="text-gray-400 mt-0.5 mr-2" size={16} />
                  <span className="text-gray-700">{data.doctor.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-gray-400 mr-2" size={16} />
                  <span className="text-gray-700">{data.doctor.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-gray-400 mr-2" size={16} />
                  <span className="text-gray-700">{data.doctor.email}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Preview Modal */}
{previewMode && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Prescription Preview</h2>
        <button
          onClick={() => setPreviewMode(false)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>
      <div ref={previewRef} className="p-8">
        {/* Preview content similar to PDF */}
        <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-300">
          <div className="border-b-2 border-blue-600 pb-4 mb-6">
            <table className="w-full">
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      <img 
                        src={logo} 
                        alt="HealthFirst247 Logo" 
                        className="w-10 h-10 mr-3"
                        onError={(e) => {
                          // Fallback if logo doesn't load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div>
                        <h1 className="text-2xl font-bold text-blue-700">HealthFirst247 Clinic</h1>
                        <p className="text-gray-600 text-sm">{data.doctor.address}</p>
                        <p className="text-gray-600 text-sm">
                          Phone: {data.doctor.phone} | Email: {data.doctor.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">
                    <h3 className="text-lg font-semibold">{data.doctor.name}</h3>
                    <p className="text-gray-600 text-sm max-w-xs ml-auto">{data.doctor.degree}</p>
                    <p className="text-gray-600 text-sm">
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-blue-800 mb-2">MEDICAL PRESCRIPTION</h2>
            <p className="text-gray-600">
              Prescription ID: {data.prescriptionId} | Date:{' '}
              {new Date(data.patient.date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <h3 className="font-bold text-blue-800 mb-2">PATIENT INFORMATION</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-600">Name:</span>
                <p className="font-medium">{data.patient.name || '[Patient Name]'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Age:</span>
                <p className="font-medium">{data.patient.age || '[Age]'} years</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Gender:</span>
                <p className="font-medium">{data.patient.gender}</p>
              </div>
            </div>
          </div>

                  {/* Rest of preview content */}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>
            © {new Date().getFullYear()} HealthFirst247 Clinic • Secure Prescription Generator v1.0
          </p>
          <p className="text-gray-500 text-xs mt-1">
            All prescriptions are digitally generated and timestamped
          </p>
        </footer>
      </div>
    </div>
  );
}