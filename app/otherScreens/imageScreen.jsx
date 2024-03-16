import { View, Text, ImageBackground } from "react-native";
import regBG from "../../assets/images/standing/blue.png";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { backendURL } from "../../routes/useGetData";
import { uploadImage } from "../functions/uploadImage";
import { FlatList } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { ActivityIndicator, Button, Icon, MD2Colors } from "react-native-paper";
import { router } from "expo-router";
const ImageScreen = () => {
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [load, setLoad] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const [downLoad, setDownLoad] = useState(false);
  const [pred, setPred] = useState([]);
  const [err, setErr] = useState(null);
  const html = `<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Prediction Result
    </h1>
    <img
      src="${imageUri}"
      style="width: 30vw; margin-horizontal: auto" />
    <div style="">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; margin-bottom: 5px">
            <p>${pred[0]?.class?.toUpperCase()}</p>
            <p>${(pred[0]?.score * 100).toFixed(2)}%</p>
        </div>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; margin-bottom: 5px">
            <p>${pred[1]?.class?.toUpperCase()}</p>
            <p>${(pred[1]?.score * 100).toFixed(2)}%</p>
        </div>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; margin-bottom: 5px">
            <p>${pred[2]?.class?.toUpperCase()}</p>
            <p>${(pred[2]?.score * 100).toFixed(2)}%</p>
        </div>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; margin-bottom: 5px">
            <p>${pred[3]?.class?.toUpperCase()}</p>
            <p>${(pred[3]?.score * 100).toFixed(2)}%</p>
        </div>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; margin-bottom: 5px">
            <p>${pred[4]?.class?.toUpperCase()}</p>
            <p>${(pred[4]?.score * 100).toFixed(2)}%</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; margin-bottom: 5px">
        <p>${pred[5]?.class?.toUpperCase()}</p>
        <p>${(pred[5]?.score * 100).toFixed(2)}%</p>
    </div>
    </div>
  </body>
</html>
`;

  const printToFile = async () => {
    setDownLoad(true);
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    setDownLoad(false);
  };
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") Alert.alert("Permission denied");
    })();
  }, []);
  const handlerBack = () => {
    router.back();
  };
  const PickImage = async () => {
    // setImage(null);
    setBtnLoad(true);
    setPred([]);
    setErr(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    setBtnLoad(false);
    // console.log(result);
    if (!result.canceled) {
      setLoad(true);
      let imageUri = result.assets[0].uri;
      setImage(imageUri);
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      let formImage = await uploadImage(
        `data:image/jpeg;base64,${base64Image}`,
        300
      );
      setImageUri(formImage);
      let res = await fetch(backendURL + "/classification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: formImage }),
      });

      let data = await res.json();
      // console.log(data);
      if (data.status !== 500) setPred(data);
      else setErr("Something went wrong");
      setLoad(false);
    }
  };

  // console.log(image);
  return (
    // <LinearGradient colors={["white", "lightgreen"]} className="flex-1">
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
          opacity: 0.8,
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            padding: 5,
            justifyContent: "center",
            columnGap: 5,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", rowGap: 5, zIndex: 50 }}>
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
                  alignItems: "center",
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
                backgroundColor: MD2Colors.grey700,
                borderWidth: 2,
                borderColor: MD2Colors.purple200,
                borderTopRightRadius: 80,
                borderBottomLeftRadius: 80,
              }}
            >
              Check Astro Objects
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!btnLoad ? (
                <Button
                  icon="camera"
                  mode="outlined"
                  textColor={MD2Colors.purple200}
                  style={{
                    padding: 5,
                    paddingVertical: 2,
                    marginTop: 5,
                    marginBottom: 3,
                  }}
                  onPress={PickImage}
                >
                  {image ? "Another Image" : "Upload Image"}
                </Button>
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <ActivityIndicator
                    animating={true}
                    color={MD2Colors.red800}
                    size={30}
                  />
                </View>
              )}
              {image && (
                <Image
                  source={{
                    uri: image,
                  }}
                  style={{
                    width: 280,
                    height: 280,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
              )}
            </View>
            {load ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <ActivityIndicator
                  animating={true}
                  color={MD2Colors.red800}
                  size={60}
                />
              </View>
            ) : (
              <View style={{ flex: 1, width: "100%", paddingVertical: 5 }}>
                {pred?.length > 0 && (
                  <View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 5,
                      }}
                    >
                      {downLoad ? (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <ActivityIndicator
                            animating={true}
                            color={MD2Colors.red800}
                            size={30}
                          />
                        </View>
                      ) : (
                        <Button
                          icon="file-download"
                          mode="outlined"
                          textColor={MD2Colors.purple200}
                          style={{
                            padding: 5,
                            paddingVertical: 2,
                            marginTop: 5,
                            marginBottom: 3,
                          }}
                          onPress={printToFile}
                        >
                          Download Results
                        </Button>
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <FlatList
                        style={{
                          borderWidth: 2,
                          borderColor: MD2Colors.purple200,
                          borderRadius: 10,
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          gap: 10,
                        }}
                        data={pred}
                        renderItem={({ item, index }) => (
                          <View
                            style={{
                              justifyContent: "space-between",
                              padding: 10,
                              paddingVertical: 10,
                              width: "100%",
                              marginVertical: 10,
                              borderWidth: 2,
                              borderColor: MD2Colors.purple200,
                              alignItems: "center",
                              flexDirection: "row",
                              borderRadius: 30,
                            }}
                          >
                            <Text
                              style={{
                                color: MD2Colors.purple200,
                                fontSize: 20,
                              }}
                            >
                              {item?.class?.toUpperCase()}
                            </Text>
                            <Text
                              style={{
                                color: MD2Colors.purple200,
                                fontSize: 20,
                              }}
                            >
                              {(item?.score * 100).toFixed(2)}%
                            </Text>
                          </View>
                        )}
                        keyExtractor={(item, index) => index}
                      />
                    </View>
                  </View>
                )}
                {err && (
                  <Text
                    style={{
                      textAlign: "center",
                      marginVertical: 5,
                      fontWeight: "bold",
                      color: MD2Colors.red900,
                      fontSize: 25,
                    }}
                  >
                    {err}
                  </Text>
                )}
              </View>
            )}
          </View>
        </SafeAreaView>
        {/* </LinearGradient> */}
      </View>
    </ImageBackground>
  );
};

export default ImageScreen;
