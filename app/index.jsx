import { View } from "react-native";
import React, { useContext, useLayoutEffect, useRef } from "react";
import Confirm from "../components/dialogs/Confirm";
import { Button, MD2Colors, Text } from "react-native-paper";
import { Image } from "expo-image";
import welcome from "../assets/images/welcome_logo_2(BGR).png";
import { router } from "expo-router";
import { UserContext } from "../components/AuthProviders";
import { Back, Elastic, gsap } from "gsap-rn";
const Index = () => {
  let btnRef = useRef(null);
  let welcomeRef = useRef(null);
  let astroRef = useRef(null);
  const { user } = useContext(UserContext);

  useLayoutEffect(() => {
    let func = async () => {
      gsap.set(btnRef, {
        style: { left: 0, top: 0, opacity: 0 },
        transform: { y: -500 },
      });
      gsap.to(btnRef, {
        duration: 2,
        style: { left: 0, top: 0, opacity: 1 },
        transform: { y: 0 },
        ease: Elastic.easeOut,
        stagger: { amount: 0.3 },
      });
      gsap.set(welcomeRef, {
        style: { left: 0, top: 0, opacity: 0 },
        transform: { x: -500 },
      });
      gsap.to(welcomeRef, {
        duration: 2,
        style: { left: 0, top: 0, opacity: 1 },
        transform: { x: 0 },
        ease: Elastic.easeOut,
        stagger: { amount: 0.3 },
      });
      gsap.set(astroRef, {
        style: { left: 0, top: 0, opacity: 0 },
        transform: { x: 500 },
      });
      gsap.to(astroRef, {
        duration: 2,
        style: { left: 0, top: 0, opacity: 1 },
        transform: { x: 0 },
        ease: Elastic.easeOut,
        stagger: { amount: 0.3 },
      });
    };
    func();
  }, []);
  const handleGetStarted = () => {
    if (user) {
      router.replace({
        pathname: "/otherScreens/authorized_screen",
      });
    } else {
      router.replace({
        pathname: "/otherScreens/register",
      });
    }
  };
  return (
    <View
      style={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Image
        style={{ width: "75%", height: 300, paddingLeft: 40 }}
        source={welcome}
        contentFit="cover"
      ></Image>
      <Text
        ref={(r) => (welcomeRef = r)}
        style={{ color: MD2Colors.white }}
        variant="displayMedium"
      >
        Welcome to{" "}
      </Text>
      <Text
        ref={(r) => (astroRef = r)}
        variant="displayLarge"
        style={{ color: MD2Colors.purple200 }}
      >
        Astro Sight{" "}
      </Text>
      <Button
        ref={(r) => (btnRef = r)}
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
        onPress={handleGetStarted}
      >
        Get Started
      </Button>
    </View>
  );
};

export default Index;
