import { useReducer, useEffect, useState } from 'react'
import { appFirestore } from '../firebase/config'
import {
  collection,
  addDoc,
  // updateDoc,
  // deleteDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const useFirestore = (c) => {
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = collection(appFirestore, c)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })
    // console.log(doc)
    setIsPending(true)

    try {
      // const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await addDoc(ref, doc)
      // console.log(addedDocument)
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
      setMessage('Submitted Successfully')
      setIsPending(false)
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      setIsError(err.message)
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })
    setIsPending(true)

    try {
      const deleteDocument = doc(ref, id)
      await deleteDoc(deleteDocument)
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  const updateDocument = async (id, update) => {
    dispatch({ type: 'IS_PENDING' })
    // console.log(update)
    setIsPending(true)

    try {
      // const createdAt = timestamp.fromDate(new Date())
      const updateDocument = doc(ref, id)
      await updateDoc(updateDocument, update)
      // console.log(updateDocument)
      dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updateDocument,
      })
      setMessage('Updated Successfully')
      setIsPending(false)
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      setIsError(err.message)
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {
    addDocument,
    deleteDocument,
    updateDocument,
    response,
    message,
    isError,
    isPending,
  }
}
