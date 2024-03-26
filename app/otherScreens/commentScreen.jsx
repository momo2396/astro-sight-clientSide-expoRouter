import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import { Modal, ScrollView } from "react-native";
import { UserContext } from "../../components/AuthProviders";
import useGetData from "../../routes/useGetData";

const CommentScreen = ({ visible, setVisible, postID }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState("");
  const [loadSubmit, setLoadSubmit] = useState(false);

  const commentQuery = useGetData(`/comments/all-comments?postID=${postID}`);
  return (
    <Modal visible={visible} animationType="slide">
      <LinearGradient
        colors={["transparent", "purple"]}
        style={{ flex: 1, paddingBottom: 5 }}
      >
        <ScrollView style={{ padding: 5, flex: 1, paddingTop: 10 }}>
          {}
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
};

export default CommentScreen;
