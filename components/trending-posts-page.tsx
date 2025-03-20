"use client"

import { useEffect, useState } from "react"
import type { Post } from "@/lib/types"
import { fetchTrendingPosts } from "@/lib/api"
import PostCard from "@/components/post-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TrendingPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        const data = await fetchTrendingPosts()
        setPosts(data)
        setError(null)
      } catch (err) {
        setError("Failed to load trending posts. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
          <h3 className="mb-2 text-lg font-semibold text-red-800 dark:text-red-200">Error</h3>
          <p className="text-red-600 dark:text-red-300">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Trending Posts</h1>
        <p className="text-sm text-muted-foreground">Posts with the highest number of comments</p>
      </div>

      <div className="space-y-6">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-lg border p-4 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="mt-4 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                  <Skeleton className="mt-4 h-[200px] w-full rounded-md" />
                </div>
              ))
          : posts.map((post) => <PostCard key={post.id} post={post} />)}

        {!posts.length && !loading && (
          <div className="rounded-lg border p-8 text-center">
            <p className="text-muted-foreground">No trending posts available</p>
          </div>
        )}
      </div>
    </div>
  )
}

