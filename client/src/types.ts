export interface Post {
    identifier: string
    title: string
    body?: string
    username: string
    slug: string
    subName: string
    createdAt: string
    updatedAt: string
    //virtual fields
    url: string
    voteScore?: number
    commentCount?: number
    userVote?: number

}

export interface User {
    username: string
    email: string
    createdAt: string
    updatedAt: string
    
}