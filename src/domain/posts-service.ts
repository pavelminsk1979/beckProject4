import {Post} from "../allTypes/postTypes";
import {CreateAndUpdatePostModel} from "../models/CreateAndUpdatePostModel";
import {postsRepository} from "../repositories/posts-repository-mongoDB";

export const postsSevrice = {


    async createPost(requestBodyPost: CreateAndUpdatePostModel) {
        const {title, shortDescription, content, blogId} = requestBodyPost

        const newPost: Post = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: 'anyBlogName',
            createdAt: new Date().toISOString()
        }
        const result = await postsRepository.createPost(newPost)


        if (result.insertedId.toString()) {
            return {
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: newPost.blogName,
                createdAt: newPost.createdAt,
                id: result.insertedId.toString()
            }
        } else {
            return null
        }

    },


    async updatePost(id: string, requestBodyPost: CreateAndUpdatePostModel) {

        return  postsRepository.updatePost(id, requestBodyPost)

    },


    async deletePostById(id: string) {

        return  postsRepository.deletePostById(id)
    }

}