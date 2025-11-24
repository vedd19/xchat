import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../../context/UserDataContext'
import { getOrCreateRoom } from '../firebase/chatService'

export const SearchResultCard = ({ ele }) => {

    const { loggedinUser, userChat, setUserChat, setOpenNewChat, handleModalClose, chatList, setChatList } = useContext(UserDataContext)
    const handleProfileClick = async (ele) => {
        await setUserChat(ele)
        await setOpenNewChat(true);


        const existsInList = chatList?.some((c) => c.username === ele.username);

        if (!existsInList) {
            setChatList((prev) => [...prev, ele]);
        }

        console.log("chatlist", chatList, ele);

        await getOrCreateRoom(loggedinUser.user._id, ele._id)
        handleModalClose();

    }

    return (
        <div id={`user-result-${ele._id}`} onClick={() => handleProfileClick(ele)} className="flex gap-2 items-center mt-3 shadow-sm py-2 px-2">
            <div className='rounded-[50%] h-[2rem] w-[2rem]'>
                <img height="100%" width='100%' src={ele.avatar} alt="img" />
            </div>
            <div className='text-gray-500 flex flex-col'>
                <p>{ele.fullName}</p>
                <p>{ele.username}</p>
                <p>{ele.email}</p>
            </div>
        </div>
    )
}
