import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

// 사용자에게 id부여
// expo install expo-application
import * as Application from "expo-application";
const isIOS = Platform.OS === "ios";

import { firebase_db } from "../firebaseConfig";

export default function LikeCard({ content, navigation }) {
  let uniqueId;
  if (isIOS) {
    let iosId = Application.getIosIdForVendorAsync();
    uniqueId = iosId;
  } else {
    uniqueId = Application.androidId;
  }

  const detail = () => {
    navigation.navigate("DetailPage", { idx: content.idx });
  };

  const remove = () => {
    firebase_db
      .ref("/like/" + uniqueId + "/" + content.idx)
      .remove()
      .then(function () {
        Alert.alert("삭제 완료");
        reload();
      });
  };

  return (
    //  카드 하나 묶음
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: content.image }} />
      {/* 카드 텍스트 묶음 */}
      <View style={styles.cardText}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {content.title}
        </Text>
        <Text style={styles.cardDesc} numberOfLines={3}>
          {content.desc}
        </Text>
        <Text style={styles.cardDate}>{content.date}</Text>

        {/* 카드 버튼 묶음 */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={() => detail()}>
            <Text style={styles.buttonText}>자세히보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => remove()}>
            <Text style={styles.buttonText}>찜 해제</Text>
          </TouchableOpacity>
        </View>
        {/* // 카드 버튼 묶음 */}
      </View>
      {/* // 카드 텍스트 묶음 */}
    </View>
    // // 카드 하나 묶음
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  cardImage: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    flex: 2,
    flexDirection: "column",
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardDesc: {
    fontSize: 15,
  },
  cardDate: {
    fontSize: 10,
    color: "#A6A6A6",
  },
  buttonGroup: {
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "deeppink",
    borderRadius: 7,
  },
  buttonText: {
    color: "deeppink",
    textAlign: "center",
  },
});
