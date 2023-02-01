import Image from "next/image";

export default function Suggestions() {
  const suggestions = [
    {
      id: "000",
      username: "denilemus",
      name: "Denilson",
      image:
        "https://instagram.fsal2-1.fna.fbcdn.net/v/t51.2885-19/318298176_147011638114453_2928497119277690072_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsal2-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=gO-mmpTpcxQAX8aBeYl&tn=8eWFVgs95tecC5hJ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAtsJ_nDwWi-Ph51G70li3Wk1bhJ6p1KP3XPKeUCqTYIQ&oe=63E0859B&_nc_sid=8fd12b",
      link: "https://www.instagram.com/denilemus",
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
