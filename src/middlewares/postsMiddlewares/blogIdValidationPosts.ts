

import {body} from "express-validator";
import {blogsRepository} from "../../repositories/blogs-repository-mongoDB";

const findValue=async (value:string)=>{
   let blog = await blogsRepository.findBlogById(value)
    if(blog){return blog.id}
    return null
}
export const blogIdValidationPosts = body('blogId')
    .exists()
    .trim()
    .custom(async (value) => {
        const result = await findValue(value)
        if (result === null) {
            throw new Error('Incorrect blogId');
        }
        return true;
    })
    .withMessage('Incorrect blogId')


