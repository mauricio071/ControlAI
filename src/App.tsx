import { BrowserRouter } from "react-router-dom";
// @ts-expect-error está funcionando
import "@fontsource/inter";

import {
  AppLocalizationProvider,
  AppThemeProvider,
  DrawerProvider,
} from "./shared/contexts";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <AppThemeProvider>
      <AppLocalizationProvider>
        <DrawerProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DrawerProvider>
      </AppLocalizationProvider>
    </AppThemeProvider>
  );
};
