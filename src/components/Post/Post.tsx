import post from "@/assets/post.jpg";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { PostProps } from "@/typescript/types";
import Image from "next/image";

export default function Post({ id, username, image, caption }: PostProps) {
  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          src={image}
          alt="post"
        />
        <p className="flex-1">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>

      <Image className="object-cover w-full" src={post} alt={caption} />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-3">
          <HeartIcon className="button" />
          <ChatBubbleOvalLeftIcon className="button" />
          <PaperAirplaneIcon className="button" />
        </div>
        <BookmarkIcon className="button"/>
      </div>

      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>
    </div>
  );
}
