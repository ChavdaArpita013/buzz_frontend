import { fetchAllBuzz, updateLikes } from '@/API/BuzzApi';
import { formatDate } from '@/utils/formateDate';
import { Heart, HeartHandshake } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ViewBuzz = ({ data }) => {
    // Maintain liked state per buzz ID
    const [likedBuzzes, setLikedBuzzes] = useState({});
    const [likeCounts, setLikeCounts] = useState(() => {
        const initialCounts = {};
        data.forEach(buzz => {
            initialCounts[buzz.id] = buzz.likes.length;
        });
        return initialCounts;
    });

    const [likeLoading, setLikeLoading] = useState({});

    const handleLikeClick = async (buzzId) => {
        if (likeLoading[buzzId]) return; // Don't allow double fire

        setLikeLoading(prev => ({ ...prev, [buzzId]: true }));

        const isAlreadyLiked = likedBuzzes[buzzId] || false;

        try {
            const updated = await updateLikes(buzzId);
            if (updated) {

                setLikedBuzzes(prev => ({
                    ...prev,
                    [buzzId]: !isAlreadyLiked,
                }));

                setLikeCounts(prev => ({
                    ...prev,
                    [buzzId]: prev[buzzId] + (isAlreadyLiked ? -1 : 1),
                }));
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        } finally {
            setLikeLoading(prev => ({ ...prev, [buzzId]: false }));
        }
    };



    return (
        <div className="min-h-screen bg-[#0d0d0d] text-gray-200 p-4">
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                {data.slice().reverse().map((buzz) => {
                    const isLiked = likedBuzzes[buzz.id] || false;
                    const likeCount = likeCounts[buzz.id] || buzz.likes.length;

                    return (
                        <div key={buzz.id} className="bg-[#1a1a1a] rounded-xl p-6 shadow-md border border-gray-800">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold">{buzz.createdBy}</h2>
                                <span className="text-xs text-gray-400">
                                    {formatDate(buzz.date)}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold mt-2 text-gray-100">{buzz.title}</h3>

                            <p className="text-gray-400 mt-3 leading-relaxed">{buzz.tweet_content}</p>

                            <div className="flex flex-wrap mt-4 gap-2">
                                {buzz.hashtagNames.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#333] text-gray-300 text-xs px-3 py-1 rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Like Button */}
                            <div
                                className="mt-4 flex items-center gap-2 text-sm cursor-pointer select-none"
                                onClick={() => handleLikeClick(buzz.id)}
                            >
                                {likedBuzzes[buzz.id] ? (
                                    <span className="text-2xl">❤️</span>
                                ) : (
                                    <span className="text-2xl">🤍</span>
                                )}

                                {/* Safely calculate like count */}
                                <span className="text-gray-300">
                                    {(likedBuzzes[buzz.id] ? (Number(likeCounts[buzz.id]) || buzz.likes?.length || 0) + 1 : (Number(likeCounts[buzz.id]) || buzz.likes?.length || 0))}{" "}
                                    {(likedBuzzes[buzz.id] ? (Number(likeCounts[buzz.id]) || buzz.likes?.length || 0) + 1 : (Number(likeCounts[buzz.id]) || buzz.likes?.length || 0)) === 1 ? "like" : "likes"}
                                </span>

                            </div>


                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewBuzz;
