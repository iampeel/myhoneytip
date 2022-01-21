import React, { useState, useEffect } from "react";
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
import Card from "../components/Card";
import Loading from "../components/Loading";

// 위에 있는 것들은 지칭하는 이름이 있다.
// 근데 이건 없어서 내가 Location이라고 지칭
// expo install expo-location
import * as Location from "expo-location";

// 도메인을 코드단에서 이용하여 서버에 요청하기 위함
// yarn add axios
import axios from "axios";

export default function MainPage({ navigation }) {
  // 앱 실행시 경고창 무시
  console.disableYellowBox = true;

  const [state, setState] = useState([]);
  // DB에서 가져온 원본은 state에 담고
  // 여기엔 버튼에 따른 내용을 담는다
  const [cateState, setCateState] = useState([]);

  // 날씨
  const [weather, setWeather] = useState({
    temp: 0,
    condition: "",
  });

  const [ready, setReady] = useState(true);

  // 데이터 변수
  let tip = data.tip;

  useEffect(() => {
    // navigation 객체 이용
    navigation.setOptions({
      title: "나만의 꿀팁",
    });

    // 로딩화면 보여주려고 일부러 삽입
    // 1000은 1초, 1초 뒤에 실행하라는 함수
    setTimeout(() => {
      setState(tip);
      setReady(false);
      setCateState(tip);
      // 위치
      getLocation();
    }, 2000);

    // []를 안 쓰면 렌더링 될 때마다 이게 실행됨
    // []: 처음 1번만 실행
    // [state]: state라는 변수의 상태가 바뀔때만
  }, []);

  // 위치
  const getLocation = async () => {
    // 외부 API 요청을 try/catch로 감싸기
    try {
      // try에는 API요청 작업 코드
      // 자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
      // JS는 비동기처리라 어떤 코드의 처리가 오래걸리면 다른 코드를 먼저 실행
      // 근데 async와 await를 쓰면 await가 처리된 건 순차적으로 진행
      await Location.requestPermissionsAsync();
      const locationData = await Location.getCurrentPositionAsync();

      // 위도 경도 모두
      // console.log("모두", locationData);

      // 위도
      // console.log("위도", locationData["coords"]["latitude"]);

      // 경도
      // console.log("경도", locationData["coords"]["longitude"]);

      const latitude = locationData["coords"]["latitude"];
      const longitude = locationData["coords"]["longitude"];

      // key값
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";

      // 아래 코드는 날씨 API 공식 문서를 참고해서
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      // console.log("결과", result);

      const temp = result.data.main.temp;
      const condition = result.data.weather[0].main;

      // console.log("온도", temp);
      // console.log("날씨", condition);

      setWeather({
        temp,
        condition,
      });

      // 에러가 발생할 경우 작업 코드
    } catch (error) {
      Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?");
    }
  };

  const category = (cate) => {
    if (cate == "전체보기") {
      setCateState(state);
    } else {
      // filetr()라는 함수는 state에 담겨있는 내용을 차례로 가져오는 기능
      // d는 인자를 받아오려고 쓴 키워드
      // 가져온 항목의 category값이 "생활"인 것만 리턴시켜서
      // cateState 변수에 넣음
      setCateState(
        state.filter((d) => {
          return d.category == cate;
        })
      );
    }
  };

  return ready ? (
    <Loading />
  ) : (
    // 전체 묶음
    <ScrollView style={styles.container}>
      {/* 날씨 */}
      <Text style={styles.weather}>
        오늘의 날씨: {weather.temp + "°C   " + weather.condition}
      </Text>

      {/* 소개 */}
      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => {
          navigation.navigate("AboutPage");
        }}
      >
        <Text style={styles.aboutButtonText}>소개 페이지</Text>
      </TouchableOpacity>

      {/* 상단 이미지 */}
      <Image style={styles.mainImage} source={main} />

      {/* 중간 버튼 묶음 */}
      <ScrollView style={styles.middleContainer} horizontal>
        <TouchableOpacity
          style={styles.middleButtonAll}
          onPress={() => {
            category("전체보기");
          }}
        >
          <Text style={styles.middleButtonTextAll}>전체보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.middleButton01}
          onPress={() => {
            category("생활");
          }}
        >
          <Text style={styles.middleButtonText}>생활</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton02}
          onPress={() => {
            category("재테크");
          }}
        >
          <Text style={styles.middleButtonText}>재테크</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton03}
          onPress={() => {
            category("반려견");
          }}
        >
          <Text style={styles.middleButtonText}>반려견</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton04}
          onPress={() => {
            navigation.navigate("LikePage");
          }}
        >
          <Text style={styles.middleButtonText}>꿀팁 찜</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 카드 여러 개 묶음 */}
      <View style={styles.cardContainer}>
        {/* tip --> state --> cateState */}
        {cateState.map((content, i) => {
          // Card.js로 보냄
          return <Card content={content} key={i} navigation={navigation} />;
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

  // 전체보기 추가
  middleButtonAll: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#20b2aa",
    borderRadius: 15,
    margin: 7,
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

  // 전체보기 추가
  middleButtonTextAll: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },

  // 카드 여러 개 묶음
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  aboutButton: {
    backgroundColor: "pink",
    width: 100,
    height: 40,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },
  aboutButtonText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
});
