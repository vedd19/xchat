import Modal from '@mui/material/Modal'
import React, { useContext, useState } from 'react'
import { UserDataContext } from '../../context/UserDataCOntext'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';



export const SearchModal = () => {

    const { modelOpen, handleModalClose } = useContext(UserDataContext);


    return (
        <div className=''>
            <Modal
                open={modelOpen}
                onClose={handleModalClose}
            >

                <div className="w-[400px] absolute top-[50%] left-[50%] transform-[translate(-50%,-50%)]">
                    <div className="flex justify-between bg-blue-500 px-2 py-3 ">
                        <h2 className='text-white font-medium text-lg'>Find People to Chat</h2>
                        <CloseOutlinedIcon onClick={handleModalClose} className='text-white font-medium cursor-pointer' />
                    </div>


                    <div className="bg-white p-3">
                        <div className="">
                            <TextField
                                slotProps={{
                                    input: {
                                        startAdornment: (< InputAdornment position='start'>
                                            <SearchOutlinedIcon />
                                        </InputAdornment>)
                                    }
                                }
                                }
                                type='text'
                                fullWidth
                                placeholder='search for people'
                            />
                        </div>


                        <div className="">
                            <div className='rounded-[50%]'>
                                <img height="100%" src="" alt="" />
                            </div>
                            <div className='text-gray-500 flex flex-col'>
                                <p>name</p>
                                <p>username</p>
                                <p>email</p>
                            </div>
                        </div>

                    </div>


                </div>

            </Modal>
        </div>
    )
}
