import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';  

export default function useAuth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    //set user
    const setUserContext = async () => {
        return await fetch.get('/user').then(res => {         
            setUser(res.data);  
            history.push('/home');                     
            }).catch((err) => {
            setError(err.response.data);
        })
    }

    //login user 
    const loginUser = async (data) => {
        const { username, password } = data;
            return fetch.post('auth/login', {
                username,
                password,
            }).then(async () => {
                await setUserContext();
            }).catch((err) => {
                setError(err.response.data);
            }) 
        };

    return {
        loginUser,
        error
    }
}