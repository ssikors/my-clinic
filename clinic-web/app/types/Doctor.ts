import type { Visit } from "./Visit";

export type Doctor = {
  id: string;
  fullName: string;
  specialization: string;
  userId: string;
  visits: Visit[];
};