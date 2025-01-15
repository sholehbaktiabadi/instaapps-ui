import { FormEvent } from "react";
import { Form, Input, Button } from "@nextui-org/react";
import { InstaApi } from "../api";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


export default function Login() {
    const [_cookie, setCookies] = useCookies()
    const navigate = useNavigate()
    const notify = () => toast.error("invalid credentials")

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const res = await InstaApi.login(data)
            setCookies("token", res.data.token, { path: '/' })
            navigate('/')
        } catch (error) {
            notify()
        }

    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-xl bg-gray-500 p-32 rounded-xl">
                    <p className="text-2xl text-slate-900">Login</p>
                    <hr className="mb-10 border border-slate-900" />
                    <Form className="max-w-xl light" validationBehavior="native" onSubmit={onSubmit}>
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
                            Login
                        </Button>
                    </Form>
                    <p className="my-2 text-sm text-end text-slate-900">belum punya akun ? <Link to={'/register'} className="text-blue-600 bg-slate-300 rounded px-2 py-1 mx-1">Register</Link></p>
                </div>
            </div>
            <ToastContainer position="top-center" />
        </>
    );
}

