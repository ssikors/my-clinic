"use client"
import Link from "next/link"
import { Wrapper } from "../components/layout/Wrapper"

export default function Home() {
  return <Wrapper role="admin">
    <Link className="my-3" scroll={false} href={"admin/doctors"}>Register and view doctor accounts</Link>
    <Link className="my-3" scroll={false} href={"admin/patients"}>Activate patient accounts</Link>
  </Wrapper>
}