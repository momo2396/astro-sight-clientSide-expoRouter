import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Button,
  MD2Colors,
  TextInput,
} from "react-native-paper";
import { UserContext } from "../../components/AuthProviders";
import { backendURL } from "../../routes/useGetData";
import Confirm from "../../components/dialogs/Confirm";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { uploadImage } from "../functions/uploadImage";
const AddPost = () => {
  let { user } = useContext(UserContext);
  let [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [details, setDetails] = useState("");
  const [err, setErr] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  useLayoutEffect(() => {
    if (confirm) {
      handlerAdd();
    }
  }, [confirm]);
  const handlerAdd = async () => {
    setConfirm(false);
    const formTitle = title;
    const formSubTitle = subTitle;
    const formDetails = details;
    let formImage = selectedImage;

    if (!formTitle || !formDetails || !formImage || !formSubTitle)
      return setErr("Provide all fields information");
    else if (formDetails.length < 50)
      return setErr("Write minimum 50 characters in details");
    setLoad(true);
    formImage = await uploadImage(`data:image/jpeg;base64,${formImage}`);
    if (!formImage) {
      setLoad(false);
      return setErr("Image could not be uploaded");
    }
    setErr("");
    let post = {
      time: new Date(),
      image: formImage,
      title: formTitle,
      subTitle: formSubTitle,
      details: formDetails,
      authorEmail: user?.data?.email,
    };
    console.log(post);
    let res = await fetch(backendURL + "/posts/insert-post", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(post),
    });
    let data = await res.json();

    setLoad(false);
    ToastAndroid.show("Post Added Successfully", ToastAndroid.SHORT);
    setDetails("");
    setSubTitle("");
    setTitle("");
    setSelectedImage("");
    setPreviewImage("");
  };
  const handleTitle = (text) => {
    setTitle(text);
    setSubTitle("");
  };
  const PickImage = async () => {
    setSelectedImage("");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setSelectedImage(base64);
    }
  };
  return (
    <LinearGradient
      style={{ flex: 1, padding: 5, marginTop: 40 }}
      colors={["purple", "black"]}
    >
      <ScrollView
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          paddingRight: 3,
          flex: 1,
          gap: 3,
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              width: 300,
              fontStyle: "italic",
              fontWeight: "bold",
              fontSize: 25,
              borderWidth: 2,
              color: MD2Colors.purple200,
              padding: 3,
              borderColor: MD2Colors.purple200,
              borderTopRightRadius: 70,
              borderBottomLeftRadius: 70,
            }}
          >
            Add Post
          </Text>
        </View>
        {err && (
          <Text
            style={{
              marginTop: 20,
              textAlign: "center",
              color: MD2Colors.red500,
              fontWeight: "600",
            }}
          >
            {err}
          </Text>
        )}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            marginVertical: 20,
          }}
        >
          {previewImage && (
            <Image
              source={{
                uri: previewImage,
              }}
              style={{
                width: 250,
                height: 250,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          )}
          <Button
            icon="camera"
            mode="contained"
            onPress={PickImage}
            buttonColor={MD2Colors.purple200}
          >
            {previewImage ? "Edit Photo" : "Select Photo"}
          </Button>
        </View>
        <View style={{ flexDirection: "row", gap: 2, textAlign: "center" }}>
          <TextInput
            style={{
              flex: 1,
              marginVertical: 20,
            }}
            onChangeText={(text) => handleTitle(text)}
            cursorColor={MD2Colors.purple400}
            mode="outlined"
            value={title}
            label="Title"
          />
        </View>
        {title !== "" && (
          <View style={{ flexDirection: "row", gap: 2, textAlign: "center" }}>
            <TextInput
              style={{
                flex: 1,
                marginBottom: 20,
              }}
              onChangeText={(text) => setSubTitle(text)}
              cursorColor={MD2Colors.purple400}
              mode="outlined"
              value={subTitle}
              label="SubTitle"
            />
          </View>
        )}
        <View style={{ flexDirection: "row", gap: 2, textAlign: "center" }}>
          <TextInput
            style={{
              flex: 1,
              marginBottom: 20,
            }}
            onChangeText={(text) => setDetails(text)}
            cursorColor={MD2Colors.purple400}
            mode="outlined"
            multiline={true}
            value={details}
            label="Details"
          />
        </View>
        {load ? (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <ActivityIndicator
              animating={true}
              size={40}
              color={MD2Colors.red500}
            />
          </View>
        ) : (
          <View
            style={{
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{ padding: 3 }}
              mode="contained"
              onPress={() => setVisible(true)}
              buttonColor={MD2Colors.purple200}
              textColor={MD2Colors.white}
            >
              Add Post
            </Button>
            <Confirm
              setVisible={setVisible}
              setConfirm={setConfirm}
              visible={visible}
              title="Are you sure to post the blog?"
            />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default AddPost;
