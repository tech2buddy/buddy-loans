import React, { useEffect, useMemo, useState } from 'react'
import {
  Smartphone,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Lock,
  Clock,
  ArrowRight,
  Upload,
  FileUp,
  Shield,
  CreditCard,
  User,
  Wifi,
  Book,
  ShoppingCart,
  MapPin,
  LogIn,
  Plus,
  Trash2,
  Edit3,
  MessageSquare,
  FlaskConical,
  Loader2,
  CircleDollarSign,
  ChevronDown
} from 'lucide-react'

// App config (LOCAL ONLY)
const ADMIN_WHATSAPP_NUMBER = '27671732265' // 067 173 2265

// Small utility
const FadeIn = ({ children, delay = '0ms' }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: delay }}>{children}</div>
)

// Navbar
const Navbar = ({ setView, currentView, isAdmin, onProtectedAction }) => (
  <nav className="fixed bottom-8 left-0 right-0 z-[100] px-6 pointer-events-none">
    <div className="max-w-md mx-auto flex justify-between items-center bg-[#E31C3C]/90 backdrop-blur-2xl border border-white/20 p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto">
      <button onClick={() => setView('home')} className={`flex-1 flex justify-center py-3.5 rounded-full transition-all duration-300 ${currentView === 'home' ? 'bg-white text-[#E31C3C] shadow-lg scale-105' : 'text-white/60'}`}><Zap size={20} /></button>
      <button onClick={() => onProtectedAction('dashboard')} className={`flex-1 flex justify-center py-3.5 rounded-full transition-all duration-300 ${currentView === 'dashboard' ? 'bg-white text-[#E31C3C] shadow-lg scale-105' : 'text-white/60'}`}><CreditCard size={20} /></button>
      {isAdmin && <button onClick={() => setView('admin')} className={`flex-1 flex justify-center py-3.5 rounded-full transition-all duration-300 ${currentView === 'admin' ? 'bg-white text-[#E31C3C] shadow-lg scale-105' : 'text-white/60'}`}><Shield size={20} /></button>}
      <button onClick={() => onProtectedAction('apply')} className={`flex-1 flex justify-center py-3.5 rounded-full transition-all bg-[#F26D23] text-white shadow-xl shadow-[#F26D23]/30 ml-1 active:scale-90`}><Plus size={22} strokeWidth={3} /></button>
    </div>
  </nav>
)

// Hero
const AppleHero = ({ onApply, onAdminTrigger }) => (
  <section className="min-h-screen pt-20 pb-20 px-8 flex flex-col justify-center items-center text-center overflow-hidden relative bg-white">
    <div className="absolute inset-0 -z-10 overflow-hidden"><div className="absolute top-[-5%] left-[-10%] w-[110%] h-[60%] bg-[#F7B3AD]/10 rounded-full blur-[120px] animate-blob"></div><div className="absolute bottom-[-5%] right-[-10%] w-[110%] h-[60%] bg-[#F26D23]/5 rounded-full blur-[120px] animate-blob animation-delay-2000"></div></div>
    <FadeIn delay="100ms"><div onDoubleClick={onAdminTrigger} className="inline-flex items-center gap-2 bg-[#E31C3C]/5 border border-[#E31C3C]/10 px-5 py-2 rounded-full mb-8 shadow-sm cursor-default select-none transition-transform active:scale-95"><span className="text-[10px] font-black text-[#E31C3C] uppercase tracking-[0.3em]">Powered by TECH2BUDDY</span></div></FadeIn>
    <FadeIn delay="250ms"><h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1] tracking-tighter mb-8 text-balance">Buddy Loans. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31C3C] to-[#F26D23]">Your campus Buddy.</span></h1></FadeIn>
    <FadeIn delay="400ms"><p className="text-lg text-slate-500 font-medium max-w-[280px] mx-auto leading-relaxed mb-12">Get up to an <span className="text-slate-900 font-black">R500 loan</span> with a fixed <span className="text-slate-900 font-black border-b-2 border-[#F26D23]">35% interest</span>. Fast Cash when you need it most.</p></FadeIn>
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
          { time: '00:15', title: 'Upload', desc: 'Send your docs to WhatsApp from Hub.', icon: <FileUp size={22}/> },
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
    { q: 'How do I upload docs?', a: 'Go to your Buddy Hub, find the Documents section, and click upload to send them via WhatsApp.' }
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

// Modals
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
             <div className="w-full border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center text-slate-500 text-xs">
               Proof-of-payment uploads are disabled in Local mode.
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
           <div><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Issued On</p><p className="text-lg font-black text-slate-900">Recently</p></div>
        </div>
        <div className="flex gap-5">
           <div className="w-12 h-12 bg-[#E31C3C]/5 rounded-2xl flex items-center justify-center text-[#E31C3C]"><CheckCircle2 size={24}/></div>
           <div><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Repay By</p><p className="text-lg font-black text-[#E31C3C]">TBD</p></div>
        </div>
      </div>
      <button onClick={onClose} className="w-full bg-black text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest mt-12 active:scale-95 shadow-xl transition-all">Dismiss</button>
    </div>
  </div>
)

// Dashboard (local state)
const DashboardView = ({ loans, userData, onStatusChange, onSetPending }) => {
  const [activeModal, setActiveModal] = useState(null)
  const [requestedAmount, setRequestedAmount] = useState(500)
  const isAmountValid = useMemo(() => Number.isFinite(requestedAmount) && requestedAmount >= 100 && requestedAmount <= 500, [requestedAmount])

  const activeLoan = loans.find(l => l.status === 'approved' || l.status === 'pending')
  const repaidCount = loans.filter(l => l.status === 'repaid').length
  const trustScore = Math.min(850, 450 + (repaidCount * 100))

  const handleDocumentBatchUpload = async () => {
    if (!isAmountValid) return
    onSetPending({ amountRequested: requestedAmount })
    // In Local mode, document upload is not available.
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-48 px-8 overflow-x-hidden">
      <div className="max-w-md mx-auto">
        <header className="mb-14"><FadeIn delay="100ms"><h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-3 leading-none capitalize">Hello, {userData?.name?.split(' ')[0] || 'Buddy'}.</h2><div className="flex items-center gap-2.5"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div><p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Verified Member</p></div></FadeIn></header>

        <FadeIn delay="200ms">
           {userData?.verificationStatus === 'pending' ? (
             <div className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 mb-12 shadow-xl relative overflow-hidden text-white">
                <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 animate-pulse"><Clock size={20}/></div><h4 className="text-xl font-black tracking-tight">Pending Approval</h4></div>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">Docs received. Verification in progress.</p>
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

                <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">Upload the 4 required documents for approval (disabled in Local mode).</p>
                <div className="space-y-3 mb-10">{['Proof of Registration', 'Proof of Residence', '3 Months Bank Statement', 'ID Photo'].map(docName => (
                  <div key={docName} className="flex items-center gap-3 py-1">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100"><CheckCircle2 className="text-slate-200" size={12}/></div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{docName}</span>
                  </div>
                ))}</div>

                <button onClick={handleDocumentBatchUpload} disabled={!isAmountValid} className={`w-full rounded-2xl p-6 flex items-center justify-center gap-4 active:scale-95 transition-all shadow-xl ${!isAmountValid ? 'bg-slate-200 text-slate-400' : 'bg-black text-white'}`}><span className="font-black text-sm">Mark as Docs Uploaded (Local)</span><Upload size={20}/></button>
             </div>
           )}
        </FadeIn>

        <FadeIn delay="300ms"><div className="bg-[#E31C3C] rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(227,28,60,0.3)] mb-12 group active:scale-[0.98] transition-transform"><div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]"><div><p className="text-white/60 text-[11px] font-black uppercase tracking-[0.4em] mb-10">Cash Balance</p><h3 className="text-7xl font-black tracking-tighter">R{activeLoan ? Number(activeLoan.totalRepayable || 0).toFixed(2) : '0.00'}</h3></div><div className="flex gap-4"><button onClick={() => setActiveModal('repay')} className="bg-white text-[#E31C3C] px-8 py-4 rounded-2xl font-black text-[11px] uppercase active:scale-95 transition-all shadow-xl shadow-black/10">Repay</button><button onClick={() => activeLoan && setActiveModal('details')} className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl font-black text-[11px] uppercase active:scale-95 transition-all disabled:opacity-30">Details</button></div></div><div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[90px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition duration-1000"></div></div></FadeIn>

        <div className="grid grid-cols-2 gap-6 mb-16"><FadeIn delay="400ms"><div className="bg-slate-50 border border-slate-100 p-10 rounded-[3rem] text-center shadow-sm"><p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-5">Trust Score</p><h4 className="text-5xl font-black text-slate-900 tracking-tighter">{trustScore}</h4><div className="w-full bg-slate-200 h-1 rounded-full mt-4 overflow-hidden"><div className="bg-green-500 h-full transition-all duration-1000" style={{ width: `${(trustScore/850)*100}%` }}></div></div></div></FadeIn><FadeIn delay="550ms"><div className="bg-[#F26D23] p-10 rounded-[3rem] text-center text-white shadow-2xl shadow-[#F26D23]/20"><p className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] mb-5">Referrals</p><h4 className="text-5xl font-black tracking-tighter">{userData?.referralCount || '00'}</h4><p className="text-[8px] font-black text-white/50 uppercase tracking-widest mt-2 leading-none">{userData?.referralCount >= 2 ? '5% Discount' : 'Earn 5% OFF'}</p></div></FadeIn></div>

        <FadeIn delay="700ms"><div className="flex justify-between items-end mb-8 px-4"><h4 className="text-2xl font-black text-slate-900 tracking-tight">Recent activity</h4><button className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">History</button></div><div className="space-y-5 pb-20">{loans.length === 0 ? (<div className="py-24 text-center bg-slate-50 border border-slate-100 rounded-[3rem] text-slate-300 font-black text-[11px] uppercase tracking-[0.5em] px-10">Hub Empty</div>) : (loans.map(loan => (<div key={loan.id} className="flex items-center justify-between p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm active:scale-95 transition-all group"><div className="flex items-center gap-6"><div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${loan.status === 'repaid' ? 'bg-green-50 text-green-500' : 'bg-[#F26D23]/5 text-[#F26D23]'}`}>{loan.status === 'repaid' ? <CheckCircle2 size={24}/> : <CircleDollarSign size={24} />}</div><div><p className="font-black text-slate-900 text-lg tracking-tight">Buddy Payout</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today</p></div></div><div className="text-right"><p className="font-black text-slate-900 text-xl tracking-tighter">R{Number(loan.totalRepayable || 0).toFixed(2)}</p><span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full inline-block mt-2 ${loan.status === 'repaid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{loan.status}</span></div></div>)))}</div></FadeIn>
      </div>
      {activeModal === 'repay' && <RepayModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'details' && activeLoan && <DetailsModal loan={activeLoan} onClose={() => setActiveModal(null)} />}
    </div>
  )
}

// Admin (local)
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

const AdminPanel = ({ loans, users, onUpdateStatus, onAddManualLoan, onDeleteLoan, onEditLoan }) => {
  const [modal, setModal] = useState({ show: false, mode: 'add', loan: null })
  const totalLent = loans.filter(l => l.status === 'approved' || l.status === 'repaid').reduce((a, b) => a + (Number(b.amount) || 0), 0)
  const totalProfit = loans.filter(l => l.status === 'repaid').reduce((a, b) => a + ((Number(b.totalRepayable) || 0) - (Number(b.amount) || 0)), 0)
  const sendReminder = (loan) => { /* Local mode: no external messaging */ }
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-48 px-8 overflow-x-hidden">
      <div className="max-w-md mx-auto">
        <header className="mb-14 flex justify-between items-end"><div><h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-3 leading-none">Pipeline.</h2><p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.6em] pl-1">TECH2BUDDY EXECUTIVE</p></div><button onClick={() => setModal({ show: true, mode: 'add', loan: null })} className="bg-black text-white p-4 rounded-2xl shadow-xl active:scale-90 transition-all"><Plus size={24}/></button></header>
        <div className="grid grid-cols-2 gap-6 mb-12"><div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col justify-between h-44"><p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">Out Flow</p><h4 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">R{totalLent}</h4></div><div className="bg-[#E31C3C] p-10 rounded-[3.5rem] text-white shadow-2xl h-44 flex flex-col justify-between"><p className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] mb-8">Yield</p><h4 className="text-4xl font-black tracking-tighter leading-none">R{totalProfit.toFixed(2)}</h4></div></div>
        <div className="space-y-6">{loans.map(loan => (
             <div key={loan.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 group transition-all duration-500 hover:shadow-2xl"><div className="flex justify-between items-start mb-8"><div className="flex items-center gap-6"><div className="w-14 h-14 bg-[#E31C3C] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-inner">{loan.studentName?.charAt(0)}</div><div><p className="font-black text-slate-900 text-lg leading-tight">{loan.studentName}</p><p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">#{(loan.userId || '').slice(-6)}</p></div></div><div className="flex flex-col items-end gap-1"><button onClick={() => setModal({ show: true, mode: 'edit', loan })} className="p-2 text-slate-200 hover:text-blue-500 transition-colors"><Edit3 size={16}/></button><button onClick={() => onDeleteLoan(loan.id)} className="p-2 text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={16}/></button><button onClick={() => sendReminder(loan)} className="p-2 text-slate-200 hover:text-green-500 transition-colors"><MessageSquare size={16}/></button></div></div>
                <div className="flex justify-between items-end mb-8 px-2"><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Amount</p><p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">R{Number(loan.totalRepayable || 0).toFixed(2)}</p></div><div className="text-right"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p><p className={`text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full ${loan.status === 'repaid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>{loan.status}</p></div></div><div className="flex gap-3">{loan.status === 'pending' && (<><button onClick={() => onUpdateStatus(loan.id, 'rejected')} className="flex-1 bg-slate-100 text-slate-400 py-4 rounded-2xl text-[10px] font-black uppercase active:scale-95 transition-all">Decline</button><button onClick={() => onUpdateStatus(loan.id, 'approved')} className="flex-[2] bg-black text-white py-4 rounded-2xl text-[10px] font-black uppercase shadow-lg active:scale-95 transition-all">Approve</button></>)}{loan.status === 'approved' && (<button onClick={() => onUpdateStatus(loan.id, 'repaid')} className="w-full bg-green-500 text-white py-5 rounded-2xl text-[11px] font-black uppercase shadow-lg active:scale-95 transition-all">Verify Settlement</button>)}</div></div>
           ))}</div>
      </div>
      {modal.show && (<LoanActionModal mode={modal.mode} loan={modal.loan} students={users} onClose={() => setModal({ show: false, mode: 'add', loan: null })} onAction={(data) => { if (modal.mode === 'add') onAddManualLoan(data); else onEditLoan(data); }} />)}
    </div>
  )
}

// Login
const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleTestLogin = () => { setEmail('tester@spu.ac.za'); setPhone('0712345678') }
  const handleSubmit = (e) => { e.preventDefault(); setIsLoading(true); setTimeout(() => { onLogin(email, phone); setIsLoading(false) }, 600) }
  return (
    <div className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl relative overflow-hidden text-center">
        <div className="w-16 h-16 bg-[#E31C3C]/5 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner"><LogIn className="text-[#E31C3C]" size={32} /></div>
        <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Buddy Register</h3>
        <p className="text-slate-500 text-sm font-medium mb-8 px-4">Start your journey with student info.</p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div><label className="text-[10px] font-black uppercase text-slate-400 ml-4">Email</label><input required type="email" placeholder="student@spu.ac.za" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-6 text-lg font-black outline-none focus:ring-4 focus:ring-[#E31C3C]/5" /></div>
          <div><label className="text-[10px] font-black uppercase text-slate-400 ml-4">WhatsApp</label><input required type="tel" placeholder="071 234 5678" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-6 text-lg font-black outline-none focus:ring-4 focus:ring-[#E31C3C]/5" /></div>
          <button disabled={isLoading || !email || !phone} type="submit" className="w-full bg-black text-white py-6 rounded-2xl font-black text-base shadow-xl active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2 mt-2">{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enter Hub'}</button>
        </form>
        <button onClick={handleTestLogin} className="mt-6 flex items-center justify-center gap-2 w-full text-[10px] font-black uppercase tracking-widest text-[#F26D23] bg-[#F26D23]/5 py-3 rounded-xl active:scale-95 transition-all"><FlaskConical size={14} /> Use Test Account</button>
        <button onClick={onClose} className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900">Go Back</button>
      </div>
    </div>
  )
}

// Main Local App
export default function LocalApp() {
  const [view, setView] = useState('home')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [userData, setUserData] = useState({ role: 'student', registered: false, name: 'Student Buddy', email: 'student@spu.ac.za', referralCount: 0, verificationStatus: 'none' })
  const [users, setUsers] = useState([{ id: 'u1', name: 'student1', email: 'student1@spu.ac.za', phone: '0712345678', registered: true }])
  const [loans, setLoans] = useState([])

  const onProtectedAction = (targetView) => {
    if (targetView === 'apply') { setShowLoginModal(true); return }
    if (userData?.registered) setView(targetView)
    else setShowLoginModal(true)
  }

  const handleLoginSuccess = (email, phone) => {
    const name = email.split('@')[0]
    setUserData((p) => ({ ...p, email, name, registered: true }))
    if (!users.find(u => u.email === email)) setUsers((p) => [...p, { id: `u${p.length+1}`, name, email, phone, registered: true }])
    setView('dashboard'); setShowLoginModal(false)
  }

  const onSetPending = ({ amountRequested }) => {
    setUserData((p) => ({ ...p, verificationStatus: 'pending', amountRequested }))
  }

  const onUpdateStatus = (id, status) => {
    setLoans((prev) => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  const onAddManualLoan = (loan) => {
    const id = `loan_${Date.now()}`
    const newLoan = { id, ...loan }
    setLoans((p) => [newLoan, ...p])
  }

  const onDeleteLoan = (id) => setLoans((p) => p.filter(l => l.id !== id))
  const onEditLoan = (loan) => setLoans((p) => p.map(l => l.id === loan.id ? { ...l, ...loan } : l))

  return (
    <div className="bg-white min-h-screen selection:bg-[#E31C3C]/10 selection:text-[#E31C3C] antialiased text-slate-900 overflow-x-hidden">
      <Navbar setView={setView} currentView={view} isAdmin={userData?.role === 'admin'} onProtectedAction={onProtectedAction} />
      <main>
        {view === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <AppleHero onApply={() => setShowLoginModal(true)} onAdminTrigger={() => setUserData((p) => ({ ...p, role: p.role === 'admin' ? 'student' : 'admin' }))} />
            <StudentHustle />
            <BentoFeatures />
            <JourneyTimeline />
            <FAQAccordion />
            <div className="py-24 px-8 text-center bg-[#E31C3C] rounded-t-[4rem] text-white shadow-2xl"><h3 className="text-4xl font-black mb-6 tracking-tight">Ready?</h3><p className="text-white/60 mb-12 text-sm font-medium leading-relaxed text-balance mx-auto">Identify and enter your Hub to get verified.</p><button onClick={() => setShowLoginModal(true)} className="bg-white text-[#E31C3C] px-14 py-6 rounded-[2.5rem] font-black shadow-2xl active:scale-95 transition-all text-lg tracking-tight">Start Registration</button></div>
            <footer className="pt-32 pb-64 px-10 text-center bg-[#E31C3C] opacity-70"><div className="max-w-md mx-auto space-y-8 flex flex-col items-center text-white"><div className="flex justify-center gap-3 grayscale group cursor-default text-white"><div className="w-10 h-10 bg-white rounded-2xl group-hover:rotate-12 transition-all shadow-xl" /><span className="font-black text-sm uppercase tracking-[0.5em] pt-2.5">Tech2Buddy</span></div><p className="text-[9px] font-black uppercase tracking-[0.7em] leading-relaxed">All Rights Reserved <br/> South Africa</p></div></footer>
          </div>
        )}
        {view === 'dashboard' && (
          userData?.registered ? (
            <DashboardView loans={loans} userData={userData} onStatusChange={onUpdateStatus} onSetPending={onSetPending} />
          ) : (
            <div className="h-screen flex flex-col items-center justify-center p-8 text-center"><Lock className="text-[#E31C3C] mb-4" size={48} /><h2 className="text-3xl font-black mb-2 tracking-tight">Hub Locked</h2><p className="text-slate-500 mb-8 max-w-xs">Identification required for Hub access.</p><button onClick={() => setShowLoginModal(true)} className="bg-[#E31C3C] text-white px-10 py-5 rounded-3xl font-black shadow-xl active:scale-95 transition-all">Identify Myself</button></div>
          )
        )}
        {view === 'admin' && <AdminPanel loans={loans} users={users} onUpdateStatus={onUpdateStatus} onAddManualLoan={onAddManualLoan} onDeleteLoan={onDeleteLoan} onEditLoan={onEditLoan} />}
      </main>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLoginSuccess} />}
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
