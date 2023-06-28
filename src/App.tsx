//@ts-nocheck

import Messages from "./components/messages";
import "./styles/styles.scss";
import { useState, useEffect } from "react";
import Input from "./components/input";

//MemberType je tip koji opisuje korisnika chat-a. Sadrži svojstva: username, color, i opcionalno id. MessageType je tip koji opisuje poruku. Sadrži svojstva text (tekst poruke) i member (korisnik koji je poslao poruku).

type MemberType = {
  username: string;
  color: string;
  id?: string;
};

type MessageType = {
  text: string;
  member: MemberType;
};

//Sljedeće su dvije funkcije za generiranje slučajnih korisničkih imena i boja.
 const randomName = () => {
    const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
    const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  };

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  };

//Komponenta App je glavna komponenta koja sadrži ostale funckije i logiku aplikacije.

const App = () => {

// Koristi se useState za praćenje stanja poruke (messageText), drona (drone) i sobe (room). 
// Početna vrijednost messageText je objekt koji ima dva svojstva: member (korisnik koji šalje poruke; generiraju se slučajna imena i boje). Messages je inicijalno postavljen na prazan niz.

  const [messageText, setMessageText] = useState<MessageType>({
    member: { username: randomName(), color: randomColor(), id:""},
    messages: [],
  });

// Koristi se useState za praćenje stanja drone i room. "drone" je stanje koje predstavlja instancu Scaledrone objekta (za uspostavljanje veze sa Scaledronom). "room" je stanje koje predstavlja sobu unutar Scaledrone veze u kojoj se razmjenjuju poruke.
// Početna vrijednost "drone" i "room" je null - znači da nema inicijalno postavljene vrijednosti. Nakon toga, ta stanja mogu se ažurirati i dobiti vrijednosti kroz pozive funkcija setDrone i setRoom kada se uspostavi veza s Scaledrone.
  const [drone, setDrone] = useState<any>(null);
  const [room, setRoom] = useState<any>(null);

  useEffect(() => {
    const handleDrone = () => {
      const newDrone = new window.Scaledrone("7vY3glZ07vcvBnIs", {
        data: member,
      });

//Pokreće se nova naredba Scaledrona. I ispisuje se u konzolu ukoliko dođe do pogreške. 
      newDrone.on("open", (error: any) => {
        if (error) {
          return console.error(error);
        }

//Proslijeđuju se podaci za trenutno prijavljenog člana.

        const updatedMember = { ...member };
        updatedMember.id = newDrone.clientId;
        setDrone(newDrone);
      });
    };

    handleDrone();
  }, [member]);

//Funckija provjerava postoji li vrijednost "drone". Zatim se stvara nova soba (room) unutar veze drone. Ažurira se stanje room pomoću setRoom(newRoom). Sada "room" sadrži referencu na stvorenu sobu, što omogućava pristupanje i korištenje te sobe za slanje i primanje poruka.

  useEffect(() => {
    if (drone) {
      const newRoom = drone.subscribe("observable-room");
      setRoom(newRoom);
    }
  }, [drone]);

// Ako postoji vrijednost room, definira se funkcija onDataReceived koja prima data i member kao parametre. Ova funkcija se poziva kada se primi nova poruka (podaci) unutar sobe.
// Unutar funkcije onDataReceived ažurira se stanje messages tako da se stvara nova kopija postojećeg niza messages pomoću spread operatora ([...messages]), a zatim se dodaje nova poruka ({ member, text: data }) u taj niz.
  
useEffect(() => {
    if (room) {
      const onDataReceived = (data: any, member: any) => {
        const updatedMessages = [...messages];
        updatedMessages.push({ member, text: data });
        setMessages(updatedMessages);  //poziva se setMessages(updatedMessages) kako bi se ažuriralo stanje messages s novim nizom poruka.
      };
      room.on("data", onDataReceived);
    }
  }, [room, messages]);

//Funkcija onSendMessage se poziva kada korisnik želi poslati poruku.

  const onSendMessage = () => {
    const updatedMessages = [...messages]; //stvaranje nove kopije postojećeg niza
    updatedMessages.push({  //dodaje se nova poruka na kraj koipranog niza
      text: messageText,
      member: member,
    });
    setMessages(updatedMessages);
    setMessageText(""); //poziva se setMessageText kako bi se resetiralo stanje messageText na prazan string. 
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

}

export default App;