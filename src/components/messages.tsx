
interface Member {
  [x: string]: any;
  username: string;
  color: string;
  id: string;
}
type Message = {
  member: Member;
  text: string;
};
type MessagesProps = {
  messages: Message[];
  currentMember: Member;
};
const Messages: React.FC<MessagesProps> = ({ messages, currentMember }) => {
  const renderMessage = (message: Message) => {
    const { member, text } = message;
    const messageFromMe = currentMember.id === member.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className}>
        <span
          className="avatar"
          style={{ backgroundColor: messageFromMe
            ? currentMember.color : message.member.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">{messageFromMe
                  ? currentMember.username
                  : message.member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
        
      </li>
    );
  };
  return <ul className="Messages-list">{messages.map(renderMessage)}</ul>;
};
export default Messages;