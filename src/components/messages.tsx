import {useState} from "react";

type MessageType = {
    id: number;
    text: string;
    user: string;

}

const Message = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setNewMessage] = useState("");
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
      };
    
    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const newMessageObj: MessageType = {
              id: messages.length + 1,
              text: newMessage,
              user: "Korisnik:",
            };
            setMessages([...messages, newMessageObj]);
            setNewMessage("");
          }
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              handleSendMessage();
            }
          };
        

        return (
            <div className="chat">
            <div className="chat__container"> 
            <h1 className="chat__title">My Chat App</h1>
                <div className="chat__messages">
                    {messages.map((message) => (
                        <li className="chat__messages__item" key={message.id}><strong>{message.user}</strong> {message.text}
                        </li>
                    ))}
                    <div className="input__container">
                <input className="input__field" type="text" placeholder="Send a message..." value={newMessage} onKeyDown={handleKeyDown} onChange={handleInputChange} autoFocus={true} />
                <button className="btn__send" onClick={handleSendMessage}>Send</button>
                </div>
                </div>
            </div>
            </div>
        )
    }
  
    
export default Message;


