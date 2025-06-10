import { Users, Home, Building, UserCheck, ChevronDown } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const membershipItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Delegates", url: "/delegates", icon: UserCheck },
  { title: "Member States", url: "/member-states", icon: Building },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  
  // Check if any membership route is active to keep the group open
  const isMembershipActive = membershipItems.some(item => currentPath === item.url)
  const [membershipOpen, setMembershipOpen] = useState(true) // Always open by default

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-60"} collapsible="icon">
      <div className="p-4 border-b">
        <h2 className={`font-bold text-xl text-primary ${state === "collapsed" ? "hidden" : ""}`}>
          ContactHub
        </h2>
        {state === "collapsed" && (
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
        )}
      </div>

      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Membership Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Membership section with sub-items */}
              <Collapsible open={membershipOpen} onOpenChange={setMembershipOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <Users className="h-4 w-4" />
                      {state !== "collapsed" && (
                        <>
                          <span>Membership</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200" />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {membershipItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <NavLink
                              to={item.url}
                              end
                              className={({ isActive }) =>
                                `flex items-center gap-3 p-2 rounded-md transition-colors ${
                                  isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                                }`
                              }
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
