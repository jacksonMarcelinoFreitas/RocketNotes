import { FiPlus, FiSearch } from 'react-icons/fi';
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Input } from '../../components/Input';
import { Note } from '../../components/Note';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';

export function Home(){
    return(
        <Container>
            <Brand>
                <h1>Rockenotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li><ButtonText title="Todos" isActive></ButtonText></li>
                <li><ButtonText title="React"></ButtonText></li>
                <li><ButtonText title="Node"></ButtonText></li>
            </Menu>

            <Search>
                <Input placeholder="Pesquisar pelo título" icon={FiSearch}/>
            </Search>

            <Content>
                <Section title="Minhas notas">
                    <Note data={{
                        title: 'React',
                        tags:[
                            {id: '1', name: 'React'},
                            {id: '2', name: 'Rocket'}
                        ]
                    }} />
                </Section>
            </Content>

            <NewNote to="/new">

                <FiPlus />
                Criar Nota
                
            </NewNote>
        </Container>
    )
}