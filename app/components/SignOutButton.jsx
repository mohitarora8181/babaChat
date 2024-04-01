'use client'

import React from 'react'
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
    const { data: session } = useSession();
    return (
        <>
            {session && <button className='self-center p-2 px-6 border max-sm:text-sm mr-20 max-sm:mr-5 max-sm:px-3 hover:border-lime-400 bg-white rounded-full' onClick={()=>signOut()}>Sign Out</button>}
        </>
    )
}

export default SignOutButton
