import React from 'react'
import woman from '../assets/woman.jpg'

const Chat = ({
    chat,
    handleChat,
    msgs,
    user1,
}) => {
    return (
        <>
            {chat && (
                <form
                    onSubmit={handleChat}
                    className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
                >
                    {msgs.length ? msgs.map((msg, i) => (
                        <div key={i} className={msg.from === user1 ? 'flex items-end' : 'flex items-end flex-row-reverse justify-start'}>
                            <div className={
                                msg.from === user1 ?
                                    'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end'
                                    :
                                    'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'
                            }>
                                <div>
                                    <span className={
                                        msg.from === user1 ?
                                            'px-4 py-2 rounded-lg inline-block rounded-bl-none bg-cyan-600 text-white'
                                            :
                                            'px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-200 text-gray-600'
                                    }>
                                        {msg.text}
                                    </span>
                                </div>
                            </div>
                            <img
                                src={woman}
                                alt=""
                                className='w-6 h-6 rounded-full order-1 object-cover'
                            />
                        </div>
                    )) : null}

                </form>
            )}
        </>
    )
}

export default Chat