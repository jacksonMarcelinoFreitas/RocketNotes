import { createContext, useContext, useState, useEffect} from 'react';
import { api } from '../service/api';

const AuthContext = createContext({});

function AuthProvider({ children }){

  const [data, setData] = useState({});

  async function signIn({ email, password }){
    try {
      const response = await api.post ('/sessions', { email, password}); //fazer requisição para o back-end
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);

      // estará no cabeçalho de todas as requisiçoes
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({user, token});

    } catch (error) {
      if(error.response){
        alert(error.response.data.message);
      }else{
        alert("Não foi possível entrar.")
      }
    }
  }

  function signOut(){
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    setData({});
  }

  async function updateProfile({ user, avatarFile }){
    try{
      if(avatarFile){
        const fileUpdloadForm = new FormData();
        fileUpdloadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put('/users', user);
      localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
      setData({ user, token: data.token})
      alert('Perfil Atualizado!');

    } catch (error) {
      if(error.response){
        alert(error.response.data.message);
      }else{
        alert("Não foi possível atualizar o perfil.")
      }
    }


  }

  /*
    useEffect diz oq deve ser feito após a renderizaçao do componente;
    nos permite ter acesso aos estados do componente;
  */
  useEffect(() => {
    //busca no localstorage as credencias
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if(token && user){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user)
      });
    }

  }, []);

  return(
    //Aqui todas as páginas filhas herdarão as informações de user (contexto)
    <AuthContext.Provider value={{
      signIn,
      signOut,
      updateProfile,
      user:data.user,
      }}>

      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };