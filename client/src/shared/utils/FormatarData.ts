import dayjs from "dayjs";

export const FormatarData = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY");
};
