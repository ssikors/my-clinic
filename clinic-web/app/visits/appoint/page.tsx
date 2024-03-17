"use client";

import { Wrapper } from "@/app/components/layout/Wrapper";
import { Visit } from "@/app/types/Visit";
import { getCookie } from "cookies-next";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [visit, setVisit] = useState<Visit>();

  const searchParams = useSearchParams();
  const router = useRouter()

  useEffect(() => {
    getVisit();
  }, []);

  async function getVisit() {
    const req = {
      email: searchParams.get("email"),
      visitId: searchParams.get("visitId"),
    };

    const res = await fetch("/api/Visits/byEmail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer " + getCookie("jwttoken"),
      },
      body: JSON.stringify(req),
    });

    const data: Visit = await res.json();

    setVisit(data);
  }

  async function appointVisit() {
    const req = {
      email: searchParams.get("email"),
      visitId: searchParams.get("visitId"),
    };

    const res = await fetch("/api/Visits/appoint", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer " + getCookie("jwttoken"),
      },
      body: JSON.stringify(req),
    });
    if (res.ok) {
      const data = await res.json()
      console.log(data)
      router.push("/patient/visits")
    } else {
      console.log(res)
    }
  }

  return (
    <Wrapper>
      <h1 className="text-xl">Do you wish to appoint this visit?</h1>
      <div className="w-full sm:w-[60%] flex flex-col items-center my-6 p-6 bg-slate-100 rounded-md">
        {visit ? (
          <>
            <span>
              Doctor{" "}
              {visit.doctor.fullName + ", " + visit.doctor.specialization}
            </span>
            <span>
              {new Date(visit.visitDate).toDateString() +
                ", " +
                visit.startTime.slice(0, -3)}
            </span>
            <div className="flex flex-row w-full justify-center gap-6 mt-6">
              <button
                onClick={appointVisit}
                className="bg-cyan-600 p-1 px-4 rounded-lg text-white hover:opacity-50"
              >
                Yes
              </button>
              <Link
                className="bg-red-600 p-1 px-4 rounded-lg text-white hover:opacity-50"
                href={"/visits"}
              >
                No
              </Link>
            </div>
          </>
        ) : (
          "Loading..."
        )}
      </div>
    </Wrapper>
  );
}
