"use client"

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    // const [error, setError] = useState('invailed ')
    const router=useRouter();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
           const res= await signIn('credentials',{
              email,password,redirect:false  
            })
            console.log('log res',res);
            if (res.error) {
                setError('invailed credentails');
                return;
                
            }
            router.replace('dashbord')

        }catch(error){
            console.log(error);

        }

    }
    return (
        <div className='grid place-items-center h-screen'>
           <div className='shadow-lg p-5 rounded-lg border-t-4 border-t-green-400'>
            <h2 className='uppercase text-2xl font-bold my-4'>Login Now</h2>
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                <input type="email" placeholder='enter email' onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password"  placeholder='enter password' onChange={(e)=>setPassword(e.target.value)}/>
                <button className='bg-green-600 text-white font-bold py-2 px-6'>Login</button>
                {
                    error && (
                        <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                   {error}
                </div>
                    )
                }
                
                <Link className='text-sm mt-3 text-right' href={'/register'}>
                    Dont have an account? <span className='underline'>
                        Register
                    </span>
                </Link>
            </form>
           </div>
            
        </div>
    );
};

export default LoginForm;