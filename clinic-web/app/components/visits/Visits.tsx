"use client";

import { useEffect, useState } from "react";
import { DaysVisits } from "./DaysVisits";
import type { Visit } from "@/app/types/Visit";
import type { Doctor } from "@/app/types/Doctor";
import { getCookie } from "cookies-next";

type Props = {};

const specializations = [
  "",
  "Home doctor",
  "Otolaryngologist",
  "Dermatologist",
  "Ophthalmologist",
  "Neurologist",
  "Orthopedist",
  "Pediatrician",
];

export const Visits: React.FC<Props> = ({}) => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState<string>("");

  useEffect(() => {
    getVisits();
  }, []);

  async function getVisits() {
    await fetch("/api/Visits", {
      headers: {
        Authorization: "bearer " + getCookie("jwttoken"),
      },
    })
      .then((response) => response.json())
      .then((data: Visit[]) => {
        setVisits(data);
        var currentDates = dates;
        data.forEach((visit) => {
          var date = visit.visitDate;
          if (!currentDates.includes(date)) {
            currentDates.push(date);
          }
        });
        setDates(currentDates);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="flex flex-col items-center w-full bg-slate-100 rounded-md pb-3 min-h-36">
      <div className="flex flex-row w-full justify-around bg-slate-200 p-3 mb-3">
        <h2>Search by specialization:</h2>
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
      </div>
      <div className="flex flex-col w-full items-center gap-4">
        {visits && dates
          ? dates.map((date) => {
              var daysVisits = visits.filter(
                (item) =>
                  item.visitDate == date &&
                  (specialization == "" ||
                    item.doctor.specialization == specialization)
              );
              if (daysVisits.length > 0) {
                return <DaysVisits isPublic={true} key={date} visits={daysVisits} />;
              }
            })
          : ""}
      </div>
    </div>
  );
};
