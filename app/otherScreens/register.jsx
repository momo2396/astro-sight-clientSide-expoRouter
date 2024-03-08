import { View, ImageBackground, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import regBG from "../../assets/images/standing/blue.png";
import { Avatar, Button, MD2Colors } from "react-native-paper";
import { Text } from "react-native-paper";
import RegTextInput from "../../components/textInputs/RegTextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showPass, setShowPass] = useState(true);
  const [showConPass, setShowConPass] = useState(true);
  const [rPIcon, setRPIcon] = useState("");
  const [rCPIcon, setRCPIcon] = useState("");
  const [pass, setPass] = useState("");
  const [con, setCon] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  useLayoutEffect(() => {
    if (showPass) setRPIcon("eye");
    else setRPIcon("eye-off");
  }, [showPass]);
  useLayoutEffect(() => {
    if (showConPass) setRCPIcon("eye");
    else setRCPIcon("eye-off");
  }, [showConPass]);
  const handleDatePicker = (event, selectedDate) => {
    setShow(false);
    if (event.type === "set") {
      setDate(selectedDate);
      setBirthDate(
        selectedDate?.toString()?.split(" ")?.slice(1, 4)?.join("-")
      );
    } else if (event.type === "dismissed") {
      setBirthDate(null);
    }
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
    <ImageBackground
      source={regBG}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 40,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "baseline",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text style={{ color: MD2Colors.purple200, fontSize: 20 }}>
            Old Member?
          </Text>
          <Button
            style={{
              marginTop: 20,
              borderColor: MD2Colors.purple200,
            }}
            buttonColor={MD2Colors.purple200}
            icon="arrow-right"
            mode="contained"
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={{ textAlign: "center" }}
            onPress={() =>
              console.log(
                name,
                email,
                pass,
                con,
                birthDate,
                userName,
                selectedImage.slice(0, 10)
              )
            }
          >
            Sign In
          </Button>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: MD2Colors.purple200,
              fontSize: 40,
            }}
          >
            Sign Up
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 30,
            flexDirection: "column",
            gap: 10,
            backgroundColor: "black",
            opacity: 0.8,
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 20,
            }}
          >
            {previewImage && (
              <Avatar.Image size={130} source={{ uri: previewImage }} />
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
          <RegTextInput
            leftIcon="face-man"
            label="Full Name"
            text={name}
            setText={setName}
          />
          <RegTextInput
            leftIcon="account"
            label="User Name"
            text={userName}
            setText={setUserName}
          />
          <RegTextInput
            leftIcon="email-outline"
            label="Email"
            text={email}
            setText={setEmail}
          />
          <RegTextInput
            leftIcon="calendar-month-outline"
            rightIcon="plus-thick"
            label="Date of Birth"
            text={birthDate}
            setText={setBirthDate}
            setShow={setShow}
            dateP
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={handleDatePicker}
            />
          )}
          <RegTextInput
            leftIcon="form-textbox-password"
            rightIcon={rPIcon}
            label="Password"
            text={pass}
            passShow={showPass}
            setText={setPass}
            setShow={setShowPass}
            pw
          />
          <RegTextInput
            leftIcon="form-textbox-password"
            rightIcon={rCPIcon}
            label="Confirm Password"
            text={con}
            passShow={showConPass}
            setText={setCon}
            setShow={setShowConPass}
            pw
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register;
