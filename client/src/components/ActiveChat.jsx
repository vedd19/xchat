import React, { useContext } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import { EmptyChat } from './EmptyChat';
import { UserDataContext } from '../../context/UserDataCOntext';
import TextField from '@mui/material/TextField';

export const ActiveChat = () => {
    const { userChat } = useContext(UserDataContext);
    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div className="bg-white flex justify-between p-3 shadow-md w-full">
                <div className="flex gap-3 items-center h-[2rem]">
                    <div className="h-[2rem] w-[2rem]">
                        <img height='h-full' src={userChat.avatar} alt="dp" />
                    </div>
                    <div className="flex flex-col">
                        <p>{userChat.fullName}</p>
                        <p className='text-gray-500'>Last seen 5 min ago</p>
                    </div>
                </div>
                <div className="">
                    <MoreVertOutlinedIcon />
                </div>
            </div>

            <div className="">
                <EmptyChat isUser={true} />
            </div>

            <div className="">

                <TextField
                    sx={{ paddingRight: '0px' }}
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (< InputAdornment position='start'>
                                <SentimentSatisfiedOutlinedIcon />
                            </InputAdornment>),
                            endAdornment: (<InputAdornment position='end'>
                                <div className=" bg-blue-300 p-2 rounded cursor-pointer">
                                    <SendIcon sx={{ color: 'white' }} />
                                </div>
                            </InputAdornment>)
                        }
                    }}
                    placeholder='Type your message...'
                />
            </div>

        </div>
    )
}
