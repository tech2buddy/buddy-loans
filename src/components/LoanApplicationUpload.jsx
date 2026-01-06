import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Upload, Loader2, FileText, X } from 'lucide-react';

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

    const missingFiles = DOCUMENT_TYPES.filter((doc) => doc.required && !files[doc.key]);
    if (missingFiles.length > 0) {
      setError(`Missing required documents: ${missingFiles.map((d) => d.label).join(', ')}`);
      return;
    }

    setIsUploading(true);
    try {
      const uploadedFiles = await Promise.all(
        Object.entries(files).map(async ([key, file]) => {
          const path = `applications/${userId}/${key}-${file.name}`;
          const fileRef = ref(storage, path);
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

      const applicationData = {
        userId,
        name: userName,
        email: userEmail,
        amountRequested,
        status: 'pending',
        files: uploadedFiles,
        createdAt: serverTimestamp(),
      };

      const appRef = collection(db, 'artifacts', appId, 'public', 'data', 'loan_applications');
      await addDoc(appRef, applicationData);

      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // If the application has been submitted, show the success message.
  if (userData?.applicationSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <p className="text-green-800 font-black text-lg mb-2">Application Submitted</p>
        <p className="text-green-700 text-sm">Your application is pending review. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
              <button type="button" onClick={() => removeFile(docType.key)} className="p-1 text-slate-400 hover:text-red-500">
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
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 hover:border-slate-400 transition-colors">
                <Upload className="mx-auto text-slate-400" size={24} />
                <span className="text-sm font-medium text-slate-600 mt-2 block">Click to upload</span>
              </div>
            </label>
          )}
        </div>
      ))}

      {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

      <button
        disabled={isUploading || Object.keys(files).length < DOCUMENT_TYPES.filter(d => d.required).length}
        type="submit"
        className="w-full rounded-2xl p-5 flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest transition-all bg-black text-white disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg hover:bg-slate-800 active:scale-95"
      >
        {isUploading ? (
          <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</>
        ) : (
          <><Upload size={18} />Submit Application</>
        )}
      </button>
    </form>
  );
}
