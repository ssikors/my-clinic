import { Doctor } from "@/app/types/Doctor";
import type { Visit } from "@/app/types/Visit";
import { getCookie } from "cookies-next";
import Link from "next/link";

type Props = {
  visit: Visit;
  isPublic: boolean;
  doctor?: Doctor;
};

export const VisitComponent: React.FC<Props> = ({
  visit,
  isPublic,
  doctor,
}) => {
  const start = visit.startTime.slice(0, -3);
  return (
    <div
      className={`w-full flex justify-between flex-row p-1 px-4  ${
        visit.patient ? "bg-slate-200" : "bg-slate-300"
      }`}
    >
      <span>
        {start} - {visit.doctor ? visit.doctor.fullName : doctor?.fullName},{" "}
        {visit.doctor ? visit.doctor.specialization : doctor?.specialization}
      </span>
      {isPublic ? (
        <Link
          className="text-blue-800 hover:opacity-50"
          href={{
            pathname: "visits/appoint",
            query: { email: getCookie("email"), visitId: visit.id },
          }}
        >
          Get appointment
        </Link>
      ) : (
        <>
          {visit.patient ? "" : "No patient"}
          <Link
            className="text-blue-800 hover:opacity-50"
            href={{
              pathname: "/visits/visit",
              query: {
                visitId: visit.id,
              },
            }}
          >
            Details
          </Link>
        </>
      )}
    </div>
  );
};
