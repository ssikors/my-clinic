"use client";

import { Wrapper } from "@/app/components/layout/Wrapper";
import { Visit } from "@/app/types/Visit";
import { getCookie } from "cookies-next";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [visit, setVisit] = useState<Visit>();
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    getVisit();
  }, []);

  const searchParams = useSearchParams();

  async function postDescription() {
    const req = {
      description: description,
      id: visit?.id,
    };

    console.log(req)
    const res = await fetch("/api/Visits/Description", {
      method: "POST",
      headers: {
        Authorization: "bearer " + getCookie("jwttoken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (res.ok)
    {
      const data: Visit = await res.json()
      setVisit(data)
    }


  }

  async function getVisit() {
    const res = await fetch(
      `/api/Visits/Visit?visitId=${searchParams.get(
        "visitId"
      )}&email=${getCookie("email")}`,
      {
        headers: {
          Authorization: "bearer " + getCookie("jwttoken"),
        },
      }
    );

    if (!res.ok) {
      return;
    }

    const data: Visit = await res.json();

    setVisit(data);
  }

  return (
    <Wrapper>
      {visit ? (
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col w-full bg-slate-100 rounded-md mb-8 shadow-md">
            <h1 className="text-xl w-full bg-cyan-600 bg-opacity-30">
              Visit details:
            </h1>
            <span className=" border-b-2 border-black p-2">
              Date: {new Date(visit.visitDate).toDateString()}
            </span>
            <span className=" border-b-2 border-black p-2">
              Time:{" "}
              {visit.startTime.slice(0, -3) +
                " - " +
                visit.endTime.slice(0, -3)}
            </span>
            <span className=" border-b-2 border-black p-2">
              Doctor:{" "}
              {visit.doctor.fullName + ", " + visit.doctor.specialization}
            </span>
            {visit.patient ? (
              <span className=" p-2">Patient: {visit.patient.fullName}</span>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col items-center w-fit bg-slate-100 rounded-md shadow-md">
            <h1 className="text-xl w-full bg-cyan-600 bg-opacity-30">
              Visit description:
            </h1>
            <span className="flex flex-col p-6 gap-3 items-center">
              {getCookie("role") == "doctor" ? (
                <>
                  <p>{visit.description}</p>
                  <textarea
                    rows={12}
                    cols={window.screen.width < 800 ? 18 : 50}
                    value={description}
                    placeholder={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <button
                    className="text-white bg-cyan-500 w-fit p-2 rounded-sm bg-opacity-80 hover:bg-opacity-100"
                    onClick={postDescription}
                  >
                    Save changes
                  </button>
                </>
              ) : (
                <p>{visit.description}</p>
              )}
            </span>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </Wrapper>
  );
}
