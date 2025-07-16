import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://study-platform-server-gray.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;