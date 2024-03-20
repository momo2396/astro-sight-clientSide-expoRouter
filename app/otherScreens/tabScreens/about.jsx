import { View, Text, ScrollView, Pressable, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import { Icon, MD2Colors } from "react-native-paper";
import Map from "../../../components/Map";
import { UserContext } from "../../../components/AuthProviders";
import useGetData, { backendURL } from "../../../routes/useGetData";

const About = () => {
  const { user, setUser } = useContext(UserContext);
  const { data, refetch } = useGetData("/users/average-rating");
  let [rating, setRating] = useState(user?.data?.rating || 0);
  const handleRate = (rate) => {
    if (rate === rating) {
      setRating(0);
      postRating(0);
    } else {
      setRating(rate);
      postRating(rate);
    }
  };

  const postRating = (rate) => {
    setUser((x) => {
      return {
        ...x,
        rating: rate,
      };
    });
    fetch(`${backendURL}/users/update-ratings?email=${user?.data?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ rate }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (rate > 0)
          ToastAndroid.show("Thank You For Rating Us", ToastAndroid.SHORT);
        refetch();
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, marginBottom: 20, marginTop: 40 }}>
          <Text
            style={{
              color: MD2Colors.purple200,
              fontSize: 40,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Rate Our App
          </Text>
          <Text
            style={{
              color: MD2Colors.purple200,
              fontSize: 25,
              fontStyle: "italic",
            }}
          >
            Provide your opinion!
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
            marginLeft: 20,
            marginBottom: 20,
            width: "50%",
            // transform: "scale(2)",
          }}
        >
          {[1, 2, 3, 4, 5]?.map((i) => (
            <Pressable key={i} onPress={() => handleRate(i)}>
              <Icon
                source={rating >= i ? "star-plus" : "star-minus-outline"}
                size={45}
                color={MD2Colors.purple400}
              />
            </Pressable>
          ))}
        </View>
        <View
          style={{
            width: 200,
            borderWidth: 3,
            marginBottom: 10,
            marginTop: 3,
            paddingHorizontal: 2,
            paddingVertical: 10,
            borderColor: MD2Colors.purple200,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: MD2Colors.purple200,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {data?.count || 0} user rated {data?.avgRating.toFixed(2) || 0}
          </Text>
        </View>
        <Text
          style={{
            textAlign: "right",
            fontWeight: "bold",
            fontSize: 25,
            fontStyle: "italic",
            marginHorizontal: 5,
            marginVertical: 5,
            color: MD2Colors.purple200,
            marginTop: 20,
          }}
        >
          Our Location
        </Text>
        <View
          style={{
            flex: 1,
            overflow: "hidden",
            borderEndColor: MD2Colors.white,
            borderTopColor: MD2Colors.white,
            width: "100%",
            height: 400,
            paddingVertical: 5,
            marginTop: 5,
            shadowOpacity: 0.8,
          }}
        >
          <Map />
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
