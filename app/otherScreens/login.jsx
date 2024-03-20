import { View, Text, ToastAndroid } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import logBG from "../../assets/images/dancing/blue.png";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button, MD2Colors } from "react-native-paper";
import { router } from "expo-router";
import LogTextInput from "../../components/textInputs/LogTextInput";
import { UserContext } from "../../components/AuthProviders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendURL } from "../../routes/useGetData";
const Login = () => {
  let { loginUser, setUser, sendVerification, remember, setRemember, user } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  let [passShow, setPassShow] = useState(true);
  let [verifyBtn, setVerifyBtn] = useState(false);
  let [err, setErr] = useState("");
  let [pass, setPass] = useState("");
  const [rPIcon, setRPIcon] = useState("");
  useLayoutEffect(() => {
    if (passShow) setRPIcon("eye");
    else setRPIcon("eye-off");
  }, [passShow]);
  const remSetToLocal = async (rem) => {
    if (rem) await AsyncStorage.setItem("remember", JSON.stringify(1));
    else await AsyncStorage.removeItem("remember");
  };
  let verifyHandler = () => {
    if (email) {
      sendVerification();
    }
    setVerifyBtn(false);
  };
  let handleSignIn = async () => {
    let formEmail = email;
    let formPass = pass;
    if (!formEmail.includes("@") || !formPass) {
      setErr("Please enter all valid information");
      return;
    }
    setErr("");

    loginUser(formEmail, formPass)
      .then(async (res) => {
        if (!res?.user?.emailVerified) {
          ToastAndroid.show("Email is not verified yet.", ToastAndroid.SHORT);
          setVerifyBtn(true);
          setLoading(false);
        } else if (res?.user?.email) {
          setLoading(true);
          setVerifyBtn(false);
          let res2 = await fetch(
            backendURL + `/users/single-user?email=${res?.user?.email}`
          );
          let data = await res2.json();
          // console.log(data);
          if (data) {
            setUser(data);
            router.replace({
              pathname: "/otherScreens/authorized_screen",
            });
            await AsyncStorage.setItem("user", JSON.stringify(data));
            setLoading(false);
          } else {
            setUser(null);
            setLoading(false);
            // console.log("Not found");
            ToastAndroid.show({ err }, ToastAndroid.SHORT);
            return;
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        setErr(
          error?.code?.split("/")[1]?.split("-")?.join(" ")?.toUpperCase()
        );
        console.log(error);
        return;
      });
  };
  return (
    <ImageBackground
      source={logBG}
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
            New Member?
          </Text>
          <Button
            style={{
              marginTop: 20,
              borderColor: MD2Colors.purple200,
            }}
            buttonColor={MD2Colors.purple200}
            icon="arrow-left"
            mode="contained"
            // contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={{ textAlign: "center" }}
            onPress={() =>
              router.push({
                pathname: "/otherScreens/register",
              })
            }
          >
            Sign Up
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
            Sign In
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 30,
            // marginBottom: 60,
            // marginRight: 10,
            // marginLeft: 10,
            // justifyContent: "center",
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
          <LogTextInput
            label="Email"
            text={email}
            setText={setEmail}
            leftIcon="email-outline"
          />
          <LogTextInput
            label="Password"
            text={pass}
            setText={setPass}
            leftIcon="form-textbox-password"
            passShow={passShow}
            setShow={setPassShow}
            rightIcon={rPIcon}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginBottom: 5,
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <Button
              style={{ borderWidth: 5 }}
              onPress={() => {
                setRemember((prev) => {
                  remSetToLocal(!prev);
                  return !prev;
                });
              }}
            >
              <View style={{ borderWidth: 2, borderColor: MD2Colors.green400 }}>
                <View
                  style={{
                    margin: 0.5,
                    padding: 2,
                    backgroundColor: remember ? MD2Colors.green600 : "",
                  }}
                ></View>
              </View>
            </Button>
            <Text style={{ color: MD2Colors.green500 }}>Remember Me</Text>
          </View>
          {err && (
            <Text
              style={{
                justifyContent: "center",
                color: MD2Colors.red600,
                fontSize: 20,
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
                  //   contentStyle={{ flexDirection: "row-reverse" }}
                  textColor={MD2Colors.purple200}
                  onPress={handleSignIn}
                  style={{
                    borderColor: MD2Colors.purple200,
                    borderCurve: "circular",
                  }}
                >
                  Go
                </Button>
              </View>
            )}
            {verifyBtn && (
              <View style={{ width: "100%" }}>
                <Button
                  mode="outlined"
                  textColor={MD2Colors.purple200}
                  onPress={verifyHandler}
                  style={{
                    borderColor: MD2Colors.purple200,
                    borderCurve: "circular",
                  }}
                >
                  Verify
                </Button>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
