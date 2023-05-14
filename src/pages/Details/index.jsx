//Neste arquivo faz o import dos componentes e usa-os colocando o conteúdo específico deles
//Neste os stilos já estão associados ao componente, representado pela tag
import { Container, Links, Content } from "./styles.js";
import { Header } from "../../components/header/"
import { Button } from "../../components/Button/";
import { Section } from "../../components/Section/";
import { Tag } from "../../components/Tag/";
import { ButtonText } from "../../components/ButtonText/";

export function Details(){
    return(
        <Container>
            <Header/>

            <main>
                <Content>
                <ButtonText title="Excluir nota"/>

                <h1>Introduçao ao react</h1>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, officia excepturi. Neque, deserunt saepe maxime recusandae hic dolor consequatur omnis nam ipsam, debitis culpa ad minima corporis doloremque tempore inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam iure sed nam nisi labore error nobis fuga cumque recusandae in obcaecati dicta rerum, temporibus molestias odio alias velit cum possimus.</p>
                
                <Section title="links úteis">
                    <Links>
                        <li><a href="#">https://www.rocketseat.com.br/</a></li>
                        <li><a href="#">https://www.rocketseat.com.br/</a></li>
                    </Links>
                </Section>

                <Section title="Marcadores">
                    <Tag title="express"/>
                    <Tag title="nodejs"/>
                </Section>

                <Button title="Voltar"/>

                </Content>
            </main>
        </Container>
    )
}