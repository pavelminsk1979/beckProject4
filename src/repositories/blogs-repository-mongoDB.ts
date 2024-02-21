import {CreateAndUpdateBlogModel} from "../models/CreateAndUpdateBlogModel";
import {blogsCollection} from "../db/mongoDb";
import {blogMaper} from "../mapers/blogMaper";
import {ObjectId} from "mongodb";
import {Blog} from "../allTypes/blogTypes";


export const blogsRepository = {
    async getBlogs() {
        const blogs = await blogsCollection.find({}).toArray()
        return blogs.map(blogMaper)
    },


    async findBlogById(id: string) {
        const blog = await blogsCollection.findOne({_id: new ObjectId(id)})
        if (blog) {
            return blogMaper(blog)
        } else {
            return null
        }
    },


    async createBlog(requestBodyBlog: CreateAndUpdateBlogModel) {
        const {name, description, websiteUrl} = requestBodyBlog

        const newBlog:Blog = {
            name,
            description,
            websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString()
        }

        const result = await blogsCollection.insertOne(newBlog)
        if (result.insertedId.toString()) {
            return {  name:newBlog.name,
                description:newBlog.description,
                websiteUrl:newBlog.websiteUrl,
                isMembership:newBlog.isMembership,
                createdAt: newBlog.createdAt, id: result.insertedId.toString()}
        }else {return null}
    },


    async updateBlog(id: string, requestBodyBlog: CreateAndUpdateBlogModel) {

        const {name, description, websiteUrl} = requestBodyBlog

        const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })

        return !!result.matchedCount

    },


    async deleteBlogById(id: string) {

        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})

        return !!result.deletedCount
    }
}

