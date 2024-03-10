import {
  View,
  ImageBackground,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import regBG from "../../assets/images/standing/blue.png";
import {
  ActivityIndicator,
  Avatar,
  Button,
  MD2Colors,
  TextInput,
} from "react-native-paper";
import { Text } from "react-native-paper";
import RegTextInput from "../../components/textInputs/RegTextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import useGetData, { backendURL } from "../../routes/useGetData";
import { UserContext } from "../../components/AuthProviders";
import { uploadImage } from "../functions/uploadImage";
import { router } from "expo-router";

const Register = () => {
  const { data, isLoading, refetch } = useGetData("/users/user-names");
  const [email, setEmail] = useState("");
  let [userName, setUserName] = useState("");
  let [userNames, setUserNames] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showPass, setShowPass] = useState(true);
  const [showConPass, setShowConPass] = useState(true);
  const [rPIcon, setRPIcon] = useState("");
  const [rCPIcon, setRCPIcon] = useState("");
  const [rUIcon, setRUIcon] = useState("");
  const [iColor, setIColor] = useState("");
  const [pass, setPass] = useState("");
  const [con, setCon] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  let [err, setErr] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  let [available, setAvailable] = useState("");
  const { registerUser, logoutUser, sendVerification } =
    useContext(UserContext);

  useLayoutEffect(() => {
    let names = {};
    if (data?.data) data?.data?.forEach((u) => (names[u.toLowerCase()] = true));
    setUserNames(names);
    console.log(names);
  }, [data?.data]);

  useLayoutEffect(() => {
    if (showPass) setRPIcon("eye");
    else setRPIcon("eye-off");
  }, [showPass]);

  useLayoutEffect(() => {
    if (available) {
      if (available == "taken") {
        setRUIcon("exclamation-thick");
        setIColor("red");
      } else if (available == "available") {
        setRUIcon("check-bold");
        setIColor("green");
      }
    } else {
      setRUIcon("");
      setIColor("");
    }
  }, [available]);
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
  const handleUserName = (text) => {
    setUserName(text?.nativeEvent?.text);
    if (userNames[text?.nativeEvent?.text.toLowerCase()]) setAvailable("taken");
    else if (text?.nativeEvent?.text) setAvailable("available");
    else setAvailable("");
  };
  const handleSignUp = async () => {
    let formDate = birthDate ? date : null;
    let formName = name;
    let formUserName = userName;
    let formEmail = email;
    let formPass = pass;
    let formCon = con;
    let formImage = selectedImage;
    if (
      !formName ||
      !formDate ||
      !formUserName ||
      !formEmail ||
      !formPass ||
      !formCon ||
      !formImage
    ) {
      setErr("Please enter all valid information");
      return;
    }
    if (available === "taken") return setErr("Username not available");
    if (pass !== con)
      return setErr("Password and Confirm Password are not Same.");
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail)) {
      setErr("Enter a valid email address");
      return;
    }

    setLoading(true);
    formImage = await uploadImage(`data:image/jpeg;base64,${formImage}`);
    if (!formImage) {
      setLoading(false);
      return setErr("Photo upload failed, try again");
    }
    setErr("");
    const userInfo = {
      name: formName,
      email: formEmail,
      userName: formUserName,
      rating: 0,
      birthDate: formDate,
      password: formPass,
      photoURL: formImage,
      role: "user",
    };
    registerUser(email, pass)
      .then((userCredential) => {
        sendVerification();
        mongoDBUserEntry(userInfo);
      })
      .catch((error) => {
        setErr(
          error?.code?.split("/")[1]?.split("-")?.join(" ")?.toUpperCase()
        );
        setLoading(false);
        return;
      });
  };

  let mongoDBUserEntry = (userInfo) => {
    fetch(backendURL + "/users/insert-user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        logoutUser();

        ToastAndroid.show(
          "Registration Successful, Please Login",
          ToastAndroid.SHORT
        );
      })
      .catch((error) => {
        console.log(
          // error?.code?.split("/")[1]?.split("-")?.join(" ")?.toUpperCase()
          "error: ",
          error
        );
        // setLoading(false);
        return;
      });
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
              router.push({
                pathname: "/otherScreens/login",
              })
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
            opacity: 0.7,
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
          <TextInput
            label="User Name"
            leftIcon="account"
            rightIcon={rUIcon}
            mode="flat"
            value={userName}
            onChange={(text) => handleUserName(text)}
            onBlur={() =>
              setAvailable && setAvailable((x) => (x === "available" ? "" : x))
            }
            underlineColor={MD2Colors.purple200}
            activeUnderlineColor={MD2Colors.purple600}
            style={{ width: "100%" }}
            textColor={MD2Colors.grey800}
            left={<TextInput.Icon icon="account" disabled={true} />}
            right={<TextInput.Icon icon={rUIcon} color={iColor} />}
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
          {err && (
            <Text
              style={{
                color: MD2Colors.red500,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 5,
                marginTop: 5,
                fontWeight: "400",
              }}
            >
              {err}
            </Text>
          )}
          <View style={{ alignItems: "center", gap: 5 }}>
            {loading ? (
              <ActivityIndicator
                animating={true}
                size={50}
                color={MD2Colors.red800}
              />
            ) : (
              <View style={{ width: "100%" }}>
                <Button
                  icon="arrow-right"
                  mode="outlined"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  // disabled={err !== ""}
                  textColor={MD2Colors.purple200}
                  onPress={handleSignUp}
                  style={{
                    borderColor: MD2Colors.purple200,
                    borderCurve: "circular",
                  }}
                >
                  Go
                </Button>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register;
