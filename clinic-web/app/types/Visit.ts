import type { Doctor } from "./Doctor"
import type { Patient } from "./Patient"

export type Visit = {
  description: string,
  doctor: Doctor,
  patient: Patient,
  endTime: string,
  id: string,
  startTime: string,
  visitDate: string
}