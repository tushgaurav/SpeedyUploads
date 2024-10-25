"use client"

import * as React from "react"
import {
  BookOpen,
  Settings2,
  CloudUpload,
  ChartColumn
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { CompanyLogo } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useSession } from "next-auth/react"

// This is sample data.

const data = {

  navMain: [
    {
      title: "Upload",
      url: "/upload",
      icon: CloudUpload,
      isActive: true,
      items: [
        {
          title: "New",
          url: "/upload",
        },
        {
          title: "Files",
          url: "/upload/files",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Stats",
      url: "#",
      icon: ChartColumn,
      items: [
        {
          title: "Downloads",
          url: "#",
        },
        {
          title: "Bandwidth",
          url: "#",
        },
        {
          title: "Cost",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  const user = {
    name: session?.user?.name as string,
    email: session?.user?.email as string,
    avatar: session?.user?.image as string,
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
