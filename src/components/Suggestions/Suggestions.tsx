export default function Suggestions() {
  const suggestions = [
    {
      id: "000",
      username: "user",
      name: "name",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png",
    },
  ];

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
      </div>

      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={suggestion.image}
            alt="profile"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{suggestion.username}</h2>
            <h3 className="text-xs text-gray-400">{suggestion.name}</h3>
          </div>
          <button className="text-blue-500 font-semibold text-sm">Follow</button>
        </div>
      ))}
    </div>
  );
}
