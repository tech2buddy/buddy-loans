import React, { useEffect, useMemo, useState } from 'react'
import {
  Wallet,
  Smartphone,
  CheckCircle2,
  ChevronRight,
  Award,
  CircleDollarSign,
  TrendingUp,
  ShieldCheck,
  Zap,
  Lock,
  Clock,
  ArrowRight,
  Upload,
  BarChart3,
  X,
  Menu,
  Shield,
  CreditCard,
  User,
  ArrowUpRight,
  Sparkles,
  Key,
  Info,
  Banknote,
  FileCheck,
  Users,
  ChevronDown,
  Activity,
  Wifi,
  Book,
  ShoppingCart,
  MapPin,
  LogIn,
  Plus,
  Trash2,
  Edit3,
  MessageSquare,
  FileText,
  FileUp,
  FlaskConical,
  Loader2,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react'
import app, { auth, db, firebaseReady } from './firebase'
import DocumentsUpload from './components/DocumentsUpload'
import AdminDocuments from './components/AdminDocuments'
import LoanApplicationUpload from './components/LoanApplicationUpload'
import AdminApplications from './components/AdminApplications'
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  addDoc,
  deleteDoc,
  Timestamp,
  query,
  orderBy
} from 'firebase/firestore'

// --- App Configuration ---
const appId = import.meta.env.VITE_APP_ID || 'buddy-loans-apple-style'
const ADMIN_SECRET_PASS = import.meta.env.VITE_ADMIN_SECRET_PASS || 'TECH2BUDDY_ADMIN'

// --- Animation Wrapper ---
const FadeIn = ({ children, delay = '0ms' }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: delay }}>
    {children}
  </div>
)

// --- Navigation ---
const Navbar = ({ setView, currentView, isAdminVerified, onProtectedAction, onAdminTrigger, onLogout, user, userData }) => {
  return (
    <nav className="fixed bottom-8 left-0 right-0 z-[100] px-6 pointer-events-none group">
      <div className="max-w-md mx-auto flex justify-between items-center bg-[#E31C3C]/90 backdrop-blur-2xl border border-white/20 p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto" onDoubleClick={onAdminTrigger}>
        <button onClick={() => setView('home')} className={`flex-1 flex justify-center py-3.5 rounded-full transition-all duration-300 ${currentView === 'home' ? 'bg-white text-[#E31C3C] shadow-lg scale-105' : 'text-white/60'}`}><Zap size={20} /></button>
        <button onClick={() => onProtectedAction('dashboard')} className={`flex-1 flex justify-center py-3.5 rounded-full transition-all duration-300 ${currentView === 'dashboard' ? 'bg-white text-[#E31C3C] shadow-lg scale-105' : 'text-white/60'}`}><CreditCard size={20} /></button>
        {userData?.role === 'admin' && <button onClick={() => setView('admin')} className={`flex-1 flex justify-center py-3.5 rounded-full transition-all duration-300 ${currentView === 'admin' ? 'bg-white text-[#E31C3C] shadow-lg scale-105' : 'text-white/60'}`}><Shield size={20} /></button>}
        <button onClick={() => onProtectedAction('apply')} className={`flex-1 flex justify-center py-3.5 rounded-full transition-all bg-[#F26D23] text-white shadow-xl shadow-[#F26D23]/30 ml-1 active:scale-90`}><Plus size={22} strokeWidth={3} /></button>
        {user && !user.isAnonymous && <button onClick={onLogout} className={`flex-1 flex justify-center py-3.5 rounded-full transition-all text-white/60`}><LogOut size={20} /></button>}
      </div>
      <div className="text-center text-xs text-black/50 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">Double-click for admin access</div>
    </nav>
  )
}

// --- Hero & Home Layout Components ---
const AppleHero = ({ onApply, onAdminTrigger }) => (
  <section className="min-h-screen pt-20 pb-20 px-8 flex flex-col justify-center items-center text-center overflow-hidden relative bg-white">
    <div className="absolute inset-0 -z-10 overflow-hidden"><div className="absolute top-[-5%] left-[-10%] w-[110%] h-[60%] bg-[#F7B3AD]/10 rounded-full blur-[120px] animate-blob"></div><div className="absolute bottom-[-5%] right-[-10%] w-[110%] h-[60%] bg-[#F26D23]/5 rounded-full blur-[120px] animate-blob animation-delay-2000"></div></div>
    <FadeIn delay="100ms"><div onDoubleClick={onAdminTrigger} className="inline-flex items-center gap-2 bg-[#E31C3C]/5 border border-[#E31C3C]/10 px-5 py-2 rounded-full mb-8 shadow-sm cursor-default select-none transition-transform active:scale-95"><span className="text-[10px] font-black text-[#E31C3C] uppercase tracking-[0.3em]">Powered by TECH2BUDDY</span></div></FadeIn>
    <FadeIn delay="250ms"><h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1] tracking-tighter mb-8 text-balance">Buddy Loans. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31C3C] to-[#F26D23]">Your campus Buddy.</span></h1></FadeIn>
    <FadeIn delay="400ms"><p className="text-lg text-slate-500 font-medium max-w-[280px] mx-auto leading-relaxed mb-12">Get up to an <span className="text-slate-900 font-black">R500 loan</span> with a fixed <span className="text-slate-900 font-black border-b-2 border-[#F26D23]">40% interest</span>. Fast Cash when you need it most.</p></FadeIn>
    <FadeIn delay="550ms"><button onClick={onApply} className="bg-black text-white px-12 py-5 rounded-[2rem] font-black text-base flex items-center gap-3 active:scale-95 shadow-2xl transition-all hover:scale-105">Secure R500 Now <ArrowRight size={20} /></button></FadeIn>
    <div className="mt-20 w-full max-w-[360px] mx-auto perspective-1000">
      <FadeIn delay="700ms">
        <div className="bg-gradient-to-br from-[#E31C3C] to-[#ED697B] rounded-[3rem] p-10 text-left shadow-[0_40px_80px_rgba(227,28,60,0.3)] rotate-y-6 transform hover:rotate-y-0 transition-all duration-1000 group">
          <div className="flex justify-between items-start mb-16"><Zap size={36} className="text-white fill-white transition-transform group-hover:scale-110" /><div className="w-16 h-10 bg-white/20 rounded-xl backdrop-blur-md border border-white/20 shadow-inner"></div></div>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Buddy Balance</p>
          <h3 className="text-5xl font-black text-white tracking-tighter mb-6">R500.00</h3>
          <div className="flex justify-between items-center border-t border-white/20 pt-6"><span className="text-[10px] font-black text-white/80 uppercase tracking-widest">TECH2BUDDY</span><span className="text-[10px] font-black text-white/80 uppercase tracking-widest">31 Days</span></div>
        </div>
      </FadeIn>
    </div>
  </section>
)

const StudentHustle = () => (
  <section className="bg-white py-24 px-8 overflow-hidden">
    <div className="max-w-md mx-auto">
      <FadeIn><div className="mb-12"><h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-3">Built for the <br/>student hustle.</h2><p className="text-slate-500 text-sm font-medium">Quick Cash for everything varsity life throws your way.</p></div></FadeIn>
      <div className="grid grid-cols-2 gap-4">
        {[{ label: 'Data & Airtime', icon: <Wifi size={20} /> }, { label: 'Course Materials', icon: <Book size={20} /> }, { label: 'Campus Groceries', icon: <ShoppingCart size={20} /> }, { label: 'Weekend Travel', icon: <MapPin size={20} /> }].map((item, idx) => (
          <FadeIn key={idx} delay={`${idx * 100}ms`}>
            <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4 group hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#E31C3C] shadow-sm group-hover:scale-110 transition-transform">{item.icon}</div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-600 leading-tight">{item.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
)

const BentoFeatures = () => (
  <section className="bg-slate-50 py-24 px-8">
    <div className="max-w-md mx-auto grid grid-cols-1 gap-6">
      <FadeIn delay="100ms"><div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center gap-6"><div className="w-16 h-16 bg-[#E31C3C] rounded-2xl flex items-center justify-center shadow-xl shadow-[#E31C3C]/10 mb-2"><Smartphone className="text-white" size={32} /></div><div><h3 className="text-3xl font-black text-slate-900 leading-tight mb-3 tracking-tight">One Hour Cash.</h3><p className="text-slate-500 text-base font-medium leading-relaxed">Verify credentials and receive your payout <span className="text-[#E31C3C] font-bold underline decoration-2 underline-offset-4">within 60 minutes</span>.</p></div></div></FadeIn>
      <div className="grid grid-cols-2 gap-6">
        <FadeIn delay="200ms"><div className="bg-[#F26D23] p-10 rounded-[3rem] text-white flex flex-col justify-between h-52 shadow-xl"><TrendingUp size={28} /><div><p className="text-5xl font-black leading-none mb-1 tracking-tighter">35%</p><p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Interest</p></div></div></FadeIn>
        <FadeIn delay="300ms"><div className="bg-[#ED697B] p-10 rounded-[3rem] text-white flex flex-col justify-between h-52 shadow-xl"><Clock size={28} /><div><p className="text-5xl font-black leading-none mb-1 tracking-tighter">31</p><p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Day Term</p></div></div></FadeIn>
      </div>
    </div>
  </section>
)

const JourneyTimeline = () => (
  <section className="bg-slate-50 py-28 px-8 rounded-[4rem] my-12 shadow-inner">
    <div className="max-w-md mx-auto">
      <FadeIn><h2 className="text-4xl font-black text-slate-900 mb-16 tracking-tighter text-center">The 60-Minute <br/>Promise.</h2></FadeIn>
      <div className="space-y-16">
        {[
          { time: '00:00', title: 'Identify', desc: 'Register your student email and number.', icon: <User size={22}/> },
          { time: '00:15', title: 'Upload', desc: 'Upload your documents securely in the Hub.', icon: <FileUp size={22}/> },
          { time: '00:45', title: 'Verify', desc: 'Tech2Buddy checks your registration.', icon: <ShieldCheck size={22}/> },
          { time: '01:00', title: 'Payout', desc: 'Cash lands in your account instantly.', icon: <Zap size={22}/> },
        ].map((step, idx) => (
          <FadeIn key={idx} delay={`${idx * 150}ms`}>
            <div className="flex gap-8 relative">
              {idx < 3 && <div className="absolute left-[23px] top-14 bottom-[-32px] w-0.5 bg-slate-200"></div>}
              <div className="w-12 h-12 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center shrink-0 z-10 text-[#E31C3C]">{step.icon}</div>
              <div className="pt-0.5"><div className="flex items-center gap-3 mb-1.5"><span className="text-[10px] font-black text-[#F26D23] uppercase tracking-[0.2em]">{step.time}</span><h4 className="text-xl font-black text-slate-900 tracking-tight">{step.title}</h4></div><p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p></div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
)

const FAQAccordion = () => {
  const [open, setOpen] = useState(null)
  const faqs = [
    { q: 'Who can apply?', a: 'Buddy Loans is built exclusively for verified students with valid registration and housing docs.' },
    { q: 'How much can I take?', a: 'We provide an R500 principal loan with a fixed R175 interest rate.' },
    { q: 'How do I upload docs?', a: 'Go to your Buddy Hub, find the Documents section, and use the upload form to submit them securely.' }
  ]
  return (
    <section className="bg-white py-24 px-8">
      <div className="max-w-md mx-auto">
        <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter">Buddy FAQ.</h3>
        <div className="space-y-5">
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={`${i * 100}ms`}>
              <div onClick={() => setOpen(open === i ? null : i)} className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 cursor-pointer active:scale-[0.98] transition-all">
                <div className="flex justify-between items-center"><p className="font-black text-slate-800 text-base tracking-tight">{f.q}</p><div className={`p-2 rounded-full bg-white shadow-sm transition-transform duration-500 ${open === i ? 'rotate-180' : ''}`}><ChevronDown size={18} className="text-slate-400" /></div></div>
                {open === i && <p className="mt-6 text-slate-500 text-sm font-medium leading-relaxed animate-in fade-in slide-in-from-top-3">{f.a}</p>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Hub & Admin Components ---
const RepayModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-end animate-in fade-in duration-500">
    <div className="w-full bg-white rounded-t-[3.5rem] p-10 pb-20 animate-in slide-in-from-bottom-full duration-700 shadow-2xl">
       <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-10"></div>
       <div className="max-w-md mx-auto text-center">
          <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Repayment</h3>
          <p className="text-slate-500 text-sm font-medium mb-10">Settle your Buddy Loan via FNB.</p>
          <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 space-y-6 mb-10 text-left shadow-inner">
             <div className="flex justify-between items-center"><span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Bank</span><span className="text-base font-black text-slate-900 uppercase">First National Bank</span></div>
             <div className="flex justify-between items-center"><span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Acc Holder</span><span className="text-base font-black text-slate-900">Tech2Buddy PTY</span></div>
             <div className="flex justify-between items-center"><span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Acc Number</span><span className="text-base font-black text-slate-900 tracking-tighter">62890455XXX</span></div>
          </div>
          <div className="space-y-6">
             <div className="w-full border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-slate-500 text-xs">
               Proof-of-payment uploads via Firebase can be enabled here later.
             </div>
             <button onClick={onClose} className="w-full bg-black text-white py-6 rounded-[2rem] font-black text-base active:scale-95 shadow-2xl transition-all">Dismiss</button>
          </div>
       </div>
    </div>
  </div>
)

const DetailsModal = ({ loan, onClose }) => (
  <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in duration-500">
    <div className="bg-white rounded-[3rem] p-12 w-full max-w-sm shadow-2xl">
      <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight text-left">Timeline.</h3>
      <div className="space-y-10 text-left">
        <div className="flex gap-5">
           <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400"><Clock size={24}/></div>
           <div><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Issued On</p><p className="text-lg font-black text-slate-900">{loan.createdAt?.toDate().toLocaleDateString() || 'Recently'}</p></div>
        </div>
        <div className="flex gap-5">
           <div className="w-12 h-12 bg-[#E31C3C]/5 rounded-2xl flex items-center justify-center text-[#E31C3C]"><CheckCircle2 size={24}/></div>
           <div><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Repay By</p><p className="text-lg font-black text-[#E31C3C]">{loan.dueDate?.toDate().toLocaleDateString() || 'TBD'}</p></div>
        </div>
      </div>
      <button onClick={onClose} className="w-full bg-black text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest mt-12 active:scale-95 shadow-xl transition-all">Dismiss</button>
    </div>
  </div>
)

// --- Dashboard (Hub) ---
const DashboardView = ({ loans, user, userData, onApplicationSuccess, requestedAmount, setRequestedAmount }) => {
  const [activeModal, setActiveModal] = useState(null)
  const isAmountValid = useMemo(() => Number.isFinite(requestedAmount) && requestedAmount >= 100 && requestedAmount <= 500, [requestedAmount])

  const activeLoan = loans.find(l => l.status === 'approved' || l.status === 'pending')
  const repaidCount = loans.filter(l => l.status === 'repaid').length
  const trustScore = Math.min(850, 450 + (repaidCount * 100))


  return (
    <div className="min-h-screen bg-white pt-24 pb-48 px-8 overflow-x-hidden">
      <div className="max-w-md mx-auto">
        <header className="mb-14"><FadeIn delay="100ms"><h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-3 leading-none capitalize">Hello, {userData?.name?.split(' ')[0] || 'Buddy'}.</h2><div className="flex items-center gap-2.5"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div><p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Verified Member</p></div></FadeIn></header>

        <FadeIn delay="200ms">
           {userData?.applicationSubmitted ? (
             <div className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 mb-12 shadow-xl relative overflow-hidden text-white">
                <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 animate-pulse"><Clock size={20}/></div><h4 className="text-xl font-black tracking-tight">Pending Approval</h4></div>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">Your application is pending approval. Please wait while we review and approve your debit order.</p>
                   <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Action Required:</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">You will be contacted. Please prepare to approve the debit order on your banking app.</p>
                   </div>
                </div>
                <Shield className="absolute bottom-[-20px] right-[-20px] text-white/5 w-40 h-40" />
             </div>
           ) : (
             <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 mb-12 shadow-sm group">
                <h4 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Verification Center</h4>

                <div className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-4">How much do you need?</label>
                   <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-2 focus-within:border-[#E31C3C] transition-all">
                      <span className="text-3xl font-black text-slate-900">R</span>
                      <input type="number" min={100} max={500} step={50} value={requestedAmount} onChange={e => setRequestedAmount(Number(e.target.value))} className="w-full bg-transparent border-none text-3xl font-black outline-none" placeholder="500" />
                   </div>
                   <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">Range: R100–R500</p>
                </div>

                <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">Upload the 4 required documents for approval.</p>
                
                <div className="mt-4">
                  <LoanApplicationUpload 
                    userEmail={userData?.email} 
                    userId={user?.uid}
                    userName={userData?.name}
                    amountRequested={requestedAmount}
                    onSuccess={onApplicationSuccess}
                    appId={appId}
                    userData={userData}
                  />
                </div>
             </div>
           )}
        </FadeIn>

        <FadeIn delay="300ms"><div className="bg-[#E31C3C] rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(227,28,60,0.3)] mb-12 group active:scale-[0.98] transition-transform"><div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]"><div><p className="text-white/60 text-[11px] font-black uppercase tracking-[0.4em] mb-10">Cash Balance</p><h3 className="text-7xl font-black tracking-tighter">R{activeLoan ? activeLoan.totalRepayable.toFixed(2) : '0.00'}</h3></div><div className="flex gap-4"><button onClick={() => setActiveModal('repay')} className="bg-white text-[#E31C3C] px-8 py-4 rounded-2xl font-black text-[11px] uppercase active:scale-95 transition-all shadow-xl shadow-black/10">Repay</button><button onClick={() => activeLoan && setActiveModal('details')} className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl font-black text-[11px] uppercase active:scale-95 transition-all disabled:opacity-30">Details</button></div></div><div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[90px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition duration-1000"></div></div></FadeIn>

        <div className="grid grid-cols-2 gap-6 mb-16"><FadeIn delay="400ms"><div className="bg-slate-50 border border-slate-100 p-10 rounded-[3rem] text-center shadow-sm"><p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-5">Trust Score</p><h4 className="text-5xl font-black text-slate-900 tracking-tighter">{trustScore}</h4><div className="w-full bg-slate-200 h-1 rounded-full mt-4 overflow-hidden"><div className="bg-green-500 h-full transition-all duration-1000" style={{ width: `${(trustScore/850)*100}%` }}></div></div></div></FadeIn><FadeIn delay="550ms"><div className="bg-[#F26D23] p-10 rounded-[3rem] text-center text-white shadow-2xl shadow-[#F26D23]/20"><p className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] mb-5">Referrals</p><h4 className="text-5xl font-black tracking-tighter">{userData?.referralCount || '00'}</h4><p className="text-[8px] font-black text-white/50 uppercase tracking-widest mt-2 leading-none">{userData?.referralCount >= 2 ? '5% Discount' : 'Earn 5% OFF'}</p></div></FadeIn></div>

        <FadeIn delay="700ms"><div className="flex justify-between items-end mb-8 px-4"><h4 className="text-2xl font-black text-slate-900 tracking-tight">Recent activity</h4><button className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">History</button></div><div className="space-y-5 pb-20">{loans.length === 0 ? (<div className="py-24 text-center bg-slate-50 border border-slate-100 rounded-[3rem] text-slate-300 font-black text-[11px] uppercase tracking-[0.5em] px-10">Hub Empty</div>) : (loans.map(loan => (<div key={loan.id} className="flex items-center justify-between p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm active:scale-95 transition-all group"><div className="flex items-center gap-6"><div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${loan.status === 'repaid' ? 'bg-green-50 text-green-500' : 'bg-[#F26D23]/5 text-[#F26D23]'}`}>{loan.status === 'repaid' ? <CheckCircle2 size={24}/> : <CircleDollarSign size={24} />}</div><div><p className="font-black text-slate-900 text-lg tracking-tight">Buddy Payout</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{loan.createdAt?.toDate().toLocaleDateString()}</p></div></div><div className="text-right"><p className="font-black text-slate-900 text-xl tracking-tighter">R{loan.totalRepayable?.toFixed ? loan.totalRepayable.toFixed(2) : Number(loan.totalRepayable || 0).toFixed(2)}</p><span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full inline-block mt-2 ${loan.status === 'repaid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{loan.status}</span></div></div>)))}</div></FadeIn>
      </div>
      {activeModal === 'repay' && <RepayModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'details' && activeLoan && <DetailsModal loan={activeLoan} onClose={() => setActiveModal(null)} />}
    </div>
  )
}

// --- Admin Section ---
const LoanActionModal = ({ mode, loan, students, onClose, onAction }) => {
  const [selectedStudent, setSelectedStudent] = useState(loan?.userId || '')
  const [amount, setAmount] = useState(loan?.amount || 500)
  const [interest, setInterest] = useState(loan?.interest || 175)
  const [status, setStatus] = useState(loan?.status || 'approved')
  const student = students.find(s => s.id === selectedStudent)
  const handleAmountChange = (e) => { const val = Number(e.target.value); setAmount(val); setInterest(Math.round(val * 0.35)); }
  const handleSubmit = () => { if (!selectedStudent) return; onAction({ id: loan?.id, userId: selectedStudent, studentName: student?.name || loan?.studentName || student?.email?.split('@')[0], amount: Number(amount), interest: Number(interest), totalRepayable: Number(amount) + Number(interest), status, phone: student?.phone || loan?.phone || '' }); onClose(); }

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl">
        <h3 className="text-2xl font-black mb-6 tracking-tight">{mode === 'edit' ? 'Edit Loan' : 'Issue New Loan'}</h3>
        <div className="space-y-5">
           {mode !== 'edit' ? (
             <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-5 font-black text-sm appearance-none">
                <option value="">Select Registered Student</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.name || s.email}</option>)}
             </select>
           ) : (
             <div className="p-5 bg-slate-50 rounded-2xl"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Editing For</p><p className="font-black text-slate-900">{loan.studentName}</p></div>
           )}
           <div className="grid grid-cols-2 gap-4">
              <div><label className="text-[10px] font-black uppercase text-slate-400 ml-2">Amount</label><input type="number" value={amount} onChange={handleAmountChange} className="w-full bg-slate-50 border-none rounded-2xl p-5 font-black" /></div>
              <div><label className="text-[10px] font-black uppercase text-slate-400 ml-2">Interest</label><input type="number" value={interest} onChange={e => setInterest(Number(e.target.value))} className="w-full bg-slate-50 border-none rounded-2xl p-5 font-black" /></div>
           </div>
           {mode === 'edit' && (
             <div>
               <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Set Status</label>
               <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-5 font-black text-sm appearance-none">
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="repaid">Repaid</option>
                  <option value="rejected">Rejected</option>
               </select>
             </div>
           )}
           <button onClick={handleSubmit} className="w-full bg-black text-white py-5 rounded-2xl font-black shadow-lg active:scale-95 transition-all">Submit Entry</button>
           <button onClick={onClose} className="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Cancel</button>
        </div>
      </div>
    </div>
  )
}

const AdminPanel = ({ loans, users, applications, onUpdateStatus, onAddManualLoan, onDeleteLoan, onEditLoan }) => {
  const [modal, setModal] = useState({ show: false, mode: 'add', loan: null })
  const totalLent = loans.filter(l => l.status === 'approved' || l.status === 'repaid').reduce((a, b) => a + b.amount, 0)
  const totalProfit = loans.filter(l => l.status === 'repaid').reduce((a, b) => a + (b.totalRepayable - b.amount), 0)
  const sendReminder = (loan) => { /* TODO: Replace with email/SMS reminder integration */ }

  const pendingApplications = (applications || []).filter(app => app.status === 'pending')
  const hasNewApplications = pendingApplications.length > 0

  const handleApplicationClick = (application = null) => {
    const app = application || (pendingApplications.length > 0 ? pendingApplications[0] : null)
    if (!app) return
    const message = `Hello, this is Buddy Loans. We have received a loan application from ${app.userName}. Please proceed with approval.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-48 px-8 overflow-x-hidden">
      <div className="max-w-md mx-auto">
        <header className="mb-14 flex justify-between items-end"><div><h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-3 leading-none">Pipeline.</h2><p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.6em] pl-1">TECH2BUDDY EXECUTIVE</p></div><button onClick={() => setModal({ show: true, mode: 'add', loan: null })} className="bg-black text-white p-4 rounded-2xl shadow-xl active:scale-90 transition-all"><Plus size={24}/></button></header>
        
        {hasNewApplications && (
          <div 
            onClick={handleApplicationClick}
            className="mb-8 bg-[#E31C3C] rounded-[2.5rem] p-6 shadow-xl border border-[#E31C3C]/20 cursor-pointer active:scale-[0.98] transition-all group hover:shadow-2xl hover:shadow-[#E31C3C]/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight mb-1">Buddy Loans – New Loan Application</h3>
                  <p className="text-white/80 text-xs font-medium">{pendingApplications.length} {pendingApplications.length === 1 ? 'application' : 'applications'} pending review</p>
                </div>
              </div>
              <ArrowRight className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 mb-12"><div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col justify-between h-44"><p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">Out Flow</p><h4 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">R{totalLent}</h4></div><div className="bg-[#E31C3C] p-10 rounded-[3.5rem] text-white shadow-2xl h-44 flex flex-col justify-between"><p className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] mb-8">Yield</p><h4 className="text-4xl font-black tracking-tighter leading-none">R{totalProfit.toFixed(2)}</h4></div></div>
        
        <div className="mb-12">
        <AdminApplications appId={appId} applications={applications} />
        </div>
        
        <div className="mb-12">
          <AdminDocuments />
        </div>
        <div className="space-y-6">{loans.map(loan => (
             <div key={loan.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 group transition-all duration-500 hover:shadow-2xl"><div className="flex justify-between items-start mb-8"><div className="flex items-center gap-6"><div className="w-14 h-14 bg-[#E31C3C] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-inner">{loan.studentName?.charAt(0)}</div><div><p className="font-black text-slate-900 text-lg leading-tight">{loan.studentName}</p><p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">#{loan.userId.slice(-6)}</p></div></div><div className="flex flex-col items-end gap-1"><button onClick={() => setModal({ show: true, mode: 'edit', loan })} className="p-2 text-slate-200 hover:text-blue-500 transition-colors"><Edit3 size={16}/></button><button onClick={() => onDeleteLoan(loan.id)} className="p-2 text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={16}/></button><button onClick={() => sendReminder(loan)} className="p-2 text-slate-200 hover:text-green-500 transition-colors"><MessageSquare size={16}/></button></div></div>
                <div className="flex justify-between items-end mb-8 px-2"><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Amount</p><p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">R{loan.totalRepayable.toFixed(2)}</p></div><div className="text-right"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p><p className={`text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full ${loan.status === 'repaid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>{loan.status}</p></div></div><div className="flex gap-3">{loan.status === 'pending' && (<><button onClick={() => onUpdateStatus(loan.id, 'rejected')} className="flex-1 bg-slate-100 text-slate-400 py-4 rounded-2xl text-[10px] font-black uppercase active:scale-95 transition-all">Decline</button><button onClick={() => onUpdateStatus(loan.id, 'approved')} className="flex-[2] bg-black text-white py-4 rounded-2xl text-[10px] font-black uppercase shadow-lg active:scale-95 transition-all">Approve</button></>)}{loan.status === 'approved' && (<button onClick={() => onUpdateStatus(loan.id, 'repaid')} className="w-full bg-green-500 text-white py-5 rounded-2xl text-[11px] font-black uppercase shadow-lg active:scale-95 transition-all">Verify Settlement</button>)}</div></div>
           ))}</div>
      </div>
      {modal.show && (<LoanActionModal mode={modal.mode} loan={modal.loan} students={users} onClose={() => setModal({ show: false, mode: 'add', loan: null })} onAction={(data) => { if (modal.mode === 'add') onAddManualLoan(data); else onEditLoan(data); }} />)}
    </div>
  )
}

// --- Main App Controller ---
// --- Main App Controller ---
export default function FullApp() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('home')
  const [userData, setUserData] = useState(null)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false); 
  const [allLoans, setAllLoans] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [userLoans, setUserLoans] = useState([])
  const [showAdminAuth, setShowAdminAuth] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginModalMode, setLoginModalMode] = useState('register');
  const [requestedAmount, setRequestedAmount] = useState(500);

  const handleLogout = async () => {
    await signOut(auth);
    setView('home');
  };


  const onApplicationSuccess = async () => {
    if (!firebaseReady || !user) return;
    try {
      const profileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
      await updateDoc(profileRef, { 
        verificationStatus: 'pending', 
        amountRequested: requestedAmount, 
        applicationSubmitted: false 
      });
    } catch (error) {
      console.error('Error updating user profile after application:', error);
    }
  };

  const openLoginModal = (mode = 'register') => {
    setLoginModalMode(mode);
    setShowLoginModal(true);
  }

  useEffect(() => {
    if (!firebaseReady) {
      console.warn('[Firebase] Firebase not ready');
      setLoading(false);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [firebaseReady]);

  useEffect(() => {
    if (user && !user.isAnonymous) {
      const profileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
      const unsubscribeProfile = onSnapshot(profileRef, 
        (docSnap) => {
          if (docSnap.exists()) {
            console.log('[Firebase] User profile updated:', docSnap.data());
            setUserData(docSnap.data());
          } else {
            console.log('[Firebase] No user profile found for this user.');
            setUserData(null); // Explicitly null if no profile
          }
          setLoading(false);
        },
        (error) => {
          console.error('[Firebase] Error listening to user profile:', error);
          setUserData(null);
          setLoading(false);
        }
      );
      return () => unsubscribeProfile();
    } else if (!user) {
      // User is logged out
      setUserData(null);
      setLoading(false);
    }
    // If user is anonymous, we do nothing and wait for them to log in or register.
  }, [user]);

  useEffect(() => {
    if (!firebaseReady || !user) {
      console.log('[Firebase] Not ready or no user:', { firebaseReady, user: !!user })
      return
    }
    console.log('[Firebase] Setting up user data listener for:', user.uid)
    const profileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data')
    const unsubProfile = onSnapshot(
      profileRef, 
      (d) => {
        const data = d.exists() ? d.data() : { role: 'student', registered: false, name: '', referralCount: 0, verificationStatus: 'none' }
        console.log('[Firebase] User profile data:', data)
        setUserData(data)
        if (data.applicationSubmitted) {
          setApplicationSubmitted(true)
        }
      },
      (err) => {
        console.error('[Firebase] Error reading user profile:', err)
      }
    )
    const loanCol = collection(db, 'artifacts', appId, 'users', user.uid, 'loans')
    const unsubLoans = onSnapshot(
      loanCol, 
      (s) => {
        const loans = s.docs.map(d => ({ id: d.id, ...d.data() }))
        console.log('[Firebase] User loans:', loans.length)
        setUserLoans(loans)
      },
      (err) => {
        console.error('[Firebase] Error reading user loans:', err)
      }
    )
    return () => { unsubProfile(); unsubLoans() }
  }, [user])

  useEffect(() => {
    if (firebaseReady && user && userData?.role === 'admin') {
      const allCol = collection(db, 'artifacts', appId, 'public', 'data', 'all_loans');
      const unsubAll = onSnapshot(allCol, (s) => setAllLoans(s.docs.map(d => ({ id: d.id, ...d.data() }))));

      const usersCol = collection(db, 'artifacts', appId, 'public', 'data', 'users_directory');
      const unsubUsers = onSnapshot(usersCol, (s) => setAllUsers(s.docs.map(d => ({ id: d.id, ...d.data() }))));

      return () => { 
        unsubAll(); 
        unsubUsers(); 
      };
    }
  }, [firebaseReady, user, userData]);

  const [allApplications, setAllApplications] = useState([])
  
  useEffect(() => {
    if (firebaseReady && user && userData?.role === 'admin') {
      const appsCol = collection(db, 'artifacts', appId, 'public', 'data', 'loan_applications');
      const unsubApps = onSnapshot(
        query(appsCol, orderBy('createdAt', 'desc')),
        (s) => {
          setAllApplications(s.docs.map(d => ({ id: d.id, ...d.data() })));
        },
        (err) => {
          console.error('Error fetching applications:', err);
        }
      );
      return () => unsubApps();
    }
  }, [firebaseReady, user, userData]);

  const addManualLoan = async (loanData) => {
    const loan = { ...loanData, createdAt: Timestamp.now(), dueDate: Timestamp.fromDate(new Date(Date.now() + 31 * 24 * 60 * 60 * 1000)) }
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'all_loans'), loan)
    await addDoc(collection(db, 'artifacts', appId, 'users', loanData.userId, 'loans'), loan)
  }

  const editLoan = async (loanData) => {
    const { id, userId, ...updates } = loanData
    await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'all_loans', id), updates)
  }

  const updateStatus = async (id, status) => { await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'all_loans', id), { status }) }
  const deleteLoan = async (id) => { await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'all_loans', id)) }

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  const [registeredUserData, setRegisteredUserData] = useState(null)

  const handleLoginSuccess = async (authDetails) => {
    if (!firebaseReady) throw new Error('Firebase not ready');

    const { email, password, name, surname } = authDetails;
    const isRegistration = name && surname;

    try {
      let userCredential;
      if (isRegistration) {
        // Register
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('[Registration] User created successfully:', user.uid);

        const userProfileData = {
          id: user.uid,
          name: `${name} ${surname}`,
          email: user.email,
          registered: true,
          createdAt: Timestamp.now(),
          role: 'user',
          referralCount: 0,
          verificationStatus: 'unverified',
          applicationSubmitted: false
        };

        const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
        await setDoc(userDocRef, userProfileData);
        
        // This will be picked up by the auth state listener
        setShowWelcomeMessage(true);
        setTimeout(() => {
          setShowWelcomeMessage(false);
          setView('dashboard');
        }, 3000);

      } else {
        // Login
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('[Login] User signed in successfully:', userCredential.user.uid);
      }
      
      setShowLoginModal(false);

    } catch (error) {
      console.error('Authentication error:', error.message);
      throw error; // Re-throw to be handled in the modal
    }
  };

  const handleAdminVerify = async () => { 
    if (!firebaseReady || !user) {
      console.error('Firebase not ready or user not authenticated')
      return
    }
    try {
      const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
      await updateDoc(userDocRef, { role: 'admin' });
      // Manually update local state to reflect the change immediately
      setUserData(prevData => ({ ...prevData, role: 'admin' }));
      setShowAdminAuth(false);
      setView('admin');
    } catch (error) {
      console.error('Error setting admin role:', error)
    }
  }

  const AdminAuthModal = ({ onClose, onVerify }) => {
    const [key, setKey] = useState('')
    const [error, setError] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = async () => { 
      console.log('[Admin] Admin auth attempt, key entered:', key.substring(0, 3) + '...')
      if (key === ADMIN_SECRET_PASS) {
        setIsSubmitting(true)
        try {
          await onVerify()
        } catch (err) {
          console.error('[Admin] Error verifying admin:', err)
          setIsSubmitting(false)
        }
      } else { 
        console.log('[Admin] Invalid admin key')
        setError(true)
        setTimeout(() => setError(false), 1000) 
      } 
    }
    return (
      <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in duration-500">
        <div className={`bg-white rounded-[3rem] p-12 w-full max-w-sm shadow-2xl transition-transform ${error ? 'animate-shake' : ''}`}>
          <div className="w-16 h-16 bg-[#E31C3C]/5 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-inner">
            <Shield className="text-[#E31C3C]" size={36} />
          </div>
          <h3 className="text-3xl font-black text-center mb-2 text-slate-900 tracking-tight">Admin Terminal</h3>
          <p className="text-slate-500 text-center text-sm font-medium mb-12 px-2 leading-relaxed text-balance">Enter executive access key.</p>
          <input 
            type="password" 
            value={key} 
            onChange={e => setKey(e.target.value)} 
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
            placeholder="••••••••" 
            className="w-full bg-slate-50 border-none rounded-[2rem] p-7 text-center text-3xl font-black outline-none focus:ring-8 focus:ring-[#E31C3C]/5 mb-10 transition-all" 
          />
          <div className="flex gap-4">
            <button onClick={onClose} disabled={isSubmitting} className="flex-1 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] text-slate-400 bg-slate-50 disabled:opacity-50">Back</button>
            <button onClick={handleSubmit} disabled={isSubmitting} className="flex-[2] py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] text-white bg-black shadow-2xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Authorize'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleProtectedAction = (targetView) => {
    if (userData?.registered) {
      setView(targetView);
    } else {
      // If a non-registered user tries to access a protected view, show the login form.
      openLoginModal(targetView === 'apply' ? 'register' : 'login');
    }
  }

  if (loading) return (<div className="h-screen bg-white flex items-center justify-center"><div className="relative"><div className="w-16 h-16 border-4 border-slate-100 border-t-[#E31C3C] rounded-full animate-spin"></div></div></div>)

  return (
    <div className="bg-white min-h-screen selection:bg-[#E31C3C]/10 selection:text-[#E31C3C] antialiased text-slate-900 overflow-x-hidden">
      <Navbar 
        setView={setView} 
        currentView={view} 
        isAdminVerified={userData?.role === 'admin'} 
        onProtectedAction={handleProtectedAction}
        onAdminTrigger={() => setShowAdminAuth(true)}
        onLogout={handleLogout}
        user={user}
        userData={userData}
      />
      <main>
        {view === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <AppleHero onApply={() => openLoginModal('register')} onAdminTrigger={() => { 
              console.log('[Admin] Admin trigger clicked - opening admin auth modal')
              setShowAdminAuth(true) 
            }} />
            <StudentHustle />
            <BentoFeatures />
            <JourneyTimeline />
            <FAQAccordion />
            <div className="py-24 px-8 text-center bg-[#E31C3C] rounded-t-[4rem] text-white shadow-2xl"><h3 className="text-4xl font-black mb-6 tracking-tight">Ready?</h3><p className="text-white/60 mb-12 text-sm font-medium leading-relaxed text-balance mx-auto">Identify and enter your Hub to get verified.</p><button onClick={() => openLoginModal('register')} className="bg-white text-[#E31C3C] px-14 py-6 rounded-[2.5rem] font-black shadow-2xl active:scale-95 transition-all text-lg tracking-tight">Start Registration</button></div>
            <footer className="pt-32 pb-64 px-10 text-center bg-[#E31C3C] opacity-70"><div className="max-w-md mx-auto space-y-8 flex flex-col items-center text-white"><div className="flex justify-center gap-3 grayscale group cursor-default text-white"><div className="w-10 h-10 bg-white rounded-2xl group-hover:rotate-12 transition-all shadow-xl" /><span className="font-black text-sm uppercase tracking-[0.5em] pt-2.5">Tech2Buddy</span></div><p className="text-[9px] font-black uppercase tracking-[0.7em] leading-relaxed">All Rights Reserved <br/> South Africa</p></div></footer>
          </div>
        )}
        {view === 'dashboard' && (
          userData?.registered ?
          <DashboardView 
            loans={userLoans} 
            user={user} 
            userData={userData} 
            onApplicationSuccess={onApplicationSuccess}
            requestedAmount={requestedAmount}
            setRequestedAmount={setRequestedAmount}
          /> :
          <div className="h-screen flex flex-col items-center justify-center p-8 text-center"><Lock className="text-[#E31C3C] mb-4" size={48} /><h2 className="text-3xl font-black mb-2 tracking-tight">Hub Locked</h2><p className="text-slate-500 mb-8 max-w-xs">Identification required for Hub access.</p><button onClick={() => openLoginModal('login')} className="bg-[#E31C3C] text-white px-10 py-5 rounded-3xl font-black shadow-xl active:scale-95 transition-all">Identify Myself</button></div>
        )}
        {view === 'admin' && userData?.role === 'admin' ? <AdminPanel loans={allLoans} users={allUsers} applications={allApplications} onUpdateStatus={updateStatus} onAddManualLoan={addManualLoan} onDeleteLoan={deleteLoan} onEditLoan={editLoan} /> : null}
      </main>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLoginSuccess} initialMode={loginModalMode} />}
      {showAdminAuth && <AdminAuthModal onClose={() => setShowAdminAuth(false)} onVerify={handleAdminVerify} />}
      {showWelcomeMessage && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="bg-white rounded-[3rem] p-12 w-full max-w-sm shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600" size={48} />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Welcome!</h3>
            <p className="text-lg font-medium text-slate-600 mb-2">Hello, {registeredUserData?.name || 'Buddy'}!</p>
            <p className="text-sm text-slate-500 mb-8">Your registration was successful. Redirecting to your Hub...</p>
            <Loader2 className="w-6 h-6 animate-spin text-[#E31C3C] mx-auto" />
          </div>
        </div>
      )}
      {!firebaseReady && (
        <div className="fixed bottom-4 left-4 right-4 z-[200]">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-sm">
            Firebase is not configured. Create a .env from .env.example and fill your Firebase keys. The UI loads, but Firestore actions will be disabled.
          </div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -40px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        .animate-blob { animation: blob 15s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 5s; }
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-6 { transform: rotateY(6deg) rotateX(2deg); }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
        input::placeholder { color: #cbd5e1; font-weight: 500; }
        .animate-in { animation-fill-mode: both; }
      `}</style>
    </div>
  )
}

// --- Login & Registration ---
const LoginModal = ({ onClose, onLogin, initialMode = 'register' }) => {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const authDetails = mode === 'register' 
      ? { name, surname, email, password } 
      : { email, password };

    if ((mode === 'register' && (!name.trim() || !surname.trim())) || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(authDetails);
      // The parent component will handle closing the modal on success
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl relative overflow-hidden text-center">
        <div className="w-16 h-16 bg-[#E31C3C]/5 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner"><LogIn className="text-[#E31C3C]" size={32} /></div>
        <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{mode === 'register' ? 'Buddy Register' : 'Welcome Back'}</h3>
        <p className="text-slate-500 text-sm font-medium mb-8 px-4">{mode === 'register' ? 'Start your journey with student info.' : 'Enter your credentials to continue.'}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Name</label>
                <input required type="text" placeholder="John" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-6 text-lg font-black outline-none focus:ring-4 focus:ring-[#E31C3C]/5" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Surname</label>
                <input required type="text" placeholder="Doe" value={surname} onChange={(e) => setSurname(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-6 text-lg font-black outline-none focus:ring-4 focus:ring-[#E31C3C]/5" />
              </div>
            </div>
          )}
          
          <div><label className="text-[10px] font-black uppercase text-slate-400 ml-4">Student Email</label><input required type="email" placeholder="student@spu.ac.za" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-6 text-lg font-black outline-none focus:ring-4 focus:ring-[#E31C3C]/5" /></div>
          
          <div className="relative">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Password</label>
            <input required type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-6 text-lg font-black outline-none focus:ring-4 focus:ring-[#E31C3C]/5 pr-16" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-0.5 mt-2 text-slate-400 hover:text-slate-600">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {error && <div className="bg-red-50 text-red-700 text-sm font-medium p-3 rounded-xl border border-red-200">{error}</div>}
          
          <button disabled={isLoading} type="submit" className="w-full bg-black text-white py-6 rounded-2xl font-black text-base shadow-xl active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 mt-2">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === 'register' ? 'Register' : 'Sign In')}
          </button>
        </form>
        
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="mt-6 text-xs font-bold text-slate-500 hover:text-slate-900">
          {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Sign In'}
        </button>
        <button onClick={onClose} className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900">Go Back</button>
      </div>
    </div>
  )
}
