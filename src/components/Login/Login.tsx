import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

function Login() {
  const googleAuth = new GoogleAuthProvider();

  const login = async () => {
    signInWithPopup(auth, googleAuth).then((res) => console.log(res));
  };

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
