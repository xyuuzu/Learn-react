import { Link } from "@inertiajs/react";

export default function ChatSidebar({ recentMessages }) {
    return (
        <>
            <div className="search-box h-10 text-slate-300">
                <div className="flex justify-between border-b border-slate-100 px-5 pb-2 ">
                    <form className="flex justify-center items-center">
                        <i className="fa fa-search"></i>
                        <input
                            type="search"
                            className="font-light focus:!outline-none border-0 hover:border-0 focus:border-0 focus:ring-0 !shadow-none"
                            placeholder="search"
                        />
                    </form>
                    <div>
                        <button className="relative">
                            <i className="fa fa-message"></i>
                            <i className="fa fa-plus absolute text-sm *:top-2"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="user-list h-screen overflow-y-auto">
                {recentMessages.map((user, index) => (
                    <Link
                        href={`/chat/${user.user_id}`}
                    key={index} className="flex px-5 py-3 transition hover:cursor-pointer hover:bg-slate-100">
                        <div className="pr-4">
                            {
                                user?.avatar !== undefined ? 
                                <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYb6Pn2mA3WBta7vCKwtjxoGyRWQxOgtc6Q&s"
                                alt=""
                                width="50"/>
                                : 
                                <i className="fa fa-user-circle text-gray-300 text-5xl"></i>
                            }
                            
                        </div>
                        <div>
                            <h3 className="text-violet-500">{user.name.length > 0 ? user.name : 'Tidak Di Ketahui'}</h3>
                            <p className="h-5 overflow-hidden text-sm font-light text-gray-400">
                                {user.message}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
