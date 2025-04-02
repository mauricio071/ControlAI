import { Box, Typography } from "@mui/material";

interface TitleContainerProps {
  title: string;
  center?: boolean;
}

export const TitleContainer = ({ title, center }: TitleContainerProps) => {
  return (
    <Box
      display="flex"
      justifyContent={center ? "center" : ""}
      alignItems="center"
      marginTop="-3rem"
      marginBottom="2.75rem"
      paddingInline="1.5rem"
      paddingBlock="1.25rem"
      borderRadius="0.375rem"
      sx={{
        background: "linear-gradient(195deg, #F4A261, #e09b63)",
        boxShadow:
          "0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(255, 100, 50, 0.4)",
      }}
    >
      <Typography
        variant="h2"
        fontSize="1.4rem"
        fontWeight="bold"
        color="white"
      >
        {title}
      </Typography>
    </Box>
  );
};
