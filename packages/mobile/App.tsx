import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import theme from "@styles/theme";
import { SignIn } from "@modules/authentication/screens/SignIn";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView>
        <SignIn />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
