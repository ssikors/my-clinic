"use client";

import { setCookie, deleteCookie, hasCookie } from "cookies-next";
import { FormEvent, useLayoutEffect, useState } from "react";
import Link from "next/link";

type LoginData = {
  token: string;
  role: string;
  isActivated: boolean;
};

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useLayoutEffect(()=> {
    if (hasCookie("jwttoken")) {
      setIsSuccess(true)
    }
  }, [])

  async function loginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(email, password);
  }

  async function login(email: string, password: string) {
    const userRequest = {
      emailAddress: email,
      password: password,
    };

    try {
      const res = await fetch("/api/Auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRequest),
      });

      setEmail("");
      setPassword("");

      if (!res.ok) {
        throw new Error("Wrong login or password");
      }

      var data: LoginData = await res.json();
      console.log();

      if (!data.isActivated) {
        throw new Error("Account not activated");
      }

      setCookie("role", data.role);
      setCookie("email", email);
      setCookie("jwttoken", data.token);

      setIsSuccess(true);
    } catch (error: any) {
      console.log(error);
      setError(error.toString());
    }
  }
  if (!isSuccess) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex justify-center items-center w-full h-screen text-center">
          <div>
            <h2 className=" text-lg font-bold m-2">Log in</h2>
            <form
              onSubmit={loginSubmit}
              className="flex flex-col items-center gap-2 "
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <button type="submit" className="border-2">
                Log in
              </button>
              {error == "" ? "" : <div className="text-red-600">{error}</div>}
            </form>
            <div className="text-center m-4">
              <p>Don&apos;t have an account?</p>
              <Link scroll={false} href={"/register"} className="text-blue-600">
                Register
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col justify-center items-center w-full h-screen">
          Login successful!
          <Link scroll={false} href={"/"} className="text-blue-600">
            Visit the Homepage
          </Link>
        </div>
      </main>
    );
  }
}
