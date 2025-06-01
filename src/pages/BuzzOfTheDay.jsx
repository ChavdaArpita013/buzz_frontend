import React from 'react';

// Dummy data for Buzz of the Day
const buzzOfTheDayData = [
    {
        id: 1,
        userName: "CreativeSoul",
        title: "Chasing Dreams ✨",
        details: "Today I finally launched my dream project after 2 years of hustle. Never give up! 💪 #DreamBig #NeverSettle",
        hashtags: ["#DreamBig", "#NeverSettle"],
        likes: 523,
        date: "April 8, 2025"
    },
    {
        id: 2,
        userName: "TechieGal",
        title: "TechMagic!",
        details: "Built my first AI chatbot today! It's insane how much you can do with tech these days. 🚀🤖",
        hashtags: ["#AI", "#TechLife"],
        likes: 489,
        date: "April 7, 2025"
    }
    // You can fetch real-time Buzz of the Day later!
];

const BuzzOfTheDay = () => {
    return (
        <div className="min-h-screen bg-black text-white p-4">
            <h1 className="text-3xl font-bold text-center mb-8">🔥 Buzz of the Day 🔥</h1>
            <div className="grid gap-6">
                {buzzOfTheDayData.map((buzz) => (
                    <div key={buzz.id} className="bg-gray-900 rounded-2xl p-5 shadow-md">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-semibold">{buzz.userName}</h2>
                            <span className="text-sm text-gray-400">{buzz.date}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{buzz.title}</h3>
                        <p className="text-gray-300 mb-4">{buzz.details}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {buzz.hashtags.map((tag, index) => (
                                <span 
                                    key={index} 
                                    className="bg-gray-700 text-sm px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="text-yellow-400 font-bold">
                            ❤️ {buzz.likes} Likes
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BuzzOfTheDay;
