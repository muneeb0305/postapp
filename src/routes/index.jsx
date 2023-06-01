import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import User from '../containers/Home';
import Setting from '../containers/Setting';

const routes = [
  {
    path: '/',
    element: <User />,
  },
  {
    path: '/Setting',
    element: <Setting />,
  }
];

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        {
          routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))
        }
      </Routes>
    </>
  );
}

export default AppRoutes;
