import React from 'react'
import { NavLink } from "react-router";


const Navbar = () => {
    return (
        <nav className='glass flex justify-around p-4 items-center h-16 rounded-lg'>
            <div className='logo font-bold'>
                <a href="/">PassVault</a>
            </div>
            <ul >
                <li className='flex justify-between gap-12 items-center '>
                    <a className='hover:font-bold transition-all ease-in-out duration-150' href="/">Home</a>
                    <a className='hover:font-bold transition-all ease-in-out duration-150' href="/about">About</a>
                    <a className='hover:font-bold transition-all ease-in-out duration-150' href="/contact">Contact</a>
                </li>

            </ul>

        </nav>
    )
}

export default Navbar
