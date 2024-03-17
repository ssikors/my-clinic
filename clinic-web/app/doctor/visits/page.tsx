"use client";

import { Wrapper } from "@/app/components/layout/Wrapper";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import type { Patient } from "@/app/types/Patient";
import { DaysVisits } from "@/app/components/visits/DaysVisits";
import { Doctor } from "@/app/types/Doctor";

export default function Page() {
  const [doctor, setDoctor] = useState<Doctor>();
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    getDoctor();
  }, []);

  async function getDoctor() {
    const email = getCookie("email");

    const res = await fetch("/api/Doctors/" + email, {
      headers: {
        Authorization: "bearer " + getCookie("jwttoken"),
      },
    });

    if (!res.ok) {
      setError(true)
      return
    }

    const data: Doctor = await res.json();
    var currentDates = dates;
    data.visits.forEach((visit) => {
      var date = visit.visitDate;
      if (!currentDates.includes(date)) {
        currentDates.push(date);
      }
    });
    setDates(currentDates);

    console.log(data);
    setDoctor(data);
  }

  return (
    <Wrapper>
      {doctor ? (
        <div className="items-center text-center w-full">
          <h1 className="text-xl">Hi, {doctor.fullName}</h1>
          <h2 className="text-lg">
            Here you can view and manage your appointments:
          </h2>
          <div className="flex flex-col items-center">
            {dates.length > 0 ? dates.map((date) => {
              var daysVisits = doctor.visits.filter(
                (item) =>
                  item.visitDate == date
              );
              return <DaysVisits doctor={doctor} isPublic={false} key={date} visits={daysVisits}/>
            }) : ""}
          </div>
        </div>
      ) : ( error ? "You have no visits yet." :
        "Loading your data..."
      )}
    </Wrapper>
  );
}
