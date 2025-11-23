import React from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export const EmptyChat = () => {
    return (
        <div className='h-full'>
            <div className="h-full flex flex-col justify-center items-center">
                <div className='w-[4rem] h-[4em] bg-blue-200 rounded-[50%] flex justify-center items-center'>
                    <IoChatbubbleEllipsesOutline size="small" className=' text-blue-500 p-3' />
                </div>
                <p className='text-lg font-bold'>No chat selected</p>
                <p className='text-base text-gray-600'>Select a conversation from the sidebar to start a new chat to begin messaging</p>
            </div>

        </div>
    )
}
