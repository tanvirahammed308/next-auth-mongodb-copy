'use client'

import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const UserInfo = () => {
  const{data:session}=useSession();
    return (
        <div className='grid place-items-center h-screen'>
          <div className='p-8 shadow-lg bg-zinc-300/10 flex flex-col gap-2 my-6'>
          <div>
            Name : <span className='font-bold'>{session?.user?.name}</span>
          </div>
          <div>
            Email : <span className='font-bold'>{session?.user?.email}</span>
          </div>
          <button className='bg-red-500 text-white font-bold  px-6 py-2 mt-3' onClick={()=>signOut()}>Log Out</button>
          </div>
        </div>
    );
};

export default UserInfo;