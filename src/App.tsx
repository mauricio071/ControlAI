import { BrowserRouter } from "react-router-dom";

import {
  AppLocalizationProvider,
  AppThemeProvider,
  DrawerProvider,
} from "./shared/contexts";
import { Sidebar } from "./shared/components";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <AppThemeProvider>
      <AppLocalizationProvider>
        <DrawerProvider>
          <BrowserRouter>
            <Sidebar>
              <AppRoutes />
            </Sidebar>
          </BrowserRouter>
        </DrawerProvider>
      </AppLocalizationProvider>
    </AppThemeProvider>
  );
};
