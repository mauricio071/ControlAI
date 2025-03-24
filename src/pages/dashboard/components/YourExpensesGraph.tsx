import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

import { ExpenseType } from "../../../services/interfaces/dashboardInterfaces";
import { GridCard, TitleContainer } from "../../../shared/components";
import { Loading } from "../../../shared/components/loading/Loading";
import { FormatarMoeda } from "../../../shared/utils/FormatarMoeda";

interface YourExpensesGraph {
  smDown: boolean;
  lgDown: boolean;
  yourExpenses: ExpenseType[];
  loading: boolean;
}

export const YourExpensesGraph = ({
  smDown,
  lgDown,
  yourExpenses,
  loading,
}: YourExpensesGraph) => {
  return (
    <GridCard titleContainer>
      <TitleContainer title="Seus gastos deste mês" />
      {loading ? (
        <Loading width="285px" height="285px" />
      ) : yourExpenses.length > 0 ? (
        <PieChart
          margin={
            smDown
              ? { top: 0, bottom: 0, left: -0, right: 0 }
              : lgDown
              ? { top: 0, bottom: 0, left: -120, right: 20 }
              : { top: 18, bottom: 17, left: -140, right: 20 }
          }
          series={[
            {
              data: yourExpenses,
              valueFormatter: (data) => `${FormatarMoeda(Number(data.value))}`,
              arcLabel: (data) => `${FormatarMoeda(Number(data.value))}`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
              highlightScope: { fade: "global", highlight: "item" },
              faded: {
                additionalRadius: -30,
                color: "gray",
              },
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
            },
          }}
          slotProps={{ legend: { hidden: smDown && true } }}
          height={310}
        />
      ) : (
        <Box
          height={310}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>Nenhum dado disponível</Typography>
        </Box>
      )}
    </GridCard>
  );
};
