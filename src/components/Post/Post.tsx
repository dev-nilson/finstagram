import {
  EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import { PostProps } from "@/typescript/types";

export default function Post({ id, username, image, caption }: PostProps) {
  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5">
        <img className="rounded-full h-12 w-12 object-contain border p-1 mr-3" src={image} alt="post" />
        <p className="flex-1">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
    </div>
  );
}