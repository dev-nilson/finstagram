import Image from "next/image";
import { suggestions } from "@/utils/data";

export default function Suggestions() {
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-400">
          Suggestions for you
        </h3>
      </div>

      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex items-center justify-between mt-3"
        >
          <Image
            className="w-10 h-10 rounded-full border p-[2px]"
            width={100}
            height={100}
            src={suggestion.image}
            alt="profile"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{suggestion.username}</h2>
            <h3 className="text-xs text-gray-400">{suggestion.name}</h3>
          </div>
          <a
            className="text-blue-500 font-semibold text-sm"
            href={suggestion.link}
          >
            Follow
          </a>
        </div>
      ))}
    </div>
  );
}
