import { Request, Response, Router } from 'express'
import Comment from '../entities/Comment'
import Post from '../entities/Post'
import User from '../entities/User'
import Vote from '../entities/Vote'
import auth from '../middlware/auth'
import user from '../middlware/user'

const vote = async (req: Request, res: Response) => {
    const { identifier, slug, commentIdentifier, value } = req.body
    //Checks for vote value
    if (![-1, 0, 1].includes(value)) return res.status(400).json({ value: 'Value must be -1, 0 or 1' })

    try {
        const user: User = res.locals.user
        console.log(user)
        let post = await Post.findOneOrFail({ identifier, slug })
        let vote: Vote | undefined
        let comment: Comment | undefined


        //Checks for vote comment or post 
        if (commentIdentifier) {
            //If there is a comment identifier find vote by comment
            comment = await Comment.findOneOrFail({ identifier: commentIdentifier })
            vote = await Vote.findOne({ user, comment })
        } else {
            //Find vote by post
            vote = await Vote.findOne({ user, post })
        }
        //Depending on the value of the vote we have to check
        //If there is no vote and a value is zero means there is no vote and not vote value
        if (!vote && value === 0) {
            return res.status(404).json({ error: 'Vote not found' })
            //if not vote create it
        } else if (!vote) {
            vote = new Vote({ user, value })
            if (comment) vote.comment = comment
            else vote.post = post
            await vote.save()
            //if vote exists and value = 0 remove vote from DB
        } else if (value === 0) {
            await vote.remove()
            //if  vote and value has changed update vote
        } else if (vote.value !== value) {
            vote.value = value
            await vote.save()
        }

        post = await Post.findOneOrFail({ identifier, slug }, { relations: ['comments', 'comments.votes', 'sub', 'votes'] })
        post.setUserVote(user)
        post.comments.forEach(comment => comment.setUserVote(user))


        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }

}
const router = Router()

router.post('/vote', user, auth, vote)
export default router