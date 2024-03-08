import React from "react";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";

const Layout = () => {
  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
};

export default Layout;
