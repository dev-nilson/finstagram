import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Feed from "@/components/Feed/Feed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Finstagram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />
      <Feed />
    </div>
  );
}
