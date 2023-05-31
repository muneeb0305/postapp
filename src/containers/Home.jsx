import React, { useEffect, useState } from 'react'
import PostForm from '../components/Form/PostForm'
import ViewPost from '../components/ViewPost/ViewPost'
import Searchbar from '../components/SearchBar/Searchbar'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from '../features/App/AppSlice'
import { getPost, getPostByID } from '../features/Post/PostSlice'

export default function User() {    
    const dispatch = useDispatch()
    //Redux States
    const posts = useSelector(state => state.post.posts)
    const role = useSelector(state => state.Auth.role)
    //If role is user then it show there's posts and if role is admin then it shows all posts
    useEffect(() => {
        dispatch(changeName({ name: "Home" }))
        if (role === 'User') {
            dispatch(getPostByID())
        }
        else if (role==='Admin') {
            dispatch(getPost())
        }
        // eslint-disable-next-line
    }, [])
    
    
    //Search Functionality
    const [searchValue, setSearchValue] = useState('');
    
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    }
    //Filter items for searching
    let filteredData = posts.filter(row => {
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
            <PostForm />
            {/* View Posts in card form */}
            <div className='grid grid-cols-2 gap-2'>
                {filteredData.map((data, index) => (<ViewPost Postdata={data} index={index} />))}
            </div>
        </div>
    )
}
