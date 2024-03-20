import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
const Map = () => {
  const [location, setLocation] = useState({
    lat: 22.471038,
    long: 91.788466,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: loc.coords.latitude,
        long: loc.coords.longitude,
      });
      setLoading(false);
      // console.log({
      //   lat: loc?.coords?.latitude,
      //   long: loc.coords.longitude,
      // });
    })();
  }, []);
  return (
    <>
      {loading ? (
        <View style={[styles.loadingContainer, styles.horizontal]}>
          <ActivityIndicator
            animating={true}
            size={50}
            color={MD2Colors.red800}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.lat,
              longitude: location.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              coordinate={{ latitude: location.lat, longitude: location.long }}
              // title="Astro Sight"
              // provider={PROVIDER_GOOGLE}
            />
          </MapView>
        </View>
      )}
    </>
  );
};

export default Map;
