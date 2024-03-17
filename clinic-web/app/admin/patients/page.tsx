"use client"

import { Wrapper } from "@/app/components/layout/Wrapper"
import { Users } from "@/app/components/admin/Users"
import Link from "next/link"

export default function Home() {
  return <Wrapper role="admin">
    <Users />
    <div className="flex flex-row w-full items-center justify-around">
        <Link scroll={false} href="/admin" className="my-2">
          Admin page
        </Link>
      </div>
  </Wrapper>
}