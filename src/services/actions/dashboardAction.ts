import { getDashboardAccess } from "../accesses/dashboardAccess";
import { DashboardType } from "../interfaces/dashboardInterfaces";

export const getDashboardAction = async (
  callBack: (data: DashboardType) => void
) => {
  const data = await getDashboardAccess(callBack);
  return data;
};
