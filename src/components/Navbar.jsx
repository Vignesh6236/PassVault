import React from 'react'

const Navbar = () => {
    return (
        <div className='p-4'>

            <nav className='glass flex justify-around p-4 items-center h-16 rounded-lg '>
                <div className='logo font-bold flex justify-center items-center gap-3'>
                    <a href="/"><img className='h-14' src="/assets/icons/passvault.png" alt="passvault logo" /></a>
                    <a href="/">PassVault</a>
                </div>
                <p className='hidden md:block font-bold text-lg text-center pt-2'>Simplify access, amplify security.</p>

                <a href="https://github.com/Vignesh6236"><img className='h-16' src="/assets/icons/github.png" alt="github icon" /> </a>
            </nav>
        </div>
    )
}

export default Navbar
