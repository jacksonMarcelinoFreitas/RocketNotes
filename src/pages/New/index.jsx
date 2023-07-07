import { useState } from "react";
import { Container, Form} from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Texarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Link } from 'react-router-dom';


export function New(){
const [ links, setLinks ] = useState([]);
const [ newLink, setNewLink ] = useState("");

function handleAddLink(){
    setLinks(prevState => [...prevState, newLink]); //pegando tudo que tem antes e depejando no mesmo array com o novo link
    setNewLink("");
}

function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted));
}

    return(
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">voltar</Link>
                    </header>

                    <Input placeholder="Título"/>
                    <Textarea placeholder="Obserações"/>

                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={index}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }
                        <NoteItem
                            isNew
                            placeholder="Novo link"
                            value={newLink}
                            onChange={ event => setNewLink(event.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            <NoteItem value="React"/>
                            <NoteItem value="NodeJs"/>
                            <NoteItem value="VueJs"/>
                            <NoteItem isNew placeholder="Nova tag"/>
                        </div>
                    </Section>

                    <Button title="Salvar"/>
                </Form>
            </main>
        </Container>
    );
}