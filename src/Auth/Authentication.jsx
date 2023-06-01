import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from '../Routes'
import LoginLayout from '../Routes/LoginLayout'
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Logout, checkToken } from '../features/Auth/AuthSlice';

export default function Authentication() {
    const dispatch = useDispatch()
    //Redux States
    const _Token = useSelector((state) => state.Auth.token)
    const _Role = useSelector((state) => state.Auth.role)
    //When User Reload the App check its token that it is valid or not
    useEffect(() => {
        dispatch(checkToken({ token: sessionStorage.getItem('token') }))
            .unwrap()
            .then(() => { })
            .catch(err => {
                if (!_Token) {
                    dispatch(Logout())
                }
            })
        //eslint-disable-next-line
    }, [])

    return (
        <Routes>
            {
                _Token && _Role ? <Route path="/*" element={<AppRoutes />} /> :
                    <Route path="/*" element={<LoginLayout />} />
            }
        </Routes >
    );
}
