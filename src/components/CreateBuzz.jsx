import { createBuzz } from "@/API/BuzzApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const CreateBuzz = () => {
    const [buzz, setBuzz] = useState({
        title: "",
        tweet_content: "",
        hashtags: "",
    });
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBuzz({ ...buzz, [e.target.name]: e.target.value });
    };

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setMediaFile(file);
        if (file) {
            setMediaPreview(URL.createObjectURL(file));
        }
    };

    const uploadMediaToCloudinary = async () => {
        const formData = new FormData();
        formData.append("file", mediaFile);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); 
        const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;        
        
        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
                formData
            );
            return res.data.secure_url;
        } catch (err) {
            console.error("Media upload failed", err);
            toast.error("Media upload failed 😓");
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!buzz.title.trim() || !buzz.tweet_content.trim()) {
            toast.error("Title and content are required!");
            return;
        }

        setLoading(true);
        let mediaUrl = null;

        if (mediaFile) {
            mediaUrl = await uploadMediaToCloudinary();
            if (!mediaUrl) {
                setLoading(false);
                return;
            }
        }

        const hashtags = buzz.hashtags
            .split(/[\s,]+/)
            .map((tag) => tag.trim())
            .filter((tag) => tag.startsWith("#"))
            .map((tag) => tag.slice(1).toLowerCase())
            .filter(Boolean);

        const formData = {
            title: buzz.title,
            tweet_content: buzz.tweet_content,
            hashtagNames: hashtags,
            mediaUrl: mediaUrl || "",
        };

        const create = await createBuzz(formData, navigate);
        setLoading(false);

        if (create) {
            toast("Buzz Posted Successfully 🎉");
            setBuzz({ title: "", tweet_content: "", hashtags: "" });
            setMediaFile(null);
            setMediaPreview(null);
        } else {
            toast.error("Something went wrong 😢");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-black">
            <div className="bg-[#121212] shadow-2xl p-6 w-full max-w-md sm:max-w-lg transition-all">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-white">Create Your Buzz 🚀</h2>

                {/* Title Input */}
                <input
                    type="text"
                    name="title"
                    placeholder="Enter a catchy title"
                    value={buzz.title}
                    onChange={handleChange}
                    className="w-full p-4 mb-4 bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                {/* Buzz Content */}
                <div className="relative mb-4">
                    <textarea
                        name="tweet_content"
                        placeholder="What's buzzing in your mind?"
                        value={buzz.tweet_content}
                        onChange={handleChange}
                        rows="5"
                        className="w-full p-4 pr-12 bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                    />

                    <input
                        type="file"
                        id="mediaUpload"
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                        className="hidden"
                    />
                    <label htmlFor="mediaUpload" className="absolute bottom-3 right-3 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-blue-400 hover:text-blue-500 transition"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18.364 5.636a4.5 4.5 0 010 6.364l-7.071 7.071a4.5 4.5 0 01-6.364-6.364l7.071-7.071a3 3 0 114.243 4.243L7.05 17.05"
                            />
                        </svg>
                    </label>
                </div>

                {/* Media Preview */}
                {mediaPreview && (
                    <div className="mb-4">
                        {mediaFile?.type.startsWith("image") ? (
                            <img
                                src={mediaPreview}
                                alt="Preview"
                                className="w-full h-auto max-h-60 object-contain rounded"
                            />
                        ) : (
                            <video controls src={mediaPreview} className="w-full rounded max-h-60" />
                        )}
                    </div>
                )}

                {/* Hashtags Input */}
                <input
                    type="text"
                    name="hashtags"
                    placeholder="# Add some hashtags"
                    value={buzz.hashtags}
                    onChange={handleChange}
                    className="w-full p-4 mb-4 bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                {/* Share Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 w-full sm:w-auto transition-all duration-300 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    />
                                </svg>
                                Uploading...
                            </span>
                        ) : (
                            "Share Buzz ✨"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBuzz;
