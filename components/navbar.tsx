"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, TrendingUp, Users } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Feed",
      href: "/feed",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Top Users",
      href: "/top-users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Trending Posts",
      href: "/trending-posts",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ]

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">Social Media Analytics</span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === item.href ? "bg-primary-foreground/20" : "hover:bg-primary-foreground/10"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md p-2 ${
                    pathname === item.href ? "bg-primary-foreground/20" : "hover:bg-primary-foreground/10"
                  }`}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

