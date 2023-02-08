import { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { collection, onSnapshot } from "firebase/firestore";
import { modalState } from "@/atoms/modalAtom";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid";
import {
  BellIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { auth, db } from "../../../firebase";
import logo from "@/assets/logo.png";
import icon from "@/assets/icon.png";

export default function Navbar() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  useEffect(() => {
    return onSnapshot(collection(db, "posts"), (snapshot) => {
      setTotalPosts(snapshot.docs.length);
    });
  }, []);

  return (
    <nav className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div className="relative hidden lg:inline-grid w-20 cursor-pointer">
          <Image
            src={logo}
            alt="logo"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="relative inline-grid lg:hidden w-6 flex-shrink-0 cursor-pointer">
          <Image
            src={icon}
            alt="icon"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 p-2 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <PlusCircleIcon
            className="nav-icon"
            onClick={() => setIsModalOpen(true)}
          />
          <div className="relative nav-icon">
            <BellIcon className="nav-icon" />
            <div className="absolute -top-2 -right-2 text-sm w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
              {totalPosts}
            </div>
          </div>
          <ArrowRightOnRectangleIcon
            className="nav-icon"
            onClick={() => auth.signOut()}
          />
          <Bars3Icon className="h-7 w-7 md:hidden cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
