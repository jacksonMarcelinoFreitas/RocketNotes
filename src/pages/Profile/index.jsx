import { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import {Container, Form, Avatar} from "./styles";
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera} from "react-icons/fi";
import { ButtonText } from '../../components/ButtonText';


export function Profile(){
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();
    const navigate = useNavigate();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    function handleBack(){
        navigate(-1)
    }

    async function handleUpdate(){
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }
        const userUpdated = Object.assign(user, updated); //vai combinar objetos, sobreescrevendo valores;

        await updateProfile({ user: userUpdated, avatarFile })
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file); //guardar arquivo selecionado

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview); //mostrar arquivo selecionado
    }

    return(
        <Container>
            <header>
                {/* <Link to="/">
                    <FiArrowLeft/>
                </Link> */}
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft size={24}/>
                </button>
            </header>
            <Form>
                <Avatar>
                    <img
                        src={avatar}
                        alt="Foto do Usuário"
                    />

                    <label htmlFor="avatar">
                        <FiCamera/>
                        <input
                            id="avatar"
                            type="file"
                            onChange={ handleChangeAvatar }
                        />
                    </label>
                </Avatar>
                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <Input
                    placeholder="Email"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <Input
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={event => setPasswordOld(event.target.value)}
                />
                <Input
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange={event => setPasswordNew(event.target.value)}
                />
                <Button
                    title="Salvar" onClick={ handleUpdate }
                />
            </Form>

        </Container>
    )
};