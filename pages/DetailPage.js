import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// 공유하기
import { Share } from "react-native";

// url 연결
// expo install expo-linking
import * as Linking from "expo-linking";

export default function DetailPage({ navigation, route }) {
  // state로 변경
  // 안에 내용은 처음 렌더링할 때 아무 내용이 없으면 에러난다고 해서
  // 이게 싫으면 로딩 화면 구현
  const [tip, setTip] = useState({
    idx: 9,
    category: "재테크",
    title: "렌탈 서비스 금액 비교해보기",
    image:
      "https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Frental.png?alt=media&token=97a55844-f077-4aeb-8402-e0a27221570b",
    desc: "요즘은 정수기, 공기 청정기, 자동차나 장난감 등 다양한 대여서비스가 활발합니다. 사는 것보다 경제적이라고 생각해 렌탈 서비스를 이용하는 분들이 늘어나고 있는데요. 다만, 이런 렌탈 서비스 이용이 하나둘 늘어나다 보면 그 금액은 겉잡을 수 없이 불어나게 됩니다. 특히, 렌탈 서비스는 빌려주는 물건의 관리비용까지 포함된 것이기에 생각만큼 저렴하지 않습니다. 직접 관리하며 사용할 수 있는 물건이 있는지 살펴보고, 렌탈 서비스 항목에서 제외해보세요. 렌탈 비용과 구매 비용, 관리 비용을 여러모로 비교해보고 고민해보는 것이 좋습니다. ",
    date: "2020.09.09",
  });

  // 연결될 URL주소
  const link = () => {
    Linking.openURL("https://spartacodingclub.kr");
  };

  /* console.log(route)의 내용
  Object {
    "key": "DetailPage-vwdfPjytCT-UiYYlqWUim",
    "name": "DetailPage",
    "params": Object {
      "category": "생활",
      "date": "2020.09.09",
      "desc": "먹다 남은 피자는 수분이 날라가기 때문에 처음처럼 맛있게 먹을 수 없는데요. 이럴 경우 그릇에 물을 받아 전자레인지 안에서 1분 30초에서 2분 정도 함께  
  돌려주면 촉촉하게 먹을 수 있습니다. 물이 전자레인지 안에서 수증기를 일으키고, 피자에 촉촉함을 더해줍니다.",
      "idx": 0,
      "image": "https://storage.googleapis.com/sparta-image.appspot.com/lecture/pizza.png",
      "title": "먹다 남은 피자를 촉촉하게!",
    },
 */

  useEffect(() => {
    // 헤더 스타일링
    navigation.setOptions({
      title: route.params.title,
      headerStyle: {
        backgroundColor: "#000",
        shadowColor: "#000",
      },
      headerTintColor: "#fff",
    });
    // state 변경
    setTip(route.params);
  }, []);

  const popup = () => {
    Alert.alert("팝업!!");
  };

  // 공유할 때 썸네일 내용
  const share = () => {
    Share.share({
      message: `${tip.title} \n\n ${tip.desc} \n\n ${tip.image}`,
    });
  };

  return (
    // 전체
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.image} source={{ uri: tip.image }} />

      {/* 텍스트 묶음 */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.desc}>{tip.desc}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={() => popup()}>
            <Text style={styles.buttonText}>팁 찜하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => share()}>
            <Text style={styles.buttonText}>팁 공유하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => link()}>
            <Text style={styles.buttonText}>외부 링크</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  image: {
    height: 400,
    margin: 10,
    marginTop: 40,
    borderRadius: 20,
  },
  textContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#eee",
  },
  desc: {
    marginTop: 10,
    color: "#eee",
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
    color: "#fff",
    textAlign: "center",
  },
});
