export default function Profile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="h-16 w-16 rounded-full border p-[2px]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png"
        alt="profile"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-semibold">username</h2>
        <h3 className="text-sm text-gray-400">Name Lastname</h3>
      </div>
      <button className="text-blue-500 text-sm font-semibold">Sign Out</button>
    </div>
  );
}
