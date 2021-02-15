import { BeforeInsert, Column, Entity as TOEntity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'


import Entity from './Entity'
import Post from './Post'
import User from './User'

import { makeId} from '../util/helpers'
import Vote from './Vote'
import { Exclude } from 'class-transformer'
@TOEntity('comments')
export default class Comment extends Entity {
    constructor(comment: Partial<Comment>) {
        super()
        Object.assign(this, comment)
    }
    @Index()
    @Column()
    identifier: string

    @Column()
    body: string

    @Column()
    username: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User;

    @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
    post: Post
    
    @Exclude()
    @OneToMany(() => Vote, vote => vote.comment)
    votes: Vote[]

    protected  userVote: number
    setUserVote(user: User) {
        //this checks the votes that are submitted to the post and the 
        //votes this user has submitted and finds the intersection
        // this looks through the votes to find where this username is equal
        const index = this.votes?.findIndex(v => v.username === user.username)
        //this uses the index to show that the user has voted for the post else it shows nothing
        this.userVote = index > -1 ? this.votes[index].value : 0
    }

    //Creats and identifier for the comment
    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(8)
    }


}