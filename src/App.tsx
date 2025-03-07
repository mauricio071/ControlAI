import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
// @ts-expect-error está funcionando
import "@fontsource/inter";

import {
  AppLocalizationProvider,
  AppThemeProvider,
  DrawerProvider,
} from "./shared/contexts";
import { SnackbarCloseButton } from "./shared/components/snackbarCloseButton/SnackbarCloseButton";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <SnackbarProvider
      autoHideDuration={2000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      action={(snackbarKey) => (
        <SnackbarCloseButton snackbarKey={snackbarKey} />
      )}
    >
      <AppThemeProvider>
        <AppLocalizationProvider>
          <DrawerProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </DrawerProvider>
        </AppLocalizationProvider>
      </AppThemeProvider>
    </SnackbarProvider>
  );
};
