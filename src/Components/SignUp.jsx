import React, {useState} from 'react';
import authService from "../appwrite/auth.js";
import {login} from "../store/authSlice.js";
import {useDispatch} from "react-redux";
import {Input, Logo, Button} from "./index.js";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {handleSubmit, register} = useForm()

    const crearAccount = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const usrData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")

            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign up to creat account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Allready have an account?&nbsp;
                    <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                        sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(crearAccount)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name:"
                            type="text"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true
                            })}

                        />

                        <Input
                            label="Email:"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                                }
                            })}
                        />

                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />

                        <Button type="submit" className="w-full">Creat Account</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;