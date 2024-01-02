import axios from "axios";


const ApiRogans = axios.create({
    baseURL: 'http://192.168.0.12:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export { ApiRogans }