import React, { useEffect, useState } from 'react'
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'
import ViewPost from '../components/ViewPost/ViewPost'
import Alert from '../components/Alert/Alert'
import PostService from '../Services/PostService'
import Searchbar from '../components/SearchBar/Searchbar'
import { useDispatch } from 'react-redux'
import { changeName } from '../features/App/AppSlice'
export default function User() {
    const [Form, setForm] = useState({ Post: '' })
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(changeName({ name: "Home" }))
        // eslint-disable-next-line
    }, [])


    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Alert({ icon: 'success', title: 'Post Added' })
    }
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    }
    //Filter items for searching
    let filteredData = PostService.filter(row => {
        if (row.post.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    });

    return (
        <div className='px-28 pt-20 bg-gray-50 min-h-screen'>
            <div className='flex justify-center p-3'>

                <div className='w-96'>
                    <Searchbar placeholder="Search By Post" value={searchValue} onChange={handleSearch} />
                </div>
            </div>
            {/* Add POST Form */}
            <div className='bg-white border-gray-100 p-5 rounded-lg '>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-8 gap-5'>
                        <div className='col-span-7'>
                            <Input type="text" name='Post' value={Form.Post} onChange={handleChange} title={'Post'} />
                        </div>
                        <div>
                            <Button type="submit" label={'Add Post'} />
                        </div>
                    </div>
                </form>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                {filteredData.map((data, index) => (<ViewPost data={data} index={index} />))}
            </div>
        </div>
    )
}
