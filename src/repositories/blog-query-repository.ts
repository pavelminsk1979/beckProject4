import {blogsCollection} from "../db/mongoDb";
import {blogMaper} from "../mapers/blogMaper";
import {ObjectId} from "mongodb";
import {OutputBlog, PaginationWithOutputBlog, SortData} from "../allTypes/blogTypes";




export const blogQueryRepository = {
    async getBlogs(sortData:SortData):Promise<PaginationWithOutputBlog<OutputBlog>> {
        const {searchNameTerm,sortBy,sortDirection,pageNumber,pageSize}=sortData

        let filter = {}

        if(searchNameTerm){
            filter = {name:{
                $regex:searchNameTerm,
                    $options:'i'
            }}
        }


        const blogs = await blogsCollection
            .find(filter)
            .sort(sortBy,sortDirection)
            .skip((pageNumber-1)*pageSize)
            .limit(pageSize)
            .toArray()

        const totalCount = await blogsCollection.countDocuments(filter)

        const pagesCount=Math.ceil(totalCount/pageSize)


        return{
            pagesCount,
            page:pageNumber,
            pageSize,
            totalCount,
            items:blogs.map(blogMaper)
        }
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