import { Visit } from "./Visit"

export type Patient = {
  id: string,
  fullName: string,
  userId: string,
  visits: Visit[]
}