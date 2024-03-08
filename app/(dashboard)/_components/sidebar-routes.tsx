"use client"
import { SidebarItem } from './sidebar-item'
import { Compass, Layout } from 'lucide-react'

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
export const SidebarRoutes = () => {
    const routes = guestroutes;
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