import Image from "next/image"
import type { User } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-primary/20 to-primary/40">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-background">
            <Image src={user.avatarUrl || "/placeholder.svg"} alt={user.username} fill className="object-cover" />
          </div>
        </div>
      </div>
      <CardContent className="mt-14 text-center">
        <h3 className="text-lg font-semibold">{user.username}</h3>
        <p className="text-sm text-muted-foreground">@{user.handle}</p>
        <div className="mt-4 flex justify-center">
          <Badge variant="secondary" className="px-3 py-1">
            {user.postCount} posts
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

