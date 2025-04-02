import { Timestamp } from "firebase/firestore";

export interface BalanceType {
  id: string;
  uid: string;
  balance: number;
  created_at: Timestamp;
  updated_at: Timestamp;
}
