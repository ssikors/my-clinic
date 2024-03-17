"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Wrapper } from "./layout/Wrapper";

export const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  async function register(email: string, password: string) {
    const userRequest = {
      emailAddress: email,
      password: password,
      role: "",
      isActivated: "",
      fullName: fullName
    };

    try {
      const res = await fetch("/api/Auth/register", {
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
        throw new Error(`${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      console.log(data.emailAddress);
      router.push("log-in");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password.");
    }
  }

  async function registerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    register(email, password);
  }
  return (
      <div className="flex flex-col gap-2 my-4 text-center">
        <h2 className=" text-lg font-bold">Register</h2>
        <form
          onSubmit={registerSubmit}
          className="flex flex-col items-center gap-1 "
        >
          <label htmlFor="name">
            Name
          </label>
          <input
            name="name"
            type="string"
            value={fullName}
            onChange={(e) => {
              setFullName(e.currentTarget.value);
            }}
          />
          <label htmlFor="email">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
          <label htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <button type="submit" className="border-2">
            Register
          </button>
          {error == "" ? "" : <div className="text-red-600">{error}</div>}
        </form>
        <div className="text-center m-4">
          <p>Already have an account?</p>
          <Link scroll={false} href={"/log-in"} className="text-blue-600">
            Log in
          </Link>
        </div>
      </div>
  );
};
