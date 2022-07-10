import toast from "react-hot-toast";
import Link from "next/link";
import Loader from "../components/Loader";

export default function Home() {
  return (
    <main>
      <button onClick={() => toast.success("hello toast")}>Toast me</button>
      <Link href="/enter">
        <a>Enter</a>
      </Link>
      <Loader show />
    </main>
  );
}
