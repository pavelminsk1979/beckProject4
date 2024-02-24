import {Post} from "../allTypes/postTypes";
import {postsCollection} from "../db/mongoDb";
import {postMaper} from "../mapers/postMaper";
import {ObjectId} from "mongodb";


export const postQueryRepository = {

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
}