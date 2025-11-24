import React, { useState } from 'react'
import { UserDataContext } from './UserDataContext'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { config } from '../src/config';

export const UserContext = ({ children }) => {

    // const { enqueueSnackbar } = useSnackbar();

    const [modelOpen, setModelOpen] = useState(false);
    // const navigate = useNavigate();


    const [searchResults, setSearchResults] = useState([])
    const [userChat, setUserChat] = useState(null);
    const [openNewChat, setOpenNewChat] = useState(false)
    const [chatList, setChatList] = useState([])
    const [loggedinUser, setLoggedinUser] = useState(null);
    const [userRooms, setUserRooms] = useState([]);

    const [userData, setUserData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: ''
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleModalOpen = () => {
        setModelOpen(true);
        setOpenNewChat(false)
    }
    const handleModalClose = () => setModelOpen(false);





    return (
        <UserDataContext.Provider value={{ handleModalClose, handleModalOpen, modelOpen, userData, setUserData, loginData, setLoginData, searchResults, setSearchResults, setUserChat, userChat, openNewChat, setOpenNewChat, chatList, setChatList, loggedinUser, setLoggedinUser, userRooms, setUserRooms }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext;

