import { useState } from 'react';
import { Container, Form, Background } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../service/api';

export function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp(){
        if(!name || !email || !password){
            return alert("Preencha todos os campos!");
        }

        api.post('/users', {name, email, password})
        //executa se tudo der certo
        .then(() => {
            alert('Usuário cadastrado com sucesso!');
            navigate('/')
        })
        //executa se algo der errado
        .catch(error => {
            if(error.response){
                alert(error.response.data.message);
            }else{
                alert('Erro ao cadastrar usuário!');
            }
        });
    }

    return(
        <Container>
            <Background />
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplciação para salvar e gerenciar seus links.</p>

                <h2>Crie sua conta</h2>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={event => setName(event.target.value)} //evento de mudanças
                />
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={event => setEmail(event.target.value)}
                />
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={event => setPassword(event.target.value)}
                />

                <Button
                  title="Cadastrar" onClick={handleSignUp}
                />

                <Link to="/">
                    Voltar para o login
                </Link>
            </Form>
        </Container>
    );
}

/*
    useState(""); //hook para criar estados
    vai entregar o valor atual
    passa para o array passa o que será alterado e a funçao que vai alterar;

*/