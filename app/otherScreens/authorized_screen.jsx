import { ImageBackground, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../../components/AuthProviders";
import regBG from "../../assets/images/standing/blue.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, MD2Colors } from "react-native-paper";
import { Text } from "react-native";
import About from "./tabScreens/about";
import Videos from "./tabScreens/videos";
import Posts from "./tabScreens/posts";
import { router } from "expo-router";

const AuthorizedScreen = () => {
  let { user } = useContext(UserContext);
  let tabs = [
    {
      name: "Videos",
      icon: "youtube",
    },
    {
      name: "About",
      icon: "map-marker-radius",
    },
    {
      name: "Posts",
      icon: "post",
    },
    // {
    //   name: "ImageScreen",
    //   icon: "camera",
    // },
  ];
  let [tab, setTab] = useState(tabs[0]?.name);
  const handleCamera = () => {
    router.navigate({
      pathname: "/otherScreens/imageScreen",
    });
  };
  const handleProfile = () => {
    router.navigate({
      pathname: "/otherScreens/profile",
    });
  };
  return (
    <ImageBackground
      source={regBG}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          opacity: 0.7,
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingTop: 20,
          }}
        >
          <View style={{ flex: 1, width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // padding: 5,
                width: "100%",
                // position: "absolute",
                zIndex: 50,
                gap: 0,
              }}
            >
              <View style={{ overflow: "hidden", width: "auto" }}>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: MD2Colors.purple200,
                    borderWidth: 2,
                    padding: 5,
                    borderRadius: 40,
                    backgroundColor: MD2Colors.grey700,
                  }}
                  onPress={handleCamera}
                >
                  <Icon source="camera" size={40} color={MD2Colors.purple200} />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  color: MD2Colors.purple200,
                  padding: 3,
                  flex: 1,
                  marginHorizontal: 5,
                  fontStyle: "italic",
                  borderWidth: 2,
                  borderColor: MD2Colors.purple200,
                  backgroundColor: MD2Colors.grey700,
                  borderTopRightRadius: 80,
                  borderBottomLeftRadius: 80,
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                {tab === "Videos" && "Youtube Videos"}
                {tab === "Posts" && "Posts"}
                {tab === "About" && "About Us"}
              </Text>
              <View
                style={{
                  overflow: "hidden",
                  width: "auto",
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: MD2Colors.purple200,
                    borderWidth: 2,
                    padding: 5,
                    borderRadius: 40,
                    backgroundColor: MD2Colors.grey700,
                  }}
                  onPress={handleProfile}
                >
                  <Icon
                    source="account-lock-open"
                    size={40}
                    color={MD2Colors.purple200}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              {tab === "Videos" && <Videos />}
              {tab === "Posts" && <Posts />}
              {tab === "About" && <About />}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            {tabs.map((i) => (
              <View key={i.name} style={{ flex: 1, zIndex: 50 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      tab === i?.name ? MD2Colors.blue700 : MD2Colors.black,
                    scaleX: tab === i?.name && 100,
                    scaleY: tab === i?.name && 100,
                  }}
                  onPress={() => setTab(i?.name)}
                >
                  <Icon
                    source={i?.icon}
                    size={40}
                    color={MD2Colors.purple200}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default AuthorizedScreen;
