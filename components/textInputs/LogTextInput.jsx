import React from "react";
import { MD2Colors, TextInput } from "react-native-paper";

const LogTextInput = ({
  label,
  text,
  setText,
  passShow = false,
  leftIcon,
  rightIcon = false,
  setShow = false,
}) => {
  return (
    <TextInput
      label={label}
      mode="flat"
      value={text}
      onChangeText={(text) => setText(text)}
      underlineColor={MD2Colors.purple200}
      secureTextEntry={passShow ? true : false}
      activeUnderlineColor={MD2Colors.purple600}
      style={{ width: "100%" }}
      textColor={MD2Colors.grey800}
      left={<TextInput.Icon icon={leftIcon} disabled={true} />}
      right={
        rightIcon && (
          <TextInput.Icon
            icon={rightIcon}
            onPress={() => setShow && setShow((x) => !x)}
          />
        )
      }
    />
  );
};

export default LogTextInput;
