import React from 'react'

const Manager = () => {
    return (
        <div className="container mx-auto bg-red-300 max-w-4xl">
            <h1>PassVault</h1>
            <p>Simplify access, amplify security.</p>
            <div className='text-white flex flex-col p-4'>
                <input className='rounded-sm' type="text" />
                <div className="flex">
                    <input type="text" />
                    <input type="text" />
                </div>


            </div>
        </div>
    )
}

export default Manager
