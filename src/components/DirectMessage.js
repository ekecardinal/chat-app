import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import woman from '../assets/woman.jpg'
// import man from '../assets/man.jpg'
import { Divider } from '@mui/material'
import { doc, onSnapshot } from 'firebase/firestore'
import { appFirestore } from '../firebase/config'
import { useCollection } from '../hooks/useCollection'


const DirectMessage = ({ selectUser, user1, chat, documents }) => {
    const { documents: users } = useCollection('users')

    const user2 = () => {
        const user2 = users.filter((user) => user.uid)
        return user2
    }
    // const user2 = user?.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const [data, setData] = useState('')

    useEffect(() => {
        let unsub = onSnapshot(doc(appFirestore, 'lastMsg', id), (doc) => {
            setData(doc.data())
        })
        return () => unsub()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='mt-16 px-1'>
                <div className='text-gray-600 leading-loose my-2'>
                    RECENT CHAT
                </div>
                {documents.map((user) => {
                    return (
                        <div
                            key={user.uid}
                            onClick={() => selectUser(user)}
                        >
                            <div className='relative rounded-lg p-2 px-2 flex items-center space-x-3 hover:border-gray-400 focus-within:bg-slate-100 my-3 hover:bg-slate-100 transition duration-500 ease-in-out'>
                                <div className='flex-1 min-w-0'>
                                    <NavLink to="/" className='focus:outline-none flex'>
                                        <img
                                            src={woman}
                                            alt=""
                                            className='h-12 w-12 rounded-full mr-4 object-cover'
                                        />
                                        <div className='w-full'>
                                            <div className='flex justify-between'>
                                                <p className='text-sm font-bold text-cyan-600 truncate w-32'>
                                                    {user.name}
                                                </p>
                                                <div className='text-gray-400 text-xs'>
                                                    12:55 PM
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between mt-1'>
                                                {data && (
                                                    <div>
                                                        <p className='text-sm text-gray-500 truncate w-32'>{data.text}</p>
                                                        <div className='text-white text-xs bg-cyan-600 rounded-full px-1 py-0 h-3 w-3'></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                            <Divider />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DirectMessage