import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import  User  from '../entities/User'

//This returns a user if they exist and if they don't will throw an unauthenticated
export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies.token
        if (!token) throw new Error('Unauthenticated')

        const { username }: any = jwt.verify(token, process.env.JWT_SECRET!)

        const user = await User.findOne({ username })
        if (!user) throw new Error('Unauthenticated')

        //Attaches the user if it already exists
        res.locals.user = user
        return next()


    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: 'Unauthenticated' })
    }

}