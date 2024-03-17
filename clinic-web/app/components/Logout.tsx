"use client";

import { FormEvent, useEffect, useState } from "react";
import { setCookie, deleteCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type Props = {
  loggedIn: boolean;
  setLoggedIn: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

export const Logout: React.FC<Props> = ({ loggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (hasCookie("jwttoken")) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);


  const logout = () => {
    deleteCookie("email");
    deleteCookie("jwttoken");
    deleteCookie("role");
    setLoggedIn(false);
    router.push("/log-in");
  };

  return (
    <div className="flex flex-col gap-2 items-center">
        <button onClick={logout} className="py-1 flex rounded-md bg-red-600 justify-center text-lg text-white w-32">
          Log out
        </button>
    </div>
  );
};
