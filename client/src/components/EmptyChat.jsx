import React from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsChatSquareTextFill } from "react-icons/bs";

export const EmptyChat = ({ isUser }) => {
    return (
        <div className='h-full' id='chat-layout'>
            <div className="h-full flex flex-col justify-center items-center">
                <div className='w-[4rem] h-[4rem] bg-blue-200 rounded-[50%] flex justify-center items-center'>
                    {isUser ? (<IoChatbubbleEllipsesOutline size={'small'} className=' text-blue-500 p-3' />) : (<BsChatSquareTextFill
                        size={"small"} className=' text-blue-500 p-3' />)}
                </div>

                {isUser ? (<p className='text-lg font-bold'>No messages yet</p>) :
                    (<p className='text-lg font-bold'>No chat selected</p>)}


                {isUser ? (<p className='text-base text-gray-600'>Send a message to start the conversation</p>) : (<p className='text-base text-gray-600'>Select a conversation from the sidebar to start a new chat to begin messaging</p>)}
            </div>

        </div>
    )
}
