import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import User from '../containers/Home';

const routes = [
  {
    path: '/',
    element: <User />,
    isAdmin: true
  }
];

function AppRoutes() {
  const role = 'Admin'
  return (
    <>
        <Navbar />
        <Routes>
          {
            routes.map((route, index) => {
              if (role === 'Admin' && route.isAdmin) {
                return (
                  <Route key={index} path={route.path} element={route.element} />
                );
              } else if (role !== 'Admin' && !route.isAdmin) {
                return (
                  <Route key={index} path={route.path} element={route.element} />
                );
              }
              return null;
            })
          }
        </Routes>
    </>
  );
}

export default AppRoutes;
