import { useState } from "react";
import "./styles/styles.scss";
import Messages from "./components/messages";

const drone = new Scaledrone("id");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");


  const joinChat = () => {
    if (username !== "" && room !== "") {
      drone.publish("join__chat", room);
    }

  }

  return (
    <>
   <div className="join__chat">
    <h2>Join Chat</h2>
    <input type="text" placeholder="Name..." onChange={(event) =>{setUsername(event.target.value)}}/>
    <input type="text" placeholder="Room ID" onChange={(event) =>{setRoom(event.target.value)}}/>
    <button onClick={joinChat} className="btn__join">Join in Chat</button>
   </div>
   <Messages drone={drone} username={username} room={room} />
   </>
    
     
  )
}

export default App;
