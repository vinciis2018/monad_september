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
import { SEO } from "components/widgets/SEO";

const queryClient = new QueryClient();

function App() {
  return (
    <AppLayout>
      <SEO />
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
