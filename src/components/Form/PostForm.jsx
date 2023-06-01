import React, { useEffect, useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { addPost, getPost, updatePost } from '../../features/Post/PostSlice'
import { useDispatch } from 'react-redux'
import Alert from '../Alert/Alert'

export default function Form({ type, data, closeModal }) {
    const dispatch = useDispatch()
    //Form State
    const [Post, setPost] = useState({ post: '' })
    
    const handleChange = (e) => {
        setPost({ ...Post, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //If type is update then call the update apis else call add apis
        if (type === 'Update') {
            dispatch(updatePost({ PostID: data._id, ...Post }))
                .unwrap()
                .then(() => {
                    //if update successfully then update the posts 
                    dispatch(getPost())
                    Alert({ icon: 'success', title: 'Post Updated' })
                    setPost({
                        post: ''
                    })
                })
                .catch((err) => {
                    Alert({ icon: 'error', title: err })
                })
            closeModal()
        }
        else {
            dispatch(addPost({ ...Post }))
                .unwrap()
                .then(() => {
                    //if Add successfully then update the posts 
                    dispatch(getPost())
                    Alert({ icon: 'success', title: 'Post Added' })
                    setPost({
                        post: ''
                    })
                })
                .catch((err) => {
                    Alert({ icon: 'error', title: err })
                })
        }
    }
    useEffect(() => {
        //If type is update then set the post to show in input
        if (type === 'Update') {
            setPost({ post: data.post })
        }
    }, [data, type])

    return (
        <div className='bg-white border-gray-100 p-5 rounded-lg '>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-8 sm:gap-5'>
                    <div className='col-span-8 sm:col-span-6 2xl:col-span-7'>
                        <Input type="text" name='post' value={Post.post} onChange={handleChange} title={'Post'} />
                    </div>
                    <div className='col-span-8 sm:col-span-2  2xl:col-span-1'>
                        <Button type="submit" label={` ${data ? 'Update' : 'Add'} Post`} />
                    </div>
                </div>
            </form>
        </div>
    )
}
