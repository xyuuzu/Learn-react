import ChatInput from "@/Components/Chat/ChatInput";
import ChatMessages from "@/Components/Chat/ChatMessages";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatUserInfoHeader from "@/Components/Chat/ChatUserInfoHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Chat(props) {
    const { auth } = props;

    console.log(props);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Chat" />

            <div className="">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />

                <div className="messager h-screen overflow-hidden p-4">
                    <div className="flex">
                        <div className="basis-2/6 border-r border-slate-100 bg-white pt-3">
                            <ChatSidebar
                                recentMessages={props.recentMessages}
                            />
                        </div>

                        <div className="basis-4/6">
                            {props.receiver?.id ? (
                                <>
                                    <ChatUserInfoHeader receiver={props.receiver} />
                                    <div className="messanger mt-4">
                                        <div className="px-4">
                                            <ChatMessages messages= {props.messages} auth_id={props.auth?.user?.id} />
                                        </div>
                                        <ChatInput receiver={props.receiver}/>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-center items-center bg-slate-100 h-screen">
                                    <p className="font-bold text-3xl text-gray-500">
                                        Pilih Pesan Untuk Memulai percakapan...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
