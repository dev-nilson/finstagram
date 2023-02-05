import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { PostProps } from "@/typescript/types";
import post from "@/assets/post.jpg";
import Image from "next/image";

export default function Post({ id, username, image, caption }: PostProps) {
  const [user, setUser] = useAuthState(auth);

  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          src={image}
          alt="post"
        />
        <p className="flex-1 font-semibold">{username}</p>
        <EllipsisHorizontalIcon className="h-5 button" />
      </div>

      <Image className="object-cover w-full" src={post} alt={caption} />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-3">
          <HeartIcon className="button" />
          <ChatBubbleOvalLeftIcon className="button" />
          <PaperAirplaneIcon className="button" />
        </div>
        <BookmarkIcon className="button" />
      </div>

      <p className="px-5 py-2 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      <form className="flex items-center p-3">
        <Image
          className="h-10 w-10 rounded-full border p-[2px]"
          width={200}
          height={200}
          src={user?.photoURL}
          alt="profile"
        />
        <input
          className="border-none flex-1 focus:ring-0 outline-none"
          type="text"
          placeholder="Add a comment..."
        />
        <button className="font-semibold text-blue-500 mr-2">Post</button>
        <FaceSmileIcon className="button" />
      </form>
    </div>
  );
}
