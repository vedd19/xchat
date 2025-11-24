import React, { useContext, useEffect, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { UserDataContext } from '../../context/UserDataContext';
import { SearchModal } from './SearchModal';
import { getAllRooms, getUserRooms, listenRooms } from '../firebase/chatService';
import { config } from '../config';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';


export const Sidebar = () => {

    const { userRooms, setUserRooms, loggedinUser, setLoggedinUser, handleModalOpen, chatList, setUserChat, setOpenNewChat } = useContext(UserDataContext)

    const [sidebarRoomdata, setSidebarRoomdata] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUserRooms = async () => {
    //         const userrooms = await getAllRooms();
    //         setUserRooms(userrooms);
    //     };
    //     fetchUserRooms();
    // }, [chatList])



    useEffect(() => {
        const ids = userRooms.map(room =>
            Object.keys(room.users).find(uid => uid !== localStorage.getItem("id"))
        );

        const fetchUsers = async () => {
            const result = [];

            for (let uid of ids) {
                const res = await fetch(`${config.BACKEND_URL}/api/users/get-user-details?userId=${uid}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const data = await res.json();
                result.push(data.data);
            }

            setSidebarRoomdata(result);
        };

        fetchUsers();
    }, [userRooms]);

    useEffect(() => {
        getUserRooms(localStorage.getItem('id'), (rooms) => {
            setUserRooms(rooms);
        });
    }, []);



    const handleLogout = async () => {

        try {
            const res = await fetch(`${config.BACKEND_URL}/api/users/logout`, {
                method: 'GET',
                headers: {
                    Authorization: `bearer ${localStorage.getItem('token')}`
                },

            })
            if (res.status === 200) {
                window.location.reload();
                enqueueSnackbar("You are now logged out", { variant: "error" })
                setLoggedinUser(null)
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
        catch (err) {
            console.log("error while logout", err)
        }
    }

    return (
        <div className='w-[100%] border-r-1 border-gray-200 h-full'>
            <div className="w-full bg-[#7952b3] px-3 py-2 flex justify-between text-white items-center">
                <div className="flex gap-2 items-center">
                    <div className="h-[2rem] w-[2rem] ">
                        <img height='100%' src={localStorage.getItem('avatar')} alt="profile" />
                    </div>

                    <div className="flex flex-col">
                        <p id='user-name'>{localStorage.getItem('fullName')}</p>
                        <p id='user-username'>@{localStorage.getItem('username')}</p>
                    </div>
                </div>

                <div>
                    <LogoutIcon id="logout-button" onClick={handleLogout} />
                </div>
            </div>

            <div className="m-3">
                <Button
                    id='new-chat-button'
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
                    {sidebarRoomdata.length !== 0 ? (
                        sidebarRoomdata.map((ele) => {
                            return (
                                <div
                                    id={`room-${ele._id}`}
                                    onClick={() => {
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
