import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("password");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("/assets/icons/hide.png")) {
            ref.current.src = "/assets/icons/show.png";
            passwordRef.current.type = "password";
        } else {
            passwordRef.current.type = "text";
            ref.current.src = "/assets/icons/hide.png";
        }
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedPasswords = [...passwordArray, newPassword];

            setPasswordArray(updatedPasswords);
            localStorage.setItem("password", JSON.stringify(updatedPasswords));
            console.log("Saved Passwords:", updatedPasswords);

            setForm({ site: "", username: "", password: "" });

            toast.success('Password saved!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Error: Password not saved! Please fill all fields with valid data.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const deletePassword = (id) => {
        const updatedPasswords = passwordArray.filter(password => password.id !== id);
        setPasswordArray(updatedPasswords);
        localStorage.setItem("password", JSON.stringify(updatedPasswords));
        console.log(updatedPasswords);
        toast.success('Password deleted!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const editPassword = (id) => {
        console.log("Editing password with ID:", id);

        const passwordToEdit = passwordArray.find(item => item.id === id);

        if (passwordToEdit) {
            setForm(passwordToEdit);
            const updatedPasswords = passwordArray.filter(item => item.id !== id);

            setPasswordArray(updatedPasswords);
            localStorage.setItem("password", JSON.stringify(updatedPasswords));

            toast.info('Edit the details and save to update the password.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Error: Password not found!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyPassword = (password) => {
        navigator.clipboard.writeText(password);
        toast.success('Password Copied!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />

            <div className="md:container max-w-[75%] mx-auto my-4 p-4 flex flex-col justify-center text-wrap items-center gap-4 glass rounded-xl h-[82%]">
                <div className='text-white flex flex-col p-4 w-full gap-4'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL:' className='m-2 border border-black rounded-full h-12 text-black p-2 w-full' type="text" name='site' />
                    <div className="flex gap-2 flex-col md:flex-row">
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
                    {passwordArray.length !== 0 && <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className='py-2'>URL</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password Length</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center w-1/4 border border-black h-10 text-wrap p-2'><a href={item.site} target='_blank'>{item.site}</a></td>
                                    <td className='text-center w-1/4 border border-black h-10 text-wrap p-2'>{item.username}</td>
                                    <td className='text-center w-1/4 border border-black h-10 text-wrap'>{item.password.length}</td>
                                    <td className='flex justify-center items-center gap-5 md:gap-5 w-[40vw] md:w-full  border border-black h-10 '>
                                        <img
                                            onClick={() => { copyPassword(item.password) }}
                                            className='h-5 cursor-pointer'
                                            src="/assets/icons/copy.png"
                                            alt="copy icon"
                                        />
                                        <img
                                            className='h-5 cursor-pointer'
                                            src="/assets/icons/edit.png"
                                            alt="edit icon"
                                            onClick={() => { editPassword(item.id) }}
                                        />
                                        <img
                                            className='h-5 cursor-pointer'
                                            src="/assets/icons/delete.png"
                                            alt="delete icon"
                                            onClick={() => { deletePassword(item.id) }}
                                        />
                                    </td>

                                </tr>;
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    );
};

export default Manager;
