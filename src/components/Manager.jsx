import React from 'react'
import { useRef } from 'react'

const Manager = () => {

    const ref = useRef()

    const showPassword = () => {

        if (ref.current.src.includes("/assets/hide.png")) {
            ref.current.src = "/assets/show.png"
        } else {
            ref.current.src = "/assets/hide.png"
        }

    }



    return (
        <div className="container max-w-[75%] mx-auto my-4 p-4 flex flex-col items-center gap-4 glass rounded-xl ">
            <img className='h-24' src="/assets/passvault.png" alt="" />
            <h1 className='font-bold text-xl'>PassVault</h1>
            <p className='font-bold text-lg'>Simplify access, amplify security.</p>
            <div className='text-white flex flex-col p-4 w-full gap-6'>
                <input placeholder='Enter website URL:' className='m-2 border border-black rounded-full h-12 text-black p-2 w-full' type="text" />
                <div className="flex gap-2">
                    <div className='relative w-full'>
                        <input placeholder='Enter Username:' className='m-2 border border-black rounded-full h-12 text-black p-2 w-full' type="text" />
                    </div>
                    <div className='relative w-full'>
                        <input placeholder='Enter Password:' className='m-2 border border-black rounded-full h-12 text-black p-2 w-full' type="text" />
                        <img ref={ref} className='absolute h-8 top-4 right-1 cursor-pointer' src="/assets/show.png" alt="" onClick={showPassword} />
                    </div>
                </div>
            </div>
            <button className='glass py-3 m-4 rounded-full px-8 flex justify-center items-center gap-8 '>
                Add password
                <img className='h-10' src="/assets/password.png" alt="" />
            </button>
        </div>
    )
}

export default Manager
