import React from "react";
import main from "../assets/main.png";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import data from "../data.json";

export default function MainPage() {
  // 앱 실행시 경고창 무시
  console.disableYellowBox = true;

  // 데이터 변수
  let tip = data.tip;

  // 날씨 변수
  let todayWeather = 27;
  let todayCondition = "흐림";

  return (
    // 전체 묶음
    <ScrollView style={styles.container}>
      {/* 타이틀 */}
      <Text style={styles.title}>나만의 꿀팁</Text>

      {/* 날씨 */}
      <Text style={styles.weather}>
        오늘의 날씨: {todayWeather + "°C " + todayCondition}{" "}
      </Text>

      {/* 상단 이미지 */}
      <Image style={styles.mainImage} source={main} />

      {/* 중간 버튼 묶음 */}
      <ScrollView style={styles.middleContainer} horizontal>
        <TouchableOpacity style={styles.middleButton01}>
          <Text style={styles.middleButtonText}>생활</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton02}>
          <Text style={styles.middleButtonText}>재테크</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton03}>
          <Text style={styles.middleButtonText}>반려견</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton04}>
          <Text style={styles.middleButtonText}>꿀팁 찜</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 카드 여러 개 묶음 */}
      <View style={styles.cardContainer}>
        {tip.map((content, i) => {
          return (
            // 카드 하나 묶음
            <View style={styles.card} key={i}>
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
        })}
      </View>
      {/* // 카드 여러 개 묶음 */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 전체 묶음
  container: {
    backgroundColor: "#fff",
  },

  // 타이틀
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 50,
    marginLeft: 20,
  },

  // 날씨
  weather: {
    alignSelf: "flex-end",
    paddingRight: 20,
  },

  // 상단 이미지
  mainImage: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
  },

  // 중간 버튼 묶음
  middleContainer: {
    marginTop: 20,
    marginLeft: 10,
    height: 60,
  },

  // 각각의 중간 버튼
  middleButton01: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fdc453",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  middleButton02: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fe8d6f",
    borderRadius: 15,
    margin: 7,
  },
  middleButton03: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#9adbc5",
    borderRadius: 15,
    margin: 7,
  },
  middleButton04: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#f886a8",
    borderRadius: 15,
    margin: 7,
  },

  // 중간 버튼 텍스트
  middleButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },

  // 카드 여러 개 묶음
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },

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
