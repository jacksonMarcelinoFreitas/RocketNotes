import { RiShutDownLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/auth';
import { Container, Profile, Logout } from "./styles";
import { api } from '../../service/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'


export function Header(){
    const { signOut, user } = useAuth();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : `${avatarPlaceholder}`;

    return(
        <Container>
            <Profile to="/Profile">
                <img src={ avatarUrl }
                alt={ user.name }
            />

                <div>
                    <span>Bem-vindo</span>
                    <strong>{ user.name }</strong>
                </div>

            </Profile>

            <Logout onClick={ signOut }>
                <RiShutDownLine/>
            </Logout>

        </Container>
    )
}