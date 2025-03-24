import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";

import { getAllExpensesAction } from "../../../services/actions/historicoAction";
import { GridCard, TitleContainer } from "../../../shared/components";
import { Loading } from "../../../shared/components/loading/Loading";
import { FormatarMoeda } from "../../../shared/utils/FormatarMoeda";

interface ExpensesHistoriesProps {
  refreshToggle: boolean;
}

export const ExpensesHistories = ({
  refreshToggle,
}: ExpensesHistoriesProps) => {
  const xLabels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const [pData, setPdata] = useState<number[]>([]);

  const [year, setYear] = useState<Dayjs | null>(dayjs());

  const [graphLoading, setGraphLoading] = useState(true);

  useEffect(() => {
    const getHistoryExpense = async () => {
      setGraphLoading(true);
      const data = await getAllExpensesAction(year?.year());
      setPdata(data);
      setGraphLoading(false);
    };

    getHistoryExpense();
  }, [year, refreshToggle]);

  return (
    <GridCard titleContainer>
      <TitleContainer title="Histórico de gastos" />
      <Box display="flex" justifyContent="center" marginBottom="4rem">
        <DatePicker
          views={["year"]}
          label="Ano"
          value={year}
          onChange={(newYear) => setYear(newYear)}
          minDate={dayjs("2000-01-01")}
          maxDate={dayjs()}
        />
      </Box>

      {graphLoading ? (
        <Loading width="200px" height="200px" />
      ) : (
        <BarChart
          slotProps={{ legend: { hidden: true } }}
          height={400}
          borderRadius={6}
          margin={{ left: 100, right: 20, top: 20, bottom: 30 }}
          series={[
            {
              data: pData,
              label: "Gastou",
              id: "id",
              valueFormatter: (value) => `${FormatarMoeda(Number(value))}`,
            },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
          yAxis={[
            {
              valueFormatter: (value) => `${FormatarMoeda(Number(value))}`,
            },
          ]}
        />
      )}
    </GridCard>
  );
};
