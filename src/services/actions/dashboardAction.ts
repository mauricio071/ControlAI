import { getDashboardAccess } from "../accesses/dashboardAccess";
import { DashboardType } from "../interfaces/dashboardInterfaces";

export const getDashboardAction = async (): Promise<DashboardType> => {
  const data = await getDashboardAccess();
  return data;
};
