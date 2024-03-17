import { getCookie } from "cookies-next";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

type Props = {};

export const ScheduleForm: React.FC<Props> = ({}) => {
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const searchParams = useSearchParams()

  async function scheduleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    visitPost();
  }

  async function visitPost() {
    const visitRequest = {
      visitDate: date,
      startTime: startTime,
      endTime: endTime,
      doctorUserId: searchParams.get("userId"),
    };
    console.log(startTime)
    try {
      const res = await fetch("/api/Visits", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("jwttoken"),
        },
        body: JSON.stringify(visitRequest),
      });

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <h1 className="font-semibold text-lg">Create a schedule for {searchParams.get("userName")}</h1>
      <form onSubmit={scheduleSubmit} className="flex flex-col gap-2 w-[80%]">
      <label htmlFor="date">Schedule date</label>
      <input
        name="date"
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.currentTarget.value);
        }}
      />

      <label htmlFor="startTime">Start time</label>
      <select
        key="startTime"
        name="startTime"
        value={startTime}
        onChange={(e) => {
          setStartTime(e.currentTarget.value);
        }}
      >
        {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => {
          return (
            <>
              <option key={`${hour}:00`}>{`${hour}:00`}</option>
              <option key={`${hour}:15`}>{`${hour}:15`}</option>
              <option key={`${hour}:30`}>{`${hour}:30`}</option>
              <option key={`${hour}:45`}>{`${hour}:45`}</option>
            </>
          );
        })}
      </select>

      <label htmlFor="endTime">End time</label>
      <select
      key="endTime"
        name="endTime"
        value={endTime}
        onChange={(e) => {
          setEndTime(e.currentTarget.value);
        }}
      >
        {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => {
          return (
            <>
              <option key={`startTime${hour}:00`}>{`${hour}:00`}</option>
              <option key={`startTime${hour}:15`}>{`${hour}:15`}</option>
              <option key={`startTime${hour}:30`}>{`${hour}:30`}</option>
              <option key={`startTime${hour}:45`}>{`${hour}:45`}</option>
            </>
          );
        })}
      </select>

      <button
        type="submit"
      >
        Create
      </button>
    </form>
    </div>

  );
};
