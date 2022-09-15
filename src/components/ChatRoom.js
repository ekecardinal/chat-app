import { Send } from '@mui/icons-material'
import React from 'react'
import Chat from './Chat'
import Navbar from './Navbar'

const ChatRoom = ({ chat, handleChat, msgs, text, user1, setText, selectUser }) => {
    return (
        <div className='flex-1 p:2 sm:pb-6  flex flex-col h-screen xl:flex bg-slate-100'>
            <Navbar
                chat={chat}
                selectUser={selectUser}
            />
            <Chat
                chat={chat}
                handleChat={handleChat}
                msgs={msgs}
                text={text}
                user1={user1}
                setText={setText}
            />
            <form
                onSubmit={handleChat}
                className='pt-4 mt-auto'>
                <div className='relative flex px-4'>
                    {/* <span className='absolute inset-y-0 flex items-center'>
                                <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                    <Mic />
                                </button>
                            </span> */}
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Write something'
                        type="text"
                        className='focus:ring-cyan-500 border focus:border-slate-500 w-full focus:placeholder-gray-200 text-gray-600 placeholder-gray-300 pl-4 bg-white rounded-full py-3 border-gray-200 outline-none hover:border-slate-300'
                    />
                    <span className='flex items-center ml-2'>
                        <button type='submit' className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-cyan-600'>
                            <Send />
                        </button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default ChatRoom