import { View } from "react-native";
import React from "react";
import Confirm from "../components/dialogs/Confirm";
import { ActivityIndicator, Button, MD2Colors, Text } from "react-native-paper";
import { Image } from "expo-image";
import welcome from "../assets/images/welcome_logo_2(BGR).png";
import { router } from "expo-router";
const Index = () => {
  return (
    <View
      style={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      {/* <ActivityIndicator
        animating={true}
        color={MD2Colors.red300}
        size="large"
      /> */}
      <Image
        style={{ width: "75%", height: 300, paddingLeft: 40 }}
        source={welcome}
        contentFit="cover"
      ></Image>
      <Text style={{ color: MD2Colors.white }} variant="displayMedium">
        Welcome to{" "}
      </Text>
      <Text variant="displayLarge" style={{ color: MD2Colors.purple200 }}>
        Astro Sight{" "}
      </Text>
      <Button
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: 20,
          borderColor: MD2Colors.purple200,
        }}
        textColor={MD2Colors.purple200}
        icon="arrow-right-thin"
        mode="outlined"
        contentStyle={{ flexDirection: "row-reverse" }}
        labelStyle={{ textAlign: "center", fontSize: 20 }}
        onPress={() =>
          router.push({
            pathname: "/otherScreens/register",
          })
        }
      >
        Get Started
      </Button>
    </View>
  );
};

export default Index;
