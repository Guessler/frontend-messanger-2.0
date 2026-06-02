import { MessageCircleOff, Search, Trash } from "lucide-react"

export const Header = () => {
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
                <div className="flex w-15 h-15 items-center justify-center cursor-pointer shrink-0 rounded-full shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-md border border-white/10">
                    <Search />
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