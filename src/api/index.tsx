import axios from "axios";
import { env } from "../config/env";
import { LoginData } from "../interface/login";
import { CreateComment } from "../interface/comment";
import { CreatePostLike } from "../interface/like";


export class InstaApi {
    private static baseUrl = env.VITE_INSTAAPI_BASE_URL
    private static headers = { "Content-Type": "application/json" }

    static async login(data: LoginData) {
        return await axios.post(this.baseUrl + '/api/login', data, { headers: this.headers })
    }

    static async getUser(token: string) {
        return await axios.get(this.baseUrl + '/api/user', { headers: { ...this.headers, "Authorization": `Bearer ${token}` } })
    }

    static async logOut(token: string) {
        return await axios.post(this.baseUrl + `/api/logout`, undefined, { headers: { ...this.headers, "Authorization": `Bearer ${token}` } })
    }

    static async getPosts(token: string) {
        return await axios.get(this.baseUrl + '/api/posts', { headers: { ...this.headers, "Authorization": `Bearer ${token}` } })
    }

    static async getPost(id: number, token: string) {
        return await axios.get(this.baseUrl + `/api/posts/${id}`, { headers: { ...this.headers, "Authorization": `Bearer ${token}` } })
    }

    static async createPostComment(data: CreateComment, token: string) {
        return await axios.post(this.baseUrl + `/api/posts/comments`, data, { headers: { ...this.headers, "Authorization": `Bearer ${token}` } })
    }

    static async createPostLike(data: CreatePostLike, token: string) {
        return await axios.post(this.baseUrl + `/api/posts/likes`, data, { headers: { ...this.headers, "Authorization": `Bearer ${token}` } })
    }

    static async deletePostLike(id: number, token: string) {
        return await axios.delete(this.baseUrl + `/api/posts/likes/${id}`, { headers: { ...this.headers, "Authorization": `Bearer ${token}` } })
    }
}