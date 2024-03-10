import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

import auth from "../firebase/firebase.config";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import { backendURL } from "../routes/useGetData";
import { router } from "expo-router";
export const UserContext = createContext(null);
const AuthProviders = ({ children }) => {
  let navigation = useNavigation();
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);
  const [remember, setRemember] = useState(false);
  useLayoutEffect(() => {
    let funcUserCheck = async (localUser) => {
      console.log("local", localUser);
      if (localUser) {
        localUser = JSON.parse(localUser);
        setUser(localUser);
        setLoading(false);
      } else
        onAuthStateChanged(auth, async (currentUser) => {
          // console.log("curr:", currentUser);
          if (currentUser?.uid) {
            if (currentUser?.emailVerified) {
              let res = await fetch(
                backendURL + `/users/single-user?email=${currentUser?.email}`
              );
              let data = await res.json();
              if (data) {
                console.log("data: ", data);
                setUser(data);
                setLoading(false);
                await AsyncStorage.setItem("user", JSON.stringify(data));
              } else {
                setUser(null);
                setLoading(false);
                logoutUser();
              }
            } else {
              setUser(null);
              setLoading(false);
              logoutUser();
            }
          } else {
            setUser(null);
            setLoading(false);
          }
        });
    };
    let func = async () => {
      setLoading(true);
      let localUser = await AsyncStorage.getItem("user");
      let localRem = await AsyncStorage.getItem("remember");
      await AsyncStorage.clear();
      setRemember(localRem ? true : false);
      if (localRem) funcUserCheck(localUser);
      else {
        setUser(null);
        setLoading(false);
      }
    };
    func();
  }, []);

  useEffect(() => {
    let func = async () => {
      if (user) await AsyncStorage.setItem("user", JSON.stringify(user));
      else await AsyncStorage.removeItem("user");
    };
    func();
  }, [user]);
  let registerUser = async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  let sendVerification = async () => {
    sendEmailVerification(auth.currentUser).then(() => {
      ToastAndroid.show(
        "A verification sent to your email",
        ToastAndroid.SHORT
      );
    });
  };
  let updateUser = async (profileInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profileInfo);
  };

  let loginUser = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  let logoutUser = async () => {
    setLoading(true);
    signOut(auth)
      .then(async () => {
        setUser(null);
        setLoading(false);
        router.replace({
          pathname: "/otherScreens/login",
        });
        await AsyncStorage.removeItem("user");
      })
      .catch(async () => {
        setUser(null);
        setLoading(false);
        router.replace({
          pathname: "/otherScreens/login",
        });
        await AsyncStorage.removeItem("user");
      });
  };

  let contextValue = {
    user,
    loading,
    setLoading,
    registerUser,
    loginUser,
    setUser,
    updateUser,
    logoutUser,
    sendVerification,
    remember,
    setRemember,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default AuthProviders;

// completed
