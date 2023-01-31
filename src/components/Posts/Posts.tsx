import Post from "../Post/Post";

export default function Posts() {
  const posts = [
    {
      id: "111",
      username: "user",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png",
      caption: "caption",
    },
    {
      id: "222",
      username: "user",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png",
      caption: "caption",
    },
    {
      id: "333",
      username: "user",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png",
      caption: "caption",
    },
  ];

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          image={post.image}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
