import React, { useState } from "react";
import Case from "../../components/Case";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const errorMessage = new URLSearchParams(location.search).get('message');
    console.log(errorMessage);

    const handleLogin = (event) => {
        event.preventDefault();
        // Validasi input
        const { email, password } = values;
        if (!email || !password) {
            setError({
                email: !email ? "The email field is required." : "",
                password: !password ? "The password field is required." : ""
            });
            return;
        }
        // Clear error sebelum request
        setError({});

        axios.post('http://localhost:8000/login', values)
            .then(res => {
                localStorage.setItem('access_token', res.data.data.access_token);
                navigate('/profile');
            })
            .catch(err => {
                setError(err.response.data);
                console.log(err.response.data)
            });
    }

    return (
        <Case>
            <div className="bg-gray-900 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                LOGIN
                            </h1>
                            {errorMessage && (
                                <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                                    <p className="font-bold">GAGAL MEMPROSES HALAMAN</p>
                                    <p className="text-sm">{errorMessage}</p>
                                </div>
                            )}
                            {Object.keys(error).length > 0 && (
                                <div role="alert">
                                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                        GAGAL
                                    </div>
                                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                        <ul>
                                            {Object.entries(error).map(([key, value]) => (
                                                value && <li key={key}>{value}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={e => setValues({ ...values, email: e.target.value })} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setValues({ ...values, password: e.target.value })} />
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Case>
    );
}

