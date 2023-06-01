import React from 'react'
import { BeatLoader } from "react-spinners";

export default function Loader() {

    return (
        <div className={`bg-gray-100 min-h-screen pb-4 pt-20`}>
        <div className='flex justify-center items-center pt-52'>
            <BeatLoader color={'rgb(37 99 235)'} size={20} />
        </div>
        </div>
    )
}
