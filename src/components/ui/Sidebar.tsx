'use client'
import { useSidebarStore } from "@/store/useSideBarStore";
import { Hamburger, Search, User } from "lucide-react"
import Link from "next/link";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { truncateText } from "@/utils/helpers/trancateText";

const circleClass = "rounded-full shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10";
const buttonClass = "flex items-center justify-center cursor-pointer w-full py-2 rounded-lg shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10";
const inputClass = "outline-none absolute pl-18 w-full h-15 text-white rounded-full shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10";

export const Sidebar = () => {
    const { isOpen, toggle } = useSidebarStore();
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                searchRef.current?.focus();
            });
        }
    }, [isOpen]);

    const handleOpenSearch = () => {
        if (!isOpen) {
            toggle();
        } else {
            searchRef.current?.focus();
        }
    };
    return (
        <div className={cn(isOpen ? 'w-80' : 'w-20', 'bg-white/5 backdrop-blur-md border border-white/10 h-screen py-2 space-y-4 transition-all duration-300 overflow-hidden')}>
            <div className="px-2 flex flex-col gap-4">
                <div onClick={toggle} className={buttonClass}>
                    <Hamburger className="text-white w-10 h-10" />
                </div>

                <div className="flex relative">
                    <div onClick={handleOpenSearch} className={cn("flex w-15 h-15 items-center justify-center cursor-pointer shrink-0", circleClass, isOpen ? 'bg-transparent' : 'bg-white/5')}>
                        <Search className="text-white w-8 h-8" />
                    </div>
                    {isOpen && (
                        <input ref={searchRef} className={cn("flex items-center justify-center", inputClass)} type="text" />
                    )}
                </div>
            </div>
            <div className="h-[70vh] flex flex-col overflow-auto no-scrollbar">
                {Array.from({ length: 20 }).map((_, index) => {
                    return (
                        <div key={index} className="hover:bg-white/20 flex p-2 gap-2 transition-all cursor-pointer">
                            <div className={cn("flex w-15 h-15 items-center justify-center cursor-pointer shrink-0", circleClass)}>
                                <h2 className="text-white text-3xl select-none">TL</h2>
                            </div>
                            <div className={cn("flex flex-col transition-all duration-300 min-w-0", isOpen
                                ? 'w-44 opacity-100 translate-x-0 pointer-events-auto'
                                : 'w-0 opacity-0 -translate-x-4 pointer-events-none')}>
                                <h2 className="text-white text-lg font-bold whitespace-nowrap truncate select-none">{truncateText("John Doe Roflanowitch", 15)}</h2>
                                <p className="text-white whitespace-nowrap select-none">{truncateText("hi! My name is Leo, I am a frontend or fullstack developer, nice to see you!😊", 20)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="px-2">
                <Link href="/profile" className={buttonClass}>
                    <User className="text-white w-10 h-10" />
                </Link>
            </div>
        </div>
    )
}

