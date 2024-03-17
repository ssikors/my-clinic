"use client";

import { hasCookie, getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { Navbar } from "./layout/Navbar";

type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => React.JSX.Element);
  role?: string
};

export const AuthComponent = ({ children, role }: Props) => {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (!hasCookie("email")) {
      redirect("/log-in");
    }
    if (role && getCookie("role") != role) {
      redirect("/");
    }
    setLoading(false);
  }, [loading, setLoading]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
          Loading...
        </div>
      </>
    );
  } else {
    return <>{children}</>;
  }
};
