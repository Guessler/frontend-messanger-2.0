'use client'
import { MessageCircleOff, Search, Trash } from "lucide-react"
import { useState, useRef, useEffect } from "react";
export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full flex justify-between h-20 bg-white/5 text-white backdrop-blur-md py-2 px-4 space-y-4 transition-all duration-300 overflow-hidden">
            <div className="flex gap-4">
                <div className="flex w-15 h-15 items-center justify-center cursor-pointer shrink-0 rounded-full shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10">
                    <h2 className="text-white text-3xl select-none">TL</h2>
                </div>
                <div className="flex flex-col transition-all duration-300 min-w-0 w-44 opacity-100 translate-x-0 pointer-events-auto">
                    <h2 className="text-white text-lg font-bold whitespace-nowrap truncate select-none">John Doe</h2>
                    <h2 className="text-blue-200">был в сети в 18:00</h2>
                </div>
            </div>
            <div className="flex gap-4">
                <div
                    ref={containerRef}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={`relative flex items-center h-15 ${isOpen ? 'w-75' : 'w-15'} transition-all duration-300 rounded-full shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer`}
                >
                    <div className="flex w-15 h-15 shrink-0 items-center justify-center rounded-full border border-white/10">
                        <Search />
                    </div>
                    <input
                        ref={inputRef}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Search..."
                        className={`outline-none bg-transparent h-full w-full pr-4 pl-2 text-white transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    />
                </div>
                <div className="flex w-15 h-15 items-center justify-center cursor-pointer shrink-0 rounded-full shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10">
                    <MessageCircleOff />
                </div>
                <div className="flex w-15 h-15 items-center justify-center cursor-pointer shrink-0 rounded-full shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10">
                    <Trash />
                </div>
            </div>
        </div>
    )
}