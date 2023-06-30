//@ts-nocheck
import  { useState, useEffect } from "react";
import Input from "./components/input";
import Messages from "./components/messages";
import "./styles/styles.scss";

type Message = {
  member: {
    username: string;
    color: string;
    id?: string;
  };
  text: string;
};

const randomName = (): string => {
  const adjectives: string[] = [
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
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
    "late",
    "lingering",
    "bold",
    "little",
    "morning",
    "muddy",
    "old",
    "red",
    "rough",
    "still",
    "small",
    "sparkling",
    "throbbing",
    "shy",
    "wandering",
    "withered",
    "wild",
    "black",
    "young",
    "holy",
    "solitary",
    "fragrant",
    "aged",
    "snowy",
    "proud",
    "floral",
    "restless",
    "divine",
    "polished",
    "ancient",
    "purple",
    "lively",
    "nameless",
  ];
  const nouns: string[] = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
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
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
    "firefly",
    "feather",
    "grass",
    "haze",
    "mountain",
    "night",
    "pond",
    "darkness",
    "snowflake",
    "silence",
    "sound",
    "sky",
    "shape",
    "surf",
    "thunder",
    "violet",
    "water",
    "wildflower",
    "wave",
    "water",
    "resonance",
    "sun",
    "wood",
    "dream",
    "cherry",
    "tree",
    "fog",
    "frost",
    "voice",
    "paper",
    "frog",
    "smoke",
    "star",
  ];
  const adjective: string =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun: string = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
};

const randomColor = (): string => {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [member, setMember] = useState<{
    username: string;
    color: string;
    id?: string;
  }>({
    username: randomName(),
    color: randomColor(),
    
  });
  const [drone, setDrone] = useState<any>(null);

  useEffect(() => {
    let isJoined = true;

    const droneSample = new window.Scaledrone("7vY3glZ07vcvBnIs", {
      data: member,
    });

    droneSample.on("open", (error: any) => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = { ...member };
      updatedMember.id = droneSample.clientId;
      setMember(updatedMember);
    });

    const room = droneSample.subscribe("observable-room");
    const onData = (data: string, member: any) => {
      
      if (isJoined) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { member, text: data },
        ]);
      }
    };
    room.on("data", onData);

    setDrone(droneSample);

    return () => {
      isJoined = false;
      room.off("data", onData);
      droneSample.close();
    };
  }, []);

  const onSendMessage = (message: string) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default App;