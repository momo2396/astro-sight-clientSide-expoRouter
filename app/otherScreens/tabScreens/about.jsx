import { View, Text, ScrollView } from "react-native";
import React from "react";
import { MD2Colors } from "react-native-paper";
import Map from "../../../components/Map";

const About = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text
          style={{
            textAlign: "right",
            fontWeight: "bold",
            marginHorizontal: 5,
            marginVertical: 5,
            color: MD2Colors.purple200,
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

// map
