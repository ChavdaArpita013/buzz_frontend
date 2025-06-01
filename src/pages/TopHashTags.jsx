import { getTrendingHashTags } from '@/API/HashTagApi';
import React, { useEffect, useState } from 'react';

const TopHashTags = () => {
    const [hashtagData , setHashtagData] = useState([]);

    useEffect (() =>{
        const fetchHashTags =async () =>{
            try {
                const data =await getTrendingHashTags();
                setHashtagData(data);
    
            } catch (error) {
                console.log("error fetching hash tag's data");
                
            }
        }
        fetchHashTags();
    }, []);
    
    
    return (
        <div className="min-h-screen bg-[#0d0d0d] text-gray-200 p-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Trend of Buzz</h1>

            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                {/* on click of hath tag redirect to viewAllbuzz just filter data frm API of particular hashtag  */}
                {/* used to reuse code */}
                {hashtagData.map((hashtag, index) => (
                    <div 
                        key={index} 
                        className="bg-[#1a1a1a] rounded-xl p-4 flex justify-between items-center shadow-md border border-gray-800"
                    >
                        <span className="text-lg font-semibold text-gray-100">{hashtag.hashtag}</span>
                        <span className="text-sm text-gray-400">{hashtag.buzzCount} Buzzes</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopHashTags;
