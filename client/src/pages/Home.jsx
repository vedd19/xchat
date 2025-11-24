import React, { useContext, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { EmptyChat } from '../components/EmptyChat'
import { UserDataContext } from '../../context/UserDataContext'
import { ActiveChat } from '../components/ActiveChat'
import { Link, useNavigate } from 'react-router-dom'
import { Login } from './Login'

export const Home = () => {
    const { openNewChat } = useContext(UserDataContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }

    }, [])
    // if (!) {
    //     navigate('/login');
    //     return;
    // }

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
