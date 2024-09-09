import axios from "axios";

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => { // hàm trả về 1 promise
    const response = await request.get(path, options);
    return response.data;
};

export default request;