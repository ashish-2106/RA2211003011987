import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Heart } from "lucide-react"
import type { Post } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { user, content, timestamp, comments, likes, imageUrl } = post

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{user.username}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{content}</p>
        {imageUrl && (
          <div className="relative h-[300px] w-full overflow-hidden rounded-md">
            <Image src={imageUrl || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center space-x-2">
          <Heart className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{likes}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{comments.length}</span>
        </div>
        {comments.length > 0 && <Badge variant="outline">{comments.length} comments</Badge>}
      </CardFooter>
    </Card>
  )
}

