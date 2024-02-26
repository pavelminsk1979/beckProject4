import {WithId} from "mongodb";
import {OutputPost, Post} from "../allTypes/postTypes";


export const postMaper = (post: WithId<Post>): OutputPost => {
    return {
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
        id: post._id.toString(),
    }
    /*    return {
            id:post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId:post.blogId,
            blogName:post.blogName,
            createdAt:post.createdAt
        }*/
}