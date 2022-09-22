// routes
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { PublicRoutes } from "routes";
// ui
import { AppLayout } from "components/layouts";
// providers
import {
  LoginProvider,
  BackupProvider,
  UploadProvider,
  WalletProvider,
  IpfsProvider,
  GalleryProvider,
} from "components/contexts";
import { ChakraProvider } from "@chakra-ui/react";

// TODO: to be deleted
import BasicStyle from "theme/basicStyle";
import GlobalStyle from "theme/globalStyle";
import { theme } from "theme/Theme.base";

const queryClient = new QueryClient();

function App() {
  return (
    <AppLayout>
      <ChakraProvider theme={theme}>
        <BasicStyle />
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <Router>
            <IpfsProvider>
              <WalletProvider>
                <GalleryProvider>
                  <BackupProvider>
                    <LoginProvider>
                      <UploadProvider>
                        <PublicRoutes />
                      </UploadProvider>
                    </LoginProvider>
                  </BackupProvider>
                </GalleryProvider>
              </WalletProvider>
            </IpfsProvider>
          </Router>
        </QueryClientProvider>
      </ChakraProvider>
    </AppLayout>
  );
}

export default App;
