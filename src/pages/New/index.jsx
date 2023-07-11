import { ButtonText } from '../../components/ButtonText';
import { NoteItem } from "../../components/NoteItem";
import { Textarea } from "../../components/Texarea";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Container, Form} from "./styles";
import { api } from '../../service/api';
import { useState } from "react";
// import { Link } from 'react-router-dom';


export function New(){
const navigate = useNavigate();

const [ title, setTitle ] = useState([]);
const [ description, setDescription ] = useState("");

const [ links, setLinks ] = useState([]);
const [ newLink, setNewLink ] = useState("");

const [ tags, setTags ] = useState([]);
const [ newTag, setNewTag ] = useState("");

function handleBack(){
    navigate(-1)
}

function handleAddLink(){
    //pegando tudo que tem antes e depejando no mesmo array com o novo link
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
}

function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted));
}

function handleAddTag(){
    //pegando tudo que tem antes e depejando no mesmo array com o novo link
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
}

function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted));
}

async function handleNewNotes(){
    if(newLink){
        return alert('Você não adicionou o link. Clique em adicionar ou deixe vazio!')
    }
    if(newTag){
        return alert('Você não adicionou a tag. Clique em adicionar ou deixe vazio!')
    }
    await api.post('/notes',{
        title,
        description,
        tags,
        links
    });

    alert('Nota criada com sucesso!');

    navigate(-1);
}

    return(
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        {/* <Link>Voltar</Link> */}
                        <ButtonText
                            title="Voltar"
                            onClick={handleBack}
                        />
                    </header>

                    <Input
                        placeholder="Título"
                        onChange={event => setTitle(event.target.value)}
                    />
                    <Textarea
                        placeholder="Obserações"
                        onChange={event => setDescription(event.target.value)}
                    />

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
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />


                                ))
                            }
                            <NoteItem
                                isNew
                                placeholder="Nova tag"
                                onChange = {event => setNewTag(event.target.value)}
                                value={newTag}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button
                        title="Salvar"
                        onClick={handleNewNotes}
                    />
                </Form>
            </main>
        </Container>
    );
}