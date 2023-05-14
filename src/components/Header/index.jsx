import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from "./styles";

export function Header(){
    return(
        <Container>
            <Profile to="/profile">
                <img src="https://github.com/jacksonMarcelinoFreitas.png"
                alt="Foto do usuário" 
            />

                <div>
                    <span>Bem-vindo</span>
                    <strong>Jackson Freitas</strong>
                </div>

            </Profile>

            <Logout>
                <RiShutDownLine/>
            </Logout>
            
        </Container>
    )
}