import { User, Package } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";

interface AppSidebarProps {
  activeView: "driver" | "orders";
  onViewChange: (view: "driver" | "orders") => void;
}

const menuItems = [
  { id: "orders", title: "Order Details", icon: Package },
  { id: "driver", title: "Driver Details", icon: User },
];

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-64"} bg-gradient-to-b from-orange-50 to-orange-100/50 sidebar shadow-lg border-r border-orange-200/50`}
      collapsible="icon"
    >
      <SidebarHeader className="bg-gradient-to-r from-orange-50 to-orange-100/70 p-6 border-b border-orange-200/60 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          {!isCollapsed && (
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                Transport Panel
              </h1>
              <div className="w-12 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto"></div>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4 space-y-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id as "driver" | "orders")}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 text-lg font-medium ${
                      activeView === item.id
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 transform scale-105"
                        : "text-gray-700 hover:bg-white/70 hover:text-gray-900 hover:shadow-md hover:scale-102 backdrop-blur-sm"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      activeView === item.id 
                        ? "bg-white/20" 
                        : "bg-orange-100/50"
                    }`}>
                      <item.icon className={`h-5 w-5 ${
                        activeView === item.id ? "text-white" : "text-orange-600"
                      }`} />
                    </div>
                    {!isCollapsed && (
                      <span className="text-base font-semibold">{item.title}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}