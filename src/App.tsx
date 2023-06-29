//@ts-nocheck
import  { useState, useEffect } from "react";
import Input from "./components/input";
import Messages from "./components/messages";
import {re} from "./message/messages";
import "./styles/styles.scss";
type Member = {
  id?: string;
  username: string;
  color: string;
};
type Message = {
  text: string;
  member: Member;
};
const App = () => {
  const drone = new window.Scaledrone("7vY3glZ07vcvBnIs")
  // set init state for messages and users
  const [messages, setMessages] = useState<Message[]>([
  ]);
  const [member, setMember] = useState<Member>({
    username: randomName(),
    color: randomColor(),
  });
  useEffect(() => {
    const room = drone.subscribe("observable-room");
    room.on("open", (error?: string) => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = { ...member, id: drone.clientId };
      console.log(member)
      setMember(updatedMember);
    });
    room.on("data", (data: string, member: Member) => {
      console.log("data", data)
      console.log("member", member)
      setMessages((prevMessages, member) => [
        ...prevMessages,
        { text:data, member: member },
      ]);
    });
  }, []);
  function randomName(): string {
    const adjectives = [
      "autumn",
      "hidden",
      "bitter",
      "misty",
      "silent",
      "empty",
      "dry",
      "dark",
      "summer",
      "icy",
      "delicate",
    ];
    const nouns = [
       "sunset",
      "pine",
      "shadow",
      "leaf",
      "dawn",
      "glitter",
      "forest",
      "hill",
      "cloud",
      "meadow",
      "sun",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  }
  function randomColor(): string {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }
  const onSendMessage = (message: string) => {
    const updatedMessages = [...messages];
    updatedMessages.push({
      text: message,
      member: member,
    });
    // setMessages(updatedMessages);
    drone.publish({
      room: "observable-room",
      message: message,
    });
  };
  return (
    <div className="app">
      <div className="App">
        <Messages messages={messages} currentMember={member} />
        <Input onSendMessage={onSendMessage} text={""} />
      </div>
    </div>
  );
};
export default App;