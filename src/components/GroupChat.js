import React from 'react'
import { NavLink } from 'react-router-dom'
import { Divider } from '@mui/material'

const GroupChat = ({
    selectGroup,
    groups,
}) => {
    return (
        <div>
            <div className='mt-6 px-1'>
                <div className='text-gray-600 leading-loose my-2'>
                    GROUPS
                </div>
                {groups.map((group) => {
                    return (
                        <div
                            key={group.uid}
                            onClick={() => selectGroup(group)}
                        >
                            <div className='relative rounded-lg p-2 px-2 flex items-center space-x-3 hover:border-gray-400 focus-within:bg-slate-100 my-3 hover:bg-slate-100 transition duration-500 ease-in-out'>
                                <div className='flex-1 min-w-0'>
                                    <NavLink to="/" className='focus:outline-none'>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-sm font-bold text-cyan-600'>
                                                #{group.name}
                                            </p>
                                            <div className='text-gray-400 text-xs'>
                                                12:55 PM
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mt-1'>
                                            <p className='text-sm text-gray-500 truncate'>Hi everyone</p>
                                            <div className='text-white text-xs bg-cyan-600 rounded-full px-1 py-0 h-3 w-3'>

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

export default GroupChat