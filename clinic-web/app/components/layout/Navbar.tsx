"use client";

import { getCookie, hasCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { Logout } from "../Logout";

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  useLayoutEffect(() => {
    if (hasCookie("email")) {
      setLoggedIn(true);
    }
    if (hasCookie("role")) {
      setRole(getCookie("role")!);
    }
  }, []);

  return (
    <header className="fixed w-full left-0 top-0 h-16 bg-slate-100 px-4 shadow-md">
      <div className="flex flex-row justify-between items-center w-full h-full">
        <div className="flex flex-row w-[80%] justify-start gap-6 items-center">
          <Link scroll={false} href="/" className=" text-gray-500">
            Welcome to MyClinic!
          </Link>
          <Link scroll={false} href="/visits">
            Appoint a visit
          </Link>
          <Link scroll={false} href={`/${role}/visits`}>
            Your visits
          </Link>
          {role == "admin" ? (
            <Link scroll={false} href="/admin">
              Admin panel
            </Link>
          ) : (
            ""
          )}
        </div>
        {loggedIn ? (
          <Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        ) : (
          ""
        )}
      </div>
    </header>
  );
};
