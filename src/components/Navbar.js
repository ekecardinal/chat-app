import { MoreVert, Notifications, Search } from '@mui/icons-material'
import { Badge, IconButton, Menu, MenuItem } from '@mui/material'
import React from 'react'
import woman from '../assets/woman.jpg'
import { useLogout } from '../hooks/useLogout';

const ITEM_HEIGHT = 48;

const Navbar = ({ chat, selectUser }) => {
    const { logout } = useLogout()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='flex sm:items-center justify-between py-3 border-b border-gray-200 p-3'>
            {chat ? (
                <div className='flex items-center space-x-4'>
                    {chat === !selectUser && (
                        <img
                            src={woman}
                            alt=""
                            className='w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer object-cover'
                        />
                    )}
                    <div className='flex flex-col leading-tight'>
                        <div className='text-lg mt-1 flex flex-col'>
                            <span className='text-gray-800 mr-3'>{chat.name}</span>
                            {chat.isOnline ? (
                                <span className='text-xs text-gray-500'>Online</span>
                            ) : (
                                <span className='text-xs text-gray-500'>Offline</span>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='text-gray-800 text-lg mt'>Start Conversation</div>
            )}

            <div className='flex items-center space-x-2'>
                <IconButton>
                    <Search className='text-slate-900' />
                </IconButton>
                <IconButton>
                    <Badge variant="dot" color="error">
                        <Notifications className='text-slate-900' />
                    </Badge>
                </IconButton>
                <IconButton
                    onClick={handleClick}
                >
                    <MoreVert className='text-slate-900' />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    <MenuItem onClick={handleClose} disableRipple>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={logout} disableRipple>
                        Logout
                    </MenuItem>
                </Menu>
            </div>

        </div>
    )
}

export default Navbar