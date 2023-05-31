import React from 'react'
import { useSelector } from 'react-redux'

export default function Breadcrumbs() {
    //Redux State
    const breadCrumb = useSelector((state) => state.appState.changeName)
    
    return (
        <div className={`bg-white text-gray-600 p-4 flex items-center flex-wrap`}>
            <ul className="flex items-center">
                {
                    breadCrumb.map((data, index) => (
                        <li key={index} className="inline-flex items-center">
                            <p className=" hover:text-blue-500">
                                {data.name}
                            </p>
                            <svg className="w-5 h-auto fill-current mx-2 " xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                            </svg>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
