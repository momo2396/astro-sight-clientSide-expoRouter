import { View, Text } from "react-native";
import React from "react";
import { Button, Dialog, Portal } from "react-native-paper";

const Confirm = ({ title, visible, setVisible, setConfirm }) => {
  const hideDialog = () => setVisible(false);
  const cancelDialog = () => {
    setConfirm(false);
    hideDialog();
  };
  const doneDialog = () => {
    setConfirm(true);
    hideDialog();
  };
  return (
    <Portal>
      <Dialog
        theme={{ colors: { primary: "green" } }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Icon icon="alert" />
        <Dialog.Title>{title}</Dialog.Title>
        {/* <Dialog.Content>
          <Text variant="bodyMedium">{des}</Text>
        </Dialog.Content> */}
        <Dialog.Actions>
          <Button onPress={cancelDialog}>Cancel</Button>
          <Button onPress={doneDialog}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Confirm;

// const [visible, setVisible] = React.useState(false);
// const [confirm, setConfirm] = React.useState(false);

// <Button onPress={() => setVisible(true)}>Show Dialog</Button>
// <Confirm
//   title="Sample Title"
//   des="this is a dialog."
//   visible={visible}
//   setVisible={setVisible}
//   setConfirm={setConfirm}
// />
// <Text>{confirm ? "confirmed" : "Pending"}</Text>
