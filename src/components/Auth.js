import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config.js";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth h-[100vh] grid grid-flow-row-dense justify-items-center ">
      <p className="grid content-end"> Sign In With Google To Continue </p>
      <button
        onClick={signInWithGoogle}
        className="w-[30vh] my-3 btn btn-outline btn-primary"
      >
        Sign In With Google
      </button>
    </div>
  );
};
