import React, { useEffect, useState } from 'react'
import PostForm from '../components/PostForm/Form'
import ViewPost from '../components/ViewPost/ViewPost'
import Searchbar from '../components/SearchBar/Searchbar'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from '../features/App/AppSlice'
import { getPost } from '../features/Post/PostSlice'
export default function User() {
    const [searchValue, setSearchValue] = useState('');

    const dispatch = useDispatch()

    const posts = useSelector(state => state.post.posts)
    console.log(posts)
    useEffect(() => {
        dispatch(changeName({ name: "Home" }))
        dispatch(getPost())
        // eslint-disable-next-line
    }, [])



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
            <div className='grid grid-cols-2 gap-2'>
                {filteredData.map((data, index) => (<ViewPost data={data} index={index} />))}
            </div>
        </div>
    )
}
