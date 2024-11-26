import React from 'react'
import { NavLink } from "react-router";


const Navbar = () => {
    return (
        <div className='p-4'>

            <nav className='glass flex justify-around p-4 items-center h-16 rounded-lg '>
                <div className='logo font-bold flex justify-center items-center gap-3'>
                    <a href="/"><img className='h-14' src="../../assets/passvault.png" alt="" /></a>
                    <a href="/">PassVault</a>
                </div>
                <ul className='px-1'>
                    <li className='flex justify-between gap-12 items-center '>
                        <a className='hover:font-bold transition-all ease-in-out duration-150' href="/">Home</a>
                        <a className='hover:font-bold transition-all ease-in-out duration-150' href="/about">About</a>
                        <a className='hover:font-bold transition-all ease-in-out duration-150' href="/contact">Contact</a>
                    </li>

                </ul>

            </nav>
        </div>
    )
}

export default Navbar
