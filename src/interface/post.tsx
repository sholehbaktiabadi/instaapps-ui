import { CommentData } from "./comment"
import { UserData } from "./user"

export interface PostData{
    id?: number
    caption?: string
    image_url?: string
    user?: UserData
    comments?: CommentData[] 
}