import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut, Settings, Bird, Edit, UserCheck, BirdIcon, TrendingUp, ArrowDownToDotIcon, PlusIcon, MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserData } from "@/utils/getUserData";

const Navbar = () => {
    const navigate = useNavigate();
    const userData = getUserData();

    const [userSidebarOpen, setUserSidebarOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove("user");
        navigate("/login");
    };

    return (
        <nav className="bg-[#000000] text-white p-4 flex items-center justify-between shadow-md sticky top-0 w-full z-50">
            {/* Logo */}
            {/* <img className="h-24 w-15    sm:h-12" src="/imgs/buzz.png" alt="Buzz Logo" /> */}
            <h1 className="font-serif ml-4">BUZZ</h1>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 text-base lg:text-lg">
                <Link to="/all-buzz"><li className="hover:text-gray-400 cursor-pointer font-light">Buzzing</li></Link>
                <Link to="/top"><li className="hover:text-gray-400 cursor-pointer font-light">Trending</li></Link>
                <Link to="/buzzing"><li className="hover:text-gray-400 cursor-pointer font-light">Create +</li></Link>
            </ul>

            {/* User Sidebar */}
            {userData ? (
                <Sheet open={userSidebarOpen} onOpenChange={setUserSidebarOpen}>
                    <SheetTrigger>
                        <Button variant="ghost" className="text-white p-2">
                            <MenuIcon className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-[#111] text-white w-72 sm:w-64 p-5 flex flex-col justify-between">
                        <div>
                            <div className="mb-6 border-b border-gray-700 pb-4">
                                <h2 className="text-lg font-mono">Hello, {userData} </h2>
                                <p className="text-sm text-gray-400">Welcome back to Buzz!</p>
                            </div>

                            <ul className="space-y-4">
                                {/* Show these only on mobile */}
                                <div className="block md:hidden space-y-4">
                                    <Link to="/all-buzz" className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 font-light">
                                        <BirdIcon className="w-5 h-5" />
                                        <span>Buzzing</span>
                                    </Link>
                                    <Link to="/top" className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 font-light">
                                        <TrendingUp className="w-5 h-5" />
                                        <span>Trending</span>
                                    </Link>
                                    <Link to="/buzzing" className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 font-light">
                                        <PlusIcon className="w-5 h-5" />
                                        <span>Create</span>
                                    </Link>
                                    <hr className="my-2 border-gray-600" />
                                </div>

                                {/* User profile options (always show) */}
                                <Link className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 font-light">
                                    <UserCheck className="w-5 h-5" />
                                    <span>View/Update Profile</span>
                                </Link>
                                <Link to={"/user/buzz"} className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 font-light">
                                    <Bird className="w-5 h-5" />
                                    <span>Your Buzz</span>
                                </Link>
                                {/* <Link to={"/user/buzz"} className="flex items-center space-x-3 cursor-pointer hover:text-blue-400">
                                    <Edit className="w-5 h-5" />
                                    <span>Edit Buzz</span>
                                    <span className="text-gray-400 font-light">(Within 24 hrs)</span>
                                </Link> */}
                                <Link className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 font-light">
                                    <Settings className="w-5 h-5" />
                                    <span>Settings</span>
                                </Link>
                            </ul>

                        </div>

                        <div className="flex flex-col items-start space-y-4 mt-6">
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 text-red-500 hover:text-red-700"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                            <img className="h-20 w-50 sm:h-12" src="/imgs/buzz1008.png" alt="Buzz Logo" />
                        </div>

                    </SheetContent>
                </Sheet>
            ) : (
                <Link to={"/signup"}
                >
                    <User />
                </Link>
            )}
        </nav>
    );
};

export default Navbar;

