import axios from 'axios'
export const api=axios.create({
    baseURL:'https://multivendor-i0ud.onrender.com',
    headers:{
        'Content-Type':'application/json'
    }
})