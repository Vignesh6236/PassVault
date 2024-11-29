import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()
    }, [])

    const savePassword = async () => {
        if (!form.site || !form.username || !form.password) {
            toast.error("All fields are required!");
            return;
        }

        try {
            if (form._id) {
                const response = await fetch("http://localhost:3000/", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });

                const result = await response.json();
                if (result.success) {
                    toast.success("Password updated successfully!");
                } else {
                    toast.error("Failed to update the password!");
                }
            } else {
                const newPassword = {
                    site: form.site,
                    username: form.username,
                    password: form.password,
                    id: uuidv4()
                };

                const response = await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPassword)
                });

                const result = await response.json();
                if (result.success) {
                    toast.success("Password saved successfully!");
                } else {
                    toast.error("Failed to save the password!");
                }
            }

            setform({ site: "", username: "", password: "" });
            getPasswords();
        } catch (error) {
            console.error("Error saving/updating password:", error);
            toast.error("An error occurred while saving/updating the password.");
        }
    };


    const deletePassword = async (id) => {
        try {
            const response = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Password deleted successfully!");
                getPasswords();
            } else {
                toast.error("Failed to delete the password!");
            }
        } catch (error) {
            console.error("Error deleting password:", error);
            toast.error("An error occurred while deleting the password.");
        }
    };

    const editPassword = async (id) => {

        const passwordToEdit = passwordArray.find((item) => item._id === id);
        if (passwordToEdit) {
            try {

                await deletePassword(id);

                setform({
                    site: passwordToEdit.site,
                    username: passwordToEdit.username,
                    password: passwordToEdit.password,
                });

                toast.info("Editing mode: Update the fields and save.");
            } catch (error) {
                console.error("Error while preparing to edit the password:", error);
                toast.error("Failed to prepare the password for editing.");
            }
        }
    };


    const showPassword = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            ref.current.src = "/assets/icons/hide.png";
        } else {
            passwordRef.current.type = "password";
            ref.current.src = "/assets/icons/show.png";
        }
    };

    const copyPassword = (password) => {
        navigator.clipboard.writeText(password)
            .then(() => {
                toast.success("Password copied to clipboard!");
            })
            .catch((error) => {
                console.error("Error copying password:", error);
                toast.error("Failed to copy the password.");
            });
    };


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    
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
                    <h1 className='m-2 font-bold hidden md:block '>Your passwords:</h1>
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
                                            onClick={() => { editPassword(item._id) }}
                                        />
                                        <img
                                            onClick={() => deletePassword(item._id)}
                                            className='h-5 cursor-pointer'
                                            src="/assets/icons/delete.png"
                                            alt="delete icon"
                                        />
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    );
}

export default Manager;