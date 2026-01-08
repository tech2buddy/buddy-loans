import React, { useState } from 'react';
import { FileText, X, User, ExternalLink, Banknote, Mail, Clock, Loader2, MessageCircle } from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc, addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';

const ApplicationDetailsModal = ({ application, appId, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper to trigger WhatsApp notification
  const triggerWhatsAppNotification = (name, amount) => {
    const message = `Hello ${name}, your Buddy Loan of R${amount} has been APPROVED! 🚀 Please check your dashboard for payout details.`;
    const encodedMessage = encodeURIComponent(message);
    // You can append the user's phone number if stored in application.phone
    const whatsappUrl = `https://wa.me/${application.phone || ''}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleApprove = async () => {
    if (!window.confirm(`Approve R${application.amountRequested} loan for ${application.name}?`)) return;
    
    setIsProcessing(true);
    try {
      // 1. Update Application Status
      const appRef = doc(db, 'artifacts', appId, 'public', 'data', 'loan_applications', application.id);
      await updateDoc(appRef, { status: 'approved' });

      // 2. Update User Profile
      const profileRef = doc(db, 'artifacts', appId, 'users', application.userId, 'profile', 'data');
      await updateDoc(profileRef, { 
        verificationStatus: 'verified',
        applicationSubmitted: true 
      });

      // 3. Create Loan Records
      const loanData = {
        userId: application.userId,
        studentName: application.name || application.userName,
        amount: Number(application.amountRequested),
        interest: Math.round(application.amountRequested * 0.35),
        totalRepayable: Math.round(application.amountRequested * 1.35),
        status: 'approved',
        createdAt: serverTimestamp(),
        dueDate: Timestamp.fromDate(new Date(Date.now() + 31 * 24 * 60 * 60 * 1000))
      };

      await addDoc(collection(db, 'artifacts', appId, 'users', application.userId, 'loans'), loanData);
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'all_loans'), loanData);

      // 4. Trigger WhatsApp Notification
      triggerWhatsAppNotification(application.name, application.amountRequested);

      alert('Loan Approved! WhatsApp notification opened.');
      onClose();
    } catch (error) {
      console.error("Approval error:", error);
      alert('Error: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    const reason = window.prompt("Reason for rejection:");
    if (reason === null) return;

    setIsProcessing(true);
    try {
      const appRef = doc(db, 'artifacts', appId, 'public', 'data', 'loan_applications', application.id);
      await updateDoc(appRef, { status: 'rejected', rejectionReason: reason });

      const profileRef = doc(db, 'artifacts', appId, 'users', application.userId, 'profile', 'data');
      await updateDoc(profileRef, { 
        applicationSubmitted: false, 
        rejectionReason: reason,
        verificationStatus: 'rejected'
      });

      alert('Application rejected.');
      onClose();
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-white rounded-[3rem] p-8 w-full max-w-lg shadow-2xl relative">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-800"><X size={20} /></button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">{application.name?.charAt(0)}</div>
          <div className="text-left">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{application.name}</h3>
            <p className="text-xs font-medium text-slate-500">{application.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Requested</p>
            <p className="text-2xl font-black text-[#E31C3C]">R{application.amountRequested}</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
            <p className="text-xs font-black uppercase text-orange-600">{application.status}</p>
          </div>
        </div>

        <div className="space-y-3 mb-8 text-left">
          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Documents</h4>
          {application.files?.map((file, idx) => (
            <a key={idx} href={file.downloadURL} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-[#E31C3C] group transition-all">
              <div className="flex items-center gap-3">
                <FileText className="text-slate-400 group-hover:text-[#E31C3C]" size={18} />
                <span className="text-[11px] font-black uppercase text-slate-700">{file.label}</span>
              </div>
              <ExternalLink size={14} className="text-slate-300 group-hover:text-[#E31C3C]" />
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          <button disabled={isProcessing} onClick={handleReject} className="flex-1 py-5 rounded-2xl font-black text-[11px] uppercase text-slate-400 bg-slate-50 hover:bg-red-50 hover:text-red-500">
            {isProcessing ? <Loader2 className="animate-spin mx-auto" size={18} /> : 'Reject'}
          </button>
          <button disabled={isProcessing} onClick={handleApprove} className="flex-[2] py-5 rounded-2xl font-black text-[11px] uppercase text-white bg-black shadow-xl flex items-center justify-center gap-2">
            {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <><MessageCircle size={16}/> Approve & Notify</>}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminApplications = ({ applications, appId }) => {
  const [selectedApp, setSelectedApp] = useState(null);
  const pendingApps = applications?.filter(a => a.status === 'pending') || [];

  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm text-left">
      <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-8">New Applications</h3>
      <div className="space-y-4">
        {pendingApps.length === 0 ? (
          <p className="text-center py-10 text-slate-300 font-black text-xs uppercase">No pending reviews</p>
        ) : (
          pendingApps.map(app => (
            <div key={app.id} onClick={() => setSelectedApp(app)} className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-6 flex justify-between items-center cursor-pointer hover:bg-white hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-xs border border-slate-100">{app.name?.charAt(0)}</div>
                <div>
                  <p className="font-black text-slate-900 leading-none">{app.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">{app.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900 tracking-tighter">R{app.amountRequested}</p>
                <span className="text-[9px] font-black text-[#E31C3C] uppercase">Review</span>
              </div>
            </div>
          ))
        )}
      </div>
      {selectedApp && <ApplicationDetailsModal application={selectedApp} appId={appId} onClose={() => setSelectedApp(null)} />}
    </div>
  );
};

export default AdminApplications;