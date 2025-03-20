"use client"

import { useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { fetchTopUsers } from "@/lib/api"
import UserCard from "@/components/user-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TopUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        const data = await fetchTopUsers()
        setUsers(data)
        setError(null)
      } catch (err) {
        setError("Failed to load top users. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
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
        <h1 className="text-3xl font-bold">Top Users</h1>
        <p className="text-sm text-muted-foreground">Users with the highest number of posts</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col items-center rounded-lg border p-6 shadow-sm">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <div className="mt-4 space-y-2 text-center">
                    <Skeleton className="mx-auto h-4 w-[150px]" />
                    <Skeleton className="mx-auto h-4 w-[100px]" />
                  </div>
                </div>
              ))
          : users.map((user) => <UserCard key={user.id} user={user} />)}

        {!users.length && !loading && (
          <div className="col-span-full rounded-lg border p-8 text-center">
            <p className="text-muted-foreground">No users available</p>
          </div>
        )}
      </div>
    </div>
  )
}

