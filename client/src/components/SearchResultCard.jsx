import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../../context/UserDataCOntext'

export const SearchResultCard = ({ ele }) => {

    const { userChat, setUserChat, setOpenNewChat, handleModalClose, chatList, setChatList } = useContext(UserDataContext)
    const handleProfileClick = async (ele) => {
        await setUserChat(ele)
        await setOpenNewChat(true);

        // function setListValues() {

        let existsInList = false;
        chatList?.forEach((e) => {
            if (e.username === ele.username) {
                existsInList = true;
            }
        })

        if (!existsInList) {
            let newList = await [...chatList];
            await newList.push(ele);
            await setChatList(newList)
        }

        // }

        // await setListValues();

        console.log("chatlist", chatList, ele)
        handleModalClose();
    }

    // useEffect(() => {


    // }, [userChat])
    return (
        <div onClick={() => handleProfileClick(ele)} className="flex gap-2 items-center mt-3 shadow-sm py-2 px-2">
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
