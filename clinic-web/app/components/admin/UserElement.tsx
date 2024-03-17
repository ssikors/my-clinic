import { getCookie } from "cookies-next";

import type { User } from "@/app/types/User";

type Props = {
  user: User
  getPatients: any
}

export const UserElement: React.FC<Props> = ({user, getPatients}) => {
  async function deleteUser() {
    const res = await fetch(`/api/Patients/${user.id}`, {
      method: "DELETE",
      headers: { Authorization: "bearer " + getCookie("jwttoken") },
    });

    if (res.ok) {
      getPatients()
    }
  }

  async function activateUser() {
    const request = { id: user.id }
    const response = await fetch(`/api/Auth/activate/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: "bearer " + getCookie("jwttoken"),
      },
      body: JSON.stringify(request)
    })

    if (response.ok) {
      getPatients();
    } else {
      console.log(response)
    }

  };

  return <tr
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
  <td className="px-6 py-4 hidden md:table-cell">
    {user.userRole}
  </td>
  {user.userRole != "doctor" ? <td className="px-6 py-4 ">
    {user.isActivated ? (
      "Already active."
    ) : (
      <button onClick={activateUser} className=" bg-green-700 bg-opacity-50 text-white p-1 px-2 rounded-md hover:bg-opacity-90">
        Activate
      </button>
    )}
  </td> : ""}
  <td className="text-lg font-bold text-red-600 ">
        <button onClick={deleteUser} className="hover:scale-125">
          x
        </button>
  </td>

</tr>
}