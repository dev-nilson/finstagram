import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import logo from "@/assets/google.jpg";

function Login() {
  const googleAuth = new GoogleAuthProvider();

  const login = async () => {
    signInWithPopup(auth, googleAuth).then((res) => console.log(res));
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <button
        className="flex items-center p-2 bg-blue-500 rounded-md text-white font-semibold hover:bg-blue-600 transition duration-200 ease-out"
        onClick={login}
      >
        <Image
          className="w-8 h-8 mr-3 rounded-sm"
          src={logo}
          alt="google icon"
        />
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
