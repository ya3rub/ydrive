import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/context';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signUp, user, googleSignIn } = useUserAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signUp(email, password);
            navigate('/');
        } catch (e) {
            setError(e);
        }
    };

    if (user) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <div className=" shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
                <h2 className="text-3xl font-medium">Join Today</h2>
                {error && (
                    <div
                        role="alert"
                        class="text-red-900 my-4 alert alert-error"
                    >
                        <span>{error.toString()}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label className="my-4 form-control w-full text-gray-300">
                        <div className="label">
                            <span className="label-text">
                                What is your name?
                            </span>
                        </div>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="input input-bordered w-full "
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </label>
                    <label className="my-4 form-control w-full text-gray-300 ">
                        <div className="label">
                            <span className="label-text">
                                What is your name?
                            </span>
                        </div>
                        <input
                            type="password"
                            className="input input-bordered w-full "
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </label>
                    <div className="flex justify-center">
                        <input
                            className=" btn btn-accent btn-wide"
                            type="submit"
                            value="Sign Up"
                        />
                    </div>
                    <div>
                        <h3 className="py-4">
                            Sign in with one of the providers
                        </h3>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => {
                                    googleSignIn();
                                }}
                                className="text-white p-4 bg-gray-700 w-full font-medium rounded-lg flex align-middle gap-2"
                            >
                                <FcGoogle className="text-2xl" /> Sign in with
                                Google
                            </button>
                        </div>
                        <div className=" justify-center flex space-x-3 my-4  items-center">
                            <div>Already have an account?</div>
                            <NavLink className="text-accent " to={'/login'}>
                                Sign In
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
