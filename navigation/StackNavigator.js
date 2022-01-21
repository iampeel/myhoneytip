import React from "react";

// yarn add @react-navigation/stack
import { createStackNavigator } from "@react-navigation/stack";

// 페이지로 만든 컴포넌트들을 불러옴
import DetailPage from "../pages/DetailPage";
import MainPage from "../pages/MainPage";
import AboutPage from "../pages/AboutPage";
import LikePage from "../pages/LikePage";

// 스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용
// 그래서 이렇게 항상 상단에 선언하고 시작
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    // 컴포넌트들을 페이지처럼 여기게끔 해주기 위함
    // Stack은 위에서 선언한 거
    // screenOptions는 페이지(화면)를 스타일링
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          borderBottomColor: "white",
          shadowColor: "white",
          height: 100,
        },
        headerTitleAlign: "left",
        headerTintColor: "#000",
        headerBackTitleVisible: false,
      }}
    >
      {/* 둘다 이름이 같아야 하는 거 같음 */}
      {/* name은 상단에 표시되는 이름, component는 연결시킬 페이지 파일명*/}
      {/* 순차적으로 읽음. 맨 위에 있는 것을 첫 화면으로 보여줌 */}
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="AboutPage" component={AboutPage} />
      <Stack.Screen name="LikePage" component={LikePage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
