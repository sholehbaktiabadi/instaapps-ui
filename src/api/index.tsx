import axios from "axios";
import { env } from "../config/env";
import { LoginData } from "../interface/login";

export class InstaApi{
    private static baseUrl = env.VITE_INSTAAPI_BASE_URL
    private static headers = { "Content-Type": "application/json" }

    static async login(data: LoginData){
        const request = await axios.post(this.baseUrl+'/api/login', data, { headers: this.headers })
        return request
    }
}