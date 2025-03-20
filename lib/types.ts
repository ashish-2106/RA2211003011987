export interface User {
  id: string
  username: string
  handle: string
  avatarUrl: string
  postCount: number
}

export interface Comment {
  id: string
  userId: string
  username: string
  content: string
  timestamp: string
}

export interface Post {
  id: string
  user: {
    id: string
    username: string
    avatarUrl: string
  }
  content: string
  imageUrl: string | null
  timestamp: string
  likes: number
  comments: Comment[]
}

