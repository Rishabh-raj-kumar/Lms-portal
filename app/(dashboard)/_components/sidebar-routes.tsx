"use client"
import { usePathname } from 'next/navigation'
import { SidebarItem } from './sidebar-item'
import { Compass, Layout, icons,List,BarChart } from 'lucide-react'

const guestroutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },

]

const teacherRoutes = [
    {
        icon : List,
        label : "Couses",
        href : "/teacher/courses"
    },
    {
        icon : BarChart,
        label : "Analytics",
        href : "/teacher/analytics"
    }
]
export const SidebarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.includes("/teacher")
    const routes = isTeacherPage ? teacherRoutes : guestroutes;
    return (
        <div className=' flex flex-col w-full'>
            {routes.map((route) =>(
                <SidebarItem
                key={route.href}
                icon= {route.icon}
                label = {route.label}
                href = {route.href}
                />
            ))}
        </div>
    )
}