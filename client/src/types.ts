export interface Post {
    identifier: string
    title: string
    body?: string
    username: string
    slug: string
    subName: string
    createdAt: string
    updatedAt: string
    //Virtual fields
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
    //Virtual fields
    imageUrl: string
    bannerUrl: string
    postCount?: number
}
export interface Comment {
    identifier: string
    body: string
    username: string
    createdAt: string
    updatedAt: string
    post?: Post
    //Virtual fields
    userVote?: number
    voteScore: number
}