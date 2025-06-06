import React from 'react'

function page() {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-100'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-4xl font-bold text-red-400'>Unauthorized</h1>
                <p className='text-lg'>You do not have permission to access this page.</p>
            </div>
        </div>
    )
}

export default page