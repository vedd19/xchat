import React, { useContext } from 'react'
import { Sidebar } from '../components/Sidebar'
import { EmptyChat } from '../components/EmptyChat'
import { UserDataContext } from '../../context/UserDataCOntext'
import { ActiveChat } from '../components/ActiveChat'

export const Home = () => {
    const { openNewChat } = useContext(UserDataContext)
    return (
        <div className="flex">
            <div className='h-screen'>
                <Sidebar />
            </div>

            <div className="h-screen w-full">
                {openNewChat ? <ActiveChat /> : <EmptyChat isUser={false} />}
            </div>
        </div>
    )
}
