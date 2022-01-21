import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import LikeCard from "../components/LikeCard";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { firebase_db } from "../firebaseConfig";

// 사용자에게 id부여
// expo install expo-application
import * as Application from "expo-application";
const isIOS = Platform.OS === "ios";

export default function LikePage({ navigation, route }) {
  const [tip, setTip] = useState([]);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: "꿀팁 찜",
    });

    let uniqueId;
    if (isIOS) {
      let iosId = Application.getIosIdForVendorAsync();
      uniqueId = iosId;
    } else {
      uniqueId = Application.androidId;
    }

    firebase_db
      .ref("/like/" + uniqueId)
      .once("value")
      .then((snapshot) => {
        // console.log("파이어베이스에서 데이터 가져왔습니다!!");
        let tip = snapshot.val();
        // console.log(tip);
        let tip_list = Object.values(tip);
        if (tip_list.length > 0) {
          setTip(tip_list);
          setReady(false);
        }
      });
  });

  return ready ? (
    <Loading />
  ) : (
    <ScrollView style={styles.container}>
      {tip.map((content, i) => {
        return <LikeCard key={i} content={content} navigation={navigation} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
