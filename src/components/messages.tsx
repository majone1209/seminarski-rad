import {useState} from "react";

const Messages = ({drone, username, room}) => {
    const [message, setMessage] = useState("");
    
    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                room: room,
                author: username,
                currentMessage: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
        }
      
    }

    return (
        <div>
            <div className="chat__header">Chat</div>
            <div className="chat__body"></div>
            <div className="chat__foother">
                <input type="text" placeholder="Write a message..." onChange={(event) =>{setMessage(event.target.value)}} />
                <button className="btn__send">&#9658;</button>
            </div>
        </div>
    )
}

export default Messages;


