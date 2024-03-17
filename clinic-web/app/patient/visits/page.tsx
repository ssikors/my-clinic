"use client";

import { Wrapper } from "@/app/components/layout/Wrapper";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import type { Patient } from "@/app/types/Patient";
import { DaysVisits } from "@/app/components/visits/DaysVisits";

export default function Page() {
  const [patient, setPatient] = useState<Patient>();
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    getPatient();
  }, []);

  async function getPatient() {
    const email = getCookie("email");

    const res = await fetch("/api/Patients/" + email, {
      headers: {
        Authorization: "bearer " + getCookie("jwttoken"),
      },
    });

    if (!res.ok) {
      setError(true)
      return
    }

    const data: Patient = await res.json();
    var currentDates = dates;
    data.visits.forEach((visit) => {
      var date = visit.visitDate;
      if (!currentDates.includes(date)) {
        currentDates.push(date);
      }
    });
    setDates(currentDates);

    console.log(data);
    setPatient(data);
  }

  return (
    <Wrapper>
      {patient ? (
        <div className="items-center text-center w-full">
          <h1 className="text-xl">Hi, {patient.fullName}</h1>
          <h2 className="text-lg">
            Here you can view and manage your appointments:
          </h2>
          <div className="flex flex-col items-center">
            {dates.length > 0 ? dates.map((date) => {
              var daysVisits = patient.visits.filter(
                (item) =>
                  item.visitDate == date
              );
              return <DaysVisits isPublic={false} key={date} visits={daysVisits}/>
            }) : ""}
          </div>
        </div>
      ) : ( error ? "You have no visits yet." :
        "Loading your data..."
      )}
    </Wrapper>
  );
}
