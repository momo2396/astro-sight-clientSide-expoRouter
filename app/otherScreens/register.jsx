import { View, ImageBackground, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import regBG from "../../assets/images/standing/blue.png";
import { Button, MD2Colors } from "react-native-paper";
import { Text } from "react-native-paper";
import RegTextInput from "../../components/textInputs/RegTextInput";
import DateTimePicker from "@react-native-community/datetimepicker";

const Register = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
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
            gap: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Button
            style={{
              padding: 10,
              marginTop: 20,
              borderColor: MD2Colors.white,
            }}
            textColor={MD2Colors.white}
            leftIcon="arrow-right"
            mode="outlined"
            buttonColor={MD2Colors.purple200}
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={{ textAlign: "center", fontSize: 20 }}
            // onPress={() =>
            //   router.push({
            //     pathname: "/otherScreens/register",
            //   })
            // }
          >
            Sign Up
          </Button> */}
          <Text style={{ color: MD2Colors.purple200, fontSize: 15 }}>
            Old Member?
          </Text>
          <Button
            style={{
              padding: 5,
              marginTop: 20,
              borderColor: MD2Colors.purple200,
            }}
            textColor={MD2Colors.purple200}
            icon="arrow-right"
            mode="outlined"
            contentStyle={{ flexDirection: "row-reverse" }}
            labelStyle={{ textAlign: "center", fontSize: 15 }}
            // onPress={() =>
            //   router.push({
            //     pathname: "/otherScreens/register",
            //   })
            // }
          >
            Sign In
          </Button>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
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
            marginTop: 20,
            flexDirection: "column",
            gap: 10,
            backgroundColor: "black",
            opacity: 0.8,
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
          }}
        >
          <RegTextInput
            leftIcon="face-man"
            label="Full Name"
            text={name}
            setText={setName}
          />
          <RegTextInput
            leftIcon="account"
            label="User Name"
            text={user}
            setText={setUser}
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
