import { UserData } from "./user"

export interface CommentData{
    id?: number
    post_id?: number
    user_id?: number
    content?: string
    user?: UserData
}

export interface CreateComment{
    post_id?: number
    content?: string
}