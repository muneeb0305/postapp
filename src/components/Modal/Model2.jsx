import React, { useState } from 'react'
import Form from '../PostForm/Form';
export default function Modal2({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <span className='ml-2 cursor-pointer' onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-green-500 w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </span>
            {isOpen &&
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="relative flex items-center justify-center min-h-screen w-full">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white rounded-lg p-4">
                            <div className='flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg"  onClick={closeModal} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <Form data={data} type={'Update'} closeModal={closeModal} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
