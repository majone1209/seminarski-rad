//Nvedena tri sučelja opisuju strukturu objekta, u ovom slučaju člana (bit će prikazan u poruci) koji ima određene propertyje.

interface Member {
  [x: string]: any;
    color: string;
    username: string;
    id: string; 
}

interface Message {
  member: Member;
  text: any;
  id: any;
}

interface MessagesProps {
  messages: Message[];
  currentMember: Member;
}

//komponenta Messages prima messages i currentMember kao propse.

const Messages = ({ messages, currentMember }: MessagesProps): JSX.Element => {

//renderMessage funkcija se koristi za prikazivanje pojedinačne poruke. Provjeravamo je li poruka poslana od trenutnog člana(messageFromMe) ili nije. Ukoliko su ova dva identifikatora jednaka, to znači da je poruka poslana od trenutnog člana, a vrijednost varijable messageFromMe će biti true. Ako nisu jednaki, to znači da poruka nije poslana od trenutnog člana, te će vrijednost varijable messageFromMe biti false.
const renderMessage = (message: Message) => {
  const { member, text } = message;
  const messageFromMe = member.id === currentMember.id;

//Gore navedena provjera koristi se kako bi se odredilo koju klasu (className) dodijeliti poruci prilikom prikazivanja. Ako je poruka poslana od trenutnog člana, koristit će se klasa "Messages-message currentMember", a ako nije, koristit će se samo "Messages-message".
  const className = messageFromMe
    ? "Messages-message currentMember"
    : "Messages-message";

//Ova funkcija vraća JSX koji predstavlja pojedinačnu poruku. Svjostvo className ovisi o tome je li je poruka poslana od trenutnog člana ili ne; div element s klasom "Message-content" sadrži unutarnje elemente koji prikazuju korisničko ime (member.username) i tekst poruke (text).
  return (
    <li className={className}>
      <span
        className="avatar"
        style={{ backgroundColor: member.color }}
      />
      <div className="Message-content">
        <div className="username">{member.username}</div>
        <div className="text">{text}</div>
      </div>
    </li>
  );
}; 

//Messages komponenta vraća JSX koji predstavlja listu poruka. Koristimo metodu mapiranja. Svaka poruka ima jedinstveni key atribut koji je postavljen na message.id. Na taj način ažuriramo listu poruka. Pozivamo renderMessage funckiju kako bi se prikazala pojedinačna poruka.
return (
    <ul className="Messages-list">
      {messages.map((message) => (
        <li key={message.id}> {renderMessage(message)}
        </li>
      ))}
    </ul>
  );
};

export default Messages; // komponentu Messages importat ćemo i koristiti u App.tsx komponenti.