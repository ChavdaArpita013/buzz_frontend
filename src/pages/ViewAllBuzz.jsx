import { fetchAllBuzz } from '@/API/BuzzApi';
import ViewBuzz from '@/components/ViewBuzz';
import React, { useEffect, useState } from 'react';


const ViewAllBuzz = () => {
    const [data, setData] = useState([]);



    useEffect(() => {
        const fetchBuzz = async () => {
            try {
                const buzz = await fetchAllBuzz();
                setData(buzz);
            } catch (error) {
                console.log("error calling api",error);
                
            }
        }
        fetchBuzz();
    }, []);

    return (
        <div>
            <ViewBuzz data={data} />
        </div>
    )
}

export default ViewAllBuzz;
