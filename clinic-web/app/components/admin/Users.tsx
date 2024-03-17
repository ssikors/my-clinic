"use client";

import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { UserElement } from "./UserElement";

import type { User } from "@/app/types/User";

export const Users = () => {
  const [patients, setPatients] = useState<User[]>([]);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = () => {
    fetch("/api/Users", {
      headers: {
        Authorization: "bearer " + getCookie("jwttoken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col w-[95%] justify-between items-center bg-slate-100 rounded-md min-h-24">
      <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Activate
            </th>
            <th scope="col" className="px-4 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((item) => {
            return (
              <UserElement
                key={item.emailAddress}
                getPatients={getPatients}
                user={item}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
