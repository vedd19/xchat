import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react'
import { AiFillMessage } from "react-icons/ai";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <div className='h-screen flex justify-center items-center'>

            <div className='w-[500px] flex flex-col gap-5 shadow-2xl/30 rounded-xl px-8 py-8' style={{}}>
                <div className='flex justify-center flex-col items-center gap-3'>
                    <AiFillMessage color='gray' className='text-3xl' />
                    <h1 className='font-bold text-2xl'>Welcome Back</h1>
                    <p className='text-gray-500'>Sign in to continue to ChatApp</p>

                </div>

                <div>
                    <form className='flex flex-col gap-5'>
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
                                placeholder='Enter your password'
                                fullWidth
                            />
                        </div>

                        <Button type='submit' variant='contained' color='primary'>Sign in</Button>

                        <Typography sx={{ textAlign: 'center' }} variant='body2'>Don't have an account? <Link to='/register' className='text-blue-500 cursor-pointer' >Sign up</Link></Typography>

                    </form>
                </div>
            </div >
        </div >
    )
}
