import { useEffect, useState } from "react";
import Image from "next/image";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import HeartIconFilled from "@heroicons/react/24/solid/HeartIcon";
import { PostProps } from "@/typescript/types";

export default function Post({
  id,
  username,
  image,
  caption,
  expected,
  reality,
}: PostProps) {
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<any>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [id]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like: any) => like.id === user?.uid) !== -1);
  }, [likes, user?.uid]);

  const likePost = async () => {
    if (!user?.uid) return;

    if (hasLiked) await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user?.displayName,
      });
    }
  };

  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5">
        <Image
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          width={200}
          height={200}
          src={image}
          alt="post"
        />
        <p className="flex-1 font-semibold">{username}</p>
        <EllipsisHorizontalIcon className="h-5 button" />
      </div>

      <div className="relative mx-auto">
        <button
          className="absolute right-0 top-1/2"
          onClick={() => setShowNext(!showNext)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 mr-2"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          className="absolute left-0 top-1/2"
          onClick={() => setShowNext(!showNext)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 ml-2"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <Image
          className={`p-5 object-cover w-full ${showNext ? "hidden" : "block"}`}
          width={400}
          height={400}
          src={expected}
          alt={caption}
        />
        <Image
          className={`p-5 object-cover w-full ${showNext ? "block" : "hidden"}`}
          width={400}
          height={400}
          src={reality}
          alt={caption}
        />
      </div>

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-3">
          {hasLiked ? (
            <HeartIconFilled
              className="button text-red-500"
              onClick={likePost}
            />
          ) : (
            <HeartIcon className="button" onClick={likePost} />
          )}
          <ChatBubbleOvalLeftIcon className="button" />
          <PaperAirplaneIcon className="button" />
        </div>
        <BookmarkIcon className="button" />
      </div>

      <p className="px-5 py-2 truncate">
        {likes.length > 0 && (
          <p className="font-bold my-2">{likes.length} likes</p>
        )}
        <span className="font-semibold mr-1">{username}</span>
        {caption}
      </p>

      <form className="flex items-center p-3">
        <Image
          className="h-10 w-10 rounded-full border p-[2px]"
          width={200}
          height={200}
          src={user?.photoURL!}
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
