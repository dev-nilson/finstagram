import Image from "next/image";
import { StoryProps } from "../typescript/types";

export default function Story({ image, username }: StoryProps) {
  return (
    <div>
      <img
        className="h14 w-14 rounded-full p-[2px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        src={image}
        alt="avatar"
      />
      <p className="text-sm w-14 truncate text-center">{username}</p>
    </div>
  );
}
