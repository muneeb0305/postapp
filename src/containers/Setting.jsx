import React, { useState } from 'react'
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'
import { useDispatch } from 'react-redux'
import { changeEmail, changePassword } from '../features/Users/UserSlice'
import Alert from '../components/Alert/Alert'
import { Logout } from '../features/Auth/AuthSlice'
import DeleteModel from '../components/Modal/DeleteModal'

export default function Setting() {
    const dispatch = useDispatch()
    const [Form, setForm] = useState({
        email: '',
        newEmail: '',
        password: '',
        newPassword: '',
    })
    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
    }
    const handlePassword = (e) => {
        e.preventDefault();
        dispatch(changePassword(Form))
            .unwrap()
            .then(() => {
                Alert({ icon: 'success', title: 'Password Changed' })
                dispatch(Logout())
                setForm({
                    email: '',
                    newEmail: '',
                    password: '',
                    newPassword: '',
                })
            })
            .catch((err) => {
                Alert({ icon: 'error', title: err })
            })
    };
    const handleEmail = (e) => {
        e.preventDefault();
        dispatch(changeEmail(Form))
            .unwrap()
            .then(() => {
                Alert({ icon: 'success', title: 'Email Changed' })
                dispatch(Logout())
                setForm({
                    email: '',
                    newEmail: '',
                    password: '',
                    newPassword: '',
                })
            })
            .catch((err) => {
                Alert({ icon: 'error', title: err })
            })
    };
    return (
        <div className="max-w-screen-xl mx-auto px-5 pt-20 bg-white min-h-sceen">
            <div className="flex flex-col items-center">
                <h2 className="font-bold text-5xl mt-5 tracking-tight">
                    Setting
                </h2>
            </div>
            <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                <div className="py-5">
                    <details className="group">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span> Change Email?</span>
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>
                        <div className='pt-8'>
                            <form onSubmit={handleEmail}>
                                <div className='flex justify-center gap-5 '>
                                    <Input type="email" name="email" value={Form.email} onChange={handleChange} title={'Enter Old Email'} />
                                    <Input type="email" name="newEmail" value={Form.newEmail} onChange={handleChange} title={'Enter New Email'} />
                                </div>
                                <Button type="submit" label={'Submit'} />
                            </form>
                        </div>
                    </details>
                </div>
                <div className="py-5">
                    <details className="group">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span>Change Password?</span>
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>
                        <div className='pt-8'>
                            <form onSubmit={handlePassword}>
                                <div className='flex justify-center gap-5 '>
                                    <Input type="password" name="password" value={Form.password} onChange={handleChange} title={'Enter Old Password'} autoComplete='true' />
                                    <Input type="password" name="newPassword" value={Form.newPassword} onChange={handleChange} title={'Enter New Password'} autoComplete='true' />
                                </div>
                                <Button type="submit" label={'Submit'} />
                            </form>
                        </div>
                    </details>
                </div>
                <div className="py-5">
                    <details className="group">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span> Delete Account?</span>
                            <span className="transition group-open:rotate-180">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </summary>
                        <div className='pt-3'>
                            <DeleteModel type={'Account'}/>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    )
}
