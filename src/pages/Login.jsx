import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/API/UserAPIs";

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(formData , navigate);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#000000] text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-[#080c0e] shadow-xl  border border-[#11181d]">
                <h2 className="text-3xl font-light text-[#19242b] text-center">Log In</h2>
                <input
                    type="text"
                    name="userName"
                    className="w-full p-3 bg-[#000000] text-white border border-[#11181d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#19242b]"
                    placeholder="Username"
                    value={formData.userName}
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
                    Log In
                </button>
                <div className="text-center text-xs sm:text-sm text-gray-400 mt-4">
                    Don't have Account?{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="text-blue-400 hover:text-blue-300 hover:underline focus:outline-none transition-colors"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;