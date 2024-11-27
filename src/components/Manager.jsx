import React from 'react'
import { useRef, useState, useEffect } from 'react'





const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("password");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);





    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/assets/icons/hide.png")) {
            ref.current.src = "/assets/icons/show.png"
            passwordRef.current.type = "password"
        } else {
            passwordRef.current.type = "text"
            ref.current.src = "/assets/icons/hide.png"
        }

    }

    const savePassword = () => {

        const updatedPasswords = [...passwordArray, form];
        setPasswordArray(updatedPasswords);
        localStorage.setItem("password", JSON.stringify(updatedPasswords)); // Match the key here
        console.log(updatedPasswords);
    };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyPassword = (password) => {
        navigator.clipboard.writeText(password)
        alert("Password copied to clipboard!");
    };


    return (
        <div className="container max-w-[75%] mx-auto my-4 p-4 flex flex-col items-center gap-4 glass rounded-xl h-[82%]">
            <img className='h-14' src="/assets/icons/passvault.png" alt="passvault logo" />
            <h1 className='font-bold text-xl'>PassVault</h1>
            <p className='font-bold text-lg'>Simplify access, amplify security.</p>
            <div className='text-white flex flex-col p-4 w-full gap-4'>
                <input value={form.site} onChange={handleChange} placeholder='Enter website URL:' className='m-2 border border-black rounded-full h-12 text-black p-2 w-full' type="text" name='site' />
                <div className="flex gap-2">
                    <div className='relative w-full'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username:' className='m-2 border border-black rounded-full h-12 text-black p-2 w-full' type="text" name='username' />
                    </div>
                    <div className='relative w-full'>
                        <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password:' className='m-2 border border-black rounded-full h-12 text-black p-2 w-full' type="password" name='password' />
                        <img ref={ref} className='absolute h-8 top-4 right-1 cursor-pointer' src="/assets/icons/show.png" alt="show icon" onClick={showPassword} />
                    </div>
                </div>
            </div>
            <button onClick={savePassword} className='glass py-2 m-2 rounded-full px-5 flex justify-center items-center gap-8 '>
                Add password
                <img className='h-10' src="/assets/icons/password.png" alt="password icon" />
            </button>
            <div className='glass p-4 rounded-lg w-[100%] h-[100%] overflow-auto'>
                <h1 className='m-2 font-bold '>Your passwords:</h1>
                {passwordArray.length === 0 && <div className='text-center p-4'>No passwords to display </div>}
                {passwordArray.length != 0 && <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className='py-2'>URL</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Password Length</th>
                        </tr>
                    </thead>
                    <tbody className='overflow-auto'>
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className='text-center w-1'><a href={item.site} target='_blank'>{item.site}</a></td>
                                <td className='text-center w-1'>{item.username}</td>
                                <td className='text-center w-1'>{item.password.length} </td>
                                <td className='text-center w-3'><img onClick={() => { copyPassword(item.password) }} className='h-4 cursor-pointer' src="/assets/icons/copy.png" alt="copy icon" /> </td>
                            </tr>
                        })}
                    </tbody>
                </table>}
            </div>
        </div>

    )
}

export default Manager
