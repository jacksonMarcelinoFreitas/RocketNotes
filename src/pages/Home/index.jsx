import { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Input } from '../../components/Input';
import { Note } from '../../components/Note';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { api } from '../../service/api';

export function Home() {
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");

    function handleTagsSelected(tagName){
        const alredySelected = tagsSelected.includes(tagName);

        if(alredySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags)

        }else{
            setTagsSelected(prevState => [...prevState, tagName]);
        }

    }

    useEffect (()=> {
        async function fetchTags(){
            const response = await api.get('/tags');
            setTags(response.data);
        }

        fetchTags();
    }, []);

    useEffect (()=> {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();

    }, [tagsSelected, search]);

    return(
        <Container>
            <Brand>
                <h1>Rockenotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li>
                    <ButtonText
                    title="Todos"
                    onClick={() => handleTagsSelected('all')}
                    isActive={tagsSelected.length === 0}>
                    </ButtonText>
                </li>
            {
                tags && tags.map(tag => (
                    <li key={String(tag.id)}>
                        <ButtonText
                            title={tag.name}
                            onClick={() => handleTagsSelected(tag.name)}
                            isActive={tagsSelected.includes(tag.name)}
                        >

                        </ButtonText>
                    </li>
                ))
            }
            </Menu>

            <Search>
                <Input
                    icon={FiSearch}
                    placeholder="Pesquisar pelo título"
                    onChange={(event) => setSearch(event.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note
                                key={String(note.id)}
                                data={note}/>
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">

                <FiPlus />
                Criar Nota

            </NewNote>
        </Container>
    )
}