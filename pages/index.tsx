import toast from "react-hot-toast";
import Link from "next/link";
import Loader from "../components/Loader";
import { firestore, fromMillis, postToJson } from "../lib/firebase";
import { useState } from "react";
import PostFeed from "../components/PostFeed";

const LIMIT = 1;

export async function getServerSideProps() {
  const postQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);
  const posts = (await postQuery.get()).docs.map(postToJson);
  return {
    props: {
      posts,
    },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;
    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);
    const newPosts = (await query.get()).docs.map(postToJson);
    setPosts([...posts, ...newPosts]);
    if (newPosts.length < LIMIT) {
      setHasMore(false);
    }
    setLoading(false);
  };

  return (
    <main>
      <PostFeed posts={posts} admin={false} />
      {!loading && hasMore && <button onClick={getMorePosts}>Load more</button>}
    </main>
  );
}
