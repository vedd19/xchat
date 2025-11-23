import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { EmptyChat } from '../components/EmptyChat'

export const Home = () => {
    return (
        <div className="flex">
            <div className='h-screen'>
                <Sidebar />
            </div>

            <div className="h-screen">
                <EmptyChat />
            </div>
        </div>
    )
}
