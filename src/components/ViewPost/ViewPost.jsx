import React, { useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Alert from '../Alert/Alert'
import Modal from '../Modal/Model'
import UpdateModal from '../Modal/Model2'

export default function AddPost({ data, index }) {
    const [Form, setForm] = useState({
        comment: ''
    })
    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Alert({ icon: 'success', title: 'Comment Added' })
    }
    return (
        <div className='bg-white border-gray-100 p-5 rounded-lg mt-5' key={index}>
            <div className='flex gap-2 justify-between'>
                <div className='flex gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-blue-500 w-6 h-6" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    <h1 className='font-bold text-lg'>Post</h1>
                </div>
                <div className='flex gap-2'>
                    <UpdateModal data={data} />
                    <Modal ID={data._id} />
                </div>
            </div>
            <div className='text-justify w-11/12 pt-2 '>
                <p>
                    {data.post}
                </p>
                <p className='pt-5 text-right'>
                    <span className='font-bold'>Author: </span>{data.user_Name}
                </p>
            </div>
            <div className='border-b-2 py-3' />
            <div className='flex pt-5 gap-2 align-middle'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-blue-500 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <h1 className='font-bold'>Comments</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-8 gap-5 pt-5'>
                    <div className='col-span-6'>
                        <Input type="text" name='comment' value={Form.comment} onChange={handleChange} title={'Type Here'} />
                    </div>
                    <div className='col-span-2'>
                        <Button type="submit" label={'Add Comment'} />
                    </div>
                </div>
            </form>
            {
                data.comments.map((data, index) => (
                    <div className='flex gap-2 justify-between pt-3' key={index}>
                        <p><span className='font-bold'>{index + 1}:</span> {data}</p>
                        <div className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-green-500 w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            <Modal />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
