import React from 'react'
import { useSelector } from 'react-redux'

export default function Select(props) {
    const toggle = useSelector(state=> state.appState.darkMode)

    return (
        <div className="relative z-0 w-full mb-6 group">
            <label className={`${toggle?'text-dark1':'text-gray-500'} pr-5`}>Select {props.label}</label>
            <select className={`w-52 ${toggle?'bg-dark7 border border-dark3 focus:ring-dark3 focus:border-dark3':'focus:ring-blue-500 focus:border-blue-500 bg-white border border-gray-300 '} rounded-md shadow-sm py-2 text-center text-gray-700 leading-tight focus:outline-none focus:ring-2 `} {...props} required>
                {/* <option hidden value="">Select {props.label}</option> */}
                {
                    props.data.map((data, index) => (
                        <option key={index} value={data}>{data}</option>
                    ))
                }
            </select>
        </div>
    )
}
