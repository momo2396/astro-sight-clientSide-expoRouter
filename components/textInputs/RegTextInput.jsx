import React from "react";
import { MD2Colors, TextInput } from "react-native-paper";
const RegTextInput = ({
  text,
  setText,
  leftIcon,
  rightIcon,
  label,
  setShow = false,
  dateP = false,
  pw = false,
  passShow = false,
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
      readOnly={dateP}
      right={
        rightIcon &&
        (pw ? (
          <TextInput.Icon
            icon={rightIcon}
            onPress={() => setShow && setShow((x) => !x)}
          />
        ) : (
          <TextInput.Icon
            icon={rightIcon}
            onPress={() => setShow && setShow(true)}
          />
        ))
      }
    />
  );
};

export default RegTextInput;
