import React from 'react'
import { useSelector } from 'react-redux';
import { BeatLoader } from "react-spinners";

export default function Loader() {
    const toggle = useSelector(state=> state.appState.darkMode)

    return (
        <div className={`${toggle?'bg-dark3':'bg-gray-100'} min-h-screen pb-4 pt-20`}>
        <div className='flex justify-center items-center pt-52'>
            <BeatLoader color={toggle?'#bee0ec':'rgb(37 99 235)'} size={20} />
        </div>
        </div>
    )
}
