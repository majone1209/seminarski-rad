import { InputHTMLAttributes } from "react";
import { useState, ChangeEvent, FormEvent } from "react";

//InputProps je tip koji definira propertyje koje Input komponenta očekuje. Ovaj tip proširuje InputHTMLAttributes<HTMLInputElement> kako bi uključio standardne HTML atribute za input element. (nisam sigurna treba li se to primijeniti)

type InputProps = {
  onSendMessage: (message: string) => void;
  text: string;
 } & InputHTMLAttributes<HTMLInputElement>;

//Input komponenta prima onSendMessage kao property. Unutar komponente, koristi se useState kako bi se pratilo stanje teksta unesenog u input polje. 

const Input = ({ onSendMessage }: InputProps) => {
  const [text, setText] = useState<string>("");

//handleChange funkcija se poziva pri promjeni sadržaja input polja. Prima ChangeEvent objekt i ažurira stanje teksta na novu vrijednost unesenu u polje.  

const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  setText(e.target.value);
};

//Funkcija se poziva prilikom slanja obrasca (klikom na gumb "Send"). Sprječava se refreshanje stranice pozivom e.preventDefault(). Ako je tekst poruke (text.trim()) različit od praznog stringa, poziva se onSendMessage funkcija s tekstom poruke kao argumentom, a stanje teksta se postavlja na prazan string kako bi se očistilo input polje.

const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  onSendMessage(text);
  setText("");

//Ova funkcija vraća JSX; definiran je obrazac s inputom i pripadajućim atributima.  
  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus={true}
        />
        <button>Send</button>
      </form>
    </div>
  );
};
}

export default Input;