import { useState, useEffect } from "react";
import Cookies from 'js-cookie'

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function findUser() {
      const cookie = Cookies.get('accessToken')
      if (cookie) {
        const accessToken = cookie;

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: accessToken,
        };
        await fetch("api/auth/verifyToken", options)
          .then((res) => {
            if (res.ok) {
              setUser(res.data);
              setLoading(false);
            }
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    }
    findUser();
  }, []);

  return {
    user,
    isLoading,
  };
}
