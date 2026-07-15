import { useParams } from "react-router-dom";

import ChatWindow from "../../components/chat/ChatWindow";

function Chat() {

    const { bookingId } = useParams();

    return (

        <div className="max-w-5xl mx-auto py-10 px-4">

            <ChatWindow
                bookingId={bookingId}
            />

        </div>

    );

}

export default Chat;