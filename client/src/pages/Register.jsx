import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React from 'react'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { CiAt } from "react-icons/ci";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { AiFillMessage } from 'react-icons/ai';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export const Register = () => {
    return (
        <div className='h-screen flex justify-center items-center'>

            <div className='w-[500px] flex flex-col gap-5 shadow-2xl/30 rounded-xl px-8 py-8' style={{}}>
                <div className='flex justify-center flex-col items-center gap-3'>
                    <AiFillMessage color='gray' className='text-3xl' />
                    <h1 className='font-bold text-2xl'>Create Account</h1>
                    <p className='text-gray-500'>Join our community and start chatting</p>

                </div>

                <div>
                    <form className='flex flex-col gap-5'>
                        <div>
                            <Typography variant='body1'>Full Name</Typography>
                            <TextField
                                slotProps={{
                                    input: {
                                        startAdornment: (< InputAdornment position='start'>
                                            <PersonOutlinedIcon />

                                        </InputAdornment>)
                                    }
                                }
                                }
                                variant='outlined'
                                placeholder='Your full name'
                                fullWidth
                            />
                        </div>

                        <div>
                            <Typography variant='body1'>Email address</Typography>
                            <TextField
                                slotProps={{
                                    input: {
                                        startAdornment: (< InputAdornment position='start'>
                                            <MailOutlineOutlinedIcon />

                                        </InputAdornment>)
                                    }
                                }
                                }
                                variant='outlined'
                                placeholder='name@example.com'
                                fullWidth
                            />
                        </div>

                        <div>
                            <Typography variant='body1'>Username</Typography>
                            <TextField
                                slotProps={{
                                    input: {
                                        startAdornment: (< InputAdornment position='start'>
                                            <CiAt />

                                        </InputAdornment>)
                                    }
                                }
                                }
                                variant='outlined'
                                placeholder='Choose a username'
                                fullWidth
                            />
                        </div>

                        <div>
                            <Typography variant='body1'>Password</Typography>
                            <TextField
                                slotProps={{
                                    input: {
                                        startAdornment: (< InputAdornment position='start'>
                                            <LockOpenOutlinedIcon />

                                        </InputAdornment>)
                                    }
                                }
                                }
                                variant='outlined'
                                placeholder='Choose a strong password'
                                fullWidth
                            />
                        </div>

                        <Button type='submit' variant='contained' color='primary'>Create Account</Button>

                        <Typography sx={{ textAlign: 'center' }} variant='body2'>Already have an accout? <Link to='/login' className='text-blue-500 cursor-pointer' >Sign in</Link></Typography>

                    </form>
                </div>
            </div >
        </div >
    )
}
