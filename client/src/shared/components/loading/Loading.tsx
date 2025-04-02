import { Box } from "@mui/material";

interface LoadingPropsType {
  width?: string;
  height?: string;
}

export const Loading = ({
  width = "150px",
  height = "150px",
}: LoadingPropsType) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      width={`min(40vw, ${width})`}
      height={`min(40vw, ${height})`}
      margin="auto"
      border="8px solid #F4A261"
      borderTop="8px solid white"
      sx={{
        animation: "spin 1s linear infinite",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      }}
    ></Box>
  );
};
