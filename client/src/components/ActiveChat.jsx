import React from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';

export const ActiveChat = ({ children }) => {
    return (
        <div>
            <div className="bg-white flex justify-between p-3 shadow-md">
                <div className="flex gap-3 items-center">
                    <img src="" alt="dp" />
                    <div className="flex flex-col">
                        <p>name</p>
                        <p className='text-gray-500'>Last seen 5 min ago</p>
                    </div>
                </div>
                <div className="">
                    <MoreVertOutlinedIcon />
                </div>
            </div>

            <div className="">
                {children}
            </div>

            <div className="">

                <TextField
                    slotProps={{
                        input: {
                            startAdornment: (< InputAdornment position='start'>
                                <SentimentSatisfiedOutlinedIcon />
                            </InputAdornment>),
                            endAdornment: (<InputAdornment position='end'>
                                <div className=" bg-blue-300">
                                    <SendIcon color='white' />
                                </div>
                            </InputAdornment>)
                        }
                    }}
                />
            </div>

        </div>
    )
}
