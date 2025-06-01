import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../API/UserAPIs";

const Signup = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        birthDate:"",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser(formData, navigate);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#000000] text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-[#080c0e] shadow-xl  border border-[#11181d]">
                <h2 className="text-3xl font-light text-[#19242b] text-center">Sign Up</h2>
                <input
                    type="text"
                    name="userName"
                    className="w-full p-3 bg-[#000000] text-white border border-[#11181d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#19242b]"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    className="w-full p-3 bg-[#000000] text-white border border-[#11181d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#19242b]"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="birthDate"
                    className="w-full p-3 bg-[#000000] text-white border border-[#11181d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#19242b]"
                    placeholder="Birth Date"
                    value={formData.birthDate}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    className="w-full p-3 bg-[#000000] text-white border border-[#11181d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#19242b]"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button 
                    className="w-full py-3 mt-4 bg-[#11181d] text-white font-semibold rounded-md hover:bg-[#19242b] transition-all"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
                <div className="text-center text-xs sm:text-sm text-gray-400 ">
                            Already User?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-blue-400 hover:text-blue-300 hover:underline focus:outline-none transition-colors"
                            >
                                Log In
                            </button>
                        </div>
            </div>
        </div>
    );
};

export default Signup;