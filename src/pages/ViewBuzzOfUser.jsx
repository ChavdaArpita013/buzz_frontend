import { fetchAllBuzzOfUser } from '@/API/BuzzApi';
import ViewBuzz from '@/components/ViewBuzz';
import React, { useEffect, useState } from 'react';

const ViewBuzzOfUser = () => {
    const [data , setData] = useState([]);

    useEffect(() => {
        
        const fetchBuzzByUser =async () =>{
            try {
                const buzz = await fetchAllBuzzOfUser();
                setData(buzz);
            } catch (error) {
                console.log("Error getting buzz of user");
                
            }
        }
        fetchBuzzByUser();
    }, []);
    return (
        <div>
            <ViewBuzz data={data} />
        </div>
    );
}

export default ViewBuzzOfUser;
