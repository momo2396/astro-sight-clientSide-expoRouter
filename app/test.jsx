import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Test = () => {
  return (
    <View
      style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Link href="/">
        <Text style={{ fontSize: 50 }}>Test</Text>
      </Link>
    </View>
  );
};

export default Test;
