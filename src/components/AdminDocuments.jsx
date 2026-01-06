import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

export default function AdminDocuments() {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'documents'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [])

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
      <h3 className="text-xl font-black mb-4 tracking-tight">Documents</h3>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400">
            <th className="py-2 pr-4">File Name</th>
            <th className="py-2 pr-4">User Email</th>
            <th className="py-2 pr-4">Timestamp</th>
            <th className="py-2 pr-4">Link</th>
          </tr>
        </thead>
        <tbody>
          {docs.map(row => (
            <tr key={row.id} className="border-t border-slate-100">
              <td className="py-2 pr-4 font-medium text-slate-800">{row.fileName}</td>
              <td className="py-2 pr-4 text-slate-600">{row.userEmail}</td>
              <td className="py-2 pr-4 text-slate-600">{row.createdAt?.toDate ? row.createdAt.toDate().toLocaleString() : '—'}</td>
              <td className="py-2 pr-4"><a className="text-blue-600 underline" href={row.downloadURL} target="_blank" rel="noreferrer">Open</a></td>
            </tr>
          ))}
          {docs.length === 0 && (
            <tr><td className="py-4 text-slate-400" colSpan={4}>No documents found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
