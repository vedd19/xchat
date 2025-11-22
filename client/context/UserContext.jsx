import React from 'react'
import { UserDataContext } from './UserDataCOntext'

export const UserContext = ({ children }) => {



    return (
        <UserDataContext.Provider>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext;

