import Avatar from "@mui/material/Avatar";
import { StoryProps } from "@/typescript/types";
import { getRandomColor } from "@/utils/helpers";

export default function Story({ username }: StoryProps) {
  return (
    <div>
      <Avatar
        className="border-gray-300 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        sx={{ width: 55, height: 55, bgcolor: getRandomColor() }}
      >
        {username[0].toUpperCase()}
      </Avatar>
      <p className="text-sm w-14 truncate text-center">{username}</p>
    </div>
  );
}
