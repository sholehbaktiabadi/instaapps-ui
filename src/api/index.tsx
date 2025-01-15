import axios from "axios";
import { env } from "../config/env";
import { LoginData } from "../interface/login";
import { CreateComment } from "../interface/comment";
import { CreatePostLike } from "../interface/like";


export class InstaApi{
    private static baseUrl = env.VITE_INSTAAPI_BASE_URL
    private static headers = { "Content-Type": "application/json"}

    static async login(data: LoginData){
        const request = await axios.post(this.baseUrl+'/api/login', data, { headers: this.headers })
        return request
    }

    static async getPosts(token: string){
        const request = await axios.get(this.baseUrl+'/api/posts', { headers: {...this.headers, "Authorization": `Bearer ${token}`} })
        return request
    }

    static async getPost(id: number, token: string){
        const request = await axios.get(this.baseUrl+`/api/posts/${id}`, { headers: {...this.headers, "Authorization": `Bearer ${token}`} })
        return request
    }

    static async createPostComment(data: CreateComment, token: string){
        const request = await axios.post(this.baseUrl+`/api/posts/comments`, data ,{ headers: {...this.headers, "Authorization": `Bearer ${token}`} })
        return request
    }

    static async createPostLike(data: CreatePostLike, token: string){
        const request = await axios.post(this.baseUrl+`/api/posts/likes`, data ,{ headers: {...this.headers, "Authorization": `Bearer ${token}`} })
        return request
    }

    static async deletePostLike(id: number, token: string){
        const request = await axios.delete(this.baseUrl+`/api/posts/likes/${id}` ,{ headers: {...this.headers, "Authorization": `Bearer ${token}`} })
        return request
    }
}