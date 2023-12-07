// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import authService from '../../appwrite/auth';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { logOut } from '../../store/authSlice';

function LogOutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logOut())
        })
    } 
  return (
      <button
          className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
          onClick={logoutHandler}
      >
          Logout
    </button>
  );
}

export default LogOutBtn;
