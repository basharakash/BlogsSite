import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function AuthLayout({children, authentication = true}) {

    const navigate = useNavigate()
    const [loding, setLoding] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)


    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoding(false)
    }, [navigate, authStatus, authentication]);


    return loding ? <h1>Loading....</h1> : <>{children}</>

}

export default AuthLayout;