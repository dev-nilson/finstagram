import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import logo from "../../../public/logo.png";
import icon from "../../../public/icon.png";

export default function Navbar() {
  return (
    <nav>
      <div className="flex justify-between max-w-6xl">
        <div className="relative hidden lg:inline-grid w-20 cursor-pointer">
          <Image
            src={logo}
            alt="logo"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="relative inline-grid lg:hidden w-10 flex-shrink-0 cursor-pointer">
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
      </div>
    </nav>
  );
}
