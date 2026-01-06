import React, { useState } from 'react';
import { FileText, X, Download, Clock, User } from 'lucide-react';

const ApplicationDetailsModal = ({ application, onClose }) => (
  <div className="fixed inset-0 z-[250] bg-black/70 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in">
    <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative">
      <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors"><X size={24} /></button>
      <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Application Details</h3>
      <p className="text-sm text-slate-500 mb-6 font-mono bg-slate-50 p-2 rounded-lg">ID: {application.id}</p>
      <pre className="bg-slate-900 text-white text-xs rounded-xl p-6 overflow-auto max-h-[60vh]">
        {JSON.stringify(application, (key, value) => {
          // Convert Firestore Timestamps to readable strings
          if (value && value.seconds) {
            return new Date(value.seconds * 1000).toISOString();
          }
          return value;
        }, 2)}
      </pre>
    </div>
  </div>
);

const AdminApplications = ({ applications }) => {
  const [selectedApp, setSelectedApp] = useState(null);

  const formatDate = (timestamp) => {
    if (!timestamp) return '—';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-[3rem] p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-slate-400">No pending applications.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm">
      <h3 className="text-xl font-black text-slate-800 mb-6 tracking-tight">Loan Applications</h3>
      <div className="space-y-4">
        {applications.map(app => (
          <div 
            key={app.id} 
            onClick={() => setSelectedApp(app)}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200 group-hover:border-slate-300">
                <User size={24} className="text-slate-500" />
              </div>
              <div>
                <p className="font-bold text-slate-800">{app.name || app.userName}</p>
                <p className="text-xs text-slate-500 font-mono">{app.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">R{app.amountRequested}</p>
              <p className="text-xs text-slate-500">{formatDate(app.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedApp && <ApplicationDetailsModal application={selectedApp} onClose={() => setSelectedApp(null)} />}
    </div>
  );
};

export default AdminApplications;
