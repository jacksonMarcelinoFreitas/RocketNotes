//Neste arquivo faz o import dos componentes e usa-os colocando o conteúdo específico deles
//Neste os stilos já estão associados ao componente, representado pela tag
import { ButtonText } from "../../components/ButtonText/";
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Links, Content } from "./styles.js";
import { Header } from "../../components/Header/";
import { Button } from "../../components/Button/";
import { Section } from "../../components/Section/";
import { Tag } from "../../components/Tag/";
import { useState, useEffect } from "react";
import { api } from '../../service/api';

export function Details(){
    const params = useParams();
    const navigate = useNavigate();
    const [ data, setData ] = useState(null);

    function handleBack(){
        navigate(-1)
    }

    async function handleRemoveNote(){
        const confirm = window.confirm('Deseja realmente remover esta nota?');

        if(confirm){
            await api.delete(`/notes/${params.id}`);
            navigate(-1);
        }
    }

    useEffect(()=>{
        async function fetchNote(){
            const response = await api.get(`/notes/${params.id}`);
            setData(response.data);
        }

        fetchNote();
    },[])

    return(
        <Container>
            <Header/>

            {
                // mostra o data casa haja conteudos
                data &&
                <main>
                    <Content>
                    <ButtonText
                        title="Excluir nota"
                        onClick={handleRemoveNote}
                    />

                    <h1>
                        {data.title}
                    </h1>

                    <p>
                        {data.description}
                    </p>

                    {
                        //só renderiza a sessão se houver links
                        data.links &&
                        <Section title="links úteis">
                            <Links>
                                {
                                    data.links.map(link => (
                                        <li key={String(link.id)}>
                                            <a href={link.url} target="_blank">
                                                {link.url}
                                            </a>
                                        </li>
                                    ))
                                }
                            </Links>
                        </Section>
                    }

                    {
                        data.tags &&
                        <Section title="Marcadores">
                            {
                                data.tags.map( tag => (
                                    <Tag
                                        key={String(tag.id)}
                                        title={tag.name}
                                    />
                                ))
                            }
                        </Section>
                    }

                    <Button
                        title="Voltar"
                        onClick={handleBack}
                    />

                    </Content>
                </main>
            }

        </Container>
    )
}