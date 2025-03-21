import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import dayjs from "dayjs";

import { getCurrentYearTransactions } from "../../../services/observers/dashboardObserver";
import { GridCard, TitleContainer } from "../../../shared/components";
import { Loading } from "../../../shared/components/loading/Loading";
import { FormatarMoeda } from "../../../shared/utils/FormatarMoeda";

export const CurrentYearGraph = () => {
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCurrentYearTransactions();
      setPdata(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <GridCard titleContainer>
      <TitleContainer title={`Seus gastos de ${dayjs().year()}`} />
      {loading ? (
        <Loading width="285px" height="285px" />
      ) : (
        <BarChart
          slotProps={{ legend: { hidden: true } }}
          height={300}
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
          xAxis={[
            {
              data: xLabels,
              scaleType: "band",
            },
          ]}
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
