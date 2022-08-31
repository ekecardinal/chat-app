import { appFirestore } from '../firebase/config'
import { getDoc, doc, collection } from 'firebase/firestore'

export const useDocument = (c) => {
  //   const [document, setDocument] = useState()
  let ref = collection(appFirestore, c)

  const document = (id) => {
    try {
      const report = doc(ref, id)
      return getDoc(report)
    } catch (error) {
      console.log(error.msg)
    }
  }
  //   console.log('document', document)

  return { document }
}
