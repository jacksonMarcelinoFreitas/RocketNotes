import { Container } from "./styles";

export function Section({ title,  children }) {
    return (
        <Container>
            <h2>{ title }</h2>
            { children }
        </Container>
    )
};

//Neste componente a funçao recebe como parametro o title (links uteis) e também o children (ul)