import { useEffect, useState } from "react";
import { DocumentData, DocumentSnapshot, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import Post from "../Post/Post";

export default function Posts() {
  const [posts, setPosts] = useState<DocumentSnapshot[]>([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div>
      {posts.map((post: DocumentData) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          image={post.data().avatar}
          caption={post.data().caption}
          expected={post.data().expected}
          reality={post.data().reality}
        />
      ))}
    </div>
  );
}
