import {CreateAndUpdateBlogModel} from "../models/CreateAndUpdateBlogModel";
import {Blog} from "../allTypes/blogTypes";
import {blogsRepository} from "../repositories/blogs-repository-mongoDB";


export const blogsSevrice = {

    async createBlog(requestBodyBlog: CreateAndUpdateBlogModel) {
        const {name, description, websiteUrl} = requestBodyBlog

        const newBlog: Blog = {
            name,
            description,
            websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString()
        }

        const result = await blogsRepository.createBlog(newBlog)

        if (result.insertedId.toString()) {
            return {
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                isMembership: newBlog.isMembership,
                createdAt: newBlog.createdAt,
                id: result.insertedId.toString()
            }
        } else {
            return null
        }
    },


    async updateBlog(id: string, requestBodyBlog: CreateAndUpdateBlogModel) {
        return blogsRepository.updateBlog(id, requestBodyBlog)

    },


    async deleteBlogById(id: string) {

        return blogsRepository.deleteBlogById(id)
    }
}

