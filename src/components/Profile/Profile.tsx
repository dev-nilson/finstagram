import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const [user, setUser] = useAuthState(auth);

  console.log(user, "***");

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="h-16 w-16 rounded-full border p-[2px]"
        src={user?.photoURL}
        alt="profile"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-semibold">{user?.email}</h2>
        <h3 className="text-sm text-gray-400">{user?.displayName}</h3>
      </div>
      <button
        className="text-blue-500 text-sm font-semibold"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
