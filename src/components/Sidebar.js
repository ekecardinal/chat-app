import { Add, Search } from '@mui/icons-material'
import React from 'react'
import DirectMessage from './DirectMessage'
import GroupChat from './GroupChat'

const Sidebar = ({
    selectUser,
    user1,
    chat,
    documents,
    users,
    selectGroup,
    groups,
}) => {

    return (
        <div className='flex-grow max-w-7xl mx-auto lg:flex'>
            <div className='flex-1 min-w-0 bg-white xl:flex'>
                <div className='border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-80 xl:border-r xl-border-gray-200 px-2 h-screen'>
                    <div className='h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                        <div className='h-full relative'>
                            <div className='relative rounded-lg p-2 flex items-center space-x-3 hover:border-gray-400 mb-4'>
                                <div className="flex-1 min-w-0 flex items-center gap-4">
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                                            <Search />
                                        </div>
                                        <input
                                            name="search"
                                            className='focus:ring-cyan-500 border focus:border-slate-500 block w-full pr-10 sm:text-sm border-gray-100 rounded-full p-2 pl-2 outline-none hover:border-slate-300'
                                        />
                                    </div>
                                    <div className='h-7 w-7 rounded-lg border border-slate-400 cursor-pointer'>
                                        <Add />
                                    </div>
                                </div>
                            </div>
                            <GroupChat
                                selectGroup={selectGroup}
                                groups={groups}
                            />
                            <DirectMessage
                                selectUser={selectUser}
                                user1={user1}
                                chat={chat}
                                documents={documents}
                                users={users}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar