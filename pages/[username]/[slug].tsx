import { firestore, getUserWithUsername, postToJson } from "../../lib/firebase";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  let post;
  let path;
  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJson(await postRef.get());
    path = postRef.path;
  }
  return {
    props: {
      post,
      path,
    },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // TODO improve using admin sdk to select empty docs
  const snapshot = await firestore.collectionGroup("posts").get();
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      username,
      slug,
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export default function Page({}) {
  return <main></main>;
}
