import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        // 'content-type':'application/octet-stream',
        // 'x-rapidapi-host':'example.com',
        // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
    },
});

export const getData = () => instance({
        'method':'GET',
        'url':'/products/1',
        // 'params': {
        //     'search':'parameter',
        // },
    })