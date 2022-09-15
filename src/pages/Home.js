import React, { useEffect, useState } from 'react'
import ChatRoom from '../components/ChatRoom'
import Sidebar from '../components/Sidebar'
import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore'
import { appFirestore } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import { useCollection1 } from '../hooks/useCollection1'

const Home = () => {
    const [chat, setChat] = useState('')
    const [users, setUsers] = useState([])
    const [input1, setInput1] = useState('')
    const [msgs, setMsgs] = useState([])
    const [text, setText] = useState('')
    const { documents } = useCollection('users')
    const { documents: groups } = useCollection1('groups')
    const { user: userM } = useAuthContext()
    const user1 = userM.uid

    useEffect(() => {
        const usersRef = collection(appFirestore, 'users');
        const q = query(usersRef, where('uid', 'not-in', [user1]))
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = []
            querySnapshot.forEach((doc) => {
                users.push(doc.data())
            })
            setUsers(users)
        })
        return () => unsub()
    }, [user1])

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

        // console.log(msgs)
        const docSnap = await getDoc(doc(appFirestore, 'lastMsg', id))
        if (docSnap.data()?.from !== user1) {
            await updateDoc(doc(appFirestore, 'lastMsg', id), { unread: false })
        }
    }

    const handleChat = async (e) => {
        e.preventDefault()
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


    return (
        <div className='flex'>
            <Sidebar
                selectUser={selectUser}
                user1={user1}
                chat={chat}
                documents={documents}
                users={users}
                selectGroup={selectGroup}
                groups={groups}
            />
            <div className='w-full'>
                <ChatRoom
                    chat={chat}
                    handleChat={handleChat}
                    msgs={msgs}
                    text={text}
                    user1={user1}
                    setText={setText}
                />
            </div>
        </div>
    )
}

export default Home