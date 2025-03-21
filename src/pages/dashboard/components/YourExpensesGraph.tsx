import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

import { ExpenseType } from "../../../services/interfaces/dashboardInterfaces";
import { GridCard, TitleContainer } from "../../../shared/components";
import { Loading } from "../../../shared/components/loading/Loading";
import { FormatarMoeda } from "../../../shared/utils/FormatarMoeda";

interface YourExpensesGraph {
  yourExpenses: ExpenseType[];
  loading: boolean;
}

export const YourExpensesGraph = ({
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
          height={300}
        />
      ) : (
        <Box
          height={300}
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
