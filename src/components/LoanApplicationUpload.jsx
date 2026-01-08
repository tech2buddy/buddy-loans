import React, { useState } from 'react';
import { storage, db, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Upload, Loader2, FileText, X, AlertCircle } from 'lucide-react';

const DOCUMENT_TYPES = [
  { key: 'proofOfRegistration', label: 'Proof of Registration', required: true },
  { key: 'proofOfResidence', label: 'Proof of Residence', required: true },
  { key: 'bankStatement', label: '3 Months Bank Statement', required: true },
  { key: 'idPhoto', label: 'ID Photo', required: true },
];

export default function LoanApplicationUpload({ userEmail, userId, userName, amountRequested, onSuccess, appId, userData }) {
  const [files, setFiles] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (key, e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Basic check: limit file size to 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is too large. Max size is 5MB.`);
        return;
      }
      setFiles((prev) => ({ ...prev, [key]: file }));
      setError('');
    }
  };

  const removeFile = (key) => {
    setFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[key];
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validations
    if (!auth.currentUser) {
      setError("You must be logged in to submit an application.");
      return;
    }

    if (!appId) {
      setError("System Error: Application ID (appId) is missing. Check your component props.");
      return;
    }

    const missingFiles = DOCUMENT_TYPES.filter((doc) => doc.required && !files[doc.key]);
    if (missingFiles.length > 0) {
      setError(`Missing required documents: ${missingFiles.map((d) => d.label).join(', ')}`);
      return;
    }

    setIsUploading(true);
    
    try {
      console.log("Starting batch upload to Storage...");
      
      // 2. Upload all files to Firebase Storage
      const uploadedFiles = await Promise.all(
        Object.entries(files).map(async ([key, file]) => {
          // Path includes timestamp to prevent overwriting files with same name
          const fileName = `${Date.now()}-${file.name}`;
          const path = `applications/${auth.currentUser.uid}/${fileName}`;
          const fileRef = ref(storage, path);
          
          console.log(`Uploading: ${key}...`);
          await uploadBytes(fileRef, file);
          const downloadURL = await getDownloadURL(fileRef);
          
          const docType = DOCUMENT_TYPES.find(d => d.key === key);
          return {
            type: key,
            label: docType.label,
            fileName: file.name,
            downloadURL,
          };
        })
      );

      console.log("All files uploaded. Saving to Firestore...");

      // 3. Save application data to Firestore
      const applicationData = {
        userId: userId || auth.currentUser.uid,
        name: userName || 'Unknown User',
        email: userEmail || auth.currentUser.email,
        amountRequested: amountRequested || 0,
        status: 'pending',
        files: uploadedFiles,
        createdAt: serverTimestamp(),
      };

      const appRef = collection(db, 'artifacts', appId, 'public', 'data', 'loan_applications');
      const docRef = await addDoc(appRef, applicationData);

      console.log("Application saved with ID:", docRef.id);

      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (err) {
      console.error('Detailed Upload Error:', err);
      // This will show the specific Firebase error (like Permission Denied) to the user
      setError(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (userData?.applicationSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-green-600" />
        </div>
        <p className="text-green-800 font-black text-lg mb-2">Application Submitted</p>
        <p className="text-green-700 text-sm">Your application is pending review. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-start mb-6">
        <AlertCircle className="text-blue-500 shrink-0" size={18} />
        <p className="text-xs text-blue-700 leading-relaxed">
            Please ensure all documents are clear and legible (PDF, PNG, or JPG). Max size 5MB per file.
        </p>
      </div>

      {DOCUMENT_TYPES.map((docType) => (
        <div key={docType.key}>
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-2">
            {docType.label}
            {docType.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {files[docType.key] ? (
            <div className="flex items-center justify-between bg-slate-100 rounded-xl p-3 border border-slate-200">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="text-slate-500 shrink-0" size={20} />
                <span className="text-sm font-medium text-slate-800 truncate">{files[docType.key].name}</span>
              </div>
              <button type="button" onClick={() => removeFile(docType.key)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer block">
              <input
                type="file"
                onChange={(e) => handleFileSelect(docType.key, e)}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 hover:border-blue-400 hover:text-blue-600 transition-all group">
                <Upload className="mx-auto text-slate-400 group-hover:text-blue-500" size={24} />
                <span className="text-sm font-medium text-slate-500 mt-2 block">Upload {docType.label}</span>
              </div>
            </label>
          )}
        </div>
      ))}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 flex gap-2">
            <AlertCircle size={18} className="shrink-0" />
            {error}
        </div>
      )}

      <button
        disabled={isUploading || Object.keys(files).length < DOCUMENT_TYPES.filter(d => d.required).length}
        type="submit"
        className="w-full rounded-2xl p-5 flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest transition-all bg-black text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-lg hover:bg-slate-800 active:scale-[0.98]"
      >
        {isUploading ? (
          <><Loader2 className="w-5 h-5 animate-spin" />Processing Application...</>
        ) : (
          <><Upload size={18} />Submit Full Application</>
        )}
      </button>
    </form>
  );
}