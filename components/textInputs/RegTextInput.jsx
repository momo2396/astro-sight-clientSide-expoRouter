import React from "react";
import { MD2Colors, TextInput } from "react-native-paper";

const RegTextInput = ({ text, setText, icon, label, setShow }) => {
  return (
    <TextInput
      label={label}
      mode="flat"
      value={text}
      onChangeText={(text) => setText(text)}
      underlineColor={MD2Colors.purple200}
      activeUnderlineColor={MD2Colors.purple600}
      style={{ width: "100%" }}
      textColor={MD2Colors.grey800}
      left={
        <TextInput.Icon icon={icon} onPress={() => setShow && setShow(true)} />
      }
    />
  );
};

export default RegTextInput;
