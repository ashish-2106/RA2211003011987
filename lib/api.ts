import type { Post, User } from "./types"

// Base URL for the API
const API_BASE_URL = "http://localhost:3000"

// Helper function to generate random images
const getRandomImage = (seed: string, width = 600, height = 400) => {
  return `/placeholder.svg?height=${height}&width=${width}&text=${seed}`
}

// Helper function to generate random avatar
const getRandomAvatar = (username: string) => {
  return `/placeholder.svg?height=100&width=100&text=${username.substring(0, 2).toUpperCase()}`
}

// Fetch all posts
export async function fetchPosts(): Promise<Post[]> {
  try {
    // In a real app, this would be an actual API call
    // const response = await fetch(`${API_BASE_URL}/api/posts`)
    // if (!response.ok) throw new Error('Failed to fetch posts')
    // return await response.json()

    // Mock data for demonstration
    return generateMockPosts(20)
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
}

// Fetch top users
export async function fetchTopUsers(): Promise<User[]> {
  try {
    // In a real app, this would be an actual API call
    // const response = await fetch(`${API_BASE_URL}/api/users/top`)
    // if (!response.ok) throw new Error('Failed to fetch top users')
    // return await response.json()

    // Mock data for demonstration
    return generateMockUsers(5)
  } catch (error) {
    console.error("Error fetching top users:", error)
    throw error
  }
}

// Fetch trending posts
export async function fetchTrendingPosts(): Promise<Post[]> {
  try {
    // In a real app, this would be an actual API call
    // const response = await fetch(`${API_BASE_URL}/api/posts/trending`)
    // if (!response.ok) throw new Error('Failed to fetch trending posts')
    // return await response.json()

    // Mock data for demonstration
    const posts = generateMockPosts(10)
    // Sort by comment count to get trending posts
    return posts.sort((a, b) => b.comments.length - a.comments.length)
  } catch (error) {
    console.error("Error fetching trending posts:", error)
    throw error
  }
}

// Mock data generators
function generateMockUsers(count: number): User[] {
  const users: User[] = []
  const names = [
    "Alex Johnson",
    "Sam Smith",
    "Jordan Lee",
    "Taylor Swift",
    "Morgan Freeman",
    "Casey Jones",
    "Riley Cooper",
    "Jamie Fox",
    "Quinn Thomas",
    "Avery Williams",
  ]

  for (let i = 0; i < count; i++) {
    const username = names[i % names.length]
    const handle = username.toLowerCase().replace(" ", "")
    users.push({
      id: `user-${i + 1}`,
      username,
      handle,
      avatarUrl: getRandomAvatar(username),
      postCount: Math.floor(Math.random() * 100) + 10,
    })
  }

  // Sort by post count descending
  return users.sort((a, b) => b.postCount - a.postCount)
}

function generateMockPosts(count: number): Post[] {
  const posts: Post[] = []
  const users = generateMockUsers(5)
  const contents = [
    "Just launched our new product! Check it out!",
    "Having a great time at the conference today.",
    "What do you think about the latest tech trends?",
    "Working on an exciting new project. Can't wait to share!",
    "Beautiful day for a hike in the mountains.",
    "Just finished reading an amazing book. Highly recommend!",
    "Looking for feedback on my latest design. Thoughts?",
    "Celebrating a milestone today! 🎉",
    "Interesting discussion about AI ethics today.",
    "New tutorial just published on my blog!",
  ]

  for (let i = 0; i < count; i++) {
    const user = users[i % users.length]
    const content = contents[i % contents.length]
    const commentCount = Math.floor(Math.random() * 10)
    const comments = Array(commentCount)
      .fill(0)
      .map((_, j) => {
        const commentUser = users[(i + j + 1) % users.length]
        return {
          id: `comment-${i}-${j}`,
          userId: commentUser.id,
          username: commentUser.username,
          content: `This is comment ${j + 1} on post ${i + 1}. Great post!`,
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
        }
      })

    posts.push({
      id: `post-${i + 1}`,
      user: {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      content,
      imageUrl: i % 2 === 0 ? getRandomImage(`post-${i + 1}`) : null,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 604800000)).toISOString(),
      likes: Math.floor(Math.random() * 100),
      comments,
    })
  }

  return posts
}

