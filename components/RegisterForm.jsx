"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('user exist');
    const [error, setError] = useState('');
    const router=useRouter();
    const  handleSubmit=async(e)=>{
        e.preventDefault();
        if (!name || !email || !password) {
            setError('fill up all the field');
            return;
            
        }
        try{
         const userExist=await   fetch('api/userExists',{
                method:'POST',
                  headers:{
                    'content-type': 'application/json'
                },
                  body:JSON.stringify({email})
            })
            console.log('user exist',userExist);
            const {user}=await userExist.json();
           if (user) {
            setError('user is already exist');
            return;
            
           }
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  password,
                }),
              });
              
console.log('response',res);

   
    

if (res.ok) {
    const form = e.target;
    form.reset();
    router.push('/')
    
  }
else{
    console.log('user registration is failed');
}
        }catch(error){
            console.log('error during resigtration',error);

        }
    }
    return (
        <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-t-green-400'>
         <h2 className='uppercase text-2xl font-bold my-4'>Register Now</h2>
         <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
             <input type="text" placeholder='enter name'  onChange={(e)=>setName(e.target.value)}/>
             <input type="email" placeholder='enter email' onChange={(e)=>setEmail(e.target.value)}/>
             <input type="password"  placeholder='enter password' onChange={(e)=>setPassword(e.target.value)}/>
             
             <button  className='bg-green-600 text-white font-bold py-2 px-6'>Register</button>
             {
error && 
            ( <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                 {error}
             </div>)
             }
             <Link className='text-sm mt-3 text-right' href={'/'}>
               Already have an account? <span className='underline'>
                     Login
                 </span>
             </Link>
         </form>
        </div>
         
     </div>
    );
};

export default RegisterForm;