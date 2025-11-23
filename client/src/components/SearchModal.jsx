import Modal from '@mui/material/Modal'
import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../context/UserDataCOntext'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import { config } from '../config';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { SearchResultCard } from './SearchResultCard';



export const SearchModal = () => {

    const [searchValue, setSearchValue] = useState("");

    const { searchResults, setSearchResults, setUserChat, userChat, openNewChat, setOpenNewChat, modelOpen, handleModalClose } = useContext(UserDataContext)

    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
    }

    useEffect(() => {

        if (!searchValue) {
            return;
        }

        const timerId = setTimeout(() => {
            async function search() {
                try {
                    const response = await fetch(`${config.BACKEND_URL}/api/users/search?searchTerm=${searchValue}`, {
                        // credentials: 'include',
                        headers: {
                            Authorization: `bearer ${localStorage.getItem('token')}`
                        }
                    });
                    if (response.status === 200) {
                        const data = await response.json();
                        setSearchResults(data.data)
                    }
                    else {
                        enqueueSnackbar(response.json().message, { variant: 'error' })
                    }
                }
                catch (err) {
                    console.error("error while fetchin search users", err)
                }
            }

            search();
        })

        return () => clearTimeout(timerId);

    }, [searchValue])






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
                                onChange={handleSearchInput}
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


                        {searchResults.map((ele) => (
                            <SearchResultCard ele={ele} />
                        ))}

                    </div>


                </div>

            </Modal>
        </div>
    )
}
