"use client";

import { Wrapper } from "@/app/components/layout/Wrapper";
import { Doctors } from "@/app/components/admin/Doctors";
import Link from "next/link";

export default function Home() {
  return (
    <Wrapper role="admin">
      <Doctors />
      <div className="flex flex-row w-full items-center justify-around">
        <Link scroll={false} href="/admin" className="my-2">
          Admin page
        </Link>
        <Link scroll={false} href="doctors/register" className="my-2">
          Add a doctor
        </Link>
      </div>
    </Wrapper>
  );
}
