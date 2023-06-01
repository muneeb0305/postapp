import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { useDispatch } from 'react-redux'
import { addComment, getPost, updateComment } from '../../features/Post/PostSlice'
import Alert from '../Alert/Alert'

export default function Form2({ Postdata, type, index, toggleComment }) {
    const dispatch = useDispatch()
    //Form State 
    const [Form, setForm] = useState({
        comment: ''
    })

    useEffect(() => {
        // if type is defined then set the form data for update
        if (type) {
            setForm({
                comment: Postdata.comments[index].comment
            })
        }
    }, [type, Postdata, index])

    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //If type is update then call the update apis else call add apis
        if (type === 'Update') {
            dispatch(updateComment({ PostID: Postdata._id, CommentID: Postdata.comments[index]._id, ...Form }))
                .unwrap()
                .then(() => {
                    dispatch(getPost())
                    toggleComment(index)
                    Alert({ icon: 'success', title: 'Comment Updated' })
                    setForm({
                        comment: ''
                    })
                })
                .catch((err) => {
                    Alert({ icon: 'error', title: err })
                })
        }
        else {
            dispatch(addComment({ PostID: Postdata._id, ...Form }))
                .unwrap()
                .then(() => {
                    //if add successfully then update the posts 

                        dispatch(getPost())
                    
                    Alert({ icon: 'success', title: 'Comment Added' })
                    setForm({
                        comment: ''
                    })
                })
                .catch((err) => {
                    Alert({ icon: 'error', title: err })
                })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-8 sm:gap-5 pt-5'>
                <div className='pt-5 sm:pt-0 col-span-8 sm:col-span-6  md:col-span-6 lg:col-span-5 2xl:col-span-6'>
                    <Input type="text" name='comment' value={Form.comment} onChange={handleChange} title={'Type Here'} />
                </div>
                <div className='pb-5 sm:pb-0 col-span-8 sm:col-span-2 md:col-span-2 lg:col-span-3 2xl:col-span-2'>
                    <Button type="submit" label={`${type ? 'Submit' : 'Add Comment'} `} />
                </div>
            </div>
        </form>
    )
}
