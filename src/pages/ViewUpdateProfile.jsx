import { findUserByUserName } from "@/API/UserAPIs";
import React, { useState, useEffect } from "react";

const ViewUpdateProfile = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        birthData: "",
        password: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch user profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await findUserByUserName();  // missing await in your code
                setFormData(data);
                console.log(formData);
                
            } catch (error) {
                console.log("Error finding user!!!", error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
        setIsEditing(false);
        // TODO: Call your update profile API here
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Optionally refetch user data here if you want to discard changes
    };

    return (
        <div className="mx-auto p-8 border shadow-lg bg-[#0d0d0d] border-gray-800 text-white">
            <h2 className="text-3xl font-sans mb-8 text-center">
                {isEditing ? "Edit Profile" : "My Profile"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                {/* Username */}
                <div>
                    <label className="block mb-2 font-light">Username:</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full p-3 border bg-[#1a1a1a] border-gray-800 text-white"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-2 font-light">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full p-3 border bg-[#1a1a1a] border-gray-800 text-white"
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block mb-2 font-light">Date of Birth:</label>
                    <input
                        type="date"
                        name="birthData"
                        value={formData.birthData}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full p-3 border bg-[#1a1a1a] border-gray-800 text-white"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-2 font-light">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full p-3 border bg-[#1a1a1a] border-gray-800 text-white"
                    />
                </div>

                {/* Buttons */}
                <div className="col-span-2 flex justify-end gap-4 mt-8">
                    {isEditing ? (
                        <>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ViewUpdateProfile;
