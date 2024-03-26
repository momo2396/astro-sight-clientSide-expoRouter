import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Icon, MD2Colors } from "react-native-paper";
import { router } from "expo-router";
import useGetData, { backendURL } from "../../../routes/useGetData";
import { UserContext } from "../../../components/AuthProviders";
import { LinearGradient } from "expo-linear-gradient";
const Posts = () => {
  const postsQuery = useGetData("/posts/all-posts");
  const handleAddPost = () => {
    router.push({
      pathname: "otherScreens/add_post",
    });
  };
  return (
    <View style={{ flex: 1 }}>
      {postsQuery?.isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            animating={true}
            size={80}
            color={MD2Colors.red900}
          />
        </View>
      ) : (
        <FlatList
          style={{ padding: 2, paddingTop: 20 }}
          data={postsQuery?.data?.data}
          renderItem={({ item, index }) => (
            <SinglePost
              item={item}
              index={index}
              color1={MD2Colors.purple100}
              color2={MD2Colors.purple900}
            />
          )}
          keyExtractor={(item, index) => index}
        ></FlatList>
      )}
      <TouchableOpacity onPress={handleAddPost}>
        <LinearGradient
          colors={["#9d009f", "#150015"]}
          style={{
            padding: 3,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: MD2Colors.purple200,
            borderRadius: 40,
            position: "absolute",
            bottom: 5,
            right: 5,
          }}
        >
          <Icon source="plus" size={50} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Posts;

export function SinglePost({ item, index, color1, color2 }) {
  const { user } = useContext(UserContext);
  const { image, details, authorEmail, title, _id } = item;
  let [react, setReact] = useState("none");
  let [likeCount, setLikeCount] = useState(0);
  let [disLikeCount, setDisLikeCount] = useState(0);
  const postQuery = useGetData(
    `/reacts/check-react?email=${user?.email}&postID=${_id}`
  );
  useLayoutEffect(() => {
    setReact(postQuery?.data?.react);
    setLikeCount(postQuery?.data?.liked);
    setDisLikeCount(postQuery?.data?.disliked);
  }, [postQuery?.data]);

  const handlerReact = (reaction) => {
    if (react === reaction) {
      deleteReact(reaction);
    } else {
      updateReact(reaction);
    }
  };

  const deleteReact = () => {
    fetch(
      backendURL + `/reacts/delete-react?email=${user?.email}&postID=${_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        postQuery?.refetch();
      });
  };
  const updateReact = (reaction) => {
    fetch(
      backendURL + `/reacts/update-react?email=${user?.email}&postID=${_id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ reaction }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        postQuery?.refetch();
      });
  };

  const handleSeeMore = () => {
    router.push({
      pathname: "/otherScreens/details",
      params: item,
    });
  };
  return (
    <Pressable onPress={handleSeeMore}>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          overflow: "hidden",
          borderColor: "white",
          marginBottom: 22,
          backgroundColor: color1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          fadeDuration={1000}
          resizeMode="cover"
          style={{ height: "100%", width: "33.33%", backgroundColor: color2 }}
        />
        <View style={{ flex: 1, padding: 3 }}>
          <Text
            style={{ fontWeight: "700", textAlign: "left", fontSize: 20 }}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text
            style={{
              fontWeight: "200",
              textAlign: "left",
              fontSize: 15,
              fontWeight: "900",
              marginBottom: 2,
              color: MD2Colors.red900,
            }}
            numberOfLines={1}
          >
            @{authorEmail}
          </Text>
          <Text style={{ color: MD2Colors.grey900 }} numberOfLines={2}>
            {details}
          </Text>
          {postQuery?.isLoading ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 2,
              }}
            >
              <ActivityIndicator animating={true} size={25} color={color2} />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                gap: 40,
                paddingTop: 2,
                alignItems: "center",
              }}
            >
              <Pressable
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
                onPress={() => handlerReact("liked")}
              >
                <Icon
                  source="thumb-up"
                  size={25}
                  color={
                    react === "liked" ? MD2Colors.blue900 : MD2Colors.grey700
                  }
                />
                <Text
                  style={{
                    color:
                      react === "liked" ? MD2Colors.blue900 : MD2Colors.grey700,
                  }}
                >
                  {likeCount}
                </Text>
              </Pressable>
              <Pressable
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
                onPress={() => handlerReact("disliked")}
              >
                <Icon
                  source="thumb-down"
                  size={25}
                  color={
                    react === "disliked" ? MD2Colors.red900 : MD2Colors.grey700
                  }
                />
                <Text
                  style={{
                    color:
                      react === "disliked"
                        ? MD2Colors.red900
                        : MD2Colors.grey700,
                  }}
                >
                  {disLikeCount}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
