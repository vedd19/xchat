import React, { useState } from 'react'
import { UserDataContext } from './UserDataCOntext'

export const UserContext = ({ children }) => {

    const [modelOpen, setModelOpen] = useState(false);

    const handleModalOpen = () => setModelOpen(true);
    const handleModalClose = () => setModelOpen(false);



    return (
        <UserDataContext.Provider value={{ handleModalClose, handleModalOpen, modelOpen }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext;

