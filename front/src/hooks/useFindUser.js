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

              res.data.data.roles.map((role) => {
                delete role.__v
                delete role._id;
                delete role.isDelete;
                return;
              })
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
    isLoading,
    setUser
  };
}
