import { useEffect, useState } from 'react'
import { appFirestore, appAuth } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const useCollection = (c) => {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    let ref = collection(appFirestore, c)
    const q = query(ref, where('uid', 'not-in', [appAuth.currentUser.uid]))

    const unsub = onSnapshot(q, (querySnapshot) => {
      let results = []
      querySnapshot.forEach((doc) => {
        results.push(doc.data())
      })
      setDocuments(results)
    })
    return () => unsub()
  }, [c])
  return { documents }
}
