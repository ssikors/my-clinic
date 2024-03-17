"use client";

import { Wrapper } from "@/app/components/layout/Wrapper";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const specializations = [
  "Home doctor",
  "Otolaryngologist",
  "Dermatologist",
  "Ophthalmologist",
  "Neurologist",
  "Orthopedist",
  "Pediatrician",
];

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>(specializations[0]);
  const [error, setError] = useState<string>("");

  async function register(email: string, password: string) {
    const userRequest = {
      emailAddress: email,
      password: password,
      role: "doctor",
      specialization: specialization,
      isActivated: "",
      fullName: fullName,
    };

    try {
      const res = await fetch("/api/Auth/registerDoctor", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("jwttoken"),
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
      router.push("/admin/doctors");
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
    <Wrapper>

        <div className="flex flex-col gap-2 my-4 text-center">
          <h2 className=" text-lg font-bold">Register</h2>
          <form
            onSubmit={registerSubmit}
            className="flex flex-col items-center gap-1 "
          >
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="string"
              value={fullName}
              onChange={(e) => {
                setFullName(e.currentTarget.value);
              }}
            />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <label htmlFor="specialization">Specialization</label>
            <select
              name="specialization"
              value={specialization}
              onChange={(e) => {
                setSpecialization(e.currentTarget.value);
              }}
            >
              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
            <button type="submit" className="border-2">
              Register Doctor
            </button>
            {error == "" ? "" : <div className="text-red-600">{error}</div>}
          </form>

        </div>
    </Wrapper>
  );
}
