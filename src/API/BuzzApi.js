import axios from "axios";
import { server_url } from "./UserAPIs";
import { getPassKey, getUserData } from "@/utils/getUserData";
import { decrypt } from "@/utils/PasswordEncryption";



const fetchAllBuzz = async () => {
    try {
        const userName = getUserData();
        const password = getPassKey();
        const decrypted = password ? decrypt(password) : '';


        const response = await axios.get(`${server_url}/buzz`, {
            auth: {
                username: userName,
                password: decrypted
            }
        })


        if (response.status === 200) {
            console.log("All Buzz fetched succssfully <3 :)");
            return response.data;

        }
    } catch (error) {
        console.log("Error fetching buzz :(", error);

    }
}

const fetchAllBuzzOfUser = async () => {
    try {
        const userName = getUserData();
        const password = getPassKey();
        const decrypted = password ? decrypt(password) : '';


        const response = await axios.get(`${server_url}/buzz/user`, {
            auth: {
                username: userName,
                password: decrypted
            }
        })


        if (response.status === 200) {
            console.log("All Buzz fetched succssfully <3 :)");
            return response.data;

        }
    } catch (error) {
        console.log("Error fetching buzz :(", error);

    }
}

const createBuzz = async (buzzData, navigate) => {
    try {
        const userName = getUserData();
        const password = getPassKey();
        const decrypted = password ? decrypt(password) : '';
        const response = await axios.post(`${server_url}/buzz`,
            buzzData, {
            auth: {
                username: userName,
                password: decrypted
            },
            withCredentials: true
        })
        if (response.status === 200) {
            navigate("/user/buzz")
        }
    } catch (error) {
        console.log("Error posting buzz", error);

    }
}

const updateLikes = async (id) => {
    try {
        const userName = getUserData();
        const passKey = getPassKey();
        const decrypted = passKey ? decrypt(passKey) : '';

        const response = await axios.put(`${server_url}/buzz/${id}`,
            {userName : userName}, {
            auth: {
                username: userName,
                password: decrypted
            },
            withCredentials: true
        })
        if (response.status == 200) {
            return "Likes Updated"

        }
    } catch (error) {

    }
}

export { fetchAllBuzz, createBuzz, fetchAllBuzzOfUser, updateLikes }