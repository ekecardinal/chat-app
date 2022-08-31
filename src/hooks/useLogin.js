import { useState, useEffect } from 'react'
import {
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { appAuth, appFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      const res = await signInWithEmailAndPassword(appAuth, email, password)
      await updateDoc(doc(appFirestore, 'users', res.user.uid), {
        isOnline: true,
      })

      //dispatch logout action
      dispatch({ type: 'LOGIN', payload: res.user })

      //update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      // console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  const forgotPassword = async (email) => {
    setError(null)
    setIsPending(true)
    try {
      await sendPasswordResetEmail(appAuth, email)
      if (!isCancelled) {
        setIsPending(false)
        setMessage('Check your mail for reset link')
      }
    } catch (error) {
      if (!isCancelled) {
        setError(
          'Email address not found, please enter the right email address'
        )
        setIsPending(false)
      }
      setError('Email address not found, please enter the right email address')
      setIsPending(false)
    }
  }

  const changePassword = async (oobCode, password) => {
    setError(null)
    setIsPending(true)
    try {
      await confirmPasswordReset(appAuth, oobCode, password)
      if (!isCancelled) {
        setIsPending(false)
        setMessage('Password reset successfull')
        navigate('/')
      }
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false)
      }
      if (error) {
        setError('Password should be at least 6 characters')
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, forgotPassword, isPending, error, message, changePassword }
}
