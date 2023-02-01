import Head from "next/head";
import { Inter } from "@next/font/google";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Navbar from "@/components/Navbar/Navbar";
import Feed from "@/components/Feed/Feed";
import Login from "@/components/Login/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useAuthState(auth);

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Finstagram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {!user ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <Feed />
        </>
      )}
    </div>
  );
}
