import {blogsCollection} from "../db/mongoDb";
import {blogMaper} from "../mapers/blogMaper";
import {ObjectId} from "mongodb";

export const blogQueryRepository = {
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
}