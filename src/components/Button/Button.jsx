import React from 'react'

export default function Button(props) {
    const color = props.color
    return (
        <button {...props} className={`text-white ${color === 'red' ? "bg-red-600 flex align-middle items-center hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300" : "bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"} font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center mt-4`}>
            {props.label}
        </button>
    )
}
