import React, { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { UserDataContext } from '../../context/UserDataCOntext';
import { SearchModal } from './SearchModal';

export const Sidebar = () => {

    const { handleModalOpen } = useContext(UserDataContext)

    return (
        <div className='w-[100%] border-r-1 border-gray-200 h-full'>
            <div className="w-full bg-[#7952b3] px-3 py-2 flex justify-between text-white items-center">
                <div className="flex gap-2">
                    <div className="">
                        <img src="" alt="profile" />
                    </div>

                    <div className="flex flex-col">
                        <p>world</p>
                        <p>@world</p>
                    </div>
                </div>

                <div>
                    <LogoutIcon />
                </div>
            </div>

            <div className="m-3">
                <Button
                    variant='contained'
                    onClick={handleModalOpen}
                    fullWidth
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                >
                    New Chat
                </Button>

                <SearchModal />
            </div>

            <div className="border-t-1 border-gray-300">
                <h2 className='text-gray-500 font-medium'>RECENT CHATS</h2>
                <div className="text-gray-500 text-center mt-10 p-4">
                    <TextsmsOutlinedIcon sx={{ fontSize: '2rem' }} />
                    <p className='text-md font-medium'>No conversation yet</p>
                    <p>Search for users to start chatting</p>
                </div>
            </div>


        </div>
    )
}
