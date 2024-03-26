import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useGetData, { backendURL } from "../../routes/useGetData";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Avatar, Icon, MD2Colors } from "react-native-paper";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../components/AuthProviders";
import CommentScreen from "./commentScreen";

const Details = () => {
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const item = useLocalSearchParams();
  console.log(item);
  let { image, authorEmail, time, title, _id, subTitle, details } = item;
  time = new Date(time);
  const modifiedDetails = details?.split(". ");
  const modifiedTitle = title?.split("\n");
  const [postAuthor, setPostAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [load, setLoad] = useState(false);
  const { data, isLoading } = useGetData(
    `/users/user-info?email=${authorEmail}`
  );
  let handlerBack = () => {
    router.back();
  };

  //   let handlerComment = () => {
  //       navigation.navigate("CommentScreen", { postID: _id, item })
  //       router.push({
  //           pathname:"/otherScreens/"
  //       })
  //   }
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[MD2Colors.purple800, MD2Colors.purple100]}
    >
      <SafeAreaView
        style={{
          flex: 1,
          padding: 5,
          paddingBottom: 0,
          justifyContent: "center",
          columnGap: 5,
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{ flexDirection: "row", gap: 7, zIndex: 50, width: "100%" }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: MD2Colors.purple200,
              overflow: "hidden",
              width: "auto",
              zIndex: 50,
              borderRadius: 20,
            }}
            onPress={handlerBack}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "baseline",
                padding: 2,
              }}
            >
              <Icon
                source="keyboard-backspace"
                size={35}
                color={MD2Colors.purple200}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              flex: 1,
              fontStyle: "italic",
              fontWeight: "bold",
              fontSize: 25,
              color: MD2Colors.purple200,
              borderWidth: 2,
              borderColor: MD2Colors.purple300,
              borderTopRightRadius: 80,
              borderBottomLeftRadius: 80,
              paddingVertical: 3,
            }}
          >
            Details
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: MD2Colors.purple200,
              overflow: "hidden",
              width: "auto",
              zIndex: 50,
              borderRadius: 20,
            }}
            onPress={() => setVisible(true)}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "baseline",
                padding: 4,
              }}
            >
              <Icon
                source="message-processing"
                size={35}
                color={MD2Colors.purple200}
              />
            </View>
          </TouchableOpacity>
          <CommentScreen
            visible={visible}
            setVisible={setVisible}
            postID={_id}
          />
        </View>
        <ScrollView>
          <View style={{ marginBottom: 1, width: "100%" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 35,
                fontWeight: "bold",
                color: MD2Colors.purple300,
              }}
            >
              {modifiedTitle[0]}
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "400",
                fontStyle: "italic",
                color: MD2Colors.purple200,
              }}
            >
              {subTitle}
            </Text>
          </View>
          <Image
            source={{
              uri: image,
            }}
            style={{
              width: "100%",
              height: 320,
              borderWidth: 1,
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              //   gap: 10,
            }}
          >
            {isLoading ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <ActivityIndicator
                  animating={true}
                  size={50}
                  color={MD2Colors.red900}
                />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Avatar.Image
                  size={55}
                  source={{
                    uri: data?.data?.photoURL,
                  }}
                  style={{ borderWidth: 3, borderColor: MD2Colors.purple600 }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    color: MD2Colors.white,
                    fontSize: 15,
                    backgroundColor: MD2Colors.purple400,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: MD2Colors.purple200,
                  }}
                >
                  @{data?.data?.userName}
                </Text>
              </View>
            )}
            <View>
              <Text
                style={{
                  color: MD2Colors.purple600,
                  fontStyle: "italic",
                  fontWeight: "500",
                }}
              >
                {time?.toLocaleDateString()}{" "}
              </Text>
              <Text
                style={{
                  color: MD2Colors.purple600,
                  fontStyle: "italic",
                  fontWeight: "500",
                }}
              >
                {time?.toLocaleTimeString("en-US")}
              </Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: "justify",
              fontSize: 20,
              color: MD2Colors.grey700,
            }}
          >
            {details}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Details;
