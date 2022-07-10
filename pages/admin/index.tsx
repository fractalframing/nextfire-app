import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import styles from "../../styles/Admin.module.css";
import AuthCheck from "../../components/AuthCheck";
import Metatags from "../../components/Metatags";
import PostFeed from "../../components/PostFeed";
import { auth, firestore, serverTimestamp } from "../../lib/firebase";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../lib/context";

const AdminPostsPage = () => {
  return (
    <main>
      <AuthCheck>
        <Metatags title="Admin page" />
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
};

const PostList: React.FC = () => {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt");
  // @ts-ignore
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
};

const CreateNewPost: React.FC = () => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success("Post created!");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
};

export default AdminPostsPage;
