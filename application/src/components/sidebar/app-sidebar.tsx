import * as React from "react"
import {
  AudioWaveform,
  Bot,
  ChartBarIncreasing,
  Command,
  Frame,
  Map,
  SquareTerminal,
  Trees,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Forest Map",
      logo: Trees,
      plan: "Admin",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Manage",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Companies",
          url: "/companies",
        },
        {
          title: "Forest",
          url: "/forests",
        },
      ],
    },
    {
      title: "Analysis",
      url: "#",
      icon: ChartBarIncreasing,
      items: [
        {
          title: "Upload analysis",
          url: "/trees/upload",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Test",
          url: "/trees/upload",
        },
        {
          title: "Train",
          url: "/trees/upload",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: "/",
      icon: Frame,
    },
    {
      name: "Map",
      url: "/map",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
