import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getPost, getPostByID, updateComment } from '../../features/Post/PostSlice'
import Alert from '../Alert/Alert'

export default function Form2({ Postdata, type, index, toggleComment }) {
    const dispatch = useDispatch()
    //Redux State
    const role = useSelector(state => state.Auth.role)
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
                    //if update successfully then update the posts 
                    if (role === 'User') {
                        dispatch(getPostByID())
                        toggleComment()
                    }
                    else if (role === 'Admin') {
                        dispatch(getPost())
                        toggleComment(index)
                    }
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
                    if (role === 'User') {
                        dispatch(getPostByID())
                    }
                    else if (role === 'Admin') {
                        dispatch(getPost())
                    }
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
            <div className='grid grid-cols-8 gap-5 pt-5'>
                <div className='col-span-6'>
                    <Input type="text" name='comment' value={Form.comment} onChange={handleChange} title={'Type Here'} />
                </div>
                <div className='col-span-2'>
                    <Button type="submit" label={`${type ? 'Update' : 'Add'} Comment`} />
                </div>
            </div>
        </form>
    )
}
