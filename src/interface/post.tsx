import { CommentData } from "./comment"
import { UserData } from "./user"

export interface PostData{
    id?: number
    caption?: string
    image_url?: string
    user?: UserData
    likes_count?: number
    comments?: CommentData[] 
    amilike?: boolean
}

export interface AddPost{
    caption?: string
    image_url?: string
}