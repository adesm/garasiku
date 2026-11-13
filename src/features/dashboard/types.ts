import { Vehicle } from "../vehicle/types";

export type Activity = {
  id: number;
  title: string;
  vehicle?: Vehicle;
};
