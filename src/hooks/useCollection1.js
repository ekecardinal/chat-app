import { useEffect, useState } from 'react'
import { appFirestore } from '../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'

export const useCollection1 = (c) => {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    let ref = collection(appFirestore, c)
    // const q = query(ref, where('uid', 'not-in', [appAuth.currentUser.uid]))

    const unsub = onSnapshot(ref, (querySnapshot) => {
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
