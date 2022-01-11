import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux'
import authService from '../../services/authService'
import TextField from '../Checkout/components/TextField'
import "./style.scss"

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import productService from '../../services/productService'
import Button from '../../components/Button'
import { BlackRight } from '../../components'
export default function Login() {
    const { register, form, error, validateLogin } = useForm({
        username: "",
        password: ""
    })

    const dispatch = useDispatch();
    const { stateLogin } = useSelector(store => store.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateLogin()
        if (Object.keys(error).length === 0) {
            const backend = await authService.login(form);;
            dispatch({
                type: "LOGIN",
                payload: backend
            })
        }
    }
    if (stateLogin) return <Navigate to="/" />

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className="form">
                <h1 className="h1">Login</h1>
                <div className="register__form">
                    <TextField
                        label="username"
                        firstNameRegister
                        {...register("username")}
                        placeHolder="username"
                        helperText={error.username}
                    />
                    <TextField
                        label="password"
                        firstNameRegister
                        type="password"
                        {...register("password")}
                        placeHolder="password"
                        helperText={error.password}
                    />
                    {/* <label className="form">
                        <h1 className="">username</h1>
                        <input type="text" value={form.username} className="" />
                        <p className="error">{error.username}</p>
                    </label>
                    <label className="form">
                        <h1 className="">password</h1>
                        <input type="text" value={form.password} className="" />
                        <p className="error">{error.password}</p>
                    </label> */}
                    <Button
                        children="LOGIN"
                        type="icon-right"
                        icon={<BlackRight />}
                        size="large"
                        background='green'
                        color="black"
                        border="bold"
                    />
                </div>
            </form>
        </div>



    )
}

