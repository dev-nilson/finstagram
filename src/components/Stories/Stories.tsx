import { users } from "@/utils/data";
import Story from "../Story/Story";

export default function Stories() {
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-scroll scrollbar-hide">
      {users.map((user) => (
        <Story key={user.id} username={user.username} />
      ))}
    </div>
  );
}
