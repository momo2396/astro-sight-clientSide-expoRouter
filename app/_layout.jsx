import React from "react";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProviders from "../components/AuthProviders";
const queryClient = new QueryClient();
const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <AuthProviders>
          <Slot />
        </AuthProviders>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default Layout;
