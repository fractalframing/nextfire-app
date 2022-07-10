import { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Navbar<NextPage>({}) {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button>FEED</button>
          </Link>
        </li>
        {username && (
          <>
            <li>
              <Link href={`/admin`}>
                <button>Write posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} alt={user?.displayName} />
              </Link>
            </li>
          </>
        )}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
