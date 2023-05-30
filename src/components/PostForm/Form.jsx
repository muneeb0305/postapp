import React, { useEffect, useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { addPost, getPost, updatePost } from '../../features/Post/PostSlice'
import { useDispatch } from 'react-redux'
import Alert from '../Alert/Alert'
export default function Form({ type, data, closeModal }) {
    console.log(data)
    const [Post, setPost] = useState({ post: '' })
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setPost({ ...Post, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'Update') {
            dispatch(updatePost([data._id, { ...Post }]))
                .unwrap()
                .then(() => {
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
        if (type === 'Update') {
            setPost({ post: data.post })
        }
    }, [data, type])

    return (
        <div className='bg-white border-gray-100 p-5 rounded-lg '>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-8 gap-5'>
                    <div className='col-span-7'>
                        <Input type="text" name='post' value={Post.post} onChange={handleChange} title={'Post'} />
                    </div>
                    <div>
                        <Button type="submit" label={` ${data ? 'Update' : 'Add'} Post`} />
                    </div>
                </div>
            </form>
        </div>
    )
}
