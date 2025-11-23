import React, { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { UserDataContext } from '../../context/UserDataCOntext';
import { SearchModal } from './SearchModal';


export const Sidebar = () => {

    const { handleModalOpen, chatList, setUserChat, setOpenNewChat } = useContext(UserDataContext)

    return (
        <div className='w-[100%] border-r-1 border-gray-200 h-full'>
            <div className="w-full bg-[#7952b3] px-3 py-2 flex justify-between text-white items-center">
                <div className="flex gap-2 items-center">
                    <div className="h-[2rem] w-[2rem] ">
                        <img height='100%' src={localStorage.getItem('avatar')} alt="profile" />
                    </div>

                    <div className="flex flex-col">
                        <p>{localStorage.getItem('fullName')}</p>
                        <p>@{localStorage.getItem('username')}</p>
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

                <div className='flex flex-col gap-4 mt-4'>
                    {chatList.length !== 0 ? (
                        chatList.map((ele) => {
                            return (
                                <div onClick={() => {
                                    setUserChat(ele)
                                    setOpenNewChat(true);
                                }} className='h-[3rem] flex gap-3 items-center p-2 cursor-pointer bg-blue-100 shadow-sm'>
                                    <div className="h-[2rem] w-[2rem] ">
                                        <img height='100%' src={ele.avatar} alt="img" />
                                    </div>
                                    <div className="text-gray-500">
                                        <p>{ele.fullName}</p>
                                    </div>
                                </div>)
                        })
                    ) : (
                        <div className="text-gray-500 text-center mt-10 p-4">
                            <TextsmsOutlinedIcon sx={{ fontSize: '2rem' }} />
                            <p className='text-md font-medium'>No conversation yet</p>
                            <p>Search for users to start chatting</p>
                        </div>
                    )}
                </div>


            </div>


        </div>
    )
}
