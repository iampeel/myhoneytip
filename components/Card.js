import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function Card({ content }) {
  return (
    // 카드 하나 묶음
    <View style={styles.card}>
      {/* 카드 이미지 */}
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
      </View>
      {/* // 카드 텍스트 묶음 */}
    </View>
    // //카드 하나 묶음
  );
}

const styles = StyleSheet.create({
  // 카드 하나 묶음
  card: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    paddingBottom: 10,
  },

  cardImage: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  // 카드 텍스트 묶음
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
});
