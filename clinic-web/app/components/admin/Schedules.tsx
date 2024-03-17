import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DaysVisits } from "../visits/DaysVisits";
import type { Visit } from "@/app/types/Visit";

type Props = {};

type Doctor = {
  id: string;
  fullName: string;
  specialization: string;
  userId: string;
  visits: Visit[];
};

export const Schedules: React.FC<Props> = ({}) => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [doctor, setDoctor] = useState<Doctor>()

  const searchParams = useSearchParams();

  useEffect(() => {
    getVisits();
  }, []);

  async function getVisits() {
    await fetch(`/api/Doctors/byUser/${searchParams.get("userId")}`, {
      headers: {
        Authorization: "bearer " + getCookie("jwttoken"),
      },
    })
      .then((response) => response.json())
      .then((data: Doctor) => {
        setVisits(data.visits);
        // console.log(new Date(data.visits[0].visitDate).toUTCString())
        var currentDates = dates;
        data.visits.forEach((visit) => {
          var date = visit.visitDate;

          if (!currentDates.includes(date)) {
            currentDates.push(date);
          }
        });
        setDates(currentDates);
        setDoctor(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <h1>Schedule for {searchParams.get("userName")}:</h1>
      <div>
        {visits && dates
          ? dates.map((date) => {
              var daysVisits = visits.filter((item) => item.visitDate == date);
              return <DaysVisits doctor={doctor} isPublic={false} key={date} visits={daysVisits} />;
            })
          : ""}
      </div>
    </>
  );
};
