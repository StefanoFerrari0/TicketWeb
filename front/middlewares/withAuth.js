/* import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(async () => {
      const cookies = new Cookies();
      const accessToken = cookies.get("accessToken");

      // if no accessToken was found,then we redirect to "/" page.
      if (!accessToken) {
        // Router.replace("/login");
      } else {
        var data = true;
        if (data) {
          setVerified(data);
        } else {
          //Router.replace("/login");
        }
      }
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
 */