import { FormEvent } from "react";
import { Form, Input, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from "react-cookie";
import { InstaApi } from "../api";

export default function Register() {
    const [_cookie, setCookies] = useCookies()
    const notify = () => toast.error("invalid credentials")
    const navigate = useNavigate()
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const res = await InstaApi.register(data)
            setCookies("token", res.data.token, { path: '/' })
            navigate('/')
        } catch (error) {
            // TODO - add error handler
            console.log(error)
            notify()
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-xl bg-gray-500 p-32 rounded-xl">
                    <p className="text-2xl text-slate-900">Register</p>
                    <hr className="mb-10 border border-slate-900" />
                    <Form className="max-w-xl light" validationBehavior="native" onSubmit={onSubmit}>
                        <Input
                            isRequired
                            className="light"
                            errorMessage="Please enter a valid username"
                            label="Username"
                            labelPlacement="outside"
                            name="name"
                            placeholder="Enter your username"
                            type="text"
                        />
                        <Input
                            isRequired
                            className="light"
                            errorMessage="Please enter a valid email"
                            label="Email"
                            labelPlacement="outside"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <Input
                            isRequired
                            className="light"
                            errorMessage="Please enter a valid password"
                            label="Password"
                            labelPlacement="outside"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        <Button className="mt-2" type="submit" color="secondary" variant="solid">
                            Register
                        </Button>
                    </Form>
                    <p className="my-2 text-sm text-end text-slate-900">sudah punya akun ? <Link to={'/login'} className="text-blue-600 bg-slate-300 rounded px-2 py-1 mx-1">Login</Link></p>
                </div>
            </div>
            <ToastContainer position="top-center" />
        </>
    );
}

