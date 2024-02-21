import {Request, Response, Router} from "express";
import {STATUS_CODE} from "../constant-status-code";
import {postsRepository} from "../repositories/posts-repository-mongoDB";
import {RequestWithParams} from "../types/RequestWithParams";
import {IdStringGetAndDeleteModel} from "../models/IdStringGetAndDeleteModel";
import {RequestWithBody} from "../types/RequestWithBody";
import {CreateAndUpdatePostModel} from "../models/CreateAndUpdatePostModel";
import {titleValidationPosts} from "../middlewares/postsMiddlewares/titleValidationPosts";
import {authMiddleware} from "../middlewares/authMiddleware/authMiddleware";
import {shortDescriptionValidationPosts} from "../middlewares/postsMiddlewares/shortDescriptionValidationPosts";
import {contentValidationPosts} from "../middlewares/postsMiddlewares/contentValidationPosts";
import {blogIdValidationPosts} from "../middlewares/postsMiddlewares/blogIdValidationPosts";
import {errorValidationBlogs} from "../middlewares/blogsMiddelwares/errorValidationBlogs";
import {RequestWithParamsWithBody} from "../types/RequestWithParamsWithBody";
import {Post} from "../allTypes/postTypes";



export const postsRoute = Router ({})



const createAndUpdateValidationPosts = ()=>[titleValidationPosts,shortDescriptionValidationPosts,contentValidationPosts,blogIdValidationPosts]

postsRoute.get('/', async (req: Request, res: Response) => {
    const posts:Post[] = await postsRepository.getPosts()

    res.status(STATUS_CODE.CODE_200).send(posts)
})


postsRoute.get('/:id', async (req: RequestWithParams<IdStringGetAndDeleteModel>, res: Response) => {
    const post = await postsRepository.findPostById(req.params.id)
    if(post){
        res.status(STATUS_CODE.CODE_200).send(post)
    } else { res.sendStatus(STATUS_CODE.CODE_404)}

})

postsRoute.post('/',authMiddleware,
    createAndUpdateValidationPosts(),
    errorValidationBlogs, async (req: RequestWithBody<CreateAndUpdatePostModel>, res: Response) => {
const newPost = await postsRepository.createPost(req.body)
    res.status(STATUS_CODE.CODE_201).send(newPost)
})



postsRoute.put('/:id',authMiddleware,
    createAndUpdateValidationPosts(),
    errorValidationBlogs, async (req: RequestWithParamsWithBody<IdStringGetAndDeleteModel, CreateAndUpdatePostModel>, res: Response) => {
    const isUpdatePost = await postsRepository.updatePost(req.params.id,req.body)
        if(isUpdatePost){
            res.sendStatus(STATUS_CODE.CODE_204)
        }else {res.sendStatus(STATUS_CODE.CODE_404)}
    })


postsRoute.delete('/:id',authMiddleware, async (req: RequestWithParams<IdStringGetAndDeleteModel>, res: Response) => {
    const isPostDelete = await postsRepository.deletePostById(req.params.id)
    if(isPostDelete){
        res.sendStatus(STATUS_CODE.CODE_204)
    }else {
        res.sendStatus(STATUS_CODE.CODE_404)
    }
})








