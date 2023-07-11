import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form} from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Texarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Link } from 'react-router-dom';
import { api } from '../../service/api';


export function New(){
const navigate = useNavigate();

const [ title, setTitle ] = useState([]);
const [ description, setDescription ] = useState("");

const [ links, setLinks ] = useState([]);
const [ newLink, setNewLink ] = useState("");

const [ tags, setTags ] = useState([]);
const [ newTag, setNewTag ] = useState("");

function handleAddLink(){
    setLinks(prevState => [...prevState, newLink]); //pegando tudo que tem antes e depejando no mesmo array com o novo link
    setNewLink("");
}

function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted));
}

function handleAddTag(){
    setTags(prevState => [...prevState, newTag]); //pegando tudo que tem antes e depejando no mesmo array com o novo link
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

    navigate('/');
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