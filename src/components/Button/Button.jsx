import React from 'react'

export default function Button(props) {
    return (
        <button {...props} className={`text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center mt-4`}>
            {props.label}
        </button>
    )
}
