import React, { useState } from 'react'
import { storage, db, firebaseReady, auth } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Upload, Loader2 } from 'lucide-react'

export default function DocumentsUpload({ userEmail, userId, onSuccess }) {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState('')

  const onSelect = (e) => {
    setFile(e.target.files?.[0] || null)
    setMessage('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (!firebaseReady) { setMessage('Firebase not initialized.'); return }
    if (!file) { setMessage('Please select a file.'); return }

    try {
      setIsUploading(true)
      // This matches the /user_docs/{userId}/ logic in the rules above
      const storageRef = ref(storage, `user_docs/${auth.currentUser.uid}/${file.name}` );
      const fileRef = storageRef
      await uploadBytes(fileRef, file)
      const downloadURL = await getDownloadURL(fileRef)
      const docRef = await addDoc(collection(db, 'documents'), {
        fileName: file.name,
        downloadURL,
        userEmail: userEmail || 'anonymous',
        userId: userId || null,
        createdAt: serverTimestamp()
      })
      setMessage('Upload complete. Thank you!')
      setFile(null)
      if (typeof onSuccess === 'function') onSuccess({ id: docRef.id, fileName: file.name, downloadURL })
    } catch (err) {
      console.error(err)
      setMessage('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-3">Upload Verification Document</label>
      <input type="file" onChange={onSelect} className="w-full mb-4" />
      <button disabled={isUploading || !file} type="submit" className={`w-full rounded-2xl p-4 flex items-center justify-center gap-2 ${!file ? 'bg-slate-200 text-slate-400' : 'bg-black text-white'}`}>
        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload size={18} />}<span className="font-black text-xs uppercase tracking-widest">Upload to Firebase</span>
      </button>
      {message && <p className="mt-3 text-xs text-slate-500">{message}</p>}
    </form>
  )
}
