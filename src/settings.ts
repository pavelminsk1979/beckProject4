import express, {Request, Response} from 'express'
import { videosRoute} from "./routes/videos-route";
import {blogsRoute} from "./routes/blogs-route";
import {postsRoute} from "./routes/posts-route";
import {DB} from "./db/db";
import {blogsCollection, postsCollection} from "./db/mongoDb";


export const app = express()


app.use(express.json())

app.use('/videos', videosRoute)
app.use('/blogs', blogsRoute)
app.use('/posts', postsRoute)


app.delete('/testing/all-data', async (req: Request, res: Response) => {
    DB.videos.length = 0
   //DB.blogs.length=0
    //DB.posts.length=0
   await postsCollection.deleteMany({})
   await blogsCollection.deleteMany({})
    res.sendStatus(204)
})