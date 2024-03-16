import { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { MD2Colors } from "react-native-paper";
import YoutubePlayer from "react-native-youtube-iframe";
const Videos = () => {
  let videos = [
    {
      showName: "Earth",
      title: "Earth's Evolution in 10 Minutes",
      id: "LinWJsangs4",
    },
    {
      showName: "Nebula",
      title: "A journey to the Orion Nebula",
      id: "VrnNrQijDgU",
    },
    {
      showName: "Nebula Facts",
      title: "Top 10 Interesting Nebulae Facts: Cosmic Wonders Revealed",
      id: "OW0Nj3V_f0A",
    },
  ];
  let [selected, setSelected] = useState(videos[0]);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderWidth: 4,
          backgroundColor: "black",
          borderColor: MD2Colors.green900,
          marginVertical: 5,
          height: 340,
          width: "100%",
        }}
      >
        <SingleVideo item={selected} />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 5,
          color: MD2Colors.purple200,
          textAlign: "center",
          borderWidth: 4,
          backgroundColor: "black",
          borderColor: MD2Colors.green900,
        }}
      >
        More Videos
      </Text>
      <FlatList
        style={{
          padding: 5,
          borderWidth: 4,
          borderColor: MD2Colors.green900,
          backgroundColor: "black",
        }}
        data={videos}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              margin: 2,
              borderColor: MD2Colors.purple900,
              overflow: "hidden",
              borderWidth: 2,
              backgroundColor:
                item?.id === selected?.id ? MD2Colors.grey500 : "transparent",
            }}
          >
            <TouchableOpacity onPress={() => setSelected(item)}>
              <Image
                source={{
                  uri: `https://img.youtube.com/vi/${item?.id}/0.jpg`,
                }}
                fadeDuration={1000}
                style={{ height: 200 }}
                resizeMode="cover"
              />
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 5,
                  fontSize: 20,
                  color: MD2Colors.purple200,
                }}
              >
                {item?.showName}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Videos;

export function SingleVideo({ item }) {
  return (
    <View style={{ backgroundColor: "black", overflow: "hidden" }}>
      <YoutubePlayer height={230} videoId={item.id} />
      <Text
        style={{
          textAlign: "right",
          color: MD2Colors.purple200,
          fontWeight: "bold",
          padding: 15,
        }}
      >
        {item?.showName}
      </Text>
      <Text
        style={{ fontSize: 20, color: MD2Colors.purple200, padding: 15 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item?.title}
      </Text>
    </View>
  );
}

// videoId
