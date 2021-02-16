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
    sub?: Sub
}

export interface User {
    username: string
    email: string
    createdAt: string
    updatedAt: string


}

export interface Sub {
    createdAt: string
    updatedAt: string
    name: string
    title: string
    description: string
    imageUrn: string
    bannerUrn: string
    username: string
    posts: Post[]
    //virtuals
    imageUrl: string
    bannerUrl: string
    postCount?: number
}