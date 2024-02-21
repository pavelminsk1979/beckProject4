import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository-mongoDB";
import {authMiddleware} from "../middlewares/authMiddleware/authMiddleware";
import {nameValidationBlogs} from "../middlewares/blogsMiddelwares/nameValidationBlogs";
import {errorValidationBlogs} from "../middlewares/blogsMiddelwares/errorValidationBlogs";
import {descriptionValidationBlogs} from "../middlewares/blogsMiddelwares/descriptionValidationBlogs";
import {websiteUrlValidationBlog} from "../middlewares/blogsMiddelwares/websiteUrlValidationBlog";
import {RequestWithParams} from "../types/RequestWithParams";
import {IdStringGetAndDeleteModel} from "../models/IdStringGetAndDeleteModel";
import {RequestWithBody} from "../types/RequestWithBody";
import {CreateAndUpdateBlogModel} from "../models/CreateAndUpdateBlogModel";
import {STATUS_CODE} from "../constant-status-code";
import {RequestWithParamsWithBody} from "../types/RequestWithParamsWithBody";


export const blogsRoute = Router({})

const postValidationBlogs = () => [nameValidationBlogs, descriptionValidationBlogs, websiteUrlValidationBlog]


blogsRoute.get('/', async (req: Request, res: Response) => {
    const blogs = await blogsRepository.getBlogs()
    res.status(STATUS_CODE.CODE_200).send(blogs)
})


blogsRoute.get('/:id', async (req: RequestWithParams<IdStringGetAndDeleteModel>, res: Response) => {
    const blog = await blogsRepository.findBlogById(req.params.id)
    if (blog) {
        res.status(STATUS_CODE.CODE_200).send(blog)
    } else {
        res.sendStatus(STATUS_CODE.CODE_404)
    }

})


blogsRoute.post('/', authMiddleware, postValidationBlogs(), errorValidationBlogs, async (req: RequestWithBody<CreateAndUpdateBlogModel>, res: Response) => {
    const newBlog = await blogsRepository.createBlog(req.body)
    if(newBlog){    res.status(STATUS_CODE.CODE_201).send(newBlog)
    } else {
        res.sendStatus(STATUS_CODE.CODE_404)
    }
})


blogsRoute.put('/:id', authMiddleware, postValidationBlogs(), errorValidationBlogs, async (req: RequestWithParamsWithBody<IdStringGetAndDeleteModel, CreateAndUpdateBlogModel>, res: Response) => {
    const isUpdateBlog = await blogsRepository.updateBlog(req.params.id, req.body)
    if (isUpdateBlog) {
        res.sendStatus(STATUS_CODE.CODE_204)
    } else {
        res.sendStatus(STATUS_CODE.CODE_404)
    }
})


blogsRoute.delete('/:id', authMiddleware, async (req: RequestWithParams<IdStringGetAndDeleteModel>, res: Response) => {
    const isBlogDelete = await blogsRepository.deleteBlogById(req.params.id)
    if (isBlogDelete) {
        res.sendStatus(STATUS_CODE.CODE_204)
    } else {
        res.sendStatus(STATUS_CODE.CODE_404)
    }
})















