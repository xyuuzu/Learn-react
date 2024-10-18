export default function ChatUserInfoHeader({receiver}) {
    return (
        <div className="user-info-header bg-white px-5 py-3">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYb6Pn2mA3WBta7vCKwtjxoGyRWQxOgtc6Q&s"
                        alt=""
                        width="50"
                    />
                    <h3 className="text-md pl-4 text-gray-400">{receiver?.name}</h3>
                </div>
                <div>
                    <i className="fa fa-message text-violet-300"></i>
                    <i className="fa fa-video ml-3 text-gray-400"></i>
                    <i className="fa fa-phone ml-3 text-gray-400"></i>
                </div>
            </div>
        </div>
    );
}
