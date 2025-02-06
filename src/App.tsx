import { BrowserRouter } from "react-router-dom";

import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { Sidebar } from "./shared/components";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <Sidebar>
            <AppRoutes />
          </Sidebar>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
