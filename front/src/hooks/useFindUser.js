import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import AuthService from "../api/services/auth.service";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function findUser() {
      const cookie = Cookies.get('accessToken');
      if(cookie){
        await AuthService.verifyToken()
          .then(res => {  
            if(res.data.ok){
              delete res.data.data.roles.__v
              delete res.data.data.roles.isDelete              
              setUser(res.data.data);
              setLoading(false);
            } else{
              setLoading(false);
            }
          }).catch((err) => {
            setLoading(false);
          });
      } else{
        setLoading(false);
      }
    }
    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
    setLoading
  };
}
