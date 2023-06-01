import React, { useState } from 'react'
import DeleteModal from '../Modal/DeleteModal'
import UpdateModal from '../Modal/UpdateModal'
import CommentForm from '../Form/CommentForm'

export default function AddPost({ Postdata, index }) {
    const [openComments, setOpenComments] = useState([]);
    // Find selected comment to open its edit form
    const toggleComment = (commentIndex) => {
        setOpenComments(prevOpenComments => {
            const updatedOpenComments = [...prevOpenComments];
            updatedOpenComments[commentIndex] = !updatedOpenComments[commentIndex];
            return updatedOpenComments;
        });
    };

    //Pagination
    const sortData = Postdata.comments
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(3);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sortData.slice(indexOfFirstRecord, indexOfLastRecord)
    const changePage = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(sortData.length / recordsPerPage);
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
            <li key={i} aria-current={i === currentPage ? "page" : undefined}>
                <button
                    className={`px-3 py-1 leading-tight ${i === currentPage
                        ? "text-white  bg-blue-500 "
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                    onClick={() => changePage(i)}
                >
                    {i}
                </button>
            </li>
        );
    }
    const handleDelete = () => {
        if (currentPage > 1 && currentRecords.length < 2)
            setCurrentPage(currentPage - 1);
    };
    return (
        <div className='bg-white border-gray-100 p-5 rounded-lg mt-5' key={index}>
            <div className='flex gap-2 justify-between'>
                <div className='flex gap-2'>
                    {/* Post Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-blue-500 w-6 h-6" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    <h1 className='font-bold text-lg'>Post</h1>
                </div>
                <div className='flex gap-2'>
                    {/* Update & Delete Post */}
                    <UpdateModal Postdata={Postdata} />
                    <DeleteModal ID={Postdata._id} type={"Post"} />
                </div>
            </div>
            {/* Show post & author name */}
            <div className='text-justify w-11/12 pt-2 '>
                <p>
                    {Postdata.post}
                </p>
                <p className='pt-5 text-right'>
                    <span className='font-bold'>Author: </span>{Postdata.user_Name}
                </p>
            </div>
            <div className='border-b-2 py-3' />
            <div className='flex pt-5 gap-2 align-middle'>
                {/* Comment Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-blue-500 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <h1 className='font-bold'>Comments</h1>
            </div>
            {/* Add Comment */}
            <CommentForm Postdata={Postdata} />
            {/* Show all Comments */}
            {
                currentRecords.map((data, index) => (
                    <>
                        <div className='flex gap-2 justify-between pt-3' key={index} >
                            <p><span className='font-bold'>{index + (currentPage - 1) * recordsPerPage + 1} :</span> {data.comment}</p>
                            <div className='flex gap-2'>
                                {/* Update Comment Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-green-500 w-4 h-4 cursor-pointer" onClick={() => toggleComment(index)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                {/* Delete Comment */}
                                <DeleteModal type={'Comment'} ID={Postdata._id} CommentID={data._id} pagePagination={handleDelete} />
                            </div>
                        </div>
                        {/* Update Comment */}
                        <div className={`${openComments[index] ? 'block' : `hidden`}`}>
                            <CommentForm Postdata={Postdata} type='Update' index={index + (currentPage - 1) * recordsPerPage} toggleComment={toggleComment} />
                        </div>
                    </>
                ))

            }
            <div className="mt-8">
                {sortData.length > recordsPerPage && (
                    <nav aria-label="Page navigation example" className='md:flex md:justify-center'>
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <button className="block px-3 py-1 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 " onClick={() => { if (currentPage > 1) { changePage(currentPage - 1) } }}>
                                    <span className="sr-only">Previous</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </button>
                            </li>
                            {pageButtons}
                            <li>
                                <button className="block px-3 py-1 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 " onClick={() => { if (currentPage + 1 <= totalPages) { changePage(currentPage + 1) } }}>
                                    <span className="sr-only">Next</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    )
}
