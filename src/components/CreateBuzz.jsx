import { createBuzz } from "@/API/BuzzApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateBuzz = () => {
    const [buzz, setBuzz] = useState({
        title: "",
        tweet_content: "",
        hashtags: "",
    });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setBuzz({ ...buzz, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const hashtags = buzz.hashtags
        .split(' ')
        .map(tag => tag.trim())
        .filter(tag => tag.startsWith("#"))
        .map(tag => tag.slice(1).toLowerCase())
        .filter(tag => tag);

        const formData = {
            title:buzz.title,
            tweet_content:buzz.tweet_content,
            hashtagNames:hashtags
        }
        const create = createBuzz(formData , navigate);
        if(create){
            toast("Buzz Posted Successfully...")
        }else{
            toast("Something went wrong")
        }
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-black">
            <div className="bg-[#121212] shadow-2xl  p-6 w-full max-w-md sm:max-w-lg transition-all">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-white">Create Your Buzz 🚀</h2>

                {/* Title Input */}
                <input
                    type="text"
                    name="title"
                    placeholder="Enter a catchy title"
                    value={buzz.title}
                    onChange={handleChange}
                    className="w-full p-4 mb-4 bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#1e1e1e] transition-all"
                />

                {/* Buzz Content */}
                <textarea
                    name="tweet_content"
                    placeholder="What's buzzing in your mind?"
                    value={buzz.tweet_content}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-4 mb-4  bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#1e1e1e] resize-none transition-all"
                />

                {/* Hashtags Input */}
                <input
                    type="text"
                    name="hashtags"
                    placeholder="# Add some hashtags"
                    value={buzz.hashtags}
                    onChange={handleChange}
                    className="w-full p-4 mb-6  bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#1e1e1e] transition-all"
                />

                {/* Share Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10  w-full sm:w-auto transition-all duration-300"
                    >
                        Share Buzz ✨
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBuzz;
