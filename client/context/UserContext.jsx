import React, { useState } from 'react'
import { UserDataContext } from './UserDataCOntext'

export const UserContext = ({ children }) => {

    const [modelOpen, setModelOpen] = useState(false);


    const [searchResults, setSearchResults] = useState([])
    const [userChat, setUserChat] = useState(null);
    const [openNewChat, setOpenNewChat] = useState(false)
    const [chatList, setChatList] = useState([])

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
        <UserDataContext.Provider value={{ handleModalClose, handleModalOpen, modelOpen, userData, setUserData, loginData, setLoginData, searchResults, setSearchResults, setUserChat, userChat, openNewChat, setOpenNewChat, chatList, setChatList }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext;

