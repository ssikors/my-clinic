"use client";

import Link from "next/link";

import type { User } from "@/app/types/User";
import { getCookie } from "cookies-next";
import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

type Props = {
  user: User;
  getDoctors: () => void;
};

export const DoctorUserElement: React.FC<Props> = ({ user, getDoctors }) => {
  async function deleteDoctor() {
    const res = await fetch(`/api/Doctors/${user.id}`, {
      method: "DELETE",
      headers: { Authorization: "bearer " + getCookie("jwttoken") },
    });

    if (res.ok) {
      getDoctors()
    }
  }

  return (
    <tr
      key={user.emailAddress}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden md:table-cell"
      >
        {user.fullName}
      </td>
      <td className="px-6 py-4">{user.emailAddress}</td>
      <td className="px-6 py-4">
        <Link
          className=" text-blue-800 opacity-80 hover:opacity-100"
          href={{
            pathname: "doctors/create-schedule",
            query: { userId: user.id, userName: user.fullName },
          }}
        >
          Add schedule
        </Link>
      </td>
      <td className="px-6 py-4">
        <Link
          className=" text-blue-800 opacity-80 hover:opacity-100"
          href={{
            pathname: "doctors/schedules",
            query: { userId: user.id, userName: user.fullName },
          }}
        >
          Schedules
        </Link>
      </td>
      <td className="text-lg font-bold text-red-600 ">
        <button onClick={deleteDoctor} className="hover:scale-125">
          x
        </button>
      </td>
    </tr>
  );
};
