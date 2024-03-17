"use client";

import { Navbar } from "./Navbar";
import { AuthComponent } from "../AuthComponent";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  role?: string
};

export const Wrapper = ({ children, role }: Props) => {
  return (
    <AuthComponent role={role}>
      <Navbar/>
      <main className="flex w-full min-h-screen flex-col items-center justify-start p-24">
        {children}
      </main>
    </AuthComponent>
  );
};
