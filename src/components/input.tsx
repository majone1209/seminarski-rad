import { useState } from "react";

const Input = ({onSendMessage}) => {
  const [messageText, setMessageText] = useState("");

  const handleChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (messageText.trim() !== "") {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={messageText}
        onChange={handleChange}
        placeholder="Enter your message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default Input;