import { useState, useEffect } from 'react'
import { appAuth, appFirestore } from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  // updateProfile,
  // sendPasswordResetEmail,
} from 'firebase/auth'
import { setDoc, doc, Timestamp } from 'firebase/firestore'

export default function useSignup() {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const signup = async (email, password, name) => {
    setError(null)
    setIsPending(true)
    setSuccess(null)

    try {
      // signup
      const result = await createUserWithEmailAndPassword(
        appAuth,
        email,
        password
      )
      // .then(
      // (userCred) => {
      //   updateProfile(userCred.user, { displayName, photoURL })
      // }
      // )
      // await sendPasswordResetEmail(appAuth, email)
      await setDoc(doc(appFirestore, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        created: Timestamp.fromDate(new Date()),
        isOnline: false,
      })

      setSuccess('User Created Successfully')
      setIsPending(false)
      setError(null)

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      setError(err.message)
      setIsPending(false)
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending, success }
}
