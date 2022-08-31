import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import MessageForm from '../components/MessageForm'
import User from '../components/User'

//Hooks
import { useCollection } from '../hooks/useCollection'
import { useCollection1 } from '../hooks/useCollection1'
import { useAuthContext } from '../hooks/useAuthContext'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
  Timestamp,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { appFirestore } from '../firebase/config'
import Message from '../components/Message'
import Group from '../components/Group'

function Messenger() {
  const [chat, setChat] = useState('')
  const [text, setText] = useState('')
  const [msgs, setMsgs] = useState([])
  const [input1, setInput1] = useState('')
  const { documents } = useCollection('users')
  const { documents: groups } = useCollection1('groups')
  const { user: userM } = useAuthContext()
  const user1 = userM.uid

  const selectUser = async (user) => {
    setChat(user)
    setInput1('handle')
    // console.log('user', user)

    const user2 = chat.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const msgsRef = collection(appFirestore, 'messages', id, 'chat')
    const q = query(msgsRef, orderBy('createdAt', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      let msgs = []
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    })
    const docSnap = await getDoc(doc(appFirestore, 'lastMsg', id))
    if (docSnap.data()?.from !== user1) {
      await updateDoc(doc(appFirestore, 'lastMsg', id), { unread: false })
    }
  }
  //   console.log(chat)
  const selectGroup = async (group) => {
    setChat(group)
    setInput1('handle1')
    // console.log('group', group.uid)
    const id = group.uid
    const groupName = group.name
    const msgsRef = collection(appFirestore, 'messages', id, `${groupName}`)
    const q = query(msgsRef, orderBy('createdAt', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      let msgs = []
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const user1 = user.uid
    if (input1 === 'handle') {
      const user2 = chat.uid
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
      await addDoc(collection(appFirestore, 'messages', id, 'chat'), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
      })
      await setDoc(doc(appFirestore, 'lastMsg', id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        unread: true,
      })
    } else {
      try {
        const group = chat.name
        const id = chat.uid
        // console.log(id)
        await addDoc(collection(appFirestore, 'messages', id, `${group}`), {
          text,
          from: user1,
          //   to: user2,
          createdAt: Timestamp.fromDate(new Date()),
        })
        await setDoc(doc(appFirestore, 'lastMsg', id), {
          text,
          from: user1,
          //   to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          //   unread: true,
        })
      } catch (error) {
        console.log(error.message)
      }
    }

    setText('')
  }

  return (
    <Grid
      container
      className="container"
      sx={{
        overflow: 'hidden',
        // width: '100%',
        // height: 'calc(100vh-70px)',
      }}
    >
      <Grid item borderRight={2} md={4} sx={{ p: 3, overflowY: 'auto' }}>
        <Typography fontWeight="xl" mb={1} sx={{ letterSpacing: '0.15rem' }}>
          Users
        </Typography>
        {documents.map((user) => {
          return (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          )
        })}
        <Grid sx={{ borderTop: '1px solid', mt: 2 }}>
          <Typography fontWeight="xl" mb={1} sx={{ letterSpacing: '0.15rem' }}>
            Groups
          </Typography>
          {groups.map((group) => {
            return (
              <Group
                key={group.uid}
                selectGroup={selectGroup}
                chat={chat}
                user1={user1}
                group={group}
              />
            )
          })}
        </Grid>
      </Grid>

      <Grid item md={8} sx={{ position: 'relative', width: '100%' }}>
        {chat ? (
          <>
            <Grid
              sx={{
                p: 3,
                textAlign: 'center',
                borderBottom: '2px solid black',
              }}
            >
              <Typography variant="h4">{chat.name}</Typography>
            </Grid>
            <Grid className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </Grid>

            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </>
        ) : (
          <Grid
            sx={{ p: 3, textAlign: 'center', borderBottom: '2px solid black' }}
          >
            <Typography variant="h4">Select a user to start a chat</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default Messenger
