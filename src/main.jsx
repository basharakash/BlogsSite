import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/store.js'
import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Post from "./pages/Post.jsx";
import AddPost from "./pages/AddPost.jsx";
import AllPost from "./pages/AllPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AuthLayout, Login} from "./Components/index.js"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login/>
                    </AuthLayout>
                )
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup/>
                    </AuthLayout>
                )
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authentication>
                        <AllPost/>
                    </AuthLayout>
                )
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authentication>
                        <AddPost/>
                    </AuthLayout>
                )
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        <EditPost/>
                    </AuthLayout>
                )
            },
            {
                path: "/post/:slug",
                element: <Post/>
            }
        ]
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
