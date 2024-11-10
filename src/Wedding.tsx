import React from "react"
import { Link, Outlet } from 'react-router-dom';



const Wedding = () => {

    return (
        <div className='bg-[#FFFFFF] w-full h-full'>
            <Link to='address' className='flex justify-center items-center text-4xl'>
            </Link>
            <Outlet />
        </div>
    )
}

export default Wedding