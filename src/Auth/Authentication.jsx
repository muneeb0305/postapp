import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from '../Routes'
import LoginLayout from '../Routes/LoginLayout'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Logout, checkToken } from '../features/Auth/AuthSlice';

export default function Authentication() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //Redux States
    const _Token = useSelector((state) => state.Auth.token)
    const _Role = useSelector((state) => state.Auth.role)
    //When User Reload the App check its token that it is valid or not
    useEffect(() => {
        dispatch(checkToken({ token: sessionStorage.getItem('token') }))
            .unwrap()
            .then((payload) => {
                const role = payload.role
                const token = payload.token
                if (token && role) {
                    navigate(`/${role}`)
                }
                else if (!_Token) {
                    dispatch(Logout())
                }
            })
            .catch(err => { console.log( err) })
        //eslint-disable-next-line
    }, [])

    return (
        <Routes>
            {
                _Token && _Role === 'Admin' ? <Route path="Admin/*" element={<AppRoutes role={'Admin'} />} /> :
                    _Token && _Role === 'User' ? <Route path="User/*" element={<AppRoutes role={'User'} />} /> :
                        <Route path="/*" element={<LoginLayout />} />
            }
        </Routes >
    );
}
