import React from 'react'

export default function Searchbar(props) {
    return (
        <div className={`relative rounded-md shadow-sm border-2 mb-5 border-gray-100`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className={`h-5 w-5 text-blue-600 `} viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                </svg>
            </div>
            <input
                className={`bg-white form-input rounded-md py-2 pl-10 pr-4 block w-full leading-5  placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400  focus:text-gray-900`}
                type="Search"
                {...props}
            />
        </div>
    )
}
