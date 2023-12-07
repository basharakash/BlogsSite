// eslint-disable-next-line no-unused-vars
import React from "react";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import {login, logOut} from "./store/authSlice";
import {Header, Footer} from "./Components/index"
// eslint-disable-next-line no-unused-vars
import {Outlet} from "react-router-dom";

function App() {
    const [loading, setloading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({userData}));
                } else {
                    dispatch(logOut());
                }
            })
            .finally(() => setloading(false));
    }, [dispatch]);

    return !loading ? (
        <div className='min-h-screen flex flex-wrap content-between bg-green-400'>
            <div className='w-full block'>
                <Header/>
                <main>
                    TODO: <Outlet/>
                </main>
                <Footer/>
            </div>
        </div>
    ) : null;
}

export default App;
