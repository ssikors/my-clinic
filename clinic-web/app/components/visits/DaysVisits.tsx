"use client";

import { Doctor } from "@/app/types/Doctor";
import type { Visit } from "@/app/types/Visit";
import { useState } from "react";
import { VisitComponent } from "./Visit";

type Props = {
  visits: Visit[];
  isPublic: boolean;
  doctor?: Doctor;
};

export const DaysVisits: React.FC<Props> = ({ visits, isPublic, doctor }) => {
  const [showVisits, setShowVisits] = useState(false);

  var date = new Date(visits[0].visitDate);

  return (
    <>
      {visits ? (
        <div className="flex flex-col w-[90%] border-2 gap-2 pb-2">
          <div
            className={`flex flex-row ${
              date.getDate() > Date.now()
                ? "bg-slate-500"
                : date.getDate() == Date.now()
                ? "bg-green-500"
                : "bg-cyan-500"
            }  bg-opacity-10 p-2 justify-around items-center`}
          >
            {visits[0] ? <h1>Visits on {date.toDateString()}</h1> : ""}
            <button onClick={(e) => setShowVisits(!showVisits)}>
              {showVisits ? "Show less" : "Show more"}
            </button>
          </div>

          {showVisits
            ? visits.map((item) => (
                <VisitComponent
                  doctor={doctor}
                  key={item.id}
                  visit={item}
                  isPublic={isPublic}
                />
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
