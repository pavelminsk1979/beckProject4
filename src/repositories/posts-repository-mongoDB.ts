import {CreateAndUpdatePostModel} from "../models/CreateAndUpdatePostModel";
import {blogsCollection, postsCollection} from "../db/mongoDb";
import {postMaper} from "../mapers/postMaper";
import {Post} from "../allTypes/postTypes";
import {ObjectId} from "mongodb";




export const postsRepository = {

    async getPosts(): Promise<Post[]> {
        const posts = await postsCollection.find({}).toArray()
        return posts.map(postMaper)
    },


    async findPostById(id: string) {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if (post) {
            return postMaper(post)
        } else {
            return null
        }
    },


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

        const result = await postsCollection.insertOne(newPost)

        if(result.insertedId.toString()){
            return {  title:newPost.title,
                shortDescription:newPost.shortDescription,
                content:newPost.content,
                blogId:newPost.blogId,
                blogName: newPost.blogName,
                createdAt:newPost.createdAt,
                id:result.insertedId.toString()}
        } else {
            return null
        }

    },


    async updatePost(id: string, requestBodyPost: CreateAndUpdatePostModel) {

        const {title, blogId, content, shortDescription} = requestBodyPost

        const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: title,
                blogId: blogId,
                content: content,
                shortDescription: shortDescription
            }
        })

        return !!result.matchedCount
    },


    async deletePostById(id: string) {

        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})

        return !!result.deletedCount
    }

}