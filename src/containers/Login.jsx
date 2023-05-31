import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/Auth/AuthSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import Alert from '../components/Alert/Alert';
import Input from '../components/Input/Input'
import Select from '../components/Select/Select'
export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //User Array for Type dropbox
    const User = ['Admin', 'User']
    //Redux States
    const toggle = useSelector(state => state.appState.darkMode)

    const [Form, setForm] = useState({
        email: '',
        password: '',
        type: User[0]     //Initially selected role is admin 
    })
    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //check responce of api and navigate to there role
        dispatch(login({ ...Form }))
            .unwrap()
            .then((payload) => {
                const role = payload.role
                Alert({ icon: 'success', title: 'Signed in' })
                if (role === 'Admin') {
                    navigate('/Admin');
                } else if (role === 'User') {
                    navigate('/User');
                }
            })
            .catch((err) => {
                Alert({ icon: 'error', title: err })
            })
    };
    return (
        <section>
            <div className={`${toggle ? 'bg-dark3' : 'bg-gray-100'} h-screen w-full flex justify-center items-center`}>
                <div className={`${toggle ? 'bg-dark2' : 'bg-blue-600'} w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded`}>
                    <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
                        <h1 className="text-3xl">Hello</h1>
                        <p className="text-5xl font-extrabold">Welcome!</p>
                    </div>
                    <div className={`${toggle ? 'bg-dark7' : 'bg-white'} w-full md:w-1/2 flex flex-col items-center py-32 px-8`}>
                        <h3 className={`${toggle ? 'text-dark2' : 'text-blue-600'} text-3xl font-bold  mb-4`}>
                            LOGIN
                        </h3>
                        <form className="w-full flex flex-col justify-center" onSubmit={handleSubmit} autoComplete='off'>
                            <Input type="email" name="email" value={Form.email} onChange={handleChange} placeholder="Email" title={'Email'} />
                            <Input type="password" name="password" value={Form.password} onChange={handleChange} autoComplete='true' placeholder="Password" title={'Password'} />
                            <Select label={'Type'} data={User} name='type' value={Form.type} onChange={handleChange} />
                            <Button type="submit" label={'Submit'} />
                        </form>
                        <div className='mt-5 text-gray-500 hover:text-dark2 hover:cursor-pointer '>
                            <Link to='/registration'><p className='text-sm '>Register Your Self</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
