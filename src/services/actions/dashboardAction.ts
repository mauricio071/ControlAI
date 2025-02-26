import { getDashboardAccess } from "../accesses/dashboardAccess";

export const getDashboardAction = async () => {
  const data = await getDashboardAccess();
  return data;
};
