'use client'
import { useSidebarStore } from "@/store/useSideBarStore";
import { Hamburger, Search, User } from "lucide-react"

export const Sidebar = () => {
    const { isOpen, toggle } = useSidebarStore();
    return (
        <div className={`${isOpen ? 'w-70' : 'w-20'} bg-white/5 backdrop-blur-md border border-white/10 h-screen p-2 flex flex-col gap-4 transition-all`}>
            <div onClick={toggle} className="flex items-center justify-center cursor-pointer  w-full py-2 rounded-lg shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10">
                <Hamburger className="text-white w-10 h-10" />
            </div>
            <div className="flex items-center justify-center cursor-pointer  w-full py-2 rounded-lg shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10">
                <Search className="text-white w-10 h-10" />
            </div>
            <div className="h-[70vh] flex flex-col gap-4 overflow-hidden">
                {Array.from({ length: 20 }).map((_, index) => {
                    return (
                        <div key={index} className="flex items-center justify-center cursor-pointer w-full py-2 rounded-full shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10">
                            <User className="text-white w-10 h-10" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

